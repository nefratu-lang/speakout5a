import { SlideType, SlideData } from './types';

const imgDecision = '/media/reading1.jpg';
const imgArrival = '/media/reading2.jpg';
const imgTraining = '/media/reading3.jpg';
const imgOath = '/media/reading4.jpg';

export const LESSON_TITLE = "UNIT 5: FROM CANDIDATE TO SAILOR";

export const SLIDES: SlideData[] = [
  // 1. KAPAK SAYFASI
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
  // 2. HEDEFLER
  {
    id: 1,
    type: SlideType.OBJECTIVES,
    title: "MISSION BRIEFING",
    content: {
      objectives: [
        "Talk about past events (Military Exams)",
        "Describe naval training routines",
        "Use regular and irregular verbs correctly"
      ],
      grammar: [
        "Past Simple: Regular Verbs (-ed)",
        "Past Simple: Irregular Verbs (Go -> Went)",
        "Time Expressions (Yesterday, Last week)"
      ],
      expectedOutcomes: [
        "Complete the mission log successfully",
        "Pass the grammar drill inspection"
      ]
    }
  },
  // 3. ISINMA
  {
    id: 2,
    type: SlideType.ICE_BREAKER,
    title: "WARM UP",
    content: {
      question: "Why did you decide to join the Navy?"
    }
  },
  // 4. OKUMA PARÇASI 1
  {
    id: 3,
    type: SlideType.READING,
    title: "THE DECISION",
    content: {
      backgroundImage: imgDecision,
      text: "Ahmet **wanted** to join the Navy since he was a child.\n\nHe **studied** hard for the MSÜ exams because he **knew** it was difficult.\n\nFinally, he **passed** the exams with a high score.",
      vocabulary: [
        { word: "join", definition: "To become a member of an organization." },
        { word: "pass", definition: "To be successful in an exam." }
      ]
    }
  },
  // 5. OKUMA PARÇASI 2
  {
    id: 4,
    type: SlideType.READING,
    title: "ARRIVAL AT SCHOOL",
    content: {
      backgroundImage: imgArrival,
      text: "He **traveled** to Yalova by bus.\n\nHe **arrived** at the school gate early in the morning.\n\nHe **checked** his documents and **entered** the campus with other candidates.",
      vocabulary: [
        { word: "arrive", definition: "To reach a place." },
        { word: "check", definition: "To look at something closely to make sure it is correct." }
      ]
    }
  },
  // 6. OKUMA PARÇASI 3
  {
    id: 5,
    type: SlideType.READING,
    title: "ADAPTATION TRAINING",
    content: {
      backgroundImage: imgTraining,
      text: "The 'Adaptation Training' **started** immediately.\n\nMustafa **worked** hard with his friends. They **cleaned** the dorms and **listened** to their commanders carefully.\n\nHe **learned** discipline. He **walked** for kilometers and **stayed** strong.",
      vocabulary: [
        { word: "discipline", definition: "Training to obey rules." },
        { word: "dorm", definition: "A room where many people sleep (Dormitory)." }
      ]
    }
  },
  // 7. DİL BİLGİSİ ÖZETİ
  {
    id: 6,
    type: SlideType.GRAMMAR_RECAP,
    title: "GRAMMAR DEBRIEF",
    subtitle: "Past Simple Structure",
    content: {
      whExamples: [
        { question: "Where did he go?", context: "He went to Yalova." },
        { question: "What did he study?", context: "He studied for MSÜ exams." }
      ]
    }
  },
  // 8. KAPANIŞ
  {
    id: 7,
    type: SlideType.DEBRIEF,
    title: "MISSION ACCOMPLISHED",
    subtitle: "End of Phase 1",
    content: {
      checklist: [
        { text: "Reading Comprehension", reflection: "SECURED" },
        { text: "Vocabulary Check", reflection: "COMPLETED" },
        { text: "Grammar Analysis", reflection: "VERIFIED" }
      ]
    }
  }
];
