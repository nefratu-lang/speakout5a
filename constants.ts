import { SlideType, SlideData, QuestionTF, QuestionMC, GrammarItem, DrillItem, MatchingPair, Vocabulary, ChecklistItem, QAItem, ScrambleItem, DebriefItem, ImperativeSign, MissionLogStep, GrammarQuizItem, KeyPoint, VerbChallengeItem } from './types';

// ==========================================
// 📂 ASSET MANIFEST (DARK/HISTORICAL THEME)
// ==========================================
const damyoOld = '/media/damyo_old.jpg';
const damyoNew = '/media/damyo_new.jpg';
const seniorChief = '/media/senior_chief.jpg';
const ottomanShip = '/media/ottoman_ship.jpg';
const rankBadges = '/media/rank_badges.jpg';

export const LESSON_TITLE = "ARCHIVE 1890: FULL CHRONOLOGY";

// --- TEXTS FOR EXPANDED MODULES ---

const TEXT_CHAPTER_1_1890 = `CHAPTER 1: THE FOUNDATION (1890-1914)

It **started** in the Ottoman Era. The Navy **needed** professional sailors for the new steamships. In **1890**, the Ministry of Navy **opened** the 'Naval Apprentice School' (Gedikli Okulu). It **was** inside an old corvette ship, the 'Selimiye'.

Life **was** difficult. The students **were** young boys, aged 14-16. They **slept** on the deck in hammocks. They **woke up** at dawn (05:00). They **cleaned** the ship, **tied** knots, and **learned** about the wind and sea. They **didn't have** computers or tablets. They **had** discipline.

The school **moved** many times. It **went** to Kasımpaşa, then to Heybeliada. But the spirit **remained** the same. They **wanted** to serve the nation.`;

const TEXT_CHAPTER_2_1915 = `CHAPTER 2: THE WAR YEARS (1915-1923)

In **1915**, the First World War **began**. The students **stopped** their lessons. They **became** soldiers. During the Çanakkale War, Naval NCOs **played** a critical role. They **carried** huge shells (bullets) to the cannons. They **repaired** the broken engines under heavy fire.

Seyit Onbaşı **was** a hero, but thousands of unnamed sailors **fought** beside him. They **didn't sleep** for days. They **ate** dry bread. Many of them **lost** their lives.

When the War of Independence **started** in **1919**, the sailors **escaped** from Istanbul to Anatolia. They **transported** guns and ammunition in small boats through the Black Sea. They **helped** Mustafa Kemal Atatürk to build the new Republic.`;

const TEXT_CHAPTER_3_MODERN = `CHAPTER 3: THE MODERN ERA (2003-PRESENT)

After the war, technology **advanced** fast. The Navy **needed** modern experts. The school **changed** its name to DAMYO (Naval Petty Officer Vocational School).

In the 20th century, it **was** in Beylerbeyi, right under the Bosphorus Bridge. But it **was** too small. Finally, in **2003**, the school **moved** to its permanent home in Yalova.

Today, DAMYO is a modern campus. Students **study** computer science, electronics, and engineering. But they still **respect** the past. Last year, a Senior Chief **visited** the school. He **told** the students: "I **joined** in 1990. We **didn't have** these facilities. You are lucky. Work hard."`;


