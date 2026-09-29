/* DeutschWeg app engine. Plain JavaScript, no build step, runs on any static host. */
(function () {
  'use strict';
  var KEY = 'deutschweg-v1', SKEY = 'deutschweg-sync';
  var app = document.getElementById('app');
  var LV = COURSE.levels;

  /* ---------- utilities ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function pick(a, n) { return shuffle(a).slice(0, n); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function parse(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { return iso(new Date()); }
  function addDays(s, n) { var d = parse(s); d.setDate(d.getDate() + n); return iso(d); }
  function diffDays(a, b) { return Math.round((parse(b) - parse(a)) / 864e5); }
  function norm(s) { return String(s).toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[.,!?;:"'„“»«()\-]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function loose(s) { return String(s).replace(/[.,!?;:"'„“»«()]/g, '').replace(/\s+/g, ' ').trim(); }
  function lev(a, b) {
    var m = a.length, n = b.length, d = [], i, j;
    for (i = 0; i <= m; i++) d[i] = [i];
    for (j = 1; j <= n; j++) d[0][j] = j;
    for (i = 1; i <= m; i++) for (j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    return d[m][n];
  }
  /* exact: perfect. ok but not exact: right answer with case, umlaut or a small typo difference */
  function check(input, answers, fuzzy) {
    var alts = String(answers).split('|'), ni = norm(input), k;
    if (!ni) return { ok: false, best: alts[0] };
    for (k = 0; k < alts.length; k++) if (loose(input) === loose(alts[k])) return { ok: true, exact: true, best: alts[k] };
    for (k = 0; k < alts.length; k++) {
      var na = norm(alts[k]);
      if (ni === na) return { ok: true, exact: false, best: alts[k] };
      if (fuzzy && na.length > 6 && lev(ni, na) <= Math.max(1, Math.floor(na.length * 0.08))) return { ok: true, exact: false, best: alts[k] };
    }
    return { ok: false, best: alts[0] };
  }

  /* ---------- state ---------- */
  function blank() { return { v: 1, xp: 0, streak: 0, best: 0, last: null, days: {}, goal: 50, units: {}, srs: {}, exams: {}, videos: {}, writing: {}, voice: '', updated: 0, started: today() }; }
  function load() { try { var s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v) return Object.assign(blank(), s); } catch (e) {} return blank(); }
  var S = load();
  function save(silent) { S.updated = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} if (!silent) schedulePush(); }

  function streakNow() { if (!S.last) return 0; return diffDays(S.last, today()) <= 1 ? S.streak : 0; }
  function todayXP() { return S.days[today()] || 0; }
  function addXP(n) {
    var t = today();
    S.days[t] = (S.days[t] || 0) + n; S.xp += n;
    if (S.last !== t) { S.streak = (S.last && diffDays(S.last, t) === 1) ? S.streak + 1 : 1; S.last = t; S.best = Math.max(S.best, S.streak); }
    save(); updateHeader();
  }
  function playerLevel() { return Math.floor(Math.sqrt(S.xp / 50)) + 1; }

  /* ---------- content index ---------- */
  var VOC = {}, UNITS = [], UBYID = {};
  COURSE.order.forEach(function (L) {
    var lv = LV[L]; if (!lv) return;
    lv.units.forEach(function (u, i) {
      u.level = L; u.idx = i; UNITS.push(u); UBYID[u.id] = u;
      u.words = u.vocab.map(function (s) {
        var p = s.split('|'), m = p[0].match(/^(der|die|das) (.+)$/);
        var w = { de: p[0], en: p[1], art: m ? m[1] : null, noun: m ? m[2] : null, unit: u.id };
        VOC[p[0]] = w; return w;
      });
    });
  });

  /* ---------- spaced repetition (Leitner boxes) ---------- */
  var IV = [0, 1, 2, 4, 7, 15, 30, 60, 120];
  function addWords(u) { var t = today(), n = 0; u.words.forEach(function (w) { if (!S.srs[w.de]) { S.srs[w.de] = { b: 0, d: t }; n++; } }); if (n) save(); return n; }
  function dueList() { var t = today(); return Object.keys(S.srs).filter(function (k) { return VOC[k] && S.srs[k].d <= t; }); }
  function grade(de, ok) { var c = S.srs[de]; if (!c) c = S.srs[de] = { b: 0, d: today() }; c.b = ok ? Math.min(c.b + 1, IV.length - 1) : 1; c.d = addDays(today(), ok ? IV[c.b] : 1); }
  function knownCount() { return Object.keys(S.srs).filter(function (k) { return S.srs[k].b >= 3; }).length; }

  /* ---------- unit progress ---------- */
  function us(id) { return S.units[id] || (S.units[id] = {}); }
  function mastery(id) { var s = S.units[id] || {}; return (s.watched ? 10 : 0) + (s.words ? 15 : 0) + (s.grammar ? 15 : 0) + Math.min(s.practice || 0, 3) * 10 + ((s.best || 0) >= 80 ? 30 : 0); }
  function isDone(id) { return ((S.units[id] || {}).best || 0) >= 80; }
  function nextUnit() { for (var i = 0; i < UNITS.length; i++) if (!isDone(UNITS[i].id)) return UNITS[i]; return null; }
  function nextStep(u) { var s = S.units[u.id] || {}; if (!s.watched) return 'watch'; if (!s.words) return 'words'; if (!s.grammar) return 'grammar'; if ((s.practice || 0) < 3) return 'practice'; if (!s.write) return 'write'; return 'test'; }
  var STEPNAME = { watch: 'Watch', words: 'Words', grammar: 'Grammar', practice: 'Practice', write: 'Write', speak: 'Speak', test: 'Unit test' };

  /* ---------- audio: text to speech and speech recognition ---------- */
  var voices = [];
  function loadVoices() { if (!window.speechSynthesis) return; voices = speechSynthesis.getVoices().filter(function (v) { return /^de/i.test(v.lang); }); }
  if (window.speechSynthesis) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  function chosenVoice() {
    if (!voices.length) return null;
    var byName = voices.filter(function (v) { return v.name === S.voice; })[0];
    return byName || voices.filter(function (v) { return /google|premium|enhanced|natural/i.test(v.name); })[0] || voices[0];
  }
  function say(t, slow) {
    if (!window.speechSynthesis) { toast('This browser cannot play German audio. Try Chrome.'); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(t); u.lang = 'de-DE';
    var v = chosenVoice(); if (v) u.voice = v;
    u.rate = slow ? 0.7 : 0.95; speechSynthesis.speak(u);
  }
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function hearOnce(cb) {
    if (!SR) { cb('unsupported'); return; }
    var r = new SR(); r.lang = 'de-DE'; r.interimResults = false; r.maxAlternatives = 3;
    var got = false;
    r.onresult = function (e) { got = true; var a = []; for (var i = 0; i < e.results[0].length; i++) a.push(e.results[0][i].transcript); cb(null, a); };
    r.onerror = function (e) { if (!got) { got = true; cb(e.error || 'error'); } };
    r.onend = function () { if (!got) cb('no-speech'); };
    try { r.start(); } catch (e) { cb('error'); }
  }
  function overlap(said, target) { var a = norm(said).split(' '), b = norm(target).split(' '), hit = 0; b.forEach(function (w) { var i = a.indexOf(w); if (i >= 0) { hit++; a.splice(i, 1); } }); return hit / b.length; }

  var rec = null;
  function toggleRec(btn, audio) {
    if (rec && rec.state === 'recording') { rec.stop(); return; }
    if (!navigator.mediaDevices || !window.MediaRecorder) { btn.textContent = 'Recording not supported here'; return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (st) {
      var chunks = []; rec = new MediaRecorder(st);
      rec.ondataavailable = function (e) { chunks.push(e.data); };
      rec.onstop = function () { st.getTracks().forEach(function (t) { t.stop(); }); audio.src = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })); audio.hidden = false; btn.textContent = '● Record again'; };
      rec.start(); btn.textContent = '■ Stop recording';
    }).catch(function () { btn.textContent = 'Microphone blocked'; });
  }

  /* ---------- small UI helpers ---------- */
  function toast(msg) { var t = document.getElementById('toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(function () { t.classList.remove('on'); }, 2600); }
  function bar(p, cls) { return '<div class="bar ' + (cls || '') + '"><i style="width:' + Math.max(0, Math.min(100, p)) + '%"></i></div>'; }
  function artClass(w) { return w.art ? 'g-' + w.art : ''; }
  function sayBtn(t, label) { return '<button class="icon" data-say="' + esc(t) + '" title="Listen" aria-label="Listen">' + (label || '🔊') + '</button>'; }
  var UMLAUTS = '<div class="keys">' + ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(function (c) { return '<button type="button" class="key" data-ins="' + c + '">' + c + '</button>'; }).join('') + '</div>';
  var lastInput = null;
  document.addEventListener('focusin', function (e) { if (e.target.matches('input[type=text],textarea')) lastInput = e.target; });
  var keyHandler = null;
  document.addEventListener('keydown', function (e) { if (keyHandler) keyHandler(e); });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-say],[data-slow],[data-ins]');
    if (!t) return;
    if (t.hasAttribute('data-say')) say(t.getAttribute('data-say'));
    else if (t.hasAttribute('data-slow')) say(t.getAttribute('data-slow'), true);
    else if (t.hasAttribute('data-ins')) {
      var inp = lastInput; if (!inp || !document.body.contains(inp)) inp = app.querySelector('input[type=text],textarea'); if (!inp) return;
      var s = inp.selectionStart || inp.value.length, en = inp.selectionEnd || s, c = t.getAttribute('data-ins');
      inp.value = inp.value.slice(0, s) + c + inp.value.slice(en); inp.focus(); inp.setSelectionRange(s + 1, s + 1);
      inp.dispatchEvent(new Event('input'));
    }
  });

  /* ---------- exercise items ---------- */
  function mcItem(q, opts, correct, extra) { var it = { k: 'mc', q: q, o: shuffle(opts), c: correct }; if (extra) Object.assign(it, extra); return it; }
  function fromEx(e) {
    switch (e[0]) {
      case 'mc': return mcItem(e[1], e[2], e[2][e[3]]);
      case 'type': return { k: 'type', q: e[1], a: e[2] };
      case 'order': return { k: 'order', q: e[1], a: e[2] };
      case 'listen': return { k: 'listen', a: e[1] };
      case 'speak': return { k: 'speak', a: e[1] };
    }
  }
  function vocabItem(w, pool) {
    var others = pool.filter(function (x) { return x.de !== w.de && x.en !== w.en; }), r = Math.random();
    if (others.length < 3) others = Object.keys(VOC).map(function (k) { return VOC[k]; }).filter(function (x) { return x.de !== w.de; });
    if (w.art && r < 0.22) return mcItem('Which article? <b>___ ' + esc(w.noun) + '</b> <span class="muted">(' + esc(w.en) + ')</span>', ['der', 'die', 'das'], w.art, { word: w.de });
    if (r < 0.42) return mcItem('What does <b>' + esc(w.de) + '</b> mean?', [w.en].concat(pick(others, 3).map(function (x) { return x.en; })), w.en, { word: w.de, audio: w.de });
    if (r < 0.62) return mcItem('How do you say <b>' + esc(w.en) + '</b>?', [w.de].concat(pick(others, 3).map(function (x) { return x.de; })), w.de, { word: w.de });
    if (r < 0.8) return mcItem('Which word do you hear?', [w.de].concat(pick(others, 3).map(function (x) { return x.de; })), w.de, { word: w.de, audio: w.de, auto: true });
    return { k: 'type', q: 'Type in German: <b>' + esc(w.en) + '</b>' + (w.art ? ' <span class="muted">(with article)</span>' : ''), a: w.de, word: w.de };
  }
  function practiceItems(u) { return shuffle(pick(u.ex.map(fromEx), 8).concat(pick(u.words, 5).map(function (w) { return vocabItem(w, u.words); }))); }
  function testItems(u) { var ex = u.ex.filter(function (e) { return e[0] !== 'speak'; }).map(fromEx); return shuffle(pick(ex, 12).concat(pick(u.words, 8).map(function (w) { return vocabItem(w, u.words); }))); }
  function mixedItems() {
    var started = UNITS.filter(function (u) { return (S.units[u.id] || {}).words; });
    if (!started.length) started = [UNITS[0]];
    var ex = [], words = [];
    started.forEach(function (u) { ex = ex.concat(u.ex.filter(function (e) { return e[0] !== 'speak'; })); words = words.concat(u.words); });
    return shuffle(pick(ex, 9).map(fromEx).concat(pick(words, 6).map(function (w) { return vocabItem(w, words); })));
  }

  /* ---------- exercise runner (Duolingo style: wrong answers come back at the end) ---------- */
  function run(items, opts) {
    var queue = items.slice(), total = items.length, done = 0, seen = {}, firstOk = 0, combo = 0, maxCombo = 0;
    items.forEach(function (it, i) { it._i = i; });
    function frame(body, pct) {
      app.innerHTML = '<div class="runner"><div class="rtop"><a class="x" href="' + opts.back + '" aria-label="Quit">✕</a>' + bar(pct, 'big') + '<span class="combo' + (combo >= 3 ? ' hot' : '') + '">🔥 ' + combo + '</span></div>' +
        '<div class="rtitle">' + esc(opts.title) + '</div><div class="qcard">' + body + '</div><div id="fb" class="fb" hidden></div><div class="ractions"><button class="btn ghost" id="skip">Skip</button><button class="btn primary" id="go" disabled>Check</button></div></div>';
    }
    function next() {
      if (!queue.length) return finish();
      var it = queue[0], pct = done / total * 100, body = '', answer = null, state = 'ask';
      if (it.k === 'mc') {
        body = '<div class="q">' + (it.audio ? sayBtn(it.audio) + ' ' : '') + it.q + '</div><div class="opts">' + it.o.map(function (o, i) { return '<button class="opt" data-o="' + i + '"><span class="n">' + (i + 1) + '</span>' + esc(o) + '</button>'; }).join('') + '</div>';
      } else if (it.k === 'type') {
        body = '<div class="q">' + it.q + '</div><input type="text" id="inp" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="Type your answer">' + UMLAUTS;
      } else if (it.k === 'order') {
        body = '<div class="q"><span class="muted">Build the German sentence:</span><br><b>' + esc(it.q) + '</b></div><div class="slots" id="slots"></div><div class="bank" id="bank">' + shuffle(it.a.split(' ')).map(function (w, i) { return '<button class="tok" data-t="' + i + '">' + esc(w) + '</button>'; }).join('') + '</div>';
      } else if (it.k === 'listen') {
        body = '<div class="q">Type what you hear</div><div class="play"><button class="btn round" data-say="' + esc(it.a) + '">🔊 Play</button><button class="btn round ghost" data-slow="' + esc(it.a) + '">🐢 Slow</button></div><input type="text" id="inp" autocomplete="off" spellcheck="false" placeholder="Type in German">' + UMLAUTS;
      } else if (it.k === 'speak') {
        body = '<div class="q">Say this sentence out loud</div><div class="big-de">' + esc(it.a) + ' ' + sayBtn(it.a) + '</div>' +
          (SR ? '<button class="btn round mic" id="mic">🎤 Tap and speak</button><div id="heard" class="muted"></div>' : '<p class="muted">Your browser has no speech check (use Chrome for that). Listen, say it aloud twice, then tap Check.</p>');
      }
      frame(body, pct);
      var go = document.getElementById('go'), fb = document.getElementById('fb');
      if (it.k === 'mc') {
        app.querySelectorAll('.opt').forEach(function (b) { b.onclick = function () { if (state !== 'ask') return; app.querySelectorAll('.opt').forEach(function (x) { x.classList.remove('sel'); }); b.classList.add('sel'); answer = it.o[+b.getAttribute('data-o')]; go.disabled = false; }; });
        if (it.auto) setTimeout(function () { say(it.audio); }, 250);
      } else if (it.k === 'type' || it.k === 'listen') {
        var inp = document.getElementById('inp'); inp.focus(); lastInput = inp;
        inp.oninput = function () { go.disabled = !inp.value.trim(); };
        if (it.k === 'listen') setTimeout(function () { say(it.a); }, 300);
      } else if (it.k === 'order') {
        var slots = document.getElementById('slots'), bank = document.getElementById('bank');
        bank.onclick = function (e) { var b = e.target.closest('.tok'); if (!b || state !== 'ask') return; slots.appendChild(b); go.disabled = !slots.children.length; };
        slots.onclick = function (e) { var b = e.target.closest('.tok'); if (!b || state !== 'ask') return; bank.appendChild(b); go.disabled = !slots.children.length; };
      } else if (it.k === 'speak') {
        if (SR) {
          var mic = document.getElementById('mic'), heard = document.getElementById('heard');
          mic.onclick = function () {
            mic.textContent = '… listening'; mic.disabled = true;
            hearOnce(function (err, alts) {
              mic.disabled = false; mic.textContent = '🎤 Try again';
              if (err) { heard.textContent = err === 'not-allowed' ? 'Microphone blocked. Allow it in the browser, or tap Check after saying it aloud.' : 'Did not catch that. Try again.'; go.disabled = false; answer = null; return; }
              var bestScore = 0, bestText = alts[0];
              alts.forEach(function (a) { var sc = overlap(a, it.a); if (sc > bestScore) { bestScore = sc; bestText = a; } });
              heard.innerHTML = 'I heard: <b>' + esc(bestText) + '</b> (' + Math.round(bestScore * 100) + '% match)';
              answer = bestScore; go.disabled = false;
            });
          };
        } else go.disabled = false;
      }
      function evaluate() {
        var res = { ok: false, show: '' };
        if (it.k === 'mc') { res.ok = answer === it.c; res.show = it.c; app.querySelectorAll('.opt').forEach(function (b) { var o = it.o[+b.getAttribute('data-o')]; if (o === it.c) b.classList.add('right'); else if (b.classList.contains('sel')) b.classList.add('wrong'); }); }
        else if (it.k === 'type' || it.k === 'listen') { var c = check(document.getElementById('inp').value, it.a, it.k === 'listen' || String(it.a).length > 10); res.ok = c.ok; res.show = c.best; res.note = c.ok && !c.exact ? 'Accepted. Exact spelling: ' + c.best : ''; }
        else if (it.k === 'order') { var built = Array.prototype.map.call(document.getElementById('slots').children, function (b) { return b.textContent; }).join(' '); res.ok = norm(built) === norm(it.a); res.show = it.a; }
        else if (it.k === 'speak') { res.ok = answer === null || answer >= 0.7; res.show = it.a; res.note = answer === null ? 'Self-checked. Compare with the audio.' : (res.ok ? '' : 'Below 70% match. Listen again and repeat slowly.'); }
        return res;
      }
      function show(res) {
        state = 'shown';
        var first = !seen[it._i]; seen[it._i] = true;
        if (res.ok) { combo++; maxCombo = Math.max(maxCombo, combo); if (first) firstOk++; } else combo = 0;
        if (it.word && first && opts.mode !== 'test') { grade(it.word, res.ok); }
        fb.hidden = false; fb.className = 'fb ' + (res.ok ? 'ok' : 'bad');
        fb.innerHTML = (res.ok ? '<b>' + pick(['Richtig!', 'Super!', 'Genau!', 'Sehr gut!', 'Perfekt!'], 1)[0] + '</b>' : '<b>Correct answer:</b> ' + esc(res.show)) +
          (res.note ? '<div class="small">' + esc(res.note) + '</div>' : '') + (/[a-zäöüß]/i.test(res.show) && it.k !== 'mc' || (it.k === 'mc' && it.word) ? ' ' + sayBtn(it.k === 'mc' ? it.word : res.show) : '');
        go.textContent = 'Continue'; go.disabled = false; document.getElementById('skip').hidden = true;
        var cur = queue.shift();
        if (res.ok || opts.mode === 'test') done++; else queue.push(cur);
        app.querySelector('.rtop .bar i').style.width = (done / total * 100) + '%';
        app.querySelector('.combo').textContent = '🔥 ' + combo;
      }
      go.onclick = function () { if (state === 'ask') show(evaluate()); else next(); };
      document.getElementById('skip').onclick = function () { if (state === 'ask') { answer = '\u0000'; if (it.k === 'type' || it.k === 'listen') document.getElementById('inp').value = ''; var r = evaluate(); r.ok = false; show(r); } };
      keyHandler = function (e) {
        if (e.key === 'Enter' && !go.disabled) { e.preventDefault(); go.click(); }
        else if (it.k === 'mc' && state === 'ask' && /^[1-4]$/.test(e.key) && document.activeElement.tagName !== 'INPUT') { var b = app.querySelector('.opt[data-o="' + (+e.key - 1) + '"]'); if (b) b.click(); }
      };
    }
    function finish() {
      keyHandler = null; save();
      var acc = Math.round(firstOk / total * 100);
      var extra = opts.onDone({ acc: acc, correct: firstOk, total: total, combo: maxCombo }) || '';
      app.innerHTML = '<div class="result card"><div class="big">' + (acc >= 80 ? '🎉' : acc >= 60 ? '👍' : '💪') + '</div><h2>' + esc(opts.title) + ' finished</h2>' +
        '<div class="stats3"><div><b>' + acc + '%</b><span>first try</span></div><div><b>' + firstOk + '/' + total + '</b><span>correct</span></div><div><b>' + maxCombo + '</b><span>best combo</span></div></div>' + extra +
        '<div class="row center"><a class="btn primary" href="' + opts.back + '">Continue</a><a class="btn ghost" href="#/home">Home</a></div></div>';
    }
    next();
  }

  /* ---------- views ---------- */
  function view(html) { keyHandler = null; app.innerHTML = html; window.scrollTo(0, 0); }

  function badges() {
    var a1 = LV.A1.units.every(function (u) { return isDone(u.id); });
    var anyPractice = UNITS.some(function (u) { return (S.units[u.id] || {}).practice; });
    return [
      ['🌱', 'Erster Schritt', 'First practice session', anyPractice],
      ['📚', 'Wortschatz 100', '100 words in your review deck', Object.keys(S.srs).length >= 100],
      ['🔥', 'Eine Woche', '7 day streak', S.best >= 7],
      ['🏔️', 'Ein Monat', '30 day streak', S.best >= 30],
      ['⚡', '1000 XP', 'Earn 1000 XP', S.xp >= 1000],
      ['🎓', 'A1 Kurs', 'Pass all 12 A1 unit tests', a1],
      ['🏅', 'Start Deutsch 1', 'Pass the A1 mock exam', ((S.exams.A1 || {}).best || 0) >= 60]
    ];
  }

  function home() {
    var nu = nextUnit(), due = dueList().length, st = streakNow(), tx = todayXP();
    var step = nu ? nextStep(nu) : null;
    var days = []; for (var i = 27; i >= 0; i--) { var d = addDays(today(), -i), x = S.days[d] || 0; days.push('<i class="h' + (x === 0 ? 0 : x < S.goal / 2 ? 1 : x < S.goal ? 2 : 3) + '" title="' + d + ': ' + x + ' XP"></i>'); }
    var plan = [
      [due ? 'Review ' + due + ' due words' : (Object.keys(S.srs).length ? 'Reviews done for today' : 'Reviews start after your first Words tab'), '#/review', !due && Object.keys(S.srs).length > 0, '5 min'],
      [nu ? 'Unit ' + (nu.idx + 1) + ': ' + STEPNAME[step] : 'All A1 units passed. Take the mock exam', nu ? '#/unit/' + nu.id + '/' + step : '#/exam/A1', false, '20 min'],
      ['Speak out loud: shadow 5 sentences', nu ? '#/unit/' + nu.id + '/speak' : '#/level/A1', false, '5 to 10 min']
    ];
    view(
      '<section class="hero card"><div><div class="muted small">Level ' + playerLevel() + ' · ' + S.xp + ' XP total</div><h1>Guten ' + (new Date().getHours() < 11 ? 'Morgen' : new Date().getHours() < 18 ? 'Tag' : 'Abend') + ', Prashant!</h1>' +
      '<div class="goal"><span>Daily goal ' + Math.min(tx, S.goal) + ' / ' + S.goal + ' XP</span>' + bar(tx / S.goal * 100) + '</div></div>' +
      '<div class="streak"><div class="flame">🔥</div><b>' + st + '</b><span>day streak</span><small>best ' + S.best + '</small></div></section>' +
      '<section class="card"><h2>Today</h2><ol class="plan">' + plan.map(function (p) { return '<li class="' + (p[2] ? 'done' : '') + '"><a href="' + p[1] + '"><span>' + esc(p[0]) + '</span><small>' + p[3] + '</small></a></li>'; }).join('') + '</ol>' +
      (nu ? '<a class="btn primary wide" href="#/unit/' + nu.id + '/' + step + '">Continue: ' + esc(nu.title) + '</a>' : '<a class="btn primary wide" href="#/exam/A1">Take the A1 mock exam</a>') + '</section>' +
      '<section class="card"><h2>Last 4 weeks</h2><div class="heat">' + days.join('') + '</div><div class="kpis"><div><b>' + Object.keys(S.srs).length + '</b><span>words in deck</span></div><div><b>' + knownCount() + '</b><span>words well known</span></div><div><b>' + UNITS.filter(function (u) { return isDone(u.id); }).length + '</b><span>units passed</span></div></div></section>' +
      '<section class="card"><h2>Your path to C1</h2><div class="levels">' + COURSE.order.map(function (L) {
        var m = COURSE.meta[L], lv = LV[L];
        if (!lv) return '<div class="lvl locked"><div class="tag">' + L + '</div><div><b>' + esc(m.name) + '</b><div class="small muted">Next step of the build · ' + esc(m.exam) + '</div></div><a class="btn ghost sm" href="#/level/' + L + '">Preview</a></div>';
        var dn = lv.units.filter(function (u) { return isDone(u.id); }).length, pct = lv.units.reduce(function (s, u) { return s + mastery(u.id); }, 0) / lv.units.length;
        return '<div class="lvl"><div class="tag on">' + L + '</div><div class="grow"><b>' + esc(m.name) + '</b><div class="small muted">' + dn + ' of ' + lv.units.length + ' units passed · mock exam ' + ((S.exams[L] || {}).best != null ? S.exams[L].best + '%' : 'not taken') + '</div>' + bar(pct) + '</div><a class="btn sm" href="#/level/' + L + '">Open</a></div>';
      }).join('') + '</div></section>' +
      '<section class="card"><h2>Badges</h2><div class="badges">' + badges().map(function (b) { return '<div class="badge ' + (b[3] ? 'got' : '') + '" title="' + esc(b[2]) + '"><span>' + b[0] + '</span><b>' + esc(b[1]) + '</b><small>' + esc(b[2]) + '</small></div>'; }).join('') + '</div></section>'
    );
  }

  function levelView(L) {
    var m = COURSE.meta[L], lv = LV[L];
    if (!m) return home();
    var fmt = '<table class="fmt"><tr><th>Part</th><th>Time</th><th>What you do</th></tr>' + m.format.map(function (f) { return '<tr><td><b>' + f[0] + '</b></td><td>' + f[1] + '</td><td>' + f[2] + '</td></tr>'; }).join('') + '</table>';
    var head = '<a class="back" href="#/home">‹ Home</a><section class="card"><div class="tag on big">' + L + '</div><h1>' + esc(m.name) + '</h1><p>' + esc(m.canDo) + '</p><p class="small muted">Exam: ' + esc(m.exam) + ' · Study time: ' + esc(m.hours) + '</p>' + fmt + '</section>';
    if (!lv) {
      view(head + '<section class="card"><h2>Planned units</h2><p class="muted">This level is the next section we build. The plan below follows the Goethe syllabus for ' + L + '.</p><ol class="roadmap">' + m.units.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ol></section>');
      return;
    }
    var nu = nextUnit();
    view(head + '<section class="card"><h2>Units</h2><div class="units">' + lv.units.map(function (u) {
      var p = mastery(u.id), d = isDone(u.id);
      return '<a class="unit ' + (d ? 'done' : '') + (nu && nu.id === u.id ? ' next' : '') + '" href="#/unit/' + u.id + '/' + (d ? 'watch' : nextStep(u)) + '"><div class="num">' + (d ? '✓' : u.idx + 1) + '</div><div class="grow"><b>' + esc(u.title) + '</b><div class="small muted">' + esc(u.theme) + '</div>' + bar(p) + '</div>' + (nu && nu.id === u.id ? '<span class="pill">Next</span>' : '') + '</a>';
    }).join('') + '</div></section>' +
      '<section class="card"><h2>Exam preparation</h2><p>When all units are passed, take the full mock exam in the Goethe format. Then do the official practice sets.</p><div class="row"><a class="btn primary" href="#/exam/' + L + '">Mock exam ' + L + '</a><a class="btn ghost" target="_blank" rel="noopener" href="' + COURSE.links.goetheA1 + '">Official Goethe practice sets ↗</a><a class="btn ghost" target="_blank" rel="noopener" href="' + COURSE.links.goetheA1Pdf + '">Model test PDF ↗</a></div></section>');
  }

  function parseYT(url) {
    var m = url.match(/[?&]v=([\w-]{11})/) || url.match(/youtu\.be\/([\w-]{11})/) || url.match(/(?:embed|shorts|live)\/([\w-]{11})/), l = url.match(/[?&]list=([\w-]+)/);
    if (m) return { id: m[1], label: 'Your video' };
    if (l) return { list: l[1], label: 'Your playlist' };
    return null;
  }
  function embed(v) {
    var src = v.id ? 'https://www.youtube-nocookie.com/embed/' + v.id + '?rel=0&cc_load_policy=1&cc_lang_pref=de&playsinline=1' : 'https://www.youtube-nocookie.com/embed/videoseries?list=' + v.list + '&rel=0&cc_load_policy=1&playsinline=1';
    var open = v.id ? 'https://www.youtube.com/watch?v=' + v.id : 'https://www.youtube.com/playlist?list=' + v.list;
    return '<div class="video"><iframe src="' + src + '" title="' + esc(v.label) + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin"></iframe></div><div class="small muted">' + esc(v.label) + ' · <a target="_blank" rel="noopener" href="' + open + '">Open on YouTube ↗</a></div>';
  }

  function unitView(id, tab) {
    var u = UBYID[id]; if (!u) return home();
    var s = us(id); tab = tab || nextStep(u);
    var tabs = ['watch', 'words', 'grammar', 'practice', 'write', 'speak', 'test'];
    var done = { watch: s.watched, words: s.words, grammar: s.grammar, practice: (s.practice || 0) >= 3, write: s.write, speak: s.spoke, test: isDone(id) };
    var prev = UNITS[UNITS.indexOf(u) - 1], nxt = UNITS[UNITS.indexOf(u) + 1];
    var head = '<a class="back" href="#/level/' + u.level + '">‹ ' + u.level + ' units</a><section class="card uhead"><div class="small muted">' + u.level + ' · Unit ' + (u.idx + 1) + ' · ' + esc(u.theme) + '</div><h1>' + esc(u.title) + '</h1>' + bar(mastery(id)) +
      '<nav class="tabs">' + tabs.map(function (t) { return '<a href="#/unit/' + id + '/' + t + '" class="' + (t === tab ? 'on' : '') + (done[t] ? ' ok' : '') + '">' + (done[t] ? '✓ ' : '') + STEPNAME[t] + '</a>'; }).join('') + '</nav></section>';
    var body = '';
    if (tab === 'watch') {
      var v = S.videos[id] || u.video;
      body = '<section class="card"><h2>Lernziele</h2><ul class="goals">' + u.goals.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('') + '</ul></section>' +
        '<section class="card"><h2>Watch</h2>' + embed(v) +
        '<p class="small">Watch once with subtitles, then a second time and pause to repeat each line out loud.</p>' +
        '<div class="row">' + (s.watched ? '<span class="pill ok">Watched ✓</span>' : '<button class="btn primary" id="watched">I watched it (+10 XP)</button>') + '</div>' +
        '<h3>More on this topic</h3><ul class="links">' + (u.extra || []).map(function (l) { return '<li><a target="_blank" rel="noopener" href="' + l[1] + '">' + esc(l[0]) + ' ↗</a></li>'; }).join('') +
        '<li><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(u.search) + '">Search YouTube: "' + esc(u.search) + '" ↗</a></li></ul>' +
        '<details><summary>Use a different video for this unit</summary><p class="small muted">Paste any YouTube video or playlist link. It will play here instead.</p><div class="row"><input type="text" id="vurl" placeholder="https://www.youtube.com/watch?v=..."><button class="btn" id="vset">Use it</button>' + (S.videos[id] ? '<button class="btn ghost" id="vreset">Reset</button>' : '') + '</div></details></section>';
    } else if (tab === 'words') {
      var added = addWords(u);
      if (!s.words) { s.words = true; addXP(5); }
      body = '<section class="card"><h2>Wortschatz <span class="muted small">' + u.words.length + ' words</span></h2><p class="small muted">' + (added ? added + ' new words added to your review deck. ' : '') + 'Colours: <span class="g-der">der</span> · <span class="g-die">die</span> · <span class="g-das">das</span>. Tap 🔊 and repeat each word out loud with its article.</p>' +
        '<div class="words">' + u.words.map(function (w) { var c = S.srs[w.de] || {}; return '<div class="word">' + sayBtn(w.de) + '<div class="grow"><b class="' + artClass(w) + '">' + esc(w.de) + '</b><span>' + esc(w.en) + '</span></div><span class="lvlbox" title="Memory strength">' + '●'.repeat(Math.min(c.b || 0, 5)) + '<i>' + '●'.repeat(5 - Math.min(c.b || 0, 5)) + '</i></span></div>'; }).join('') + '</div>' +
        '<div class="row"><button class="btn primary" id="wquiz">Word drill (10 questions)</button><a class="btn ghost" href="#/review">Review deck</a></div></section>';
    } else if (tab === 'grammar') {
      body = u.grammar.map(function (g, i) { return '<section class="card gram"><h2><span class="gnum">' + (i + 1) + '</span>' + esc(g.t) + '</h2>' + g.h + '</section>'; }).join('') +
        '<section class="card"><p class="small">Want a video explanation? <a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=' + encodeURIComponent(u.search) + '">Search YouTube ↗</a> and paste a good one into the Watch tab.</p>' + (s.grammar ? '<span class="pill ok">Read ✓</span> <a class="btn primary" href="#/unit/' + id + '/practice">Go to practice</a>' : '<button class="btn primary" id="gread">I have read this (+5 XP)</button>') + '</section>';
    } else if (tab === 'practice') {
      body = '<section class="card"><h2>Practice</h2><p>13 mixed exercises: grammar, word order, listening, speaking and vocabulary. Wrong answers come back at the end until you get them right.</p><p class="small muted">Sessions done: ' + (s.practice || 0) + ' · Aim for 3 before the unit test. Keyboard: 1 to 4 to choose, Enter to check.</p><button class="btn primary big" id="pstart">Start practice</button></section>';
    } else if (tab === 'write') {
      var w = u.write;
      body = '<section class="card"><h2>Schreiben</h2><p><b>Task:</b> ' + esc(w.task) + '</p><textarea id="wtext" rows="7" placeholder="Schreib hier...">' + esc(S.writing[id] || '') + '</textarea>' + UMLAUTS + '<div class="small muted" id="wc"></div>' +
        '<div class="row"><button class="btn" id="wmodel">Compare with model answer</button></div><div id="wbox" hidden><div class="model"><b>Model answer</b><p>' + esc(w.model) + ' ' + sayBtn(w.model) + '</p></div><b>Checklist</b><ul class="check">' + w.check.map(function (c, i) { return '<li><label><input type="checkbox" class="wc"> ' + esc(c) + '</label></li>'; }).join('') + '</ul>' +
        '<p class="small muted">Tip: paste your text into Claude and ask "Correct this at A1 level and explain each mistake briefly".</p>' + (s.write ? '<span class="pill ok">Done ✓</span>' : '<button class="btn primary" id="wdone">Mark as done (+15 XP)</button>') + '</div></section>';
    } else if (tab === 'speak') {
      var sents = u.ex.filter(function (e) { return e[0] === 'speak' || e[0] === 'listen'; }).map(function (e) { return e[1]; }).concat(u.write.model.split(/(?<=[.!?])\s+/).slice(0, 3));
      body = '<section class="card"><h2>Shadowing</h2><p class="small muted">Play, then repeat immediately with the same rhythm. ' + (SR ? 'Tap 🎤 to check your pronunciation.' : 'Speech check needs Chrome.') + '</p><div class="shadow">' + sents.map(function (t, i) { return '<div class="sh"><div class="grow">' + esc(t) + '</div>' + sayBtn(t) + '<button class="icon" data-slow="' + esc(t) + '" title="Slow">🐢</button>' + (SR ? '<button class="icon shmic" data-i="' + i + '" title="Check">🎤</button>' : '') + '<span class="score" id="sc' + i + '"></span></div>'; }).join('') + '</div></section>' +
        '<section class="card"><h2>Sprechen: exam questions</h2><p class="small muted">Answer each question out loud in 1 to 2 full sentences. Record yourself and listen back.</p><ul class="prompts">' + u.speakPrompts.map(function (p) { return '<li>' + esc(p) + ' ' + (/[äöüß]|Sie|Ihr|Was|Wie|Wo|Wann/.test(p) ? sayBtn(p) : '') + '</li>'; }).join('') + '</ul>' +
        '<div class="row"><button class="btn" id="rec">● Record</button><audio id="recaudio" controls hidden></audio></div>' + (s.spoke ? '<span class="pill ok">Done ✓</span>' : '<button class="btn primary" id="sdone">I practised speaking (+10 XP)</button>') + '</section>';
      u._sents = sents;
    } else if (tab === 'test') {
      body = '<section class="card"><h2>Unit test</h2><p>20 questions. No second chances. Pass with 80% to complete the unit. You can take it any time, so if you already know this topic, test out now.</p><p class="small muted">Best score: ' + (s.best != null ? s.best + '%' : 'not taken yet') + '</p><button class="btn primary big" id="tstart">Start test</button></section>';
    }
    var nav = '<div class="row between">' + (prev ? '<a class="btn ghost sm" href="#/unit/' + prev.id + '/watch">‹ ' + esc(prev.title) + '</a>' : '<span></span>') + (nxt ? '<a class="btn ghost sm" href="#/unit/' + nxt.id + '/' + nextStep(nxt) + '">' + esc(nxt.title) + ' ›</a>' : '') + '</div>';
    view(head + body + nav);
    bindUnit(u, s, tab);
  }

  function bindUnit(u, s, tab) {
    var id = u.id, $ = function (x) { return document.getElementById(x); };
    var back = '#/unit/' + id + '/';
    if (tab === 'watch') {
      if ($('watched')) $('watched').onclick = function () { s.watched = true; addXP(10); location.hash = back + 'words'; };
      if ($('vset')) $('vset').onclick = function () { var v = parseYT($('vurl').value.trim()); if (!v) return toast('That does not look like a YouTube link'); S.videos[id] = v; save(); unitView(id, 'watch'); };
      if ($('vreset')) $('vreset').onclick = function () { delete S.videos[id]; save(); unitView(id, 'watch'); };
    } else if (tab === 'words') {
      $('wquiz').onclick = function () { run(pick(u.words, 10).map(function (w) { return vocabItem(w, u.words); }), { title: u.title + ': words', back: back + 'words', onDone: function (r) { addXP(5 + r.correct); return '<p class="xp">+' + (5 + r.correct) + ' XP</p>'; } }); };
    } else if (tab === 'grammar') {
      if ($('gread')) $('gread').onclick = function () { s.grammar = true; addXP(5); location.hash = back + 'practice'; };
    } else if (tab === 'practice') {
      $('pstart').onclick = function () { run(practiceItems(u), { title: u.title, back: back + 'practice', onDone: function (r) { s.practice = (s.practice || 0) + 1; var xp = 10 + r.correct; addXP(xp); return '<p class="xp">+' + xp + ' XP</p>' + (s.practice >= 3 && !isDone(id) ? '<p>Ready for the unit test. Do the writing task first if you have 10 minutes.</p>' : ''); } }); };
    } else if (tab === 'write') {
      var ta = $('wtext'), wc = $('wc');
      var upd = function () { var n = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; wc.textContent = n + ' words'; S.writing[id] = ta.value; save(true); };
      ta.oninput = upd; upd();
      $('wmodel').onclick = function () { $('wbox').hidden = false; save(); };
      if ($('wdone')) $('wdone').onclick = function () { s.write = true; addXP(15); save(); unitView(id, 'write'); };
    } else if (tab === 'speak') {
      app.querySelectorAll('.shmic').forEach(function (b) {
        b.onclick = function () {
          var i = +b.getAttribute('data-i'), t = u._sents[i], out = $('sc' + i); out.textContent = '…';
          hearOnce(function (err, alts) { if (err) { out.textContent = err === 'not-allowed' ? 'mic blocked' : 'again?'; return; } var best = Math.max.apply(null, alts.map(function (a) { return overlap(a, t); })); out.textContent = Math.round(best * 100) + '%'; out.className = 'score ' + (best >= 0.8 ? 'good' : best >= 0.5 ? 'mid' : 'low'); });
        };
      });
      $('rec').onclick = function () { toggleRec($('rec'), $('recaudio')); };
      if ($('sdone')) $('sdone').onclick = function () { s.spoke = true; addXP(10); unitView(id, 'speak'); };
    } else if (tab === 'test') {
      $('tstart').onclick = function () {
        run(testItems(u), { title: u.title + ': unit test', mode: 'test', back: back + 'test', onDone: function (r) {
          var was = isDone(id); s.best = Math.max(s.best || 0, r.acc);
          if (r.acc >= 80) { addWords(u); s.words = true; }
          var xp = r.acc >= 80 && !was ? 30 : 5; addXP(xp);
          return r.acc >= 80 ? '<p class="pass">Unit passed ✓ +' + xp + ' XP</p>' : '<p class="fail">Need 80% to pass. Do another practice round and try again. +' + xp + ' XP</p>';
        } });
      };
    }
  }

  function review() {
    var due = dueList(), total = Object.keys(S.srs).length;
    if (!due.length) {
      view('<a class="back" href="#/home">‹ Home</a><section class="card"><h1>Review</h1>' + (total ? '<p>Nothing due right now. ' + total + ' words in your deck, ' + knownCount() + ' well known. Come back tomorrow.</p>' : '<p>Your deck is empty. Open the Words tab of a unit to add its words.</p>') +
        '<button class="btn primary" id="mix">Mixed quiz from all started units</button></section>');
      document.getElementById('mix').onclick = function () { run(mixedItems(), { title: 'Mixed quiz', back: '#/review', onDone: function (r) { addXP(8 + r.correct); return '<p class="xp">+' + (8 + r.correct) + ' XP</p>'; } }); };
      return;
    }
    var queue = shuffle(due).slice(0, 30), n = queue.length, seen = {}, doneN = 0, xp = 0;
    function card() {
      if (!queue.length) { save(); addXP(xp); view('<section class="result card"><div class="big">✅</div><h2>Review done</h2><p>' + n + ' words reviewed. +' + xp + ' XP</p><div class="row center"><a class="btn primary" href="#/home">Home</a><button class="btn ghost" id="more">Mixed quiz</button></div></section>'); document.getElementById('more').onclick = function () { run(mixedItems(), { title: 'Mixed quiz', back: '#/review', onDone: function (r) { addXP(8 + r.correct); return '<p class="xp">+' + (8 + r.correct) + ' XP</p>'; } }); }; return; }
      var w = VOC[queue[0]], deFirst = Math.random() < 0.6;
      view('<div class="runner"><div class="rtop"><a class="x" href="#/home">✕</a>' + bar(doneN / n * 100, 'big') + '<span class="combo">' + (n - doneN) + '</span></div>' +
        '<div class="flash" id="fl"><div class="front">' + (deFirst ? '<b class="' + artClass(w) + '">' + esc(w.de) + '</b>' + sayBtn(w.de) : '<b>' + esc(w.en) + '</b><span class="small muted">Say it in German with the article</span>') + '</div><div class="backside" hidden>' + (deFirst ? esc(w.en) : '<b class="' + artClass(w) + '">' + esc(w.de) + '</b> ' + sayBtn(w.de)) + '</div></div>' +
        '<div class="ractions" id="ra"><button class="btn primary wide" id="flip">Show answer</button></div></div>');
      if (deFirst) setTimeout(function () { say(w.de); }, 200);
      var flip = function () { app.querySelector('.backside').hidden = false; if (!deFirst) say(w.de); document.getElementById('ra').innerHTML = '<button class="btn bad" id="again">Again</button><button class="btn primary" id="good">Got it</button>'; document.getElementById('again').onclick = function () { ans(false); }; document.getElementById('good').onclick = function () { ans(true); }; keyHandler = function (e) { if (e.key === '1') ans(false); if (e.key === '2' || e.key === 'Enter') ans(true); }; };
      document.getElementById('flip').onclick = flip;
      keyHandler = function (e) { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); } };
      function ans(ok) { var de = queue.shift(); if (!seen[de]) { seen[de] = true; grade(de, ok); xp += 1; } if (ok) doneN++; else queue.push(de); card(); }
    }
    card();
  }

  function examView(L) {
    var ex = (LV[L] || {}).exam; if (!ex) return levelView(L);
    var plays = {};
    var html = '<a class="back" href="#/level/' + L + '">‹ ' + L + '</a><section class="card"><h1>Mock exam ' + L + '</h1><p>' + esc(COURSE.meta[L].exam) + ' format. Pass mark ' + ex.pass + '%. Best so far: ' + ((S.exams[L] || {}).best != null ? S.exams[L].best + '%' : 'not taken') + '.</p><p class="small muted">Do it in one sitting, about 70 minutes, no notes. Audio plays twice at most, like the real exam.</p></section><div id="exres"></div>';
    var qn = 0;
    ex.sections.forEach(function (sec, si) {
      html += '<section class="card exsec"><h2>' + (si + 1) + '. ' + esc(sec.name) + '</h2><p class="small muted">' + esc(sec.info) + '</p>';
      sec.items.forEach(function (it, ii) {
        var key = si + '-' + ii; qn++;
        if (it[0] === 'listen-mc') {
          html += '<div class="exq" data-k="' + key + '"><div class="row"><button class="btn round sm" data-play="' + key + '">🔊 Play (<span>2</span> left)</button><b>' + qn + '. ' + esc(it[2]) + '</b></div>' + shuffle(it[3].map(function (o, oi) { return [o, oi]; })).map(function (o) { return '<label class="radio"><input type="radio" name="q' + key + '" value="' + o[1] + '"> ' + esc(o[0]) + '</label>'; }).join('') + '</div>';
        } else if (it[0] === 'read-tf') {
          html += '<div class="exq" data-k="' + key + '">' + (ii === 0 || sec.items[ii - 1][1] !== it[1] ? '<div class="notice">' + esc(it[1]) + '</div>' : '') + '<b>' + qn + '. ' + esc(it[2]) + '</b><div class="row"><label class="radio"><input type="radio" name="q' + key + '" value="1"> richtig</label><label class="radio"><input type="radio" name="q' + key + '" value="0"> falsch</label></div></div>';
        } else if (it[0] === 'form') {
          html += '<div class="exq"><div class="notice">' + esc(it[1]) + '</div>' + ['Familienname', 'Geburtsort', 'Postleitzahl', 'Familienstand', 'Zahlungsweise'].map(function (f, fi) { return '<label class="field">' + (fi + 1) + ') ' + f + '<input type="text" id="f' + key + '-' + fi + '" autocomplete="off"></label>'; }).join('') + '</div>';
        } else if (it[0] === 'letter') {
          html += '<div class="exq"><div class="notice">' + esc(it[1]) + '</div><textarea id="letter" rows="7" placeholder="Liebe Frau Wolf, ..."></textarea>' + UMLAUTS + '<div class="model" id="lmodel" hidden><b>Model answer</b><p>' + esc(it[2]) + '</p></div><b>Self-check (tick honestly after writing)</b><ul class="check">' + it[3].map(function (c) { return '<li><label><input type="checkbox" class="lc"> ' + esc(c) + '</label></li>'; }).join('') + '</ul></div>';
        } else if (it[0] === 'speak-check') {
          html += '<div class="exq"><b>' + esc(it[1]) + '</b><ul class="check">' + it[2].map(function (c) { return '<li><label><input type="checkbox" class="sp"> ' + esc(c) + '</label> ' + (/[äöüß]|\?|!/.test(c) ? sayBtn(c) : '') + '</li>'; }).join('') + '</ul></div>';
        }
      });
      html += '</section>';
    });
    html += '<section class="card"><button class="btn primary big wide" id="submit">Submit and score</button></section>';
    view(html);
    app.querySelectorAll('[data-play]').forEach(function (b) {
      b.onclick = function () {
        var k = b.getAttribute('data-play'), p = k.split('-'), it = ex.sections[+p[0]].items[+p[1]];
        plays[k] = (plays[k] || 0) + 1; if (plays[k] > 2) return;
        say(it[1]); b.querySelector('span').textContent = 2 - plays[k]; if (plays[k] >= 2) b.disabled = true;
      };
    });
    document.getElementById('submit').onclick = function () {
      var scores = [];
      ex.sections.forEach(function (sec, si) {
        var got = 0, max = 0;
        sec.items.forEach(function (it, ii) {
          var key = si + '-' + ii, el = app.querySelector('.exq[data-k="' + key + '"]');
          if (it[0] === 'listen-mc' || it[0] === 'read-tf') {
            var sel = app.querySelector('input[name="q' + key + '"]:checked'), right = it[0] === 'listen-mc' ? String(it[4]) : (it[3] ? '1' : '0');
            max++; if (sel && sel.value === right) got++;
            el.classList.add(sel && sel.value === right ? 'right' : 'wrong');
            app.querySelectorAll('input[name="q' + key + '"]').forEach(function (r) { if (r.value === right) r.parentNode.classList.add('ans'); });
            if (it[0] === 'listen-mc') el.insertAdjacentHTML('beforeend', '<div class="small muted">Transcript: ' + esc(it[1]) + '</div>');
          } else if (it[0] === 'form') {
            it[2].forEach(function (a, fi) { var inp = document.getElementById('f' + key + '-' + fi), ok = check(inp.value, a).ok; max += 1; if (ok) got += 1; inp.classList.add(ok ? 'right' : 'wrong'); if (!ok) inp.insertAdjacentHTML('afterend', '<span class="small">→ ' + esc(a.split('|')[0]) + '</span>'); });
          } else if (it[0] === 'letter') {
            var ticks = app.querySelectorAll('.lc:checked').length, n = app.querySelectorAll('.lc').length; max += 5; got += ticks / n * 5; document.getElementById('lmodel').hidden = false;
          } else if (it[0] === 'speak-check') { /* counted below */ }
        });
        if (sec.name === 'Sprechen') { got = app.querySelectorAll('.sp:checked').length; max = app.querySelectorAll('.sp').length; }
        scores.push([sec.name, Math.round(got / max * 100)]);
      });
      var total = Math.round(scores.reduce(function (s, x) { return s + x[1]; }, 0) / scores.length), pass = total >= ex.pass;
      var prevBest = (S.exams[L] || {}).best; S.exams[L] = { best: Math.max(prevBest || 0, total), last: total, date: today() };
      addXP(pass && !(prevBest >= ex.pass) ? 50 : 10);
      document.getElementById('exres').innerHTML = '<section class="card result"><div class="big">' + (pass ? '🏅' : '📘') + '</div><h2>' + total + '% · ' + (pass ? 'Bestanden!' : 'Not yet') + '</h2><div class="stats3">' + scores.map(function (s) { return '<div><b>' + s[1] + '%</b><span>' + s[0] + '</span></div>'; }).join('') + '</div><p class="small muted">Answers are marked below. The real exam needs 60% overall. Aim for 75% here before you book it.</p></section>';
      document.getElementById('submit').disabled = true; window.scrollTo(0, 0); save();
    };
  }

  function guide() {
    view('<a class="back" href="#/home">‹ Home</a><section class="card prose"><h1>How to use DeutschWeg</h1>' +
      '<h2>The daily routine (30 to 45 minutes)</h2><ol><li><b>Review first (5 min).</b> Clear the due words on the Review page. Say every word out loud with its article.</li><li><b>One unit step (20 min).</b> Press Continue on Home. Each unit runs Watch → Words → Grammar → Practice ×3 → Write → Speak → Test. That order mirrors a Goethe-Institut lesson: input, vocabulary, rule, controlled practice, free production, check.</li><li><b>Speak (5 to 10 min).</b> Shadow the sentences in the Speak tab and answer the exam questions out loud. Record and listen back.</li><li><b>Weekend.</b> Take the unit test, finish the writing task, and watch one extra video with German subtitles.</li></ol>' +
      '<h2>Pace and timeline</h2><p>At 30 to 45 minutes a day, expect about one A1 unit per week, so A1 in roughly 3 months. Honest estimate for the whole path at this pace: A2 after about 8 months, B1 after about 15, B2 after about 2 years, C1 after about 3 years. A weekly online tutor or an intensive course at the Goethe-Institut (Max Mueller Bhavan in India) shortens this a lot, because speaking is the part an app cannot fully train.</p>' +
      '<h2>Rules that make it work</h2><ul><li>Never skip a day. Five minutes of review keeps the streak and the memory alive.</li><li>Always learn nouns with der, die, das. The colours help.</li><li>Say everything out loud, including exercises you answer by tapping.</li><li>A unit is done at 80% on its test. If you already know a topic, test out.</li><li>Before booking an exam, score 75% or more on the mock exam, then do the official Goethe practice sets.</li></ul>' +
      '<h2>Books that pair well</h2><p>The unit order follows the Goethe A1 word list and the structure of Goethe aligned course books. If you want a book alongside, <b>Menschen A1</b> (Hueber) or <b>Netzwerk neu A1</b> (Klett) match this course well, and <b>Mit Erfolg zum Goethe-Zertifikat</b> (Klett) is a good exam trainer.</p>' +
      '<h2>Free resources used here</h2><ul><li><a target="_blank" rel="noopener" href="' + COURSE.links.nicoA1 + '">Nicos Weg A1 (Deutsche Welle)</a> and the <a target="_blank" rel="noopener" href="' + COURSE.links.dw + '">full DW course</a></li><li><a target="_blank" rel="noopener" href="' + COURSE.links.easyGerman + '">Easy German</a> for real street German</li><li><a target="_blank" rel="noopener" href="' + COURSE.links.goetheA1 + '">Goethe A1 official practice materials</a></li></ul>' +
      '<h2>Phone and laptop</h2><p>Progress is saved in the browser. To use both devices, turn on GitHub sync in Settings once on each device. On the phone, open the site in Chrome and choose "Add to Home screen" so it opens like an app.</p></section>');
  }

  function settings() {
    var vs = voices.map(function (v) { return '<option ' + (v.name === (chosenVoice() || {}).name ? 'selected' : '') + '>' + esc(v.name) + '</option>'; }).join('');
    view('<a class="back" href="#/home">‹ Home</a><section class="card"><h1>Settings</h1>' +
      '<label class="field">Daily goal<select id="goal">' + [20, 30, 50, 80, 120].map(function (g) { return '<option value="' + g + '" ' + (S.goal === g ? 'selected' : '') + '>' + g + ' XP ' + ({ 20: '(casual)', 30: '(regular)', 50: '(serious, about 30 to 45 min)', 80: '(intense)', 120: '(insane)' })[g] + '</option>'; }).join('') + '</select></label>' +
      '<label class="field">German voice<select id="voice">' + (vs || '<option>No German voice found on this device</option>') + '</select></label><button class="btn ghost sm" data-say="Guten Tag! Ich heiße Anna und ich komme aus Berlin.">Test voice</button>' +
      '<p class="small muted">Speech check: ' + (SR ? 'available' : 'not available in this browser (Chrome on Android and desktop supports it)') + '.</p></section>' +
      '<section class="card"><h2>Sync between phone and laptop</h2><p class="small">Uses a private GitHub Gist as storage. One time setup: on github.com go to Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new token, tick only <b>gist</b>, copy it here. On the second device paste the same token and the Gist ID shown below.</p>' +
      '<label class="field">GitHub token<input type="password" id="tok" value="' + esc(SY.token || '') + '" autocomplete="off"></label><label class="field">Gist ID (empty on the first device)<input type="text" id="gid" value="' + esc(SY.gist || '') + '" autocomplete="off"></label>' +
      '<label class="radio"><input type="checkbox" id="auto" ' + (SY.auto ? 'checked' : '') + '> Sync automatically</label>' +
      '<div class="row"><button class="btn primary" id="ssave">Save and push now</button><button class="btn" id="spull">Pull from cloud</button></div><div class="small muted" id="syncstate">' + esc(syncMsg) + '</div></section>' +
      '<section class="card"><h2>Backup</h2><div class="row"><button class="btn" id="exp">Download backup</button><label class="btn ghost">Restore backup<input type="file" id="imp" accept=".json" hidden></label></div>' +
      '<details><summary>Danger zone</summary><p class="small">Type RESET to delete all progress on this device.</p><div class="row"><input type="text" id="rst"><button class="btn bad" id="rstb">Reset</button></div></details></section>');
    var $ = function (x) { return document.getElementById(x); };
    $('goal').onchange = function () { S.goal = +this.value; save(); updateHeader(); };
    $('voice').onchange = function () { S.voice = this.value; save(); say('Hallo, so klinge ich.'); };
    $('ssave').onclick = function () { SY.token = $('tok').value.trim(); SY.gist = $('gid').value.trim(); SY.auto = $('auto').checked; saveSync(); if (!SY.token) return setSync('Enter a token first.'); setSync('Pushing…'); push().then(function () { $('gid').value = SY.gist; setSync('Saved to Gist ' + SY.gist + ' at ' + new Date().toLocaleTimeString()); }).catch(function (e) { setSync('Failed: ' + e.message); }); };
    $('spull').onclick = function () { SY.token = $('tok').value.trim(); SY.gist = $('gid').value.trim(); SY.auto = $('auto').checked; saveSync(); setSync('Pulling…'); pull(true).then(function () { setSync('Pulled at ' + new Date().toLocaleTimeString()); }).catch(function (e) { setSync('Failed: ' + e.message); }); };
    $('exp').onclick = function () { var a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(S)], { type: 'application/json' })); a.download = 'deutschweg-backup-' + today() + '.json'; a.click(); };
    $('imp').onchange = function () { var f = this.files[0]; if (!f) return; f.text().then(function (t) { var d = JSON.parse(t); if (!d.v) throw 0; S = Object.assign(blank(), d); save(); toast('Backup restored'); route(); }).catch(function () { toast('That file is not a DeutschWeg backup'); }); };
    $('rstb').onclick = function () { if ($('rst').value === 'RESET') { S = blank(); save(); toast('Progress reset'); location.hash = '#/home'; } };
  }

  /* ---------- GitHub Gist sync (last write wins) ---------- */
  var SY = (function () { try { return JSON.parse(localStorage.getItem(SKEY)) || {}; } catch (e) { return {}; } })();
  var syncMsg = '', pushTimer = null, FILE = 'deutschweg.json';
  function saveSync() { try { localStorage.setItem(SKEY, JSON.stringify(SY)); } catch (e) {} }
  function setSync(m) { syncMsg = m; var el = document.getElementById('syncstate'); if (el) el.textContent = m; var d = document.getElementById('syncdot'); if (d) d.title = m; }
  function gh(method, url, body) {
    return fetch('https://api.github.com' + url, { method: method, headers: { 'Authorization': 'Bearer ' + SY.token, 'Accept': 'application/vnd.github+json', 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined })
      .then(function (r) { if (!r.ok) throw new Error('GitHub answered ' + r.status + (r.status === 401 ? ' (token wrong or expired)' : r.status === 404 ? ' (Gist not found)' : '')); return r.json(); });
  }
  function push() {
    var files = {}; files[FILE] = { content: JSON.stringify(S) };
    if (!SY.gist) return gh('POST', '/gists', { description: 'DeutschWeg progress', public: false, files: files }).then(function (g) { SY.gist = g.id; saveSync(); });
    return gh('PATCH', '/gists/' + SY.gist, { files: files }).then(function () { setSync('Synced ' + new Date().toLocaleTimeString()); });
  }
  function pull(force) {
    if (!SY.token || !SY.gist) return Promise.resolve();
    return gh('GET', '/gists/' + SY.gist).then(function (g) {
      var f = g.files[FILE]; if (!f) return;
      return (f.truncated ? fetch(f.raw_url).then(function (r) { return r.text(); }) : Promise.resolve(f.content)).then(function (txt) {
        var remote = JSON.parse(txt);
        if (force || (remote.updated || 0) > (S.updated || 0)) { S = Object.assign(blank(), remote); try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} route(); setSync('Loaded newer progress from the cloud'); }
        else if ((remote.updated || 0) < (S.updated || 0)) return push();
      });
    });
  }
  function schedulePush() { if (!SY.token || !SY.auto) return; clearTimeout(pushTimer); pushTimer = setTimeout(function () { push().catch(function (e) { setSync('Sync failed: ' + e.message); }); }, 4000); }

  /* ---------- shell ---------- */
  function updateHeader() {
    var el = document.getElementById('hstats'); if (!el) return;
    el.innerHTML = '<span title="Day streak">🔥 ' + streakNow() + '</span><span title="XP today">⚡ ' + todayXP() + '/' + S.goal + '</span><span title="Words due">🗂️ ' + dueList().length + '</span>';
  }
  function route() {
    var h = location.hash.replace(/^#\/?/, '').split('/'), v = h[0] || 'home';
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (v === 'level') levelView(h[1]);
    else if (v === 'unit') unitView(h[1], h[2]);
    else if (v === 'review') review();
    else if (v === 'exam') examView(h[1] || 'A1');
    else if (v === 'guide') guide();
    else if (v === 'settings') settings();
    else home();
    document.querySelectorAll('.nav a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-v') === (v === 'unit' ? 'level' : v)); });
    updateHeader();
  }
  window.addEventListener('hashchange', route);
  route();
  if (SY.token && SY.gist && SY.auto) pull(false).catch(function (e) { setSync('Sync failed: ' + e.message); });
  document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && SY.token && SY.auto) { clearTimeout(pushTimer); push().catch(function () {}); } });
})();
