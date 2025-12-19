import { SlideType, SlideData } from './types';

// MEDYA YOLLARI DÜZELTİLDİ (Sadece burası değişti)
// public/media klasöründeki dosyalara erişmek için başına /media/ koyuyoruz.
const imgDecision = '/media/reading1.jpg';
const imgArrival = '/media/reading2.jpg';
const imgTraining = '/media/reading3.jpg';
const imgOath = '/media/reading4.jpg';

export const LESSON_TITLE = "UNIT 5: FROM CANDIDATE TO SAILOR";

const TEXT_SCENE_1 = `Last year, Mustafa **decided** to change his life. He **wanted** to join the Navy. First, he **studied** hard for the MSÜ exams. It **was** difficult, but he **passed** the tests. Then, he **exercised** every day for the sports interview. He **passed** the health checks too. He **was** officially a 'Candidate'.`;
const TEXT_SCENE_2 = `After that, he **travelled** to Yalova. He **arrived** at the school gate early in the morning. The sun **was** bright. He **checked** his documents and **entered** the campus with other candidates. He **was** nervous, but he **believed** in himself. The journey **started** here.`;
const TEXT_SCENE_3 = `The 'Adaptation Training' **started**. Mustafa **worked** hard with his friends. They **cleaned** the dorms and **listened** to their commanders. He **learned** discipline. He **walked** for kilometers and **stayed** strong. He **was** not just a candidate anymore; he **was** a 'Recruit'.`;
const TEXT_SCENE_4 = `Finally, the uniforms **arrived**. But there **was** a funny problem! Mustafa's uniform **was** too big (XL), and his friend's uniform **was** too small (S). Nobody **had** the right size! It **was** chaotic. Everyone **swapped** jackets and trousers. They **fixed** the problem together. Then, they **looked** perfect. They **took** the oath and **became** sailors.`;

