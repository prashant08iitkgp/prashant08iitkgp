/* A1 content. Syllabus follows the Goethe A1 Wortliste themes and the unit order used in
   Goethe-aligned course books (Menschen A1, Netzwerk neu A1). All texts and exercises are original.
   Exercise formats:
   ['mc', question, [options], correctIndex]
   ['type', question, 'answer|alternative']
   ['order', 'English meaning', 'German sentence']      words shuffled, rebuild the sentence
   ['listen', 'German sentence']                        audio plays, type what you hear
   ['speak', 'German sentence']                         read aloud, speech check if the browser supports it
   Vocab: 'German|English' (nouns with article). */
(function () {
  var NICO = 'PLs7zUO7VPyJ5DV1iBRgSw2uDl832n0bLg';
  COURSE.levels.A1 = {
    units: [
      {
        id: 'a1-01', title: 'Hallo! Wer bist du?', theme: 'Greetings and introductions',
        goals: ['Greet people and say goodbye at any time of day', 'Say your name and ask for someone else\'s', 'Choose between du and Sie'],
        video: { id: 'dC6ZGLzdaTs', label: 'Nicos Weg, Folge 1: Hallo (DW)' },
        extra: [['Nicos Weg Folge 2 and 3 (playlist)', 'https://www.youtube.com/playlist?list=' + NICO], ['DW lesson with exercises', 'https://learngerman.dw.com/en/hallo/l-37250531']],
        search: 'German greetings A1 Easy German',
        vocab: ['Hallo|hello', 'Guten Morgen|good morning', 'Guten Tag|hello (daytime, polite)', 'Guten Abend|good evening', 'Gute Nacht|good night', 'Tschüss|bye', 'Auf Wiedersehen|goodbye (polite)', 'Wie geht es Ihnen?|how are you? (formal)', 'Wie geht\'s?|how are you? (informal)', 'gut|good', 'sehr gut|very good', 'danke|thank you', 'bitte|please', 'ja|yes', 'nein|no', 'der Name|the name', 'heißen|to be called', 'sein|to be', 'Entschuldigung|excuse me, sorry', 'die Frau|the woman, Mrs', 'der Herr|Mr, gentleman', 'Freut mich!|nice to meet you'],
        grammar: [
          { t: 'sein and heißen', h: '<table><tr><th></th><th>sein</th><th>heißen</th></tr><tr><td>ich</td><td>bin</td><td>heiße</td></tr><tr><td>du</td><td>bist</td><td>heißt</td></tr><tr><td>er / sie / es</td><td>ist</td><td>heißt</td></tr><tr><td>wir</td><td>sind</td><td>heißen</td></tr><tr><td>ihr</td><td>seid</td><td>heißt</td></tr><tr><td>sie / Sie</td><td>sind</td><td>heißen</td></tr></table><p><b>sein</b> is irregular, learn it by heart. <b>heißen</b> is almost regular: the ending changes with the person.</p>' },
          { t: 'du or Sie?', h: '<p><b>du</b>: friends, family, children, fellow students, most young colleagues in startups.</p><p><b>Sie</b> (always capital S): strangers, officials, clients, your manager unless they offer du. It uses the same verb form as <i>sie</i> (they): <i>Wie heißen Sie?</i></p><p>Rule for the exam: when in doubt, use Sie.</p>' },
          { t: 'W-questions: the verb is in position 2', h: '<p><b>Wie</b> heißt du? <b>Wer</b> ist das? <b>Wie</b> geht es Ihnen?</p><p>Question word first, verb second, subject third. This "verb in position 2" rule is the backbone of German word order.</p>' }
        ],
        ex: [
          ['mc', 'You meet your manager at 9 am. You say:', ['Guten Morgen, Frau Weber!', 'Hallo Anna, wie geht\'s?', 'Gute Nacht, Frau Weber!'], 0],
          ['mc', 'Ich ___ Prashant.', ['heiße', 'heißt', 'heißen'], 0],
          ['mc', 'Wie ___ du?', ['heißt', 'heiße', 'heißen'], 0],
          ['mc', 'Wer ___ das? Das ist Nico.', ['ist', 'bist', 'bin'], 0],
          ['mc', '___ Sie Herr Müller?', ['Sind', 'Bist', 'Ist'], 0],
          ['mc', 'Which one is formal?', ['Wie geht es Ihnen?', 'Wie geht\'s?', 'Na, alles gut?'], 0],
          ['type', 'du ___ (sein)', 'bist'],
          ['type', 'wir ___ (sein)', 'sind'],
          ['type', 'ihr ___ (sein)', 'seid'],
          ['type', 'In German: good evening', 'Guten Abend'],
          ['order', 'What is your name? (formal)', 'Wie heißen Sie?'],
          ['order', 'My name is Prashant.', 'Mein Name ist Prashant.'],
          ['order', 'How are you? Very good, thanks.', 'Wie geht es dir? Sehr gut, danke.'],
          ['listen', 'Guten Tag, ich heiße Anna.'],
          ['listen', 'Wie heißen Sie?'],
          ['speak', 'Hallo, ich bin Prashant. Und wer bist du?']
        ],
        write: { task: 'Write to a new colleague on the team chat. Greet them, say your name and where you work in the team, ask their name. (about 20 words)', model: 'Hallo! Ich heiße Prashant. Ich bin neu im Team. Und wer bist du? Wie geht es dir? Viele Grüße, Prashant', check: ['Greeting at the start', 'ich heiße or ich bin + your name', 'At least one question with the verb in position 2', 'A closing (Viele Grüße)'] },
        speakPrompts: ['Name?', 'Wie geht es Ihnen?', 'Say goodbye formally and informally']
      },
      {
        id: 'a1-02', title: 'Woher kommst du?', theme: 'Countries, languages, numbers 0 to 100',
        goals: ['Say where you come from and where you live', 'Talk about the languages you speak', 'Count to 100, say your age and phone number'],
        video: { id: '-qAuGimugds', label: 'Nicos Weg, Folge 4: Von A bis Z (DW)' },
        extra: [['Nicos Weg Folge 7 "Woher kommst du?" and 9 "Zahlen von 1 bis 100"', 'https://www.youtube.com/playlist?list=' + NICO]],
        search: 'German numbers 1 100 A1 lesson',
        vocab: ['kommen|to come', 'wohnen|to live (reside)', 'aus|from', 'in|in', 'woher|where from', 'wo|where', 'das Land|the country', 'die Stadt|the city', 'Deutschland|Germany', 'Indien|India', 'die Sprache|the language', 'sprechen|to speak', 'Englisch|English', 'Deutsch|German', 'lernen|to learn', 'alt|old', 'das Jahr|the year', 'zwölf|twelve', 'zwanzig|twenty', 'dreißig|thirty', 'hundert|a hundred', 'ein bisschen|a little'],
        grammar: [
          { t: 'Regular verbs in the present', h: '<table><tr><th></th><th>wohnen</th><th>sprechen (e → i)</th></tr><tr><td>ich</td><td>wohne</td><td>spreche</td></tr><tr><td>du</td><td>wohnst</td><td>sprichst</td></tr><tr><td>er / sie / es</td><td>wohnt</td><td>spricht</td></tr><tr><td>wir</td><td>wohnen</td><td>sprechen</td></tr><tr><td>ihr</td><td>wohnt</td><td>sprecht</td></tr><tr><td>sie / Sie</td><td>wohnen</td><td>sprechen</td></tr></table><p>Endings: -e, -st, -t, -en, -t, -en. Some verbs change their vowel in du and er/sie/es only.</p>' },
          { t: 'Woher? aus... Wo? in...', h: '<p><b>Woher</b> kommst du? Ich komme <b>aus</b> Indien.</p><p><b>Wo</b> wohnst du? Ich wohne <b>in</b> Mumbai.</p><p>A few countries take an article: aus der Schweiz, aus der Türkei, aus den USA.</p>' },
          { t: 'Numbers: units before tens', h: '<p>21 = <b>einundzwanzig</b> (one-and-twenty). 47 = siebenundvierzig. 99 = neunundneunzig.</p><p>Watch out: 16 sechzehn, 17 siebzehn, 30 dreißig (no z), 60 sechzig, 70 siebzig.</p><p>Phone numbers are usually read digit by digit or in pairs: 0 17 22 = null, siebzehn, zweiundzwanzig. <i>zwo</i> is often said instead of zwei on the phone.</p>' }
        ],
        ex: [
          ['mc', 'Ich komme ___ Indien.', ['aus', 'in', 'nach'], 0],
          ['mc', 'Ich wohne ___ Pune.', ['in', 'aus', 'von'], 0],
          ['mc', 'Er ___ Deutsch und Englisch.', ['spricht', 'sprecht', 'sprichst'], 0],
          ['mc', 'Woher ___ ihr?', ['kommt', 'kommst', 'kommen'], 0],
          ['mc', '76 is:', ['sechsundsiebzig', 'siebenundsechzig', 'sechzigsieben'], 0],
          ['type', '21 in words', 'einundzwanzig'],
          ['type', '47 in words', 'siebenundvierzig'],
          ['type', '30 in words', 'dreißig'],
          ['type', 'du ___ (wohnen)', 'wohnst'],
          ['type', 'du ___ (sprechen)', 'sprichst'],
          ['order', 'Where do you come from?', 'Woher kommst du?'],
          ['order', 'I live in Pune and I am learning German.', 'Ich wohne in Pune und lerne Deutsch.'],
          ['order', 'I am 30 years old.', 'Ich bin 30 Jahre alt.'],
          ['listen', 'Ich komme aus Indien.'],
          ['listen', 'Er ist dreiunddreißig Jahre alt.'],
          ['listen', 'Sprechen Sie Englisch?'],
          ['speak', 'Ich komme aus Indien und wohne in Mumbai.']
        ],
        write: { task: 'Write a short profile for a language exchange app: name, age, country, city, languages. (about 30 words)', model: 'Hallo, ich heiße Prashant. Ich bin 30 Jahre alt. Ich komme aus Indien und wohne in Mumbai. Ich spreche Hindi, Englisch und ein bisschen Deutsch. Ich lerne Deutsch.', check: ['Name and age (Jahre alt)', 'aus + country, in + city', 'Languages with sprechen', 'Correct verb endings for ich'] },
        speakPrompts: ['Woher kommen Sie?', 'Wo wohnen Sie?', 'Welche Sprachen sprechen Sie?', 'Wie alt sind Sie?']
      },
      {
        id: 'a1-03', title: 'Kontakte und Formulare', theme: 'Addresses, spelling, forms',
        goals: ['Spell your name', 'Give address, phone number and email', 'Fill in a simple form (Goethe A1 Schreiben Teil 1)'],
        video: { list: NICO, label: 'Nicos Weg playlist: Folge 10 "Wichtige Nummern", 11 "Adressen", 12 "Auf dem Amt"' },
        extra: [['Goethe A1 practice materials (official)', COURSE.links.goetheA1]],
        search: 'German alphabet pronunciation Super Easy German',
        vocab: ['die Adresse|the address', 'die Straße|the street', 'die Hausnummer|the house number', 'die Postleitzahl|the postcode', 'die Telefonnummer|the phone number', 'die Handynummer|the mobile number', 'die E-Mail|the email', 'der Vorname|the first name', 'der Nachname|the surname', 'das Formular|the form', 'ausfüllen|to fill in', 'buchstabieren|to spell', 'die Unterschrift|the signature', 'das Geburtsdatum|the date of birth', 'der Geburtsort|the place of birth', 'verheiratet|married', 'ledig|single', 'der Beruf|the profession', 'die Staatsangehörigkeit|the nationality', 'Wie bitte?|pardon?'],
        grammar: [
          { t: 'Yes/no questions: the verb goes first', h: '<p><b>Wohnst</b> du in Berlin? Ja, ich wohne in Berlin. / Nein, ich wohne in Hamburg.</p><p>W-question: verb in position 2. Yes/no question: verb in position 1.</p>' },
          { t: 'Formal "your": Ihr / Ihre', h: '<p>Wie ist <b>Ihr</b> Name? (der Name) Wie ist <b>Ihre</b> Adresse? (die Adresse)</p><p>Masculine and neuter nouns take <b>Ihr</b>, feminine and plural take <b>Ihre</b>.</p>' },
          { t: 'Spelling tricky letters', h: '<p>ä = a-Umlaut, ö = o-Umlaut, ü = u-Umlaut, ß = Eszett (scharfes S). J = jott, V = fau, W = weh, Y = üpsilon, Z = tsett.</p><p>Online, ä ö ü ß can be written ae oe ue ss. This site accepts both.</p>' }
        ],
        ex: [
          ['mc', 'Wie ist ___ Adresse?', ['Ihre', 'Ihr', 'Ihren'], 0],
          ['mc', 'Wie ist ___ Name?', ['Ihr', 'Ihre', 'Ihres'], 0],
          ['mc', 'Which is a yes/no question?', ['Sprechen Sie Deutsch?', 'Wo wohnen Sie?', 'Wie heißen Sie?'], 0],
          ['mc', 'Ledig means:', ['single', 'married', 'divorced'], 0],
          ['type', 'Read: "Maria López kommt aus Spanien und wohnt in Köln, Ringstraße 5, 50667 Köln." What is her Postleitzahl?', '50667'],
          ['type', 'Same text. Nachname?', 'López|Lopez'],
          ['type', 'Same text. Land (Herkunft)?', 'Spanien'],
          ['type', 'Same text. Hausnummer?', '5'],
          ['order', 'Can you spell that, please?', 'Können Sie das bitte buchstabieren?'],
          ['order', 'What is your phone number?', 'Wie ist Ihre Telefonnummer?'],
          ['order', 'Do you live in Berlin?', 'Wohnen Sie in Berlin?'],
          ['listen', 'Meine Adresse ist Bahnhofstraße zwölf.'],
          ['listen', 'Wie ist Ihre Handynummer?'],
          ['speak', 'Mein Name ist Sagar. Ich buchstabiere: S, A, G, A, R.']
        ],
        write: { task: 'Goethe A1 Schreiben Teil 1 style: Your friend Ravi Kumar (born 12.04.1995 in Delhi, lives at Gartenweg 3, 10115 Berlin, married, engineer) wants to join a sports club. Write the 5 missing form fields: Nachname, Geburtsort, Postleitzahl, Familienstand, Beruf.', model: 'Nachname: Kumar | Geburtsort: Delhi | Postleitzahl: 10115 | Familienstand: verheiratet | Beruf: Ingenieur', check: ['Only the word or number, no full sentences', 'Postleitzahl has 5 digits', 'Familienstand uses verheiratet / ledig / geschieden'] },
        speakPrompts: ['Buchstabieren Sie Ihren Namen.', 'Wie ist Ihre Telefonnummer?', 'Haben Sie eine E-Mail-Adresse?']
      },
      {
        id: 'a1-04', title: 'Meine Familie', theme: 'Family and people',
        goals: ['Talk about your family', 'Use haben', 'Use mein / dein / sein / ihr'],
        video: { list: NICO, label: 'Nicos Weg playlist: family episodes in Einheit 3 (from about Folge 20)' },
        extra: [['DW Nicos Weg course with grammar', COURSE.links.dw]],
        search: 'German family vocabulary possessive articles A1',
        vocab: ['die Familie|the family', 'die Mutter|the mother', 'der Vater|the father', 'die Eltern|the parents', 'der Bruder|the brother', 'die Schwester|the sister', 'die Geschwister|the siblings', 'der Sohn|the son', 'die Tochter|the daughter', 'das Kind|the child', 'die Kinder|the children', 'der Mann|the man, husband', 'die Großmutter|the grandmother', 'der Großvater|the grandfather', 'der Freund|the friend (male), boyfriend', 'die Freundin|the friend (female), girlfriend', 'haben|to have', 'geschieden|divorced', 'der Onkel|the uncle', 'die Tante|the aunt', 'die Hochzeit|the wedding'],
        grammar: [
          { t: 'haben', h: '<table><tr><td>ich</td><td>habe</td></tr><tr><td>du</td><td>hast</td></tr><tr><td>er / sie / es</td><td>hat</td></tr><tr><td>wir</td><td>haben</td></tr><tr><td>ihr</td><td>habt</td></tr><tr><td>sie / Sie</td><td>haben</td></tr></table>' },
          { t: 'Possessive articles', h: '<table><tr><th></th><th>der / das</th><th>die / plural</th></tr><tr><td>ich</td><td>mein Vater</td><td>meine Mutter</td></tr><tr><td>du</td><td>dein Bruder</td><td>deine Schwester</td></tr><tr><td>er</td><td>sein Sohn</td><td>seine Tochter</td></tr><tr><td>sie</td><td>ihr Mann</td><td>ihre Kinder</td></tr><tr><td>Sie</td><td>Ihr Kind</td><td>Ihre Eltern</td></tr></table><p>Same logic as ein / eine: add -e for feminine and plural.</p>' },
          { t: 'Plural: no single rule', h: '<p>Always learn nouns with article and plural: das Kind, die Kinder. der Bruder, die Brüder. die Schwester, die Schwestern. In plural the article is always <b>die</b>.</p>' }
        ],
        ex: [
          ['mc', 'Ich ___ zwei Brüder.', ['habe', 'hast', 'hat'], 0],
          ['mc', 'Er ___ keine Kinder.', ['hat', 'habt', 'haben'], 0],
          ['mc', 'Das ist ___ Mutter. (ich)', ['meine', 'mein', 'meinen'], 0],
          ['mc', 'Wie heißt ___ Vater? (du)', ['dein', 'deine', 'deiner'], 0],
          ['mc', 'Anna und ___ Mann wohnen in Köln.', ['ihr', 'sein', 'seine'], 0],
          ['mc', 'Plural of das Kind:', ['die Kinder', 'die Kinds', 'die Kinden'], 0],
          ['type', 'ihr ___ (haben)', 'habt'],
          ['type', 'In German: the parents', 'die Eltern'],
          ['type', 'Das ist ___ Schwester. (er)', 'seine'],
          ['order', 'I have one sister and no brother.', 'Ich habe eine Schwester und keinen Bruder.'],
          ['order', 'My parents live in Delhi.', 'Meine Eltern wohnen in Delhi.'],
          ['order', 'Are you married?', 'Sind Sie verheiratet?'],
          ['listen', 'Meine Schwester ist Lehrerin.'],
          ['listen', 'Hast du Geschwister?'],
          ['speak', 'Das ist meine Familie. Mein Vater heißt Raj.']
        ],
        write: { task: 'Describe a family photo for a German friend: who is in it, names, ages, where they live. (about 30 words)', model: 'Das ist meine Familie. Links ist mein Vater, er heißt Raj und ist 60 Jahre alt. Neben ihm ist meine Mutter. Meine Schwester wohnt in Pune. Sie hat zwei Kinder.', check: ['mein / meine correct for each person', 'haben used at least once', 'At least one plural noun'] },
        speakPrompts: ['Haben Sie Geschwister?', 'Wo wohnen Ihre Eltern?', 'Sind Sie verheiratet?']
      },
      {
        id: 'a1-05', title: 'Essen und Trinken', theme: 'Food, ordering, prices',
        goals: ['Order food and drinks in a café', 'Ask for prices and pay', 'Use the accusative with ein / kein'],
        video: { list: NICO, label: 'Nicos Weg playlist: Folge 14 "Was trinkst du?", 15 "Zwei Tee, bitte", 16 "Zahlen, bitte"' },
        extra: [['Easy German: episodes for absolute beginners', COURSE.links.easyGerman]],
        search: 'German accusative case A1 explained',
        vocab: ['das Wasser|the water', 'der Kaffee|the coffee', 'der Tee|the tea', 'die Milch|the milk', 'das Brot|the bread', 'das Brötchen|the bread roll', 'der Käse|the cheese', 'das Ei|the egg', 'der Apfel|the apple', 'das Obst|fruit', 'das Gemüse|vegetables', 'der Reis|the rice', 'das Fleisch|meat', 'essen|to eat', 'trinken|to drink', 'möchten|would like', 'kosten|to cost', 'der Euro|the euro', 'die Rechnung|the bill', 'zusammen|together', 'getrennt|separately', 'das Frühstück|breakfast'],
        grammar: [
          { t: 'Accusative: only masculine changes', h: '<table><tr><th></th><th>Nominativ</th><th>Akkusativ</th></tr><tr><td>der</td><td>ein Kaffee</td><td><b>einen</b> Kaffee</td></tr><tr><td>das</td><td>ein Wasser</td><td>ein Wasser</td></tr><tr><td>die</td><td>eine Suppe</td><td>eine Suppe</td></tr><tr><td>plural</td><td>Brötchen</td><td>Brötchen</td></tr></table><p>The thing you order, eat, have, buy is in the accusative: Ich möchte <b>einen</b> Tee.</p>' },
          { t: 'kein = not a / no', h: '<p>kein works like ein: Ich trinke <b>keinen</b> Kaffee. Ich esse <b>kein</b> Fleisch. Ich habe <b>keine</b> Zeit.</p>' },
          { t: 'möchten and essen', h: '<table><tr><th></th><th>möchten</th><th>essen</th></tr><tr><td>ich</td><td>möchte</td><td>esse</td></tr><tr><td>du</td><td>möchtest</td><td>isst</td></tr><tr><td>er / sie</td><td>möchte</td><td>isst</td></tr><tr><td>wir</td><td>möchten</td><td>essen</td></tr><tr><td>ihr</td><td>möchtet</td><td>esst</td></tr><tr><td>sie / Sie</td><td>möchten</td><td>essen</td></tr></table><p>Prices: 3,50 € = drei Euro fünfzig.</p>' }
        ],
        ex: [
          ['mc', 'Ich möchte ___ Kaffee, bitte.', ['einen', 'ein', 'eine'], 0],
          ['mc', 'Ich trinke ___ Wasser.', ['ein', 'einen', 'eine'], 0],
          ['mc', 'Ich esse ___ Fleisch. Ich bin Vegetarier.', ['kein', 'keinen', 'nicht'], 0],
          ['mc', 'Was ___ du? Eine Pizza?', ['isst', 'esst', 'esse'], 0],
          ['mc', 'Zusammen oder getrennt? This question is about:', ['paying', 'sitting', 'ordering food'], 0],
          ['mc', '4,20 € is said:', ['vier Euro zwanzig', 'vierzig Euro zwei', 'vier Komma zwei Euro'], 0],
          ['type', 'Ich habe ___ Hunger. (no)', 'keinen'],
          ['type', 'er ___ (möchten)', 'möchte'],
          ['type', 'In German: the bill', 'die Rechnung'],
          ['order', 'I would like a tea with milk, please.', 'Ich möchte einen Tee mit Milch, bitte.'],
          ['order', 'How much does the coffee cost?', 'Was kostet der Kaffee?'],
          ['order', 'The bill, please.', 'Die Rechnung, bitte.'],
          ['listen', 'Das macht zusammen acht Euro fünfzig.'],
          ['listen', 'Ich nehme ein Brötchen mit Käse.'],
          ['speak', 'Ich möchte bitte einen Kaffee und ein Wasser.']
        ],
        write: { task: 'You invite a colleague for breakfast on Sunday. Write a message: invite, say what there is to eat and drink, ask what they like. (about 30 words)', model: 'Hallo Lena, möchtest du am Sonntag zum Frühstück kommen? Es gibt Brötchen, Käse, Eier und Obst. Trinkst du Kaffee oder Tee? Viele Grüße, Prashant', check: ['möchtest du + infinitive at the end', 'At least three food words with correct article', 'A question to the reader'] },
        speakPrompts: ['Was essen Sie gern?', 'Was trinken Sie zum Frühstück?', 'Order a drink and ask the price.']
      },
      {
        id: 'a1-06', title: 'Wohnen', theme: 'Home, rooms, furniture',
        goals: ['Describe your flat and rooms', 'Use der / die / das and er / sie / es', 'Say what there is and is not'],
        video: { list: NICO, label: 'Nicos Weg playlist: episodes on Wohnung and Möbel (Einheit 5 and 6)' },
        extra: [['DW Nicos Weg course', COURSE.links.dw]],
        search: 'German rooms furniture vocabulary Super Easy German apartment',
        vocab: ['die Wohnung|the flat', 'das Haus|the house', 'das Zimmer|the room', 'die Küche|the kitchen', 'das Bad|the bathroom', 'das Schlafzimmer|the bedroom', 'das Wohnzimmer|the living room', 'der Balkon|the balcony', 'der Tisch|the table', 'der Stuhl|the chair', 'das Bett|the bed', 'der Schrank|the cupboard', 'die Lampe|the lamp', 'das Sofa|the sofa', 'groß|big', 'klein|small', 'hell|bright', 'dunkel|dark', 'teuer|expensive', 'billig|cheap', 'schön|beautiful', 'die Miete|the rent'],
        grammar: [
          { t: 'Articles and pronouns match', h: '<p>Der Tisch ist neu. → <b>Er</b> ist neu. Die Lampe ist schön. → <b>Sie</b> ist schön. Das Bett ist groß. → <b>Es</b> ist groß. Die Stühle sind alt. → <b>Sie</b> sind alt.</p><p>Tip: learn genders with colours. Many learners write der words in blue, die in red, das in green. This site does the same.</p>' },
          { t: 'Adjectives after sein have no ending', h: '<p>Die Wohnung ist <b>groß</b>. Das Zimmer ist <b>hell</b>. Endings only appear before a noun (A2 topic).</p>' },
          { t: 'Es gibt + accusative', h: '<p><b>Es gibt</b> einen Balkon. Es gibt keinen Aufzug. Es gibt kein Bad? Doch!</p>' }
        ],
        ex: [
          ['mc', 'Der Schrank ist alt. ___ ist aber schön.', ['Er', 'Sie', 'Es'], 0],
          ['mc', 'Das Zimmer ist klein. ___ ist aber hell.', ['Es', 'Er', 'Sie'], 0],
          ['mc', 'In der Wohnung gibt es ___ Balkon.', ['einen', 'ein', 'eine'], 0],
          ['mc', 'Opposite of teuer:', ['billig', 'dunkel', 'klein'], 0],
          ['mc', 'Article of Küche:', ['die', 'der', 'das'], 0],
          ['type', 'Article: ___ Bett', 'das'],
          ['type', 'Article: ___ Stuhl', 'der'],
          ['type', 'Opposite of hell', 'dunkel'],
          ['order', 'The flat has three rooms.', 'Die Wohnung hat drei Zimmer.'],
          ['order', 'The kitchen is small but bright.', 'Die Küche ist klein, aber hell.'],
          ['order', 'How much is the rent?', 'Wie hoch ist die Miete?'],
          ['listen', 'Das Wohnzimmer ist groß und hell.'],
          ['listen', 'Es gibt leider keinen Balkon.'],
          ['speak', 'Meine Wohnung hat zwei Zimmer, eine Küche und ein Bad.']
        ],
        write: { task: 'Write to a friend about your new flat: rooms, what you like, one thing that is not so good. (about 30 words)', model: 'Liebe Anna, ich habe eine neue Wohnung! Sie hat zwei Zimmer, eine Küche und einen Balkon. Das Wohnzimmer ist groß und hell. Aber die Miete ist teuer. Liebe Grüße', check: ['Pronoun matches the noun (sie for Wohnung)', 'Accusative einen for masculine nouns after hat / es gibt', 'aber used once'] },
        speakPrompts: ['Wie ist Ihre Wohnung?', 'Wie viele Zimmer hat Ihre Wohnung?', 'Was gibt es in Ihrem Zimmer?']
      },
      {
        id: 'a1-07', title: 'Mein Tag', theme: 'Time, daily routine, weekdays',
        goals: ['Tell the time formally and informally', 'Describe your daily routine', 'Use separable verbs'],
        video: { list: NICO, label: 'Nicos Weg playlist: Uhrzeit and Tagesablauf episodes (Einheit 7 and 8)' },
        extra: [['Search: telling time in German', 'https://www.youtube.com/results?search_query=telling+time+in+German+A1']],
        search: 'German separable verbs daily routine A1',
        vocab: ['aufstehen|to get up', 'frühstücken|to have breakfast', 'anfangen|to begin', 'arbeiten|to work', 'einkaufen|to shop', 'kochen|to cook', 'fernsehen|to watch TV', 'schlafen|to sleep', 'die Uhr|the clock, o\'clock', 'die Stunde|the hour', 'die Minute|the minute', 'der Morgen|the morning', 'der Mittag|noon', 'der Nachmittag|the afternoon', 'der Abend|the evening', 'der Montag|Monday', 'der Freitag|Friday', 'das Wochenende|the weekend', 'früh|early', 'spät|late', 'halb|half', 'das Viertel|quarter'],
        grammar: [
          { t: 'Time: two systems', h: '<p>Formal (stations, offices): 7:30 = sieben Uhr dreißig. 19:45 = neunzehn Uhr fünfundvierzig.</p><p>Informal: 7:15 = Viertel nach sieben. 7:30 = <b>halb acht</b> (half to eight!). 7:45 = Viertel vor acht.</p><p>Wie spät ist es? Es ist halb neun. Wann? <b>Um</b> 8 Uhr. <b>Am</b> Montag. <b>Am</b> Abend.</p>' },
          { t: 'Separable verbs', h: '<p>auf|stehen: Ich <b>stehe</b> um 7 Uhr <b>auf</b>. ein|kaufen: Er <b>kauft</b> am Samstag <b>ein</b>.</p><p>The prefix goes to the end of the sentence. The verb stays in position 2.</p>' },
          { t: 'Time first? Verb still second', h: '<p>Ich stehe um 7 Uhr auf. → <b>Um 7 Uhr stehe</b> ich auf. The subject moves behind the verb. This inversion is very common and examiners notice it.</p>' }
        ],
        ex: [
          ['mc', '8:30 informal is:', ['halb neun', 'halb acht', 'acht Uhr halb'], 0],
          ['mc', '6:45 informal is:', ['Viertel vor sieben', 'Viertel nach sechs', 'halb sieben'], 0],
          ['mc', 'Ich stehe um sechs Uhr ___.', ['auf', 'an', 'ein'], 0],
          ['mc', 'Correct word order:', ['Am Montag arbeite ich lange.', 'Am Montag ich arbeite lange.', 'Am Montag lange ich arbeite.'], 0],
          ['mc', '___ Wochenende schlafe ich lange.', ['Am', 'Um', 'Im'], 0],
          ['type', 'Wann beginnt der Kurs? ___ 9 Uhr.', 'Um'],
          ['type', 'Der Film fängt um acht Uhr ___.', 'an'],
          ['type', '18:30 formal, in words: achtzehn Uhr ___', 'dreißig'],
          ['order', 'I get up at 7 o\'clock.', 'Ich stehe um 7 Uhr auf.'],
          ['order', 'In the evening I cook and watch TV.', 'Am Abend koche ich und sehe fern.'],
          ['order', 'What time is it?', 'Wie spät ist es?'],
          ['listen', 'Es ist Viertel nach drei.'],
          ['listen', 'Der Zug fährt um zehn Uhr zwanzig ab.'],
          ['speak', 'Um halb acht frühstücke ich und um neun fange ich an zu arbeiten.']
        ],
        write: { task: 'Describe a normal workday: when you get up, work, eat, what you do in the evening. (about 35 words)', model: 'Ich stehe um sieben Uhr auf. Um halb acht frühstücke ich. Ich arbeite von neun bis sechs Uhr. Am Abend koche ich oder ich kaufe ein. Um elf Uhr schlafe ich.', check: ['At least two separable verbs split correctly', 'um + time, am + part of day', 'Inversion after a time phrase at the start'] },
        speakPrompts: ['Wann stehen Sie auf?', 'Was machen Sie am Abend?', 'Was machen Sie am Wochenende?']
      },
      {
        id: 'a1-08', title: 'Freizeit', theme: 'Hobbies, likes, ability',
        goals: ['Talk about hobbies and what you like', 'Say what you can and cannot do', 'Negate with nicht'],
        video: { list: NICO, label: 'Nicos Weg playlist: Freizeit episodes (Einheit 9 and 10)' },
        extra: [['Easy German episodes by level', COURSE.links.easyGerman]],
        search: 'German modal verb können A1 gern nicht gern',
        vocab: ['die Freizeit|free time', 'das Hobby|the hobby', 'lesen|to read', 'schwimmen|to swim', 'spielen|to play', 'Fußball|football', 'Rad fahren|to cycle', 'joggen|to jog', 'tanzen|to dance', 'reisen|to travel', 'fotografieren|to take photos', 'gern|gladly (like doing)', 'lieber|rather, prefer', 'können|can, to be able', 'das Kino|the cinema', 'das Konzert|the concert', 'treffen|to meet', 'der Sport|sport', 'Musik hören|to listen to music', 'fahren|to drive, ride', 'der Strand|the beach'],
        grammar: [
          { t: 'gern, lieber, am liebsten', h: '<p>Ich lese <b>gern</b>. Ich schwimme <b>lieber</b>. Ich reise <b>am liebsten</b>. Ich tanze <b>nicht gern</b>.</p><p>gern sits after the verb. It turns any verb into "like doing".</p>' },
          { t: 'können: the verb bracket', h: '<table><tr><td>ich</td><td>kann</td></tr><tr><td>du</td><td>kannst</td></tr><tr><td>er / sie</td><td>kann</td></tr><tr><td>wir</td><td>können</td></tr><tr><td>ihr</td><td>könnt</td></tr><tr><td>sie / Sie</td><td>können</td></tr></table><p>Ich <b>kann</b> gut <b>schwimmen</b>. Modal in position 2, infinitive at the end. This bracket (Satzklammer) is used everywhere up to C1.</p>' },
          { t: 'Vowel change verbs', h: '<p>lesen: du liest, er liest. fahren: du fährst, er fährt. treffen: du triffst, er trifft. schlafen: du schläfst.</p>' }
        ],
        ex: [
          ['mc', 'Ich ___ gut schwimmen.', ['kann', 'kannst', 'können'], 0],
          ['mc', 'Kannst du Gitarre ___?', ['spielen', 'spielst', 'spielt'], 0],
          ['mc', 'Er ___ gern Bücher.', ['liest', 'lest', 'lesen'], 0],
          ['mc', 'Am Wochenende ___ sie Rad.', ['fährt', 'fahrt', 'fahren'], 0],
          ['mc', 'Negate: Ich tanze gern.', ['Ich tanze nicht gern.', 'Ich tanze kein gern.', 'Ich nicht tanze gern.'], 0],
          ['type', 'wir ___ (können)', 'können'],
          ['type', 'du ___ (treffen)', 'triffst'],
          ['type', 'I prefer to read: Ich lese ___.', 'lieber'],
          ['order', 'I like to travel and take photos.', 'Ich reise gern und fotografiere gern.'],
          ['order', 'Can you come to the cinema on Friday?', 'Kannst du am Freitag ins Kino kommen?'],
          ['order', 'I cannot dance well.', 'Ich kann nicht gut tanzen.'],
          ['listen', 'Was machst du gern in deiner Freizeit?'],
          ['listen', 'Am liebsten spiele ich Fußball.'],
          ['speak', 'In meiner Freizeit lese ich gern und ich kann gut kochen.']
        ],
        write: { task: 'Reply to a message: a friend asks you to play badminton on Saturday. Say you cannot, give a reason, suggest another day. (about 30 words)', model: 'Hallo Tim, danke für die Einladung! Am Samstag kann ich leider nicht, ich muss arbeiten. Kannst du am Sonntag? Ich spiele sehr gern Badminton. Bis bald!', check: ['kann + infinitive at the end', 'leider for polite refusal', 'A new suggestion as a question'] },
        speakPrompts: ['Was ist Ihr Hobby?', 'Was können Sie gut?', 'Was machen Sie nicht gern?']
      },
      {
        id: 'a1-09', title: 'Einkaufen und Kleidung', theme: 'Shopping, clothes, colours',
        goals: ['Buy clothes and ask for size and price', 'Say what you like', 'Use the accusative with der → den'],
        video: { list: NICO, label: 'Nicos Weg playlist: Einkaufen episodes (Einheit 11)' },
        extra: [['Search: German clothes vocabulary', 'https://www.youtube.com/results?search_query=German+clothes+vocabulary+A1']],
        search: 'German shopping clothes dialogue A1',
        vocab: ['die Kleidung|clothing', 'die Hose|the trousers', 'das Hemd|the shirt', 'die Jacke|the jacket', 'der Rock|the skirt', 'das Kleid|the dress', 'der Pullover|the sweater', 'die Schuhe|the shoes', 'das T-Shirt|the T-shirt', 'die Größe|the size', 'die Farbe|the colour', 'rot|red', 'blau|blue', 'grün|green', 'schwarz|black', 'weiß|white', 'anprobieren|to try on', 'gefallen|to please (like)', 'passen|to fit', 'bezahlen|to pay', 'bar|in cash', 'die Kasse|the till'],
        grammar: [
          { t: 'Accusative definite article', h: '<p>der → <b>den</b>: Ich nehme <b>den</b> Pullover. die, das and plural do not change: Ich nehme die Jacke, das Hemd, die Schuhe.</p><p>Pronouns: den Pullover → <b>ihn</b>. die Jacke → sie. das Hemd → es. Ich nehme <b>ihn</b>.</p>' },
          { t: 'gefallen and passen (fixed patterns)', h: '<p>Die Jacke <b>gefällt mir</b>. Wie gefällt <b>Ihnen</b> das Kleid? Die Hose <b>passt</b> nicht. The thing is the subject, the person is in the dative (mir, dir, Ihnen). Learn these as phrases for now.</p>' },
          { t: 'welcher / dieser', h: '<p><b>Welche</b> Größe haben Sie? <b>Welcher</b> Pullover? <b>Welches</b> Hemd? Endings follow der / die / das.</p>' }
        ],
        ex: [
          ['mc', 'Ich nehme ___ Pullover.', ['den', 'der', 'dem'], 0],
          ['mc', 'Ich kaufe ___ Jacke.', ['die', 'den', 'der'], 0],
          ['mc', 'Der Rock ist schön. Ich nehme ___.', ['ihn', 'er', 'es'], 0],
          ['mc', 'Die Schuhe ___ mir nicht.', ['gefallen', 'gefällt', 'gefällst'], 0],
          ['mc', '___ Größe haben Sie?', ['Welche', 'Welcher', 'Welches'], 0],
          ['type', 'Kann ich das Hemd ___? (try on)', 'anprobieren'],
          ['type', 'Zahlen Sie ___ oder mit Karte?', 'bar'],
          ['type', 'The colour of snow', 'weiß|weiss'],
          ['order', 'Do you have this jacket in size M?', 'Haben Sie die Jacke in Größe M?'],
          ['order', 'The trousers do not fit.', 'Die Hose passt nicht.'],
          ['order', 'How much do the shoes cost?', 'Was kosten die Schuhe?'],
          ['listen', 'Wie gefällt Ihnen das Kleid?'],
          ['listen', 'Ich nehme den blauen Pullover.'],
          ['speak', 'Entschuldigung, wo ist die Kasse? Ich möchte bar bezahlen.']
        ],
        write: { task: 'You bought a jacket online but it does not fit. Write to the shop: what you bought, the problem, what you want. (about 30 words)', model: 'Sehr geehrte Damen und Herren, ich habe eine Jacke in Größe L gekauft. Leider passt die Jacke nicht, sie ist zu groß. Kann ich sie in Größe M bekommen? Mit freundlichen Grüßen, Prashant Sagar', check: ['Formal opening and closing', 'passt nicht / zu groß / zu klein', 'A clear request as a question'] },
        speakPrompts: ['Was tragen Sie gern?', 'Welche Farbe mögen Sie?', 'Ask a shop assistant for a smaller size.']
      },
      {
        id: 'a1-10', title: 'In der Stadt', theme: 'Places, transport, directions',
        goals: ['Ask for and give directions', 'Talk about transport (mit dem Bus)', 'Understand announcements (Goethe A1 Hören Teil 2)'],
        video: { list: NICO, label: 'Nicos Weg playlist: Stadt and Verkehr episodes (Einheit 12 and 13)' },
        extra: [['Search: asking for directions in German', 'https://www.youtube.com/results?search_query=asking+for+directions+German+A1']],
        search: 'German dative prepositions mit zu in A1',
        vocab: ['der Bahnhof|the station', 'die Haltestelle|the stop', 'der Bus|the bus', 'die U-Bahn|the metro', 'der Zug|the train', 'das Auto|the car', 'das Fahrrad|the bicycle', 'zu Fuß|on foot', 'die Bank|the bank', 'die Post|the post office', 'die Apotheke|the pharmacy', 'der Supermarkt|the supermarket', 'das Krankenhaus|the hospital', 'der Flughafen|the airport', 'links|left', 'rechts|right', 'geradeaus|straight ahead', 'die Ampel|the traffic light', 'nehmen|to take', 'die Fahrkarte|the ticket', 'das Gleis|the platform', 'umsteigen|to change (trains)'],
        grammar: [
          { t: 'Dative after mit', h: '<p>der → <b>dem</b>, das → <b>dem</b>, die → <b>der</b>, plural → den (+n).</p><p>Ich fahre <b>mit dem</b> Bus / <b>mit dem</b> Auto / <b>mit der</b> U-Bahn. Exception: <b>zu Fuß</b>.</p>' },
          { t: 'Wo? in + dative. Wohin? zu + dative', h: '<p>Wo bist du? <b>Im</b> Supermarkt (in dem). <b>In der</b> Bank.</p><p>Wohin gehst du? <b>Zum</b> Bahnhof (zu dem). <b>Zur</b> Post (zu der).</p>' },
          { t: 'Imperative with Sie', h: '<p><b>Gehen Sie</b> geradeaus. <b>Nehmen Sie</b> die zweite Straße links. <b>Steigen Sie</b> am Hauptbahnhof um. Verb first, then Sie.</p>' }
        ],
        ex: [
          ['mc', 'Ich fahre mit ___ U-Bahn.', ['der', 'dem', 'die'], 0],
          ['mc', 'Er fährt mit ___ Fahrrad.', ['dem', 'der', 'das'], 0],
          ['mc', 'Wie komme ich ___ Bahnhof?', ['zum', 'zur', 'zu der'], 0],
          ['mc', 'Ich gehe ___ Apotheke.', ['zur', 'zum', 'zu dem'], 0],
          ['mc', 'Der Zug nach München fährt heute von Gleis 7. What changed?', ['the platform', 'the time', 'the price'], 0],
          ['type', 'Ich bin ___ Supermarkt. (in + dem)', 'im'],
          ['type', 'Opposite of links', 'rechts'],
          ['type', 'Ich gehe zu ___. (on foot)', 'Fuß'],
          ['order', 'Excuse me, where is the station?', 'Entschuldigung, wo ist der Bahnhof?'],
          ['order', 'Go straight ahead and then turn left.', 'Gehen Sie geradeaus und dann links.'],
          ['order', 'I go to work by bus.', 'Ich fahre mit dem Bus zur Arbeit.'],
          ['listen', 'Der Zug nach Berlin hat zehn Minuten Verspätung.'],
          ['listen', 'Nehmen Sie die zweite Straße rechts.'],
          ['speak', 'Entschuldigung, wie komme ich zum Flughafen?']
        ],
        write: { task: 'A friend visits you. Write how to get from the station to your flat: transport, stop, directions. (about 30 words)', model: 'Hallo Max, nimm am Bahnhof die U-Bahn Linie 2. Fahr bis zur Haltestelle Rathaus. Dann geh geradeaus und die erste Straße rechts. Ich wohne in Hausnummer 8. Bis Samstag!', check: ['mit dem / mit der correct', 'zum / zur correct', 'Directions: geradeaus, links, rechts'] },
        speakPrompts: ['Wie fahren Sie zur Arbeit?', 'Ask the way to a pharmacy.', 'Was gibt es in Ihrer Stadt?']
      },
      {
        id: 'a1-11', title: 'Arbeit und Termine', theme: 'Jobs, dates, appointments',
        goals: ['Talk about your job', 'Say dates (am ersten Mai)', 'Make, move and cancel appointments with müssen / wollen'],
        video: { list: NICO, label: 'Nicos Weg playlist: Arbeit and Termine episodes (Einheit 14 and 15)' },
        extra: [['Search: German dates and months', 'https://www.youtube.com/results?search_query=German+dates+ordinal+numbers+A1']],
        search: 'German modal verbs müssen wollen A1',
        vocab: ['die Arbeit|work', 'der Kollege|the colleague (m)', 'die Kollegin|the colleague (f)', 'das Büro|the office', 'die Firma|the company', 'der Chef|the boss', 'der Termin|the appointment', 'die Besprechung|the meeting', 'der Ingenieur|the engineer', 'der Berater|the consultant', 'der Arzt|the doctor', 'der Lehrer|the teacher', 'müssen|must, have to', 'wollen|to want', 'der Monat|the month', 'das Datum|the date', 'heute|today', 'morgen|tomorrow', 'gestern|yesterday', 'die Woche|the week', 'Zeit haben|to have time', 'absagen|to cancel'],
        grammar: [
          { t: 'Jobs: female form with -in', h: '<p>der Berater → die Berater<b>in</b>. der Lehrer → die Lehrer<b>in</b>. der Arzt → die Ärzt<b>in</b>. No article for professions: Ich bin Berater.</p>' },
          { t: 'müssen and wollen', h: '<table><tr><th></th><th>müssen</th><th>wollen</th></tr><tr><td>ich</td><td>muss</td><td>will</td></tr><tr><td>du</td><td>musst</td><td>willst</td></tr><tr><td>er / sie</td><td>muss</td><td>will</td></tr><tr><td>wir</td><td>müssen</td><td>wollen</td></tr><tr><td>ihr</td><td>müsst</td><td>wollt</td></tr><tr><td>sie / Sie</td><td>müssen</td><td>wollen</td></tr></table><p>Note: ich will means "I want", not "I will".</p>' },
          { t: 'Dates', h: '<p>Der Wievielte ist heute? Heute ist der <b>dritte</b> Oktober. Wann? <b>Am dritten</b> Oktober.</p><p>1. erste, 2. zweite, 3. dritte, 7. siebte, 20. zwanzigste. Up to 19 add -te, from 20 add -ste.</p>' }
        ],
        ex: [
          ['mc', 'Ich ___ heute lange arbeiten.', ['muss', 'musst', 'müssen'], 0],
          ['mc', '___ du am Freitag ins Kino gehen?', ['Willst', 'Will', 'Wollt'], 0],
          ['mc', 'She is a consultant:', ['Sie ist Beraterin.', 'Sie ist eine Berater.', 'Sie ist Berater.'], 0],
          ['mc', 'Mein Geburtstag ist ___ zwölften April.', ['am', 'um', 'im'], 0],
          ['mc', 'Ich muss den Termin leider ___.', ['absagen', 'absage', 'abgesagt'], 0],
          ['type', 'Heute ist der ___ Mai. (1.)', 'erste'],
          ['type', 'wir ___ (müssen)', 'müssen|muessen'],
          ['type', 'In German: the meeting', 'die Besprechung'],
          ['order', 'I work as a consultant in Mumbai.', 'Ich arbeite als Berater in Mumbai.'],
          ['order', 'Do you have time on Tuesday?', 'Haben Sie am Dienstag Zeit?'],
          ['order', 'I have to move the appointment.', 'Ich muss den Termin verschieben.'],
          ['listen', 'Ich möchte einen Termin machen.'],
          ['listen', 'Geht es am vierzehnten Juni um zehn Uhr?'],
          ['speak', 'Ich bin Berater und arbeite für eine Firma in Mumbai.']
        ],
        write: { task: 'Write to a doctor\'s practice: you cannot come to your appointment on Monday. Apologise, give a reason, ask for a new appointment. (about 30 words)', model: 'Sehr geehrte Damen und Herren, ich habe am Montag um 10 Uhr einen Termin. Leider kann ich nicht kommen, ich muss arbeiten. Haben Sie am Mittwoch oder Donnerstag Zeit? Mit freundlichen Grüßen, Prashant Sagar', check: ['Formal opening and closing', 'Date or time with am / um', 'Reason with müssen', 'Request for a new appointment'] },
        speakPrompts: ['Was sind Sie von Beruf?', 'Wann haben Sie Geburtstag?', 'Make an appointment for next week.']
      },
      {
        id: 'a1-12', title: 'Gesundheit und gestern', theme: 'Body, health, first past tense',
        goals: ['Say what hurts and understand simple advice', 'Use the imperative', 'Talk about yesterday with war, hatte and the Perfekt'],
        video: { list: NICO, label: 'Nicos Weg playlist: Folge 17 "Ich war schon in Berlin" and health episodes' },
        extra: [['Goethe A1 model test PDF (official)', COURSE.links.goetheA1Pdf]],
        search: 'German Perfekt tense A1 explained haben sein',
        vocab: ['der Körper|the body', 'der Kopf|the head', 'der Bauch|the stomach', 'der Rücken|the back', 'der Arm|the arm', 'das Bein|the leg', 'der Hals|the throat, neck', 'das Auge|the eye', 'die Hand|the hand', 'krank|ill', 'gesund|healthy', 'wehtun|to hurt', 'die Schmerzen|the pains', 'die Tablette|the tablet', 'das Rezept|the prescription', 'die Praxis|the (doctor\'s) practice', 'das Fieber|fever', 'die Erkältung|the cold', 'war|was', 'hatte|had', 'gemacht|done, made', 'gegangen|gone'],
        grammar: [
          { t: 'Saying what hurts', h: '<p>Ich habe <b>Kopfschmerzen</b> / Bauchschmerzen / Rückenschmerzen.</p><p>Mir <b>tut</b> der Kopf <b>weh</b>. Mir <b>tun</b> die Beine <b>weh</b> (plural).</p>' },
          { t: 'Imperative', h: '<p>Sie: <b>Nehmen Sie</b> die Tabletten. <b>Trinken Sie</b> viel Wasser.</p><p>du: drop -st and du: du nimmst → <b>Nimm</b>! du trinkst → <b>Trink</b>! du bleibst → <b>Bleib</b> im Bett!</p>' },
          { t: 'Past: war, hatte and the Perfekt', h: '<p>Ich <b>war</b> krank. Ich <b>hatte</b> Fieber. (sein and haben use this simple past.)</p><p>Other verbs: haben / sein + participle at the end. Ich <b>habe</b> Tee <b>getrunken</b>. Ich <b>habe</b> viel <b>geschlafen</b>. Ich <b>bin</b> zum Arzt <b>gegangen</b>.</p><p>sein is used for movement from A to B (gehen, fahren, kommen) and for bleiben.</p>' }
        ],
        ex: [
          ['mc', 'Mir ___ der Kopf weh.', ['tut', 'tun', 'tust'], 0],
          ['mc', 'Mir ___ die Beine weh.', ['tun', 'tut', 'tust'], 0],
          ['mc', 'du nimmst → imperative:', ['Nimm!', 'Nimmst!', 'Nehm!'], 0],
          ['mc', 'Gestern ___ ich krank.', ['war', 'bin', 'hatte'], 0],
          ['mc', 'Ich ___ zum Arzt gegangen.', ['bin', 'habe', 'war'], 0],
          ['mc', 'Wir ___ Fußball gespielt.', ['haben', 'sind', 'waren'], 0],
          ['type', 'Ich ___ Fieber. (had)', 'hatte'],
          ['type', 'Ich habe viel Wasser ___. (trinken)', 'getrunken'],
          ['type', 'Opposite of krank', 'gesund'],
          ['order', 'I have a headache and a fever.', 'Ich habe Kopfschmerzen und Fieber.'],
          ['order', 'Stay in bed and drink tea.', 'Bleib im Bett und trink Tee.'],
          ['order', 'Yesterday I went to the doctor.', 'Gestern bin ich zum Arzt gegangen.'],
          ['listen', 'Nehmen Sie die Tabletten dreimal am Tag.'],
          ['listen', 'Was hast du am Wochenende gemacht?'],
          ['speak', 'Ich war gestern krank und habe den ganzen Tag geschlafen.']
        ],
        write: { task: 'Write to your German teacher: you were ill yesterday and could not come to class. Say what you had and ask for the homework. (about 30 words)', model: 'Liebe Frau Schmidt, gestern war ich leider krank. Ich hatte Fieber und Kopfschmerzen. Deshalb konnte ich nicht zum Kurs kommen. Was sind die Hausaufgaben? Viele Grüße, Prashant', check: ['war / hatte used correctly', 'At least one Perfekt sentence or body word', 'A question about homework'] },
        speakPrompts: ['Was machen Sie, wenn Sie krank sind?', 'Was haben Sie gestern gemacht?', 'Was haben Sie am Wochenende gemacht?']
      }
    ],

    /* Goethe-Zertifikat A1 style mock exam. Audio is generated in the browser from the scripts. */
    exam: {
      pass: 60,
      sections: [
        { name: 'Hören', info: 'You hear each text twice. Choose the right answer.', items: [
          ['listen-mc', 'Frau Keller, hier ist Doktor Brandt, Praxis Brandt. Ihr Termin am Dienstag um neun Uhr geht leider nicht. Können Sie am Mittwoch um halb elf kommen?', 'When is the new appointment?', ['Mittwoch, 10:30', 'Dienstag, 9:00', 'Mittwoch, 9:30'], 0],
          ['listen-mc', 'Achtung, Gleis vier. Der Regionalexpress nach Hamburg fährt heute nicht von Gleis vier, sondern von Gleis sieben.', 'The train to Hamburg leaves from:', ['Gleis 7', 'Gleis 4', 'Gleis 11'], 0],
          ['listen-mc', 'Entschuldigung, was kostet der Pullover? Der Pullover kostet neunundzwanzig Euro neunzig.', 'Price of the sweater:', ['29,90 €', '92,90 €', '19,90 €'], 0],
          ['listen-mc', 'Hallo Tom, hier ist Sara. Wir treffen uns heute nicht im Café, sondern im Park. Bis um vier!', 'Where do they meet?', ['im Park', 'im Café', 'im Kino'], 0],
          ['listen-mc', 'Liebe Kunden, heute sind Äpfel und Bananen im Angebot. Ein Kilo Äpfel nur ein Euro neunundneunzig.', 'What is on offer?', ['fruit', 'bread', 'drinks'], 0],
          ['listen-mc', 'Guten Tag, ich heiße Jan Novak. Ich komme aus Prag und wohne jetzt in Wien. Ich arbeite als Koch.', 'Where does Jan live now?', ['Wien', 'Prag', 'Berlin'], 0]
        ] },
        { name: 'Lesen', info: 'Read the texts. Richtig or falsch?', items: [
          ['read-tf', 'Hallo Priya, ich kann am Samstag leider nicht kommen. Meine Mutter hat Geburtstag. Hast du am Sonntag Zeit? Liebe Grüße, Lena', 'Lena kommt am Samstag.', false],
          ['read-tf', 'Hallo Priya, ich kann am Samstag leider nicht kommen. Meine Mutter hat Geburtstag. Hast du am Sonntag Zeit? Liebe Grüße, Lena', 'Lena möchte Priya am Sonntag treffen.', true],
          ['read-tf', 'Stadtbibliothek. Öffnungszeiten: Montag bis Freitag 10 bis 19 Uhr, Samstag 10 bis 14 Uhr. Sonntag geschlossen.', 'Die Bibliothek ist am Samstagnachmittag um 15 Uhr offen.', false],
          ['read-tf', 'Stadtbibliothek. Öffnungszeiten: Montag bis Freitag 10 bis 19 Uhr, Samstag 10 bis 14 Uhr. Sonntag geschlossen.', 'Am Montag kann man um 18 Uhr Bücher holen.', true],
          ['read-tf', 'Zimmer frei! 20 m², hell, mit Balkon, nur 380 € warm. Nähe Universität. Tel. 0176 554433', 'Das Zimmer hat einen Balkon.', true],
          ['read-tf', 'Zimmer frei! 20 m², hell, mit Balkon, nur 380 € warm. Nähe Universität. Tel. 0176 554433', 'Das Zimmer kostet mehr als 400 Euro.', false],
          ['read-tf', 'Liebe Kursteilnehmer, der Deutschkurs am Donnerstag beginnt nicht um 18 Uhr, sondern um 18:30 Uhr in Raum 12.', 'Der Kurs beginnt am Donnerstag später.', true],
          ['read-tf', 'Liebe Kursteilnehmer, der Deutschkurs am Donnerstag beginnt nicht um 18 Uhr, sondern um 18:30 Uhr in Raum 12.', 'Der Kurs ist in einem anderen Gebäude.', false]
        ] },
        { name: 'Schreiben', info: 'Teil 1: form. Teil 2: short message. Compare with the model and tick the checklist honestly.', items: [
          ['form', 'Your colleague Meera Iyer (born 03.09.1994 in Chennai) wants to register for a German course at the Volkshochschule. She lives at Lindenstraße 14, 80331 München, and is single. She wants to pay by bank transfer. Fill in: 1) Familienname 2) Geburtsort 3) Postleitzahl 4) Familienstand 5) Zahlungsweise (bar / Überweisung)', ['Iyer', 'Chennai', '80331', 'ledig', 'Überweisung|Ueberweisung']],
          ['letter', 'Sie haben einen Deutschkurs gebucht, können aber am ersten Tag nicht kommen. Schreiben Sie an die Kursleiterin, Frau Wolf: Warum können Sie nicht kommen? Was möchten Sie wissen (Hausaufgaben, Buch)? Wann kommen Sie? Schreiben Sie zu jedem Punkt ein bis zwei Sätze (circa 30 Wörter). Vergessen Sie nicht Anrede und Gruß.', 'Liebe Frau Wolf, leider kann ich am Montag nicht zum Kurs kommen. Ich muss für meine Firma nach Delhi fliegen. Welches Buch brauche ich? Gibt es Hausaufgaben? Am Mittwoch bin ich wieder da. Viele Grüße, Prashant Sagar', ['Anrede (Liebe Frau Wolf)', 'Reason given', 'Question about book or homework', 'When you will come', 'Gruß and name', 'About 30 words, verb in position 2 in every sentence']]
        ] },
        { name: 'Sprechen', info: 'Say your answers out loud, ideally record yourself on the phone. Tick what you managed without long pauses.', items: [
          ['speak-check', 'Teil 1: Sich vorstellen', ['Name', 'Alter', 'Land', 'Wohnort', 'Sprachen', 'Beruf', 'Hobby', 'Spell your surname and say a phone number']],
          ['speak-check', 'Teil 2: Theme card "Essen und Trinken". Ask two questions and answer two, e.g. "Frühstück?", "Lieblingsessen?"', ['Was essen Sie zum Frühstück?', 'Was ist Ihr Lieblingsessen?', 'Answered a question in a full sentence', 'Answered a second question in a full sentence']],
          ['speak-check', 'Teil 3: Bitten formulieren. Picture cards: a window, a pen, a coffee, a phone', ['Können Sie bitte das Fenster öffnen?', 'Kann ich bitte deinen Kuli haben?', 'Ich möchte bitte einen Kaffee.', 'Gib mir bitte das Handy.', 'Responded to one request (Ja, gern / Tut mir leid)']]
        ] }
      ]
    }
  };
})();
