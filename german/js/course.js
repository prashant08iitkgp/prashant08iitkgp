/* Course map: level metadata, Goethe exam formats and the roadmap for levels still to be built.
   Each level's full content lives in its own file (a1.js now, a2.js, b1.js ... later). */
window.COURSE = {
  order: ['A1', 'A2', 'B1', 'B2', 'C1'],
  levels: {},
  meta: {
    A1: {
      name: 'A1 Beginner', exam: 'Goethe-Zertifikat A1: Start Deutsch 1', hours: '80 to 150 hours',
      canDo: 'Introduce yourself, ask and answer simple personal questions, handle numbers, prices, times, shopping and very simple forms.',
      format: [['Hören', '~20 min', '3 parts: short dialogues, announcements, phone messages'], ['Lesen', '~25 min', '3 parts: emails, ads, signs'], ['Schreiben', '~20 min', 'Fill in a form, write a short message (about 30 words)'], ['Sprechen', '~15 min', 'Group exam: introduce yourself, ask and answer, make requests']]
    },
    A2: {
      name: 'A2 Elementary', exam: 'Goethe-Zertifikat A2', hours: '+150 hours',
      canDo: 'Talk about your past, your work and daily routine, make plans and appointments, describe things and give simple opinions.',
      format: [['Hören', '~30 min', '4 parts'], ['Lesen', '~30 min', '4 parts'], ['Schreiben', '~30 min', 'Two short messages (SMS, email)'], ['Sprechen', '~15 min', 'Questions, talk about yourself, plan something together']],
      units: ['Perfekt in depth and storytelling', 'Dative and two-way prepositions', 'Comparisons and superlatives', 'Adjective endings 1', 'Subordinate clauses: weil, dass, wenn', 'Reflexive verbs and daily routine', 'Travel, hotels and booking', 'Work life and job ads', 'Health, body and the doctor', 'Media, online shopping and complaints', 'Präteritum of sein, haben and modals', 'Festivals, invitations and making plans']
    },
    B1: {
      name: 'B1 Intermediate', exam: 'Goethe-Zertifikat B1 (modular)', hours: '+250 hours',
      canDo: 'Handle most everyday and work situations, give reasons and opinions, write personal and semi-formal emails, follow clear standard speech.',
      format: [['Lesen', '65 min', '5 parts: blog, articles, ads, opinions, rules'], ['Hören', '40 min', '4 parts: announcements, tours, conversation, radio debate'], ['Schreiben', '60 min', '3 tasks: informal email, forum opinion, formal message'], ['Sprechen', '15 min', 'Plan something together, give a presentation, answer questions']],
      units: ['Präteritum for narration', 'Relative clauses', 'Passive voice', 'Konjunktiv II for wishes and advice', 'zu + infinitive, um...zu, damit', 'Genitive and genitive prepositions', 'Two-part connectors', 'Opinions, arguments and discussions', 'Formal letters and complaints', 'Work, applications and interviews', 'Environment, society and media', 'B1 presentation technique']
    },
    B2: {
      name: 'B2 Upper Intermediate', exam: 'Goethe-Zertifikat B2 (modular)', hours: '+200 hours',
      canDo: 'Argue a position in detail, understand complex texts and native speed conversations on familiar topics, write structured opinion essays.',
      format: [['Lesen', '65 min', '5 parts'], ['Hören', '40 min', '4 parts'], ['Schreiben', '75 min', 'Forum essay + formal message'], ['Sprechen', '15 min', 'Presentation + discussion with partner']],
      units: ['Nominalisation and formal style', 'Konjunktiv I and reported speech', 'Passive alternatives', 'Advanced connectors and cohesion', 'Participles as adjectives', 'Modal particles in speech', 'Economy and business German', 'Science, technology and AI', 'Work culture and negotiations', 'Graphs, data and describing trends', 'Debate and persuasion', 'B2 essay and presentation drills']
    },
    C1: {
      name: 'C1 Advanced', exam: 'Goethe-Zertifikat C1 (modular)', hours: '+250 hours',
      canDo: 'Use German flexibly for professional life, understand long demanding texts and implicit meaning, write clear, detailed, well structured texts.',
      format: [['Lesen', '65 min', '3 parts, long academic and press texts'], ['Hören', '40 min', '2 parts, interviews and lectures'], ['Schreiben', '80 min', 'Argumentative text + formal letter'], ['Sprechen', '15 min', 'Short lecture + discussion']],
      units: ['Advanced nominal style', 'Complex sentence architecture', 'Register: formal, academic, colloquial', 'Idioms and collocations', 'Argumentation and rhetoric', 'Summarising and paraphrasing', 'Consulting and business case German', 'Press, politics and society', 'Lectures and note taking', 'C1 writing: Erörterung', 'C1 speaking: Vortrag', 'Full mock exams']
    }
  },
  links: {
    nicoA1: 'https://www.youtube.com/playlist?list=PLs7zUO7VPyJ5DV1iBRgSw2uDl832n0bLg',
    dw: 'https://learngerman.dw.com/en/overview',
    easyGerman: 'https://www.easygerman.org/',
    goetheA1: 'https://www.goethe.de/ins/mm/en/spr/prf/gzsd1/ueb.html',
    goetheA1Pdf: 'https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_modellsatz.pdf'
  }
};