export const SLIDES: SlideData[] = [
  // 1. Kapak Sayfası: Video yolu düzeltildi (/media/gemiler.mp4)
  { 
    id: 0, 
    type: SlideType.COVER, 
    title: "PHASE 1: THE DECISION", 
    subtitle: "Preparation & Exams", 
    content: { 
      backgroundImage: imgDecision, 
      videoBg: '/media/gemiler.mp4' 
    } 
  },
  { 
    id: 1, 
    type: SlideType.OBJECTIVES, 
    title: "MISSION BRIEFING", 
    subtitle: "LESSON PLAN & TACTICAL TARGETS", 
    content: { 
      videoBg: "https://assets.mixkit.co/videos/preview/mixkit-submarine-underwater-exploring-the-ocean-floor-34440-large.mp4",
      objectives: [
        "Master Past Simple with Regular Verbs (+ed)",
        "Read and understand a military transformation story",
        "Decode past events in chronological order",
        "Formulate 'Wh-' questions for investigation",
        "Practice negative structures using 'didn't'"
      ],
      expectedOutcomes: [
        "Identifying -ed verb patterns in professional texts",
        "Successful completion of the SAT Legend verification",
        "Achieving the rank of Petty Officer (A2 Level)"
      ],
      grammar: [
        "Affirmative: Subject + Verb + ed",
        "Negative: Subject + didn't + Base Verb",
        "Question: Did + Subject + Base Verb?"
      ]
    } 
  },
  { id: 2, type: SlideType.READING, title: "PHASE 1: THE DECISION", subtitle: "Preparation & Exams", content: { 
    backgroundImage: imgDecision, 
    phase: 1, 
    totalPhases: 4, 
    vocabulary: [
      { word: "decide (v.)", definition: "to choose something after thinking about it carefully" }, 
      { word: "study (v.)", definition: "to spend time learning about a subject" }, 
      { word: "pass (v.)", definition: "to succeed in an exam or a test" }, 
      { word: "difficult (adj.)", definition: "not easy; needing a lot of effort" },
      { word: "officially (adv.)", definition: "in an open and formal way" },
      { word: "candidate (n.)", definition: "a person who is trying to get a job or position" }
    ], 
    text: TEXT_SCENE_1 
  } },
  { id: 3, type: SlideType.READING, title: "PHASE 2: THE ARRIVAL", subtitle: "Yalova Naval School", content: { 
    backgroundImage: imgArrival, 
    phase: 2, 
    totalPhases: 4, 
    vocabulary: [
      { word: "arrive (v.)", definition: "to reach a place at the end of a journey" }, 
      { word: "gate (n.)", definition: "a large door used to enter a walled area" }, 
      { word: "nervous (adj.)", definition: "feeling worried or afraid about something" }, 
      { word: "believe (v.)", definition: "to feel sure that something is true" },
      { word: "journey (n.)", definition: "the act of travelling from one place to another" },
      { word: "early (adv.)", definition: "near the beginning of a period of time" }
    ], 
    text: TEXT_SCENE_2 
  } },
  { id: 4, type: SlideType.READING, title: "PHASE 3: TRANSFORMATION", subtitle: "Intibak Training", content: { 
    backgroundImage: imgTraining, 
    phase: 3, 
    totalPhases: 4, 
    vocabulary: [
      { word: "discipline (n.)", definition: "the practice of training people to obey rules" }, 
      { word: "clean (v.)", definition: "to remove dirt or marks from something" }, 
      { word: "commander (n.)", definition: "a person who is in charge of a military group" }, 
      { word: "stay (v.)", definition: "to continue to be in a particular state" },
      { word: "strong (adj.)", definition: "having great physical power or ability" },
      { word: "recruit (n.)", definition: "a person who has just joined the armed forces" }
    ], 
    text: TEXT_SCENE_3 
  } },
  { id: 5, type: SlideType.READING, title: "PHASE 4: THE UNIFORM & OATH", subtitle: "A Funny Memory", content: { 
    backgroundImage: imgOath, 
    phase: 4, 
    totalPhases: 4, 
    vocabulary: [
      { word: "uniform (n.)", definition: "special set of clothes worn by all members of a group" }, 
      { word: "swap (v.)", definition: "to give something to someone and get something else back" }, 
      { word: "fix (v.)", definition: "to repair something or solve a problem" }, 
      { word: "oath (n.)", definition: "a formal and very serious promise" },
      { word: "become (v.)", definition: "to begin to be something" },
      { word: "perfect (adj.)", definition: "completely good; without any mistakes" }
    ], 
    text: TEXT_SCENE_4 
  } },
  { id: 6, type: SlideType.SCRAMBLE, title: "LOGBOOK DATA CORRUPTION", subtitle: "OPERATION: CHRONOS", content: { instruction: "Commander! Mustafa's logbook fell apart. Re-order the segments to restore the timeline.", items: [{ id: 1, parts: ["Mustafa decided", "to join", "the Navy."], correctSentence: "1" }, { id: 2, parts: ["He passed", "the MSÜ exams", "successfully."], correctSentence: "2" }, { id: 3, parts: ["He completed", "the sports", "interview."], correctSentence: "3" }, { id: 4, parts: ["He travelled", "to Yalova", "School."], correctSentence: "4" }, { id: 5, parts: ["He entered", "the campus", "gate."], correctSentence: "5" }, { id: 6, parts: ["He cleaned", "dorms during", "training."], correctSentence: "6" }, { id: 7, parts: ["He swapped", "the wrong", "uniform (XL)."], correctSentence: "7" }, { id: 8, parts: ["Finally,", "he took", "the oath."], correctSentence: "8" }] } },
  { id: 7, type: SlideType.GRAMMAR_ANALYSIS, title: "MISSION ANALYSIS", subtitle: "ACTION PATTERNS (REGULAR)", content: { cards: [{ title: "General Rule", suffixDisplay: "+ed", rule: "For most verbs, simply add -ed to the end.", contextSentence: "Mustafa **wanted** to join the Navy.", examples: [{ base: "want", suffix: "ed" }, { base: "clean", suffix: "ed" }] }, { title: "Ends in 'e'", suffixDisplay: "+d", rule: "If the verb ends in 'e', just add -d.", contextSentence: "He **arrived** at the school gate.", examples: [{ base: "arrive", suffix: "d" }, { base: "decide", suffix: "d" }] }, { title: "Ends in 'y'", suffixDisplay: "-y +ied", rule: "Consonant + y? Change 'y' to 'i' and add -ed.", contextSentence: "He **studied** hard for the exams.", examples: [{ base: "study", suffix: "ied" }, { base: "try", suffix: "ied" }] }, { title: "Double Consonant", suffixDisplay: "Double", rule: "Short verbs (CVC)? Double the last letter.", contextSentence: "He **travelled** to Yalova.", examples: [{ base: "travel", suffix: "led" }, { base: "stop", suffix: "ped" }] }] } },
  { id: 8, type: SlideType.VERB_CHALLENGE, title: "TARGET ACQUISITION", subtitle: "OFFICIAL ACTION LOG", content: { verbs: [{ base: "STUDY", past: "STUDIED", type: "regular" }, { base: "ARRIVE", past: "ARRIVED", type: "regular" }, { base: "CLEAN", past: "CLEANED", type: "regular" }, { base: "LISTEN", past: "LISTENED", type: "regular" }, { base: "WORK", past: "WORKED", type: "regular" }, { base: "SWAP", past: "SWAPPED", type: "regular" }, { base: "FIX", past: "FIXED", type: "regular" }, { base: "LOOK", past: "LOOKED", type: "regular" }, { base: "STAY", past: "STAYED", type: "regular" }, { base: "START", past: "STARTED", type: "regular" }, { base: "WALK", past: "WALKED", type: "regular" }, { base: "WATCH", past: "WATCHED", type: "regular" }, { base: "PLAY", past: "PLAYED", type: "regular" }, { base: "PASS", past: "PASSED", type: "regular" }, { base: "EXERCISE", past: "EXERCISED", type: "regular" }] } },
  { id: 9, type: SlideType.DAILY_REPORT, title: "THE DAILY REPORT", subtitle: "CADET'S LOG ENTRY", content: { instruction: "Fill in the gaps with the Past Simple form.", segments: [{ type: 'text', value: "Yesterday was a busy day.\n\nIn the morning, we " }, { type: 'gap', id: 1, hint: "clean", answer: "cleaned" }, { type: 'text', value: " our dorms. Then, the commander " }, { type: 'gap', id: 2, hint: "talk", answer: "talked" }, { type: 'text', value: " to us. We " }, { type: 'gap', id: 3, hint: "listen", answer: "listened" }, { type: 'text', value: " carefully. After lunch, I " }, { type: 'gap', id: 4, hint: "exercise", answer: "exercised" }, { type: 'text', value: " at the sports field. In the evening, I " }, { type: 'gap', id: 5, hint: "call", answer: "called" }, { type: 'text', value: " my family. Finally, I " }, { type: 'gap', id: 6, hint: "watch", answer: "watched" }, { type: 'text', value: " a video." }] } },
  { id: 10, type: SlideType.READING_CHALLENGE, title: "THE LEGENDARY SAT: NAMIK EKİN", subtitle: "OPERATION: IRON MAN", content: { 
    profileImage: "https://im.haberturk.com/2016/10/28/ver1477647225/1316493_620x410.jpg", 
    profileName: "NAMIK EKİN", 
    profileRank: "SAT COMMANDO (Rtd)", 
    parts: [{ 
      type: 'gap_fill', 
      title: "PART 1: THE STORY", 
      textSegments: [
        "Namık Ekin ", " (be) born in Istanbul. During his childhood, he ", " (love) sports. When he was a teenager, he ", " (enter) the naval petty officer vocational school. He ", " (be) a very clever and positive student. He ", " (not / stay) idle; he ", " (exercise) all day. He ", " (win) many championships in gymnastics and weightlifting. After he ", " (finish) the school, he ", " (decide) to become a SAT commando.\n\nIn 1963, the SAT training ", " (start). It ", " (be) very hard and serious. Namık ", " (work) like a marathon runner. He ", " (walk) long distances with heavy bags and ", " (swim) for hours in cold water. He ", " (not / stop) when he was tired. He ", " (wait) for the orders and ", " (listen) to his commanders carefully. Finally, he ", " (complete) the course and ", " (become) the top student (kurs birincisi). He ", " (be) officially a SAT commando.\n\nHis military career ", " (be) very busy. In 1968, he ", " (join) the NATO 'Preveze' exercise. He ", " (be) very famous there because he ", " (take) the high-ranking NATO commanders as prisoners alone! Everyone ", " (laugh) in surprise, but it ", " (be) a great success. He ", " (travel) to many countries and ", " (learn) different tactics. He ", " (not / eat) unhealthy things like frozen desserts. He ", " (have) a special recipe for his energy and always ", " (stay) strong.\n\nAfter the Navy, Namık Ekin ", " (start) to try world records. He ", " (stay) underwater for 24 hours! He ", " (write) many books about his life and ", " (give) seminars to young recruits. Today, many college students ", " (follow) his YouTube channel and ", " (watch) his videos. He ", " (be) a hero for all sailors. He ", " (live) a legendary life because he ", " (believe) in himself and ", " hard all his life."
      ], 
      gaps: [
        { id: 1, verb: "be", answer: "was" }, { id: 2, verb: "love", answer: "loved" }, { id: 3, verb: "enter", answer: "entered" }, { id: 4, verb: "be", answer: "was" }, { id: 5, verb: "not / stay", answer: "didn't stay" }, { id: 6, verb: "exercise", answer: "exercised" }, { id: 7, verb: "win", answer: "won" }, { id: 8, verb: "finish", answer: "finished" }, { id: 9, verb: "decide", answer: "decided" }, { id: 10, verb: "start", answer: "started" }, { id: 11, verb: "be", answer: "was" }, { id: 12, verb: "work", answer: "worked" }, { id: 13, verb: "walk", answer: "walked" }, { id: 14, verb: "swim", answer: "swam" }, { id: 15, verb: "not / stop", answer: "didn't stop" }, { id: 16, verb: "wait", answer: "waited" }, { id: 17, verb: "listen", answer: "listened" }, { id: 18, verb: "complete", answer: "completed" }, { id: 19, verb: "became", answer: "became" }, { id: 20, verb: "be", answer: "was" }, { id: 21, verb: "be", answer: "was" }, { id: 22, verb: "join", answer: "joined" }, { id: 23, verb: "be", answer: "was" }, { id: 24, verb: "take", answer: "took" }, { id: 25, verb: "laugh", answer: "laughed" }, { id: 26, verb: "be", answer: "was" }, { id: 27, verb: "travel", answer: "travelled" }, { id: 28, verb: "learn", answer: "learned" }, { id: 29, verb: "not / eat", answer: "didn't eat" }, { id: 30, verb: "have", answer: "had" }, { id: 31, verb: "stay", answer: "stayed" }, { id: 32, verb: "start", answer: "started" }, { id: 33, verb: "stay", answer: "stayed" }, { id: 34, verb: "write", answer: "wrote" }, { id: 35, verb: "give", answer: "gave" }, { id: 36, verb: "follow", answer: "follow" }, { id: 37, verb: "watch", answer: "watch" }, { id: 38, verb: "be", answer: "is" }, { id: 39, verb: "live", answer: "lives" }, { id: 40, verb: "believe", answer: "believed" }, { id: 41, verb: "work", answer: "worked" }
      ] 
    }] 
  } },
  {
    id: 11,
    type: SlideType.LEGEND_DOSSIER,
    title: "OPERATION: LEGEND VERIFIER",
    subtitle: "COMMANDO RECORDS ARCHIVE (10 DOSSIERS)",
    content: {
        instruction: "Analyze the context of each file and select the correct operational key (Verb) to verify the legend.",
        folders: [
            { id: 1, label: "FILE: NATO COMMANDERS", text: "In 1968, he ______ the high-ranking NATO commanders as prisoners alone!", keys: ["TOOK", "CALLED", "SENT"], correct: "TOOK", hint: "What did he do to the commanders during the exercise?" },
            { id: 2, label: "FILE: UNDERWATER RECORD", text: "Namık Ekin ______ underwater for exactly 24 hours to break a world record.", keys: ["STAYED", "SAILED", "WALKED"], correct: "STAYED", hint: "Action related to endurance and remaining in place." },
            { id: 3, label: "FILE: VOCATIONAL SCHOOL", text: "When he was a teenager, he ______ the Naval Petty Officer Vocational School.", keys: ["ENTERED", "VISITED", "WATCHED"], correct: "ENTERED", hint: "Beginning his official education." },
            { id: 4, label: "FILE: LITERARY DEEDS", text: "He ______ many books about his life and commando tactics for new sailors.", keys: ["WROTE", "READ", "FOUND"], correct: "WROTE", hint: "Creating content for future generations." },
            { id: 5, label: "FILE: CHAMPIONSHIPS", text: "In his youth, he ______ many gold medals in gymnastics and weightlifting.", keys: ["WON", "LOST", "GAVE"], correct: "WON", hint: "The result of success in competition." },
            { id: 6, label: "FILE: COLD WATER DRILL", text: "During SAT training, he ______ for hours in freezing cold water.", keys: ["SWAM", "RAN", "SLEPT"], correct: "SWAM", hint: "Movement in water." },
            { id: 7, label: "FILE: NATO COOPERATION", text: "In 1968, he ______ the international NATO 'Preveze' exercise.", keys: ["JOINED", "STOPPED", "STARTED"], correct: "JOINED", hint: "Becoming part of a larger team." },
            { id: 8, label: "FILE: COMMANDER DISCIPLINE", text: "As a recruit, Namık always ______ to his commanders and followed orders.", keys: ["LISTENED", "WORKED", "HELPED"], correct: "LISTENED", hint: "Obeying instructions via auditory attention." },
            { id: 9, label: "FILE: GLOBAL MISSIONS", text: "During his long career, he ______ to many different countries for training.", keys: ["TRAVELLED", "STAYED", "ARRIVED"], correct: "TRAVELLED", hint: "Moving between countries." },
            { id: 10, label: "FILE: LEGACY SEMINARS", text: "After the Navy, he ______ seminars and advice to young Petty Officers.", keys: ["GAVE", "BOUGHT", "MADE"], correct: "GAVE", hint: "Providing information or objects to others." }
        ]
    }
  },
  { id: 12, type: SlideType.GRAMMAR_RECAP, title: "FIELD MANUAL", subtitle: "SOP (PAST SIMPLE)", content: { whExamples: [{ question: "Where did you go?", context: "Location" }, { question: "What did you see?", context: "Object" }, { question: "When did it start?", context: "Time" }, { question: "Why did he stop?", context: "Reason" }, { question: "Which ship did they signal?", context: "Choice" }, { question: "Who did you call?", context: "Person" }, { question: "How did he arrive?", context: "Manner" }] } },
  {
    id: 13,
    type: SlideType.TACTICAL_DRILL,
    title: "TACTICAL SIMULATION",
    subtitle: "COMMS OFFICER DRILL (PHASE II)",
    content: {
        instruction: "Transmit the following reports correctly using Past Simple structures.",
        scenarios: [
            { id: 1, category: "INVESTIGATION", question: "_______ did the fire start on the Dax?", context: "Intercepted: 'The damage is near the fuel tanks.'", options: ["Where", "When", "What"], correct: "Where" },
            { id: 2, category: "INVESTIGATION", question: "_______ did the damage happen?", context: "Intercepted: 'The impact occurred during the storm.'", options: ["Who", "Why", "When"], correct: "When" },
            { id: 3, category: "COMMAND CHECK", question: "_______ you receive the coordinates last night?", context: "Context: Operation yesterday. Response: 'Negative, Commander.'", options: ["Do", "Did", "Were"], correct: "Did" },
            { id: 4, category: "REPORT FAILURE", question: "We _______ receive the signal.", context: "Status: Radio failure prevented communication.", options: ["didn't", "not", "didn't received"], correct: "didn't" },
            { id: 5, category: "ERROR CORRECTION", question: "Did the mechanic _______ the engine?", context: "Order: Verify the repair status now.", options: ["fixed", "fix", "fixes"], correct: "fix" },
            { id: 6, category: "LOGISTICS", question: "_______ did they order the parts?", context: "Logistics: 'Request processed last Tuesday.'", options: ["When", "Where", "What"], correct: "When" },
            { id: 7, category: "LOGISTICS", question: "_______ specific tools did the technician select yesterday?", context: "Inventory: 'We selected the heavy drills.'", options: ["What", "Which", "Who"], correct: "What" },
            { id: 8, category: "OBSERVATION", question: "_______ did he see on the horizon?", context: "Radar: 'Mustafa spotted a small boat.'", options: ["What", "Why", "Where"], correct: "What" },
            { id: 9, category: "OBSERVATION", question: "_______ did the team stop?", context: "Debrief: 'The high winds forced us to abort.'", options: ["Where", "Why", "When"], correct: "Why" },
            { id: 10, category: "COMMAND CHECK", question: "_______ they complete the target mission at 0400 hours?", context: "Final Log: mission end time was in the past. Response: 'Yes, sir.'", options: ["Do", "Did", "Were"], correct: "Did" },
            { id: 11, category: "REPORT FAILURE", question: "The recruit _______ listen to the order.", context: "Infraction: A mistake happened during training.", options: ["didn't", "don't", "no"], correct: "didn't" },
            { id: 12, category: "INVESTIGATION", question: "_______ did you call for help?", context: "Emergency: 'Radio call went out at 0300 hours.'", options: ["What", "Why", "When"], correct: "When" },
            { id: 13, category: "INVESTIGATION", question: "_______ sailor cleaned the deck?", context: "Inspection: 'It was Mustafa who did it.'", options: ["Which", "Who", "What"], correct: "Which" },
            { id: 14, category: "COMMAND CHECK", question: "_______ it rain last night?", context: "Weather log: Check previous conditions.", options: ["Did", "Was", "Does"], correct: "Did" },
            { id: 15, category: "ERROR CORRECTION", question: "Did he _______ the order?", context: "Verification: Ensure he received it correctly.", options: ["understood", "understand", "understands"], correct: "understand" }
        ]
    }
  },
  {
      id: 14,
      type: SlideType.CLASSROOM_GAME,
      title: "OPERATIONAL TRIVIA",
      subtitle: "CLASSROOM CHALLENGE: RECAP GRID",
      content: {
          instruction: "Teacher: Select a tile for the class to answer together.",
          categories: [
              {
                  name: "ACTIONS (+ed)",
                  questions: [
                      { points: 100, q: "Past form of 'START'?", a: "STARTED" },
                      { points: 200, q: "Past form of 'STUDY'?", a: "STUDIED" },
                      { points: 300, q: "Past form of 'SWAP'?", a: "SWAPPED" },
                      { points: 400, q: "Past form of 'BELIEVE'?", a: "BELIEVED" }
                  ]
              },
              {
                  name: "QUESTIONS",
                  questions: [
                      { points: 100, q: "Ask: 'Sen gittin mi?'", a: "Did you go?" },
                      { points: 200, q: "Ask: 'O ne zaman geldi?'", a: "When did he arrive?" },
                      { points: 300, q: "Ask: 'Onlar niye durdu?'", a: "Why did they stop?" },
                      { points: 400, q: "Ask: 'Hangi gemiyi gördün?'", a: "Which ship did you see?" }
                  ]
              },
              {
                  name: "NEGATIVES",
                  questions: [
                      { points: 100, q: "Negative of 'I worked'?", a: "I didn't work." },
                      { points: 200, q: "Negative of 'She cleaned'?", a: "She didn't clean." },
                      { points: 300, q: "Correct this: 'He didn't liked it.'", a: "He didn't like it." },
                      { points: 400, q: "Negative of 'They arrived'?", a: "They didn't arrive." }
                  ]
              }
          ]
      }
  },
  { id: 15, type: SlideType.DEBRIEF, title: "UNIT COMPLETE", subtitle: "MISSION ACCOMPLISHED", content: { checklist: [{ text: "STORYTELLING", reflection: "ACCOMPLISHED" }, { text: "GRAMMAR DECODING", reflection: "SUCCESS" }, { text: "TACTICAL SIMULATION", reflection: "PASSED" }, { text: "FINAL RECAP", reflection: "SECURED" }] } }
];