export const SLIDES: SlideData[] = [
  // 1. COVER
  {
    id: 0,
    type: SlideType.COVER,
    title: "THE LONG VOYAGE",
    subtitle: "8-HOUR TACTICAL HISTORY COURSE",
    content: {
      backgroundImage: ottomanShip
    }
  },

  // 2. OBJECTIVES (Expanded)
  {
    id: 1,
    type: SlideType.OBJECTIVES,
    title: "MISSION BRIEFING",
    subtitle: "Full Day Operation",
    content: {
        objectives: [
            "ANALYZE 3 eras of Naval History (1890, 1915, 2003)",
            "CONVERT 20+ Verbs from Present to Past",
            "IDENTIFY Irregular Verbs (Go->Went, Fight->Fought)",
            "COMPARE Naval life 'Then' vs 'Now'"
        ],
        grammar: [
            "Past Simple: Regular (-ed)",
            "Past Simple: Irregular",
            "Time Prepositions (In 1990, On Monday, At 05:00)"
        ],
        vocabulary: [
            "History: Founded, Established, Moved",
            "Warfare: Fight, Carry, Repair, Transport",
            "Daily Life: Hammock, Deck, Steamship"
        ],
        context: "We will travel from the Ottoman Empire to the modern Turkish Republic.",
        importance: "You are the continuation of this history. You must know where you came from."
    }
  },

  // 3. ICE BREAKER: RANKS
  {
    id: 2,
    type: SlideType.ICE_BREAKER,
    title: "IDENTIFY THE VETERAN",
    subtitle: "Career Analysis",
    content: {
        backgroundImage: seniorChief,
        question: "This Senior Chief joined in 1995. What did he do?",
        type: "poll",
        options: [
            { icon: "🧹", text: "1995: He scrubbed decks.", subtext: "Rank: Student" },
            { icon: "⚓", text: "2024: He leads the ship.", subtext: "Rank: Senior Chief" }
        ],
        prompt: "Past: He DID it. Present: He DOES it.",
        footnote: "Service Duration: 29 Years."
    }
  },

  // ---------------- MODULE 1: 1890 ----------------
  
  // 4. READING 1
  {
    id: 3,
    type: SlideType.READING,
    title: "ARCHIVE: 1890 (THE BEGINNING)",
    subtitle: "Module 1 of 3",
    content: {
      backgroundImage: damyoOld,
      vocabulary: [
        { word: "opened", definition: "Started. The school opened its doors." },
        { word: "slept", definition: "Past of Sleep." },
        { word: "woke up", definition: "Past of Wake Up." },
        { word: "hammock", definition: "A hanging bed used on ships." }
      ] as Vocabulary[],
      keyPoints: [
        { title: "Location", content: "Selimiye Corvette (Ship)", position: 'left' },
        { title: "Age", content: "14-16 years old", position: 'right' }
      ] as KeyPoint[],
      text: TEXT_CHAPTER_1_1890
    }
  },

  // 5. COMPREHENSION 1
  {
    id: 4,
    type: SlideType.COMPREHENSION_MC,
    title: "DATA CHECK: 1890",
    subtitle: "Verify Module 1 Intel",
    content: {
        referenceText: TEXT_CHAPTER_1_1890,
        questions: [
            { 
                id: 1, 
                question: "Where was the first school?", 
                options: ["In a building", "Inside a ship (Selimiye)"], 
                correctIndex: 1, 
                explanation: "It was a floating school inside a corvette.", 
                iconType: "history",
                contextHighlight: "It was inside an old corvette ship, the 'Selimiye'."
            },
            { 
                id: 2, 
                question: "What did students sleep in?", 
                options: ["Hammocks", "Beds"], 
                correctIndex: 0, 
                explanation: "Hammocks save space on ships.", 
                iconType: "general",
                contextHighlight: "The students slept on the deck in hammocks."
            }
        ] as QuestionMC[]
    }
  },

  // 6. DRILL: WAS / WERE
  {
    id: 5,
    type: SlideType.GRAMMAR,
    title: "STATE OF BEING (1890)",
    subtitle: "Insert WAS or WERE",
    content: {
      items: [
        { id: 1, prefix: "The school", suffix: "on a ship.", correctAnswer: "was" },
        { id: 2, prefix: "The students", suffix: "young.", correctAnswer: "were" },
        { id: 3, prefix: "It", suffix: "cold at night.", correctAnswer: "was" },
        { id: 4, prefix: "Where", suffix: "the hammocks?", correctAnswer: "were" },
        { id: 5, prefix: "There", suffix: "no computers.", correctAnswer: "were" }
      ] as GrammarItem[]
    }
  },

  // ---------------- MODULE 2: 1915 ----------------

  // 7. READING 2
  {
    id: 6,
    type: SlideType.READING,
    title: "ARCHIVE: 1915 (WAR)",
    subtitle: "Module 2 of 3",
    content: {
      backgroundImage: ottomanShip,
      vocabulary: [
        { word: "fought", definition: "Past of Fight." },
        { word: "carried", definition: "Past of Carry (Lift)." },
        { word: "repaired", definition: "Fixed broken things." },
        { word: "escaped", definition: "Ran away to safety/freedom." }
      ] as Vocabulary[],
      text: TEXT_CHAPTER_2_1915
    }
  },

  // 8. DRILL: REGULAR VERBS
  {
    id: 7,
    type: SlideType.DRILL,
    title: "ACTION REPORT (REGULAR)",
    subtitle: "Pronounce the -ed ending",
    content: {
        items: [
            { id: 1, speaker: "REC", text: "WORK -> WORKED (/t/)" },
            { id: 2, speaker: "REC", text: "REPAIR -> REPAIRED (/d/)" },
            { id: 3, speaker: "REC", text: "START -> STARTED (/id/)" },
            { id: 4, speaker: "REC", text: "HELP -> HELPED (/t/)" },
            { id: 5, speaker: "REC", text: "PLAY -> PLAYED (/d/)" },
            { id: 6, speaker: "REC", text: "DEFEND -> DEFENDED (/id/)" }
        ] as DrillItem[]
    }
  },

  // ---------------- MODULE 3: MODERN ----------------

  // 9. READING 3
  {
    id: 8,
    type: SlideType.READING,
    title: "ARCHIVE: 2003 (MODERN)",
    subtitle: "Module 3 of 3",
    content: {
      backgroundImage: damyoNew,
      vocabulary: [
        { word: "moved", definition: "Changed location." },
        { word: "advanced", definition: "Became better/modern." },
        { word: "told", definition: "Past of Tell." },
        { word: "joined", definition: "Entered the service." }
      ] as Vocabulary[],
      text: TEXT_CHAPTER_3_MODERN
    }
  },

  // ---------------- MODULE 4: THE CONVERTER ----------------

  // 10. VERB CHALLENGE (THE BIG ONE)
  {
    id: 9,
    type: SlideType.VERB_CHALLENGE,
    title: "THE VERB CONVERTER",
    subtitle: "TACTICAL EXERCISE: CONVERT TO PAST TENSE",
    content: {
        verbs: [
            { base: "GO", past: "WENT", type: "irregular" },
            { base: "SEE", past: "SAW", type: "irregular" },
            { base: "HAVE", past: "HAD", type: "irregular" },
            { base: "DO", past: "DID", type: "irregular" },
            { base: "IS/AM", past: "WAS", type: "irregular" },
            { base: "ARE", past: "WERE", type: "irregular" },
            { base: "TAKE", past: "TOOK", type: "irregular" },
            { base: "LEAVE", past: "LEFT", type: "irregular" },
            { base: "COME", past: "CAME", type: "irregular" },
            { base: "FIGHT", past: "FOUGHT", type: "irregular" },
            { base: "BUY", past: "BOUGHT", type: "irregular" },
            { base: "THINK", past: "THOUGHT", type: "irregular" },
            { base: "WORK", past: "WORKED", type: "regular" },
            { base: "PLAY", past: "PLAYED", type: "regular" },
            { base: "STUDY", past: "STUDIED", type: "regular" },
            { base: "STOP", past: "STOPPED", type: "regular" },
            { base: "LIVE", past: "LIVED", type: "regular" },
            { base: "WANT", past: "WANTED", type: "regular" },
            { base: "NEED", past: "NEEDED", type: "regular" },
            { base: "JOIN", past: "JOINED", type: "regular" }
        ] as VerbChallengeItem[]
    }
  },

  // 11. TIMELINE SCRAMBLE
  {
    id: 10,
    type: SlideType.SCRAMBLE,
    title: "CHRONOLOGY REPAIR",
    subtitle: "Reassemble the history events.",
    content: {
        items: [
            { id: 1, parts: ["The", "school", "opened", "in", "1890"], correctSentence: "The school opened in 1890" },
            { id: 2, parts: ["Sailors", "fought", "in", "1915"], correctSentence: "Sailors fought in 1915" },
            { id: 3, parts: ["We", "moved", "to", "Yalova"], correctSentence: "We moved to Yalova" }
        ] as ScrambleItem[]
    }
  },

  // 12. CHECKLIST
  {
    id: 11,
    type: SlideType.CHECKLIST,
    title: "FINAL PROTOCOL",
    subtitle: "Verify learning outcomes.",
    content: {
      referenceText: "End of 8-Hour Block",
      extensionQuestion: "What is the most important date in Navy history for you?",
      items: [
        { id: "M1", text: "Understood the 1890 origins", isCorrect: true },
        { id: "M2", text: "Respected the 1915 sacrifice", isCorrect: true },
        { id: "M3", text: "Acknowledged modern DAMYO", isCorrect: true },
        { id: "V1", text: "Completed Verb Converter (20+ Verbs)", isCorrect: true },
        { id: "G1", text: "Used 'Was/Were' correctly", isCorrect: true }
      ] as ChecklistItem[]
    }
  },

  // 13. DEBRIEF
  {
    id: 12,
    type: SlideType.DEBRIEF,
    title: "RANK ADVANCEMENT",
    subtitle: "YOU ARE NOW A KEEPER OF HISTORY",
    content: {
        checklist: [
            { text: "HISTORY DATABASE", reflection: "SYNCHRONIZED" },
            { text: "PAST TENSE MATRIX", reflection: "ONLINE" },
            { text: "MORALE", reflection: "MAXIMUM" },
            { text: "UNIT STATUS", reflection: "READY FOR NEXT DUTY" }
        ] as DebriefItem[]
    }
  }
];