
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { SlideData, Vocabulary, VerbChallengeItem, ScrambleItem, DebriefItem } from '../types';

// --- COMPONENT: Hunter Verb ---
const HunterVerb: React.FC<{ word: string; onFound: () => void }> = ({ word, onFound }) => {
    const [found, setFound] = useState(false);
    useEffect(() => {
        setFound(false);
    }, [word]);

    const handleClick = () => {
        if (!found) {
            setFound(true);
            onFound();
        }
    };
    return (
        <span 
            onClick={handleClick}
            className={`cursor-pointer transition-all duration-300 px-0.5 rounded-sm inline-block ${
                found 
                ? "bg-green-600 text-white font-black shadow-[0_0_12px_rgba(22,163,74,0.6)] scale-110" 
                : "text-slate-800 font-normal border-b-2 border-transparent hover:border-slate-300"
            }`}
        >
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
            {parts.map((part, index) => {
                if (index % 2 === 1) {
                    return <HunterVerb key={index} word={part} onFound={onVerbFound} />;
                }
                return <span key={index} className="font-normal">{part}</span>;
            })}
        </span>
    );
};

// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-slate-900 text-white">
       <div className="absolute inset-0 z-0">
          {data.content.videoBg ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-50">
                  <source src={data.content.videoBg} type="video/mp4" />
              </video>
          ) : (
              <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/80"></div>
       </div>
       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl border-y-4 border-amber-500 py-12 bg-black/40 backdrop-blur-md shadow-2xl rounded-xl">
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white flex items-center justify-center text-5xl md:text-6xl text-white bg-white/10 shadow-inner">⚓</div>
          </div>
          <h1 className="text-4xl md:text-7xl font-mono font-black text-white mb-2 tracking-tighter uppercase drop-shadow-2xl">{data.title}</h1>
          <p className="text-sm md:text-xl text-amber-400 font-bold font-mono tracking-[0.3em] uppercase drop-shadow-sm">{data.subtitle}</p>
          <div className="mt-12 md:mt-16 animate-pulse">
            <p className="text-xs md:text-sm text-slate-300 font-mono mb-2 font-black">[ TAP TO INITIALIZE ]</p>
            <span className="text-2xl text-amber-500 font-bold">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- Objectives Slide ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full relative flex items-center justify-center p-0 overflow-hidden bg-slate-950">
      {data.content.videoBg && (
          <div className="absolute inset-0 z-0 opacity-60">
             <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-50 contrast-125">
                <source src={data.content.videoBg} type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-950/60 to-transparent"></div>
          </div>
      )}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-7xl px-6 md:px-12 py-10">
        <div className="w-full text-center mb-8 md:mb-14">
            <span className="bg-amber-500 text-slate-950 px-5 py-1.5 text-xs md:text-sm font-mono font-black uppercase tracking-[0.5em] rounded-full shadow-2xl">Classroom Briefing</span>
            <h2 className="text-5xl md:text-9xl font-mono font-black text-white mt-4 tracking-tighter uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{data.title}</h2>
            <div className="h-2 w-48 bg-amber-500 mx-auto mt-6 rounded-full"></div>
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
                    {data.content.grammar?.map((g: string, i: number) => <div key={i} className="bg-slate-950/80 px-6 py-5 border-l-8 border-amber-600 text-slate-100 font-mono text-xs md:text-base rounded-r-2xl"><span className="text-amber-500 font-black block text-[10px] mb-1">STRAT-0{i+1}</span> {g}</div>)}
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

// --- Reading Slide ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const totalVerbs = useMemo(() => (data.content.text.match(/\*\*/g) || []).length / 2, [data.content.text]);
  const isComplete = foundCount === totalVerbs && totalVerbs > 0;
  useEffect(() => { setFoundCount(0); setActiveVocab(null); }, [data.id]);
  const paragraphs = data.content.text.split(/\n\s*\n/);

  return (
    <div key={data.id} className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden">
      <div className="flex-1 flex flex-col relative h-1/2 md:h-full overflow-y-auto border-r border-slate-200 custom-scrollbar">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 flex justify-between items-center px-6">
             <div>
                <h2 className="text-2xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Identify all Past Tense verbs in the text!</p>
             </div>
             <div className={`transition-all duration-500 px-4 py-2 rounded-xl font-mono font-black shadow-lg flex flex-col items-center min-w-[120px] ${isComplete ? 'bg-green-600 scale-105' : 'bg-blue-600'}`}>
                <span className="text-[10px] uppercase opacity-80">{isComplete ? 'Area Secured' : 'Past Actions'}</span>
                <span className="text-xl">{foundCount} / {totalVerbs}</span>
             </div>
          </div>
          <div className="p-6 md:p-16 flex-1 font-serif text-xl md:text-4xl leading-[1.8] text-slate-800 space-y-12">
             {paragraphs.map((para: string, idx: number) => (
                <div key={idx} className="relative pl-10 border-l-8 border-slate-100 hover:border-blue-600 transition-colors">
                    <p><ReadingParser text={para} onVerbFound={() => setFoundCount(c => c + 1)} /></p>
                </div>
             ))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 sticky bottom-0 z-20">
              <div className="flex gap-2 overflow-x-auto pb-2 px-2 custom-scrollbar">
                  {data.content.vocabulary?.map((v: Vocabulary, idx: number) => (
                      <button key={idx} onClick={() => setActiveVocab(v)} className="whitespace-nowrap px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-800 text-sm font-mono font-black rounded-xl hover:border-blue-600">
                          {v.word}
                      </button>
                  ))}
              </div>
               {activeVocab && (
                   <div className="absolute bottom-full left-0 right-0 bg-white border-t-8 border-blue-600 p-8 shadow-2xl z-30 animate-in slide-in-from-bottom-5">
                       <div className="flex justify-between items-start max-w-3xl mx-auto">
                           <div>
                               <span className="text-blue-600 font-mono text-[10px] uppercase font-black tracking-widest">Intel Definition</span>
                               <div className="font-black text-slate-900 text-3xl mt-3">{activeVocab.word}</div>
                               <div className="text-slate-700 text-xl italic mt-4 font-serif">{activeVocab.definition}</div>
                           </div>
                           <button onClick={() => setActiveVocab(null)} className="text-2xl bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center">✕</button>
                       </div>
                   </div>
               )}
          </div>
      </div>
      <div className="flex-1 h-1/2 md:h-full relative bg-slate-950 overflow-hidden group">
          <img 
            src={data.content.backgroundImage} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[8s]" 
            alt="Visual Recon" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20"></div>
          <div className="absolute bottom-6 right-6 text-white text-[10px] font-mono opacity-50 uppercase tracking-widest">Visual Recon Area // Intel-V5</div>
      </div>
    </div>
  );
};

// --- Scramble Slide ---
export const ScrambleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [shuffledItems, setShuffledItems] = useState<ScrambleItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [complete, setComplete] = useState(false);
    useEffect(() => {
        if (data.content.items) {
            setShuffledItems([...data.content.items].sort(() => Math.random() - 0.5));
            setSelectedIds([]); setComplete(false);
        }
    }, [data.id]);
    const handleSelect = (id: number) => {
        if (selectedIds.includes(id) || complete) return;
        if (id === selectedIds.length + 1) {
            const next = [...selectedIds, id]; 
            setSelectedIds(next);
            if (next.length === data.content.items.length) setComplete(true);
        }
    };
    return (
        <div className="h-full w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <div className="relative z-10 w-full max-w-7xl h-full flex flex-col overflow-hidden">
                <div className="text-center py-4 shrink-0">
                    <h3 className="text-3xl md:text-5xl font-black text-amber-500 uppercase tracking-tighter">DATA SCRAMBLE: {data.title}</h3>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch p-2 overflow-hidden">
                    <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border-4 border-slate-800 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 pb-10">
                            {shuffledItems.map((item) => {
                                const isUsed = selectedIds.includes(item.id);
                                return (
                                    <button key={item.id} onClick={() => handleSelect(item.id)} disabled={isUsed} className={`w-full p-4 rounded-xl text-left font-serif transition-all transform shadow-lg ${isUsed ? 'opacity-0 scale-50 absolute pointer-events-none' : 'bg-[#fffcf0] border-l-[10px] border-amber-600 text-slate-800'}`}>
                                        <div className="text-base md:text-xl font-black">{item.parts.join(' ')}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-slate-950/90 p-8 rounded-[2rem] border-4 border-slate-900 flex flex-col shadow-inner overflow-hidden">
                        <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 pb-10">
                            {Array.from({ length: data.content.items.length }).map((_, i) => {
                                const filledItem = data.content.items.find((item: any) => item.id === selectedIds[i]);
                                return (
                                    <div key={i} className={`min-h-[60px] md:min-h-[70px] rounded-xl border flex items-center px-6 transition-all ${filledItem ? 'bg-green-950/20 border-green-500 text-green-100 shadow-[0_0_20px_rgba(34,197,94,0.1)]' : 'bg-slate-900/30 border-slate-800 border-dashed text-slate-600'}`}>
                                        <span className={`text-[10px] font-mono mr-4 ${filledItem ? 'text-green-500' : 'opacity-20'}`}>STEP 0{i+1}</span>
                                        <span className={`text-base md:text-xl font-serif italic ${filledItem ? 'opacity-100' : 'opacity-30'}`}>{filledItem ? filledItem.parts.join(' ') : '— ACCESSING INTEL —'}</span>
                                    </div>
                                );
                            })}
                        </div>
                        {complete && <div className="mt-4 bg-green-600 text-white font-mono font-black text-center py-4 rounded-xl animate-in slide-in-from-bottom-8">CHRONOLOGY VERIFIED</div>}
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
            <div className="max-w-7xl w-full flex flex-col gap-6">
                <div className="text-center border-b-2 border-slate-800 pb-4">
                    <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase">{data.title}</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data.content.verbs.map((item: VerbChallengeItem, idx: number) => {
                        const isRevealed = revealedIds.has(idx);
                        return (
                            <button key={idx} onClick={() => toggleReveal(idx)} className={`h-32 md:h-40 perspective-1000 group relative transition-all duration-700 w-full active:scale-95`}>
                                <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                                    <div className={`absolute inset-0 backface-hidden flex flex-col items-center justify-center p-4 bg-slate-800 border-2 border-slate-700 rounded-2xl`}>
                                        <div className="text-xl md:text-2xl font-mono font-black text-slate-300 uppercase">{item.base}</div>
                                    </div>
                                    <div className={`absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-4 bg-blue-900 border-2 border-blue-500 rounded-2xl`}>
                                        <div className="text-2xl md:text-3xl font-mono font-black text-white uppercase">{item.past}</div>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
            <style>{`.perspective-1000 { perspective: 1000px; } .preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); }`}</style>
        </div>
    );
};

// --- Ice Breaker Slide ---
export const IceBreakerSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="relative z-10 max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border-[12px] border-slate-900">
                <div className="bg-slate-900 p-12 text-center flex flex-col justify-center items-center md:w-2/5">
                    <div className="text-[10rem] mb-6 animate-bounce">🧊</div>
                    <h2 className="text-amber-500 font-mono font-black text-3xl uppercase">ICE BREAKER</h2>
                </div>
                <div className="p-12 md:p-20 md:w-3/5 flex flex-col justify-center bg-slate-50">
                    <h3 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-12">"{data.content.question || "How did you prepare?"}"</h3>
                    <p className="text-slate-500 font-mono text-xs uppercase animate-pulse">Awaiting class response...</p>
                </div>
            </div>
        </div>
    );
};

// --- Grammar Recap ---
export const GrammarRecapSlide: React.FC<{ data: SlideData }> = ({ data }) => (
    <div className="h-full flex flex-col items-center p-4 bg-slate-100 overflow-y-auto pt-10 pb-20 custom-scrollbar">
         <div className="max-w-6xl w-full">
            <div className="text-center mb-10">
                <h2 className="text-5xl font-black font-mono text-slate-900 uppercase">{data.title}</h2>
            </div>
            <div className="bg-white border-4 border-blue-700 rounded-3xl p-8 shadow-2xl mb-12">
                <h3 className="font-black text-blue-900 text-xl mb-6 flex items-center gap-4 uppercase">THE FULL SENTENCE ENGINE</h3>
                <div className="bg-slate-950 p-8 rounded-2xl font-mono text-center text-xl md:text-3xl text-white flex flex-wrap justify-center gap-3">
                    <span className="bg-blue-600 px-3 py-1 rounded">SUBJECT</span>+<span className="bg-green-600 px-3 py-1 rounded">VERB+ed</span>+<span className="bg-amber-600 px-3 py-1 rounded">OBJECT</span>
                </div>
            </div>
         </div>
    </div>
);

// --- Tactical Drill ---
export const TacticalDrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selections, setSelections] = useState<Record<number, string>>({});
    const [results, setResults] = useState<Record<number, boolean | null>>({});
    const handleSelect = (id: number, opt: string) => {
        if (results[id] !== undefined) return;
        const scenario = data.content.scenarios.find((s:any)=>s.id===id);
        setSelections({...selections, [id]: opt});
        setResults({...results, [id]: scenario.correct === opt});
    };
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-900 text-white overflow-y-auto pt-6 pb-20 custom-scrollbar">
             <div className="max-w-7xl w-full space-y-6">
                <h2 className="text-3xl md:text-5xl font-black font-mono text-blue-400 text-center uppercase">{data.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.content.scenarios.map((scenario: any) => (
                        <div key={scenario.id} className={`p-5 rounded-xl border-2 transition-all shadow-xl ${results[scenario.id] === true ? 'bg-green-950/40 border-green-500' : results[scenario.id] === false ? 'bg-red-950/40 border-red-500' : 'bg-slate-950/30 border-slate-800'}`}>
                            <p className="text-base md:text-lg font-serif mb-4 italic">"{scenario.context}"</p>
                            <div className="flex gap-2">
                                {scenario.options.map((opt: string) => (
                                    <button key={opt} onClick={() => handleSelect(scenario.id, opt)} disabled={results[scenario.id] !== undefined} className={`flex-1 py-2 rounded font-mono text-xs ${results[scenario.id] !== undefined ? (scenario.correct === opt ? 'bg-green-600' : (selections[scenario.id] === opt ? 'bg-red-600' : 'bg-slate-800')) : 'bg-blue-700 hover:bg-blue-600'}`}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- Classroom Game Slide ---
export const ClassroomGameSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedQ, setSelectedQ] = useState<{ cat: string; q: any } | null>(null);
    const [revealedA, setRevealedA] = useState(false);
    return (
        <div className="h-full w-full bg-slate-950 text-white p-6 flex flex-col items-center overflow-y-auto">
             <div className="max-w-7xl w-full h-full flex flex-col gap-10">
                <div className="text-center border-b-4 border-slate-800 pb-8"><h2 className="text-5xl md:text-8xl font-black font-mono text-amber-500 uppercase">{data.title}</h2></div>
                {!selectedQ ? (
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-10">
                        {data.content.categories.map((cat: any) => (
                            <div key={cat.name} className="flex flex-col gap-6">
                                <div className="bg-slate-900 p-8 text-center font-mono font-black text-2xl border-b-8 border-amber-600">{cat.name}</div>
                                {cat.questions.map((q: any) => <button key={q.points} onClick={() => { setSelectedQ({ cat: cat.name, q }); setRevealedA(false); }} className="flex-1 min-h-[100px] bg-blue-900 text-amber-400 text-5xl font-black rounded-3xl hover:bg-blue-700">{q.points}</button>)}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900 border-[16px] border-amber-600 rounded-[4rem] mx-4 my-10 relative animate-in zoom-in">
                        <h3 className="text-5xl md:text-8xl font-black text-center mb-12 text-white italic">"{selectedQ.q.q}"</h3>
                        {revealedA && <div className="p-10 bg-green-600 border-8 border-green-500 rounded-3xl text-center text-6xl font-black mb-10">{selectedQ.q.a}</div>}
                        <div className="flex gap-4 w-full max-w-2xl">
                            {!revealedA && <button onClick={() => setRevealedA(true)} className="flex-1 bg-amber-600 py-6 rounded-2xl text-2xl font-black uppercase">Reveal Answer</button>}
                            <button onClick={() => setSelectedQ(null)} className="flex-1 bg-slate-800 py-6 rounded-2xl text-2xl font-black uppercase">Back to Grid</button>
                        </div>
                    </div>
                )}
             </div>
        </div>
    );
};

// --- Daily Report Slide ---
export const DailyReportSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-200 pt-10 pb-24 overflow-y-auto">
            <div className="w-full max-w-5xl bg-white shadow-2xl min-h-[600px] rounded-3xl border-8 border-slate-900 p-16">
                <h2 className="text-4xl font-serif font-black mb-10 border-b-4 border-slate-900 pb-4">Daily Activity Report</h2>
                <div className="font-serif text-2xl md:text-3xl leading-[2] text-slate-800">
                    {data.content.segments.map((seg: any, idx: number) => seg.type === 'text' ? <span key={idx}>{seg.value}</span> : <input key={idx} type="text" onChange={(e) => setInputs({...inputs, [seg.id]: e.target.value})} className={`border-b-4 px-3 outline-none w-48 text-center font-black ${submitted ? (inputs[seg.id]?.toLowerCase().trim() === seg.answer.toLowerCase() ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'border-slate-300'}`} />)}
                </div>
                <div className="mt-12 flex justify-center"><button onClick={() => setSubmitted(true)} className="bg-blue-800 text-white font-black py-4 px-12 rounded-xl text-xl">SUBMIT REPORT</button></div>
            </div>
        </div>
    );
};

// --- Legend Dossier Slide ---
export const LegendDossierSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [results, setResults] = useState<Record<number, boolean>>({});
    const handleSelect = (fid: number, key: string, correct: string) => setResults({...results, [fid]: key === correct});
    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-10">
                <h2 className="text-4xl md:text-6xl font-black font-mono text-amber-500 text-center uppercase tracking-tighter">{data.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">
                    {data.content.folders.map((folder: any) => (
                        <div key={folder.id} className={`p-8 rounded-[2rem] border-4 ${results[folder.id] === true ? 'bg-green-950/20 border-green-600' : results[folder.id] === false ? 'bg-red-950/20 border-red-600' : 'bg-slate-900 border-slate-800'}`}>
                            <p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">{folder.text}</p>
                            <div className="grid grid-cols-3 gap-3">
                                {folder.keys.map((key: string) => (
                                    <button key={key} onClick={() => handleSelect(folder.id, key, folder.correct)} className="py-3 bg-slate-800 rounded-xl font-mono font-black hover:bg-slate-700">{key}</button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Debrief Slide ---
export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => (
    <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center p-6 text-white overflow-y-auto relative">
        <div className="max-w-6xl w-full relative z-10 flex flex-col gap-10 py-12 text-center">
            <h2 className="text-6xl md:text-9xl font-black font-mono uppercase text-white drop-shadow-2xl">{data.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.content.recapItems.map((item: any, idx: number) => (
                    <div key={idx} className="bg-slate-900/60 p-8 rounded-[2.5rem] border-2 border-slate-800 shadow-2xl">
                        <h3 className="text-2xl font-black font-mono text-blue-400 mb-4">{item.label}</h3>
                        <p className="text-slate-300 font-serif text-lg italic">{item.summary}</p>
                    </div>
                ))}
            </div>
            <div className="bg-blue-900/40 p-12 rounded-[3rem] border-4 border-slate-800 shadow-2xl">
                <p className="text-2xl md:text-4xl font-serif text-white italic">"{data.content.closingMessage}"</p>
            </div>
        </div>
    </div>
);

// --- UNUSED STUBS ---
export const ChecklistSlide: React.FC<{ data: SlideData }> = () => null;
export const GrammarAnalysisSlide: React.FC<{ data: SlideData }> = ({data}) => (
    <div className="h-full p-10 bg-slate-50 overflow-y-auto">
        <h2 className="text-4xl font-black mb-10 text-center uppercase">{data.title}</h2>
        <div className="grid gap-6 max-w-4xl mx-auto">
            {data.content.cards.map((card: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-2xl shadow-xl border-l-8 border-blue-600">
                    <h3 className="text-2xl font-black text-blue-900 mb-2">{card.title}</h3>
                    <p className="text-xl font-serif italic mb-4">{card.contextSentence}</p>
                    <p className="text-sm font-mono text-slate-500 uppercase">{card.rule}</p>
                </div>
            ))}
        </div>
    </div>
);
export const ReadingChallengeSlide: React.FC<{ data: SlideData }> = ({data}) => (
    <div className="h-full bg-slate-950 text-white p-10 overflow-y-auto">
        <h2 className="text-4xl font-black text-center mb-10 text-amber-500 uppercase tracking-widest">{data.title}</h2>
        <div className="bg-slate-900 p-10 rounded-3xl max-w-5xl mx-auto border border-white/10 shadow-2xl">
            <p className="text-2xl font-serif leading-loose italic">{data.content.parts[0].textSegments.join(' [___] ')}</p>
            <div className="mt-10 text-center"><p className="text-slate-500 font-mono animate-pulse uppercase">Fill the gaps in your notebook to verify the legend.</p></div>
        </div>
    </div>
);
export const MediaSlide: React.FC<{ data: SlideData }> = () => null;
export const ComprehensionTFSlide: React.FC<{ data: SlideData }> = () => null;
export const SpeakingSlide: React.FC<{ data: SlideData }> = () => null;
export const QASlide: React.FC<{ data: SlideData }> = () => null;
export const MissionLogSlide: React.FC<{ data: SlideData }> = () => null;
export const GrammarBankSlide: React.FC<{ data: SlideData }> = () => null;
export const ImperativesSlide: React.FC<{ data: SlideData }> = () => null;
export const ComprehensionMCSlide: React.FC<{ data: SlideData }> = () => null;
export const GrammarSlide: React.FC<{ data: SlideData }> = () => null;
export const DrillSlide: React.FC<{ data: SlideData }> = () => null;
export const MatchingSlide: React.FC<{ data: SlideData }> = () => null;
export const RadarScanSlide: React.FC<{ data: SlideData }> = () => null;
