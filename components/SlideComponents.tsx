import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SlideData, Vocabulary, VerbChallengeItem, ScrambleItem, DebriefItem } from '../types';

// --- COMPONENT: Hunter Verb ---
const HunterVerb: React.FC<{ word: string; onFound: () => void }> = ({ word, onFound }) => {
    const [found, setFound] = useState(false);
    useEffect(() => { setFound(false); }, [word]);
    const handleClick = () => { if (!found) { setFound(true); onFound(); } };
    return (
        <span onClick={handleClick} className={`cursor-pointer transition-all duration-300 px-0.5 rounded-sm inline-block ${found ? "bg-green-600 text-white font-black shadow-[0_0_12px_rgba(22,163,74,0.6)] scale-110" : "text-slate-800 font-normal border-b-2 border-transparent hover:border-slate-300"}`}>
            {word}
        </span>
    );
};

// --- HELPER: Reading Text Parser ---
const ReadingParser: React.FC<{ text: string; onVerbFound: () => void }> = ({ text, onVerbFound }) => {
    if (!text) return null;
    const parts = text.split('**');
    return (
        <span className="leading-relaxed">
            {parts.map((part, index) => (index % 2 === 1 ? <HunterVerb key={index} word={part} onFound={onVerbFound} /> : <span key={index} className="font-normal">{part}</span>))}
        </span>
    );
};

// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-white text-slate-900">
       <div className="absolute inset-0 z-0">
          {data.content.videoBg ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={data.content.videoBg} type="video/mp4" />
              </video>
          ) : (
              <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20"></div>
       </div>
       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl border-y-4 border-blue-900 py-12 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl">
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-blue-900 flex items-center justify-center text-5xl md:text-6xl text-blue-900 bg-white shadow-inner">⚓</div>
          </div>
          <h1 className="text-4xl md:text-7xl font-mono font-black text-slate-900 mb-2 tracking-tighter uppercase drop-shadow-sm">{data.title}</h1>
          <p className="text-sm md:text-xl text-blue-700 font-bold font-mono tracking-[0.3em] uppercase">{data.subtitle}</p>
          <div className="mt-12 md:mt-16 animate-pulse">
            <p className="text-xs md:text-sm text-slate-500 font-mono mb-2">[ TAP TO INITIALIZE ]</p>
            <span className="text-2xl text-blue-900 font-bold">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- Objectives / Lesson Plan Slide ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full relative flex items-center justify-center p-0 overflow-hidden bg-slate-950">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-7xl px-6 md:px-12 py-10">
        <div className="w-full text-center mb-8 md:mb-14">
            <span className="bg-amber-500 text-slate-950 px-5 py-1.5 text-xs md:text-sm font-mono font-black uppercase tracking-[0.5em] rounded-full shadow-2xl">Classroom Briefing</span>
            <h2 className="text-5xl md:text-9xl font-mono font-black text-white mt-4 tracking-tighter uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{data.title}</h2>
            <div className="h-2 w-48 bg-amber-500 mx-auto mt-6 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)]"></div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
                <h3 className="text-amber-400 font-mono font-black text-xl mb-6 uppercase flex items-center gap-3">MISSION TARGETS</h3>
                <ul className="space-y-5 font-mono text-sm md:text-lg text-slate-100">
                    {data.content.objectives?.map((obj: string, i: number) => <li key={i} className="flex items-start gap-4 leading-tight"><span className="text-amber-500 font-black">0{i+1}</span><span>{obj}</span></li>)}
                </ul>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-amber-500/30">
                <h3 className="text-amber-500 font-mono font-black text-xl mb-6 uppercase tracking-widest">TACTICAL PROTOCOLS</h3>
                <div className="flex flex-col gap-5">
                    {data.content.grammar?.map((g: string, i: number) => <div key={i} className="bg-slate-950/80 px-6 py-5 border-l-8 border-amber-600 text-slate-100 font-mono text-xs md:text-base rounded-r-2xl shadow-inner border border-white/5">{g}</div>)}
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 lg:col-span-1 md:col-span-2">
                <h3 className="text-blue-400 font-mono font-black text-xl mb-6 uppercase flex items-center gap-3">SUCCESS CRITERIA</h3>
                <ul className="space-y-5 font-mono text-sm md:text-lg text-slate-200">
                    {data.content.expectedOutcomes?.map((out: string, i: number) => <li key={i} className="flex items-center gap-4 italic"><span className="text-blue-400 font-bold">➤</span><span>{out}</span></li>)}
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Ice Breaker Slide ---
export const IceBreakerSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="relative z-10 max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border-[12px] border-slate-900">
                <div className="bg-slate-900 p-12 text-center flex flex-col justify-center items-center md:w-2/5 border-r-8 border-slate-800">
                    <div className="text-[10rem] mb-6 drop-shadow-2xl animate-bounce">🧊</div>
                    <h2 className="text-amber-500 font-mono font-black text-3xl uppercase tracking-widest border-y-4 border-amber-500/30 py-4 w-full">ICE BREAKER</h2>
                </div>
                <div className="p-12 md:p-20 md:w-3/5 flex flex-col justify-center bg-slate-50">
                    <h3 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-12 leading-[1.15] tracking-tight italic">
                        "{data.content.question}"
                    </h3>
                </div>
            </div>
        </div>
    );
};

// --- Reading Slide ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const totalVerbs = useMemo(() => (data.content.text.match(/\*\*/g) || []).length / 2, [data.content.text]);
  const isComplete = foundCount === totalVerbs && totalVerbs > 0;
  useEffect(() => { setFoundCount(0); setActiveVocab(null); }, [data.id]);

  return (
    <div key={data.id} className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden">
      <div className="flex-1 flex flex-col relative h-1/2 md:h-full overflow-y-auto border-r border-slate-200 custom-scrollbar">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 flex justify-between items-center px-6 shadow-sm">
             <div>
                <h2 className="text-2xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Find and click all Past Tense verbs in the text!</p>
             </div>
             <div className={`transition-all duration-500 px-4 py-2 rounded-xl font-mono font-black shadow-lg flex flex-col items-center min-w-[120px] ${isComplete ? 'bg-green-600 scale-105' : 'bg-blue-600'}`}>
                <span className="text-xl flex items-center gap-2 text-white">{foundCount} / {totalVerbs}</span>
             </div>
          </div>
          <div className="p-6 md:p-16 flex-1 font-serif text-xl md:text-4xl leading-[1.8] text-slate-800 space-y-12">
             {data.content.text.split(/\n\s*\n/).map((para: string, idx: number) => (
                <p key={idx}><ReadingParser text={para} onVerbFound={() => setFoundCount(c => c + 1)} /></p>
             ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
              <div className="flex gap-2 overflow-x-auto pb-2 px-2 custom-scrollbar">
                  {data.content.vocabulary?.map((v: Vocabulary, idx: number) => (
                      <button key={idx} onClick={() => setActiveVocab(v)} className="whitespace-nowrap px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-800 text-sm font-mono font-black rounded-xl">
                          {v.word}
                      </button>
                  ))}
              </div>
               {activeVocab && (
                   <div className="absolute bottom-full left-0 right-0 bg-white border-t-8 border-blue-600 p-8 shadow-2xl z-30 animate-in slide-in-from-bottom-5">
                       <h3 className="font-black text-slate-900 text-3xl">{activeVocab.word}</h3>
                       <p className="text-slate-700 text-xl italic mt-4 font-serif">{activeVocab.definition}</p>
                       <button onClick={() => setActiveVocab(null)} className="absolute top-4 right-4 text-2xl">✕</button>
                   </div>
               )}
          </div>
      </div>
      <div className="flex-1 h-1/2 md:h-full relative bg-slate-200">
          <img src={data.content.backgroundImage} className="w-full h-full object-cover" alt="Visual Recon" />
      </div>
    </div>
  );
};

// --- Scramble (Improved Scrolling & Layout) ---
export const ScrambleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [shuffledItems, setShuffledItems] = useState<ScrambleItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    useEffect(() => { if (data.content.items) { setShuffledItems([...data.content.items].sort(() => Math.random() - 0.5)); setSelectedIds([]); } }, [data.id]);

    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) return;
        if (id === selectedIds.length + 1) {
            setSelectedIds([...selectedIds, id]);
        }
    };

    return (
        <div className="h-full w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <div className="relative z-10 w-full max-w-7xl h-full flex flex-col overflow-hidden">
                <div className="text-center py-4 shrink-0">
                    <h3 className="text-3xl md:text-5xl font-black text-amber-500 uppercase tracking-tighter">{data.title}</h3>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch p-2 overflow-hidden">
                    <div className="bg-slate-900/60 p-6 rounded-[2rem] border-4 border-slate-800 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4">
                            {shuffledItems.map((item) => (
                                <button key={item.id} onClick={() => handleSelect(item.id)} disabled={selectedIds.includes(item.id)} className={`w-full p-4 rounded-xl text-left font-serif transition-all ${selectedIds.includes(item.id) ? 'opacity-0 scale-50' : 'bg-[#fffcf0] text-slate-800'}`}>
                                    {item.parts.join(' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-950/90 p-8 rounded-[2rem] border-4 border-slate-900 flex flex-col shadow-inner overflow-hidden">
                        <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar">
                            {Array.from({ length: data.content.items.length }).map((_, i) => (
                                <div key={i} className={`min-h-[70px] rounded-xl border flex items-center px-6 transition-all ${selectedIds[i] ? 'bg-green-950/20 border-green-500 text-green-100' : 'bg-slate-900/30 border-slate-800 text-slate-600'}`}>
                                    {data.content.items.find((it: any) => it.id === selectedIds[i])?.parts.join(' ') || '---'}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Verb Challenge ---
export const VerbChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
    const toggleReveal = (idx: number) => {
        setRevealedIds(prev => {
            const next = new Set(prev);
            if (next.has(idx)) next.delete(idx); else next.add(idx);
            return next;
        });
    };
    return (
        <div className="h-full flex flex-col items-center p-2 bg-slate-900 overflow-y-auto pt-4 pb-12 custom-scrollbar">
            <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase mb-8">{data.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {data.content.verbs.map((item: VerbChallengeItem, idx: number) => (
                    <button key={idx} onClick={() => toggleReveal(idx)} className={`h-32 md:h-40 relative transition-all duration-500 w-full rounded-2xl border-2 ${revealedIds.has(idx) ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-700'}`}>
                        <div className="text-xl md:text-2xl font-mono font-black text-white uppercase">{revealedIds.has(idx) ? item.past : item.base}</div>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Grammar Recap ---
export const GrammarRecapSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-100 overflow-y-auto pt-10 pb-20 custom-scrollbar">
             <div className="max-w-6xl w-full">
                <div className="text-center mb-10">
                    <h2 className="text-5xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2>
                </div>
                <div className="bg-white border-4 border-blue-700 rounded-3xl p-8 shadow-2xl mb-12">
                    <h3 className="font-black text-blue-900 text-xl mb-6 uppercase">THE FULL SENTENCE ENGINE</h3>
                    <div className="bg-slate-950 p-8 rounded-2xl font-mono text-center text-xl md:text-3xl text-white border-b-8 border-blue-900 flex flex-wrap justify-center items-center gap-3">
                        <span className="bg-blue-600 px-3 py-1 rounded">SUBJECT</span>+<span className="bg-green-600 px-3 py-1 rounded">VERB+ed</span>+<span className="bg-amber-600 px-3 py-1 rounded">OBJECT</span>+<span className="bg-purple-600 px-3 py-1 rounded">PLACE</span>+<span className="bg-red-600 px-3 py-1 rounded">TIME</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-slate-900 text-white rounded-3xl p-10 shadow-xl border-t-8 border-red-500">
                        <h3 className="font-black text-red-500 text-2xl mb-6 uppercase">TIME ADVERBS</h3>
                        <div className="grid grid-cols-2 gap-4 font-mono text-base md:text-xl">
                            <div>🚩 Yesterday</div><div>🚩 Two days ago</div><div>🚩 Last night</div><div>🚩 Last week</div>
                        </div>
                    </div>
                    <div className="bg-white border-4 border-slate-200 rounded-3xl p-10 shadow-xl">
                        <h3 className="font-black text-slate-900 text-2xl mb-6 uppercase">NEGATIVE OPS</h3>
                        <div className="bg-slate-50 p-6 rounded-2xl mb-6 font-mono text-center text-2xl text-red-900 border-2 border-slate-100 shadow-inner uppercase">SUBJECT + didn't + BASE VERB</div>
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- Tactical Drill ---
export const TacticalDrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selections, setSelections] = useState<Record<number, string>>({});
    const [results, setResults] = useState<Record<number, boolean | null>>({});
    const handleSelect = (id: number, opt: string) => {
        if (results[id] !== undefined) return;
        const scenario = data.content.scenarios.find((s:any)=>s.id===id);
        const isCorrect = scenario.correct === opt;
        setSelections({...selections, [id]: opt});
        setResults({...results, [id]: isCorrect});
    };
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-900 text-white overflow-y-auto pt-6 pb-20 custom-scrollbar">
             <div className="max-w-7xl w-full space-y-6">
                <h2 className="text-3xl md:text-5xl font-black font-mono text-blue-400 text-center uppercase">{data.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.content.scenarios.map((scenario: any) => (
                        <div key={scenario.id} className={`p-5 rounded-xl border-2 transition-all ${results[scenario.id] === true ? 'bg-green-950/40 border-green-500' : results[scenario.id] === false ? 'bg-red-950/40 border-red-500 animate-shake' : 'bg-slate-950/30 border-slate-800'}`}>
                            <p className="text-base md:text-lg font-serif mb-4 leading-tight italic">"{scenario.question.replace('_______', selections[scenario.id] || '_______')}"</p>
                            <div className="flex gap-2">
                                {scenario.options.map((opt: string) => (
                                    <button key={opt} onClick={() => handleSelect(scenario.id, opt)} disabled={results[scenario.id] !== undefined} className="flex-1 py-2 rounded text-xs font-mono font-black bg-blue-700">{opt}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- OPERATIONAL TRIVIA (GÜNCEL: YENİ KATEGORİ VE 500 PUANLIK SORULAR) ---
export const ClassroomGameSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedQ, setSelectedQ] = useState<{ cat: string; q: any } | null>(null);
    const [revealedA, setRevealedA] = useState(false);
    const [clickedTiles, setClickedTiles] = useState<Set<string>>(new Set());

    // Yeni Veri Seti (Naval Kategori ve 500 Puanlık Sorular Dahil)
    const updatedCategories = [
        {
            name: "ACTIONS (+ed)",
            questions: [
                { points: 100, q: "Yesterday, Namık Ekin ____ (swim) for hours.", a: "swam (Note: swammed is incorrect!)" },
                { points: 200, q: "The recruit ____ (clean) the deck yesterday.", a: "cleaned" },
                { points: 300, q: "They ____ (carry) heavy bags during training.", a: "carried" },
                { points: 400, q: "He ____ (stop) at the naval base entrance.", a: "stopped" },
                { points: 500, q: "Elite Task: The commando ____ (identify) the target instantly.", a: "identified" }
            ]
        },
        {
            name: "QUESTIONS",
            questions: [
                { points: 100, q: "____ you finish the mission yesterday?", a: "Did" },
                { points: 200, q: "Where ____ he study naval engineering?", a: "did" },
                { points: 300, q: "____ the commander order a retreat?", a: "Did" },
                { points: 400, q: "What time ____ the exercise start?", a: "did" },
                { points: 500, q: "Elite Task: Why ____ the sailors wait for the signal?", a: "did" }
            ]
        },
        {
            name: "NEGATIVES",
            questions: [
                { points: 100, q: "I ____ (not / like) the cold water.", a: "didn't like" },
                { points: 200, q: "He ____ (not / arrive) on time for the drill.", a: "didn't arrive" },
                { points: 300, q: "We ____ (not / study) for the MSÜ test last night.", a: "didn't study" },
                { points: 400, q: "The SAT commando ____ (not / give up) the course.", a: "didn't give up" },
                { points: 500, q: "Elite Task: They ____ (not / permit) unauthorized access.", a: "didn't permit" }
            ]
        },
        {
            name: "NAVAL OPERATIONS",
            questions: [
                { points: 100, q: "The ship ____ (depart) from Gölcük last night.", a: "departed" },
                { points: 200, q: "They ____ (dock) the vessel at the harbor.", a: "docked" },
                { points: 300, q: "The sailors ____ (salute) the high-ranking officer.", a: "saluted" },
                { points: 400, q: "We ____ (guard) the naval base for 12 hours.", a: "guarded" },
                { points: 500, q: "Elite Task: The submarine ____ (surface) near the island.", a: "surfaced" }
            ]
        }
    ];

    return (
        <div className="h-full w-full bg-slate-950 text-white p-6 flex flex-col items-center overflow-y-auto custom-scrollbar">
             <div className="max-w-7xl w-full h-full flex flex-col gap-10">
                <div className="text-center border-b-4 border-slate-800 pb-8"><h2 className="text-5xl md:text-8xl font-black font-mono text-amber-500 uppercase tracking-tighter drop-shadow-2xl">{data.title}</h2></div>
                {!selectedQ ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 pb-20">
                        {updatedCategories.map((cat) => (
                            <div key={cat.name} className="flex flex-col gap-4">
                                <div className="bg-slate-900 p-4 text-center font-mono font-black text-xl border-b-4 border-amber-600 rounded-xl">{cat.name}</div>
                                {cat.questions.map((q) => (
                                    <button 
                                        key={q.points} 
                                        onClick={() => { setSelectedQ({ cat: cat.name, q }); setRevealedA(false); setClickedTiles(new Set(clickedTiles).add(`${cat.name}-${q.points}`)); }} 
                                        className={`py-6 text-4xl font-black font-mono rounded-2xl transition-all border-4 ${clickedTiles.has(`${cat.name}-${q.points}`) ? 'bg-slate-900 border-slate-800 text-slate-800 grayscale' : 'bg-blue-900 border-blue-700 text-amber-400 hover:scale-105'}`}
                                    >
                                        {q.points}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900 border-[16px] border-amber-600 rounded-[4rem] animate-in zoom-in shadow-2xl relative">
                        <span className="text-amber-500 font-mono text-2xl mb-6 uppercase font-black">Category: {selectedQ.cat} // {selectedQ.q.points} Points</span>
                        <h3 className="text-4xl md:text-7xl font-black text-center mb-16 font-serif">"{selectedQ.q.q}"</h3>
                        <div className="flex flex-col gap-6 w-full max-w-4xl">
                            {revealedA && <div className="p-10 bg-green-600/20 border-4 border-green-500 rounded-3xl text-center text-5xl font-black text-green-400 uppercase tracking-tighter">{selectedQ.q.a}</div>}
                            <div className="flex gap-4">
                                {!revealedA && <button onClick={() => setRevealedA(true)} className="flex-1 bg-amber-600 text-slate-950 py-6 font-black rounded-2xl text-2xl uppercase border-b-8 border-amber-800">REVEAL DECODED DATA</button>}
                                <button onClick={() => setSelectedQ(null)} className="flex-1 bg-slate-800 hover:bg-slate-700 py-6 font-black rounded-2xl text-2xl uppercase border-4 border-slate-700">RETURN TO COMMAND GRID</button>
                            </div>
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
};

// --- Grammar Analysis Slide (8. SAYFA - GERİ GELDİ) ---
export const GrammarAnalysisSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-50 p-6 md:p-12 overflow-y-auto custom-scrollbar">
             <div className="max-w-5xl w-full mx-auto">
                <div className="text-center mb-10 border-b-2 border-slate-200 pb-6"><h2 className="text-3xl font-mono font-black text-slate-900 uppercase tracking-tighter">{data.title}</h2><p className="text-blue-600 font-mono font-bold mt-2 uppercase tracking-widest">{data.subtitle}</p></div>
                <div className="flex flex-col gap-6">
                    {data.content.cards?.map((card: any, idx: number) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden hover:shadow-lg transition-shadow">
                             <div className="w-full md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-blue-100"><h3 className="font-bold text-blue-900 text-xl mb-2">{card.title}</h3><div className="bg-white text-blue-700 font-mono text-2xl font-black px-4 py-2 rounded border border-blue-200 self-start shadow-sm">{card.suffixDisplay}</div></div>
                             <div className="w-full md:w-2/3 p-6 flex flex-col justify-center font-serif italic text-slate-800 text-xl font-black">
                                 {card.contextSentence.split('**').map((p:string, i:number) => i%2===1 ? <span key={i} className="text-blue-700 underline">{p}</span> : p)}
                                 <p className="text-xs text-slate-400 font-mono mt-4 uppercase">Rule: {card.rule}</p>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- Daily Report Slide (GÜNCEL) ---
export const DailyReportSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-200 overflow-y-auto pt-10 pb-24">
            <div className="w-full max-w-5xl bg-white shadow-2xl min-h-[700px] flex flex-col md:flex-row overflow-hidden rounded-3xl border-8 border-slate-900">
                <div className="bg-slate-900 text-white p-8 md:w-24 flex md:flex-col items-center justify-center border-r border-slate-700 shrink-0"><div className="md:-rotate-90 font-mono font-black tracking-[0.5em] uppercase text-2xl whitespace-nowrap">CADET LOG</div></div>
                <div className="flex-1 p-10 md:p-16 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]">
                    <h2 className="text-4xl font-serif font-black text-slate-900 uppercase tracking-tight underline">Daily Activity Report</h2>
                    <div className="font-serif text-2xl md:text-3xl leading-[1.8] text-slate-800 mt-10">
                        {data.content.segments.map((seg: any, idx: number) => seg.type === 'text' ? <span key={idx} className="whitespace-pre-wrap">{seg.value}</span> : <span key={idx} className="inline-block relative mx-2"><input type="text" value={inputs[seg.id] || ""} onChange={(e) => { setInputs({...inputs, [seg.id]: e.target.value}); setSubmitted(false); }} placeholder={`(${seg.hint})`} className={`border-b-4 px-3 py-1 outline-none w-48 text-center font-mono font-black transition-all bg-transparent ${submitted ? ((inputs[seg.id] || "").trim().toLowerCase() === seg.answer.toLowerCase() ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'border-slate-300 focus:border-blue-600'}`} /></span>)}
                    </div>
                    <div className="mt-16 flex justify-center"><button onClick={() => setSubmitted(true)} className="bg-blue-800 text-white font-mono font-black py-5 px-14 rounded-2xl shadow-2xl uppercase tracking-[0.3em] hover:bg-blue-900 active:scale-95 border-b-8 border-blue-950">SUBMIT REPORT</button></div>
                </div>
            </div>
        </div>
    );
};

// --- Reading Challenge Slide (NAMIK EKIN) ---
export const ReadingChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const toggleAudio = () => { if (audioRef.current) { if (isPlaying) audioRef.current.pause(); else audioRef.current.play(); setIsPlaying(!isPlaying); } };

    return (
        <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto custom-scrollbar">
            <div className="w-full bg-slate-900 border-b border-white/10 p-6 sticky top-0 z-20 flex justify-between items-center shadow-2xl">
                <h2 className="text-3xl font-black font-mono text-red-600 uppercase tracking-widest">{data.title}</h2>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-800 rounded-full px-4 py-2 border border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        <audio ref={audioRef} src="/media/namik.mp3" onEnded={() => setIsPlaying(false)} />
                        <button onClick={toggleAudio} className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-500 rounded-full transition-all active:scale-90">{isPlaying ? <span className="text-xl">||</span> : <span className="text-xl ml-1">▶</span>}</button>
                    </div>
                    <button onClick={() => setSubmitted(true)} className="bg-red-700 text-white font-black font-mono py-3 px-8 rounded-xl shadow-lg hover:bg-red-600 transition-all uppercase tracking-widest border-2 border-red-500">DECODE INTEL</button>
                </div>
            </div>
            <div className="max-w-6xl mx-auto w-full p-6 md:p-12 space-y-10 pb-32">
                <div className="bg-slate-900/50 p-10 md:p-16 rounded-3xl font-serif text-2xl md:text-3xl leading-[2] text-slate-200 shadow-2xl border border-white/5 backdrop-blur-xl relative">
                    {data.content.parts[0].textSegments.map((seg: string, i: number) => (
                        <React.Fragment key={i}>
                            {seg}
                            {data.content.parts[0].gaps.find((g: any) => g.id === i + 1) && (
                                <span className="relative group inline-block mx-2">
                                    <input 
                                        type="text" 
                                        value={inputs[i+1] || ""} 
                                        onChange={(e) => setInputs({...inputs, [i+1]: e.target.value})} 
                                        className={`w-48 bg-slate-950 border-b-4 text-center py-1 outline-none font-mono text-2xl transition-all font-black ${submitted ? (inputs[i+1]?.toLowerCase().trim() === data.content.parts[0].gaps.find((g:any)=>g.id===i+1).answer.toLowerCase() ? 'text-green-500 border-green-500 bg-green-900/20' : 'text-red-500 border-red-600 bg-red-900/20') : 'border-white/20 focus:border-blue-500'}`} 
                                    />
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Legend Dossier Slide (ŞIK KARŞTIRMA AKTİF) ---
export const LegendDossierSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selections, setSelections] = useState<Record<number, string>>({});
    const [results, setResults] = useState<Record<number, boolean>>({});
    const shuffledKeysMap = useMemo(() => { const map: Record<number, string[]> = {}; data.content.folders.forEach((folder: any) => { map[folder.id] = [...folder.keys].sort(() => Math.random() - 0.5); }); return map; }, [data.id]);

    const handleSelect = (folderId: number, key: string, correct: string) => {
        if (results[folderId] !== undefined) return;
        setSelections(prev => ({ ...prev, [folderId]: key }));
        setResults(prev => ({ ...prev, [folderId]: key === correct }));
    };

    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white p-6 overflow-y-auto custom-scrollbar">
            <div className="max-w-7xl mx-auto space-y-10">
                <div className="text-center"><h2 className="text-4xl md:text-6xl font-black font-mono text-amber-500 uppercase tracking-tighter">{data.title}</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                    {data.content.folders.map((folder: any) => (
                        <div key={folder.id} className={`p-8 rounded-[2rem] border-4 transition-all ${results[folder.id] === true ? 'border-green-600 bg-green-950/20 shadow-[0_0_30px_rgba(22,163,74,0.3)]' : results[folder.id] === false ? 'border-red-600 bg-red-950/20 animate-shake' : 'bg-slate-900 border-slate-800'}`}>
                            <div className="flex justify-between items-center mb-6"><span className="font-mono text-xs font-black text-slate-500 tracking-[0.3em] uppercase">{folder.label}</span>{results[folder.id] === false && <span className="text-red-500 font-black font-mono text-xs">⚠ {folder.correct}</span>}</div>
                            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">{folder.text.replace('______', selections[folder.id] || '______')}</p>
                            <div className="grid grid-cols-3 gap-3">
                                {shuffledKeysMap[folder.id].map((key: string) => (
                                    <button key={key} onClick={() => handleSelect(folder.id, key, folder.correct)} disabled={results[folder.id] !== undefined} className={`py-3 rounded-xl font-mono font-black text-sm transition-all ${selections[folder.id] === key ? (results[folder.id] ? 'bg-green-600' : 'bg-red-600') : 'bg-slate-800 hover:bg-slate-700'}`}>{key}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <style>{`@keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } } .animate-shake { animation: shake 0.4s ease-in-out; }`}</style>
        </div>
    );
};

// --- Debrief Slide ---
export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative">
        <div className="max-w-4xl w-full relative z-10 bg-slate-950/80 p-10 md:p-20 rounded-[4rem] border-8 border-slate-900 shadow-2xl">
            <div className="text-center mb-16"><div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-mono font-black text-sm uppercase tracking-[0.5em] mb-6 shadow-2xl animate-bounce">Mission Complete</div><h2 className="text-5xl md:text-8xl font-black font-mono uppercase tracking-tighter drop-shadow-2xl">{data.title}</h2></div>
            <div className="space-y-6">
                {data.content.checklist.map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-800 flex justify-between items-center group hover:border-green-600 transition-all">
                        <span className="text-xl md:text-3xl font-mono font-black text-slate-300 group-hover:text-white">{item.text}</span>
                        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg">✓</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

// --- STUBS (DO NOT REMOVE) ---
export const ChecklistSlide = () => null;
export const MediaSlide = () => null;
export const ComprehensionTFSlide = () => null;
export const SpeakingSlide = () => null;
export const QASlide = () => null;
export const MissionLogSlide = () => null;
export const GrammarBankSlide = () => null;
export const ImperativesSlide = () => null;
export const ComprehensionMCSlide = () => null;
export const GrammarSlide = () => null;
export const DrillSlide = () => null;
export const MatchingSlide = () => null;
export const RadarScanSlide = () => null;
