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
          {data.content.videoBg ? <video autoPlay loop muted playsInline className="w-full h-full object-cover"><source src={data.content.videoBg} type="video/mp4" /></video> : <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-10" />}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20"></div>
       </div>
       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl border-y-4 border-blue-900 py-12 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl">
          <div className="mb-6 flex justify-center"><div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-blue-900 flex items-center justify-center text-5xl md:text-6xl text-blue-900 bg-white shadow-inner">⚓</div></div>
          <h1 className="text-4xl md:text-7xl font-mono font-black text-slate-900 mb-2 tracking-tighter uppercase drop-shadow-sm">{data.title}</h1>
          <p className="text-sm md:text-xl text-blue-700 font-bold font-mono tracking-[0.3em] uppercase">{data.subtitle}</p>
          <div className="mt-12 md:mt-16 animate-pulse"><p className="text-xs md:text-sm text-slate-500 font-mono mb-2">[ TAP TO INITIALIZE ]</p><span className="text-2xl text-blue-900 font-bold">▼</span></div>
       </div>
    </div>
  );
};

// --- Objectives Slide ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full relative flex items-center justify-center p-0 overflow-hidden bg-slate-950">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-7xl px-6 md:px-12 py-10">
        <div className="w-full text-center mb-8 md:mb-14">
            <span className="bg-amber-500 text-slate-950 px-5 py-1.5 text-xs md:text-sm font-mono font-black uppercase tracking-[0.5em] rounded-full shadow-2xl">Classroom Briefing</span>
            <h2 className="text-5xl md:text-9xl font-mono font-black text-white mt-4 tracking-tighter uppercase">{data.title}</h2>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 p-8 rounded-3xl border border-white/20">
                <h3 className="text-amber-400 font-mono font-black text-xl mb-6">MISSION TARGETS</h3>
                <ul className="space-y-4 text-slate-100">{data.content.objectives?.map((obj: string, i: number) => <li key={i}>- {obj}</li>)}</ul>
            </div>
            <div className="bg-slate-900/90 p-8 rounded-3xl border border-amber-500/30">
                <h3 className="text-amber-500 font-mono font-black text-xl mb-6">TACTICAL PROTOCOLS</h3>
                <div className="space-y-4">{data.content.grammar?.map((g: string, i: number) => <div key={i} className="text-slate-100 text-sm">{g}</div>)}</div>
            </div>
            <div className="bg-white/10 p-8 rounded-3xl border border-white/20">
                <h3 className="text-blue-400 font-mono font-black text-xl mb-6">EXPECTED OUTCOMES</h3>
                <ul className="space-y-4 text-slate-200">{data.content.expectedOutcomes?.map((out: string, i: number) => <li key={i}>➤ {out}</li>)}</ul>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Ice Breaker Slide ---
export const IceBreakerSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-950 flex items-center justify-center p-6 relative">
            <div className="relative z-10 max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border-[12px] border-slate-900">
                <div className="bg-slate-900 p-12 text-center md:w-2/5 border-r-8 border-slate-800 flex flex-col justify-center">
                    <div className="text-8xl mb-6">🧊</div>
                    <h2 className="text-amber-500 font-mono font-black text-2xl uppercase">ICE BREAKER</h2>
                </div>
                <div className="p-12 md:p-20 md:w-3/5 bg-slate-50">
                    <h3 className="text-4xl md:text-5xl font-serif font-black text-slate-900 italic">"{data.content.question}"</h3>
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
      <div className="flex-1 flex flex-col relative h-1/2 md:h-full overflow-y-auto border-r border-slate-200">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 flex justify-between items-center px-6 shadow-sm">
             <div><h2 className="text-2xl font-black font-mono text-slate-900 uppercase">{data.title}</h2></div>
             <div className={`px-4 py-2 rounded-xl font-mono font-black text-white ${isComplete ? 'bg-green-600' : 'bg-blue-600'}`}>{foundCount} / {totalVerbs}</div>
          </div>
          <div className="p-6 md:p-16 flex-1 font-serif text-xl md:text-3xl leading-[1.8] text-slate-800 space-y-12">
             {data.content.text.split(/\n\s*\n/).map((para: string, idx: number) => (<p key={idx}><ReadingParser text={para} onVerbFound={() => setFoundCount(c => c + 1)} /></p>))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200">
              <div className="flex gap-2 overflow-x-auto pb-2">{data.content.vocabulary?.map((v: Vocabulary, idx: number) => (<button key={idx} onClick={() => setActiveVocab(v)} className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 text-sm font-mono font-black rounded-lg">{v.word}</button>))}</div>
               {activeVocab && (
                   <div className="absolute bottom-full left-0 right-0 bg-white border-t-8 border-blue-600 p-8 shadow-2xl z-30">
                       <h4 className="font-black text-2xl">{activeVocab.word}</h4>
                       <p className="text-slate-700 italic mt-2">{activeVocab.definition}</p>
                       <button onClick={() => setActiveVocab(null)} className="absolute top-4 right-4">✕</button>
                   </div>
               )}
          </div>
      </div>
      <div className="flex-1 h-1/2 md:h-full bg-slate-200"><img src={data.content.backgroundImage} className="w-full h-full object-cover" /></div>
    </div>
  );
};

// --- Scramble ---
export const ScrambleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [shuffledItems, setShuffledItems] = useState<ScrambleItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    useEffect(() => { if (data.content.items) { setShuffledItems([...data.content.items].sort(() => Math.random() - 0.5)); setSelectedIds([]); } }, [data.id]);
    const handleSelect = (id: number) => {
        if (selectedIds.includes(id)) return;
        if (id === selectedIds.length + 1) setSelectedIds([...selectedIds, id]);
    };
    return (
        <div className="h-full w-full bg-slate-900 p-6 flex flex-col items-center justify-center text-white">
            <h3 className="text-3xl font-black text-amber-500 mb-8 uppercase">{data.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                <div className="space-y-4">{shuffledItems.map(item => (<button key={item.id} onClick={() => handleSelect(item.id)} className={`w-full p-4 rounded-xl text-left font-serif text-slate-800 transition-all ${selectedIds.includes(item.id) ? 'bg-slate-700 opacity-20' : 'bg-white'}`}>{item.parts.join(' ')}</button>))}</div>
                <div className="space-y-4">{Array.from({ length: data.content.items.length }).map((_, i) => (<div key={i} className="min-h-[60px] border border-dashed border-slate-700 rounded-xl flex items-center px-4 bg-slate-800/50">{data.content.items.find((it: any) => it.id === selectedIds[i])?.parts.join(' ') || '---'}</div>))}</div>
            </div>
        </div>
    );
};

// --- Verb Challenge ---
export const VerbChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
    const toggleReveal = (idx: number) => { setRevealedIds(prev => { const next = new Set(prev); if (next.has(idx)) next.delete(idx); else next.add(idx); return next; }); };
    return (
        <div className="h-full flex flex-col items-center p-6 bg-slate-900 text-white overflow-y-auto">
            <h2 className="text-4xl font-black mb-8">{data.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{data.content.verbs.map((item: VerbChallengeItem, idx: number) => (<button key={idx} onClick={() => toggleReveal(idx)} className={`h-32 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${revealedIds.has(idx) ? 'bg-blue-600 border-blue-400' : 'bg-slate-800 border-slate-700'}`}><span className="text-xs opacity-50 uppercase mb-1">{revealedIds.has(idx) ? 'Past' : 'Base'}</span><span className="text-xl font-black">{revealedIds.has(idx) ? item.past : item.base}</span></button>))}</div>
        </div>
    );
};

// --- Grammar Recap (CÜMLE KURUCU BURADA) ---
export const GrammarRecapSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const pools = {
        subject: ["The SAT Commando", "Namık Ekin", "A brave sailor", "The commander", "The young recruit"],
        verb: [
            { v: "cleaned", transitive: true },
            { v: "finished", transitive: true },
            { v: "swam", transitive: false },
            { v: "walked", transitive: false },
            { v: "carried", transitive: true },
            { v: "arrived", transitive: false }
        ],
        object: ["the heavy bags", "the mission", "the training course", "the special energy recipe", "the naval school"],
        place: ["at the naval base", "underwater", "in Istanbul", "at the SAT school", "in the cold water"],
        time: ["yesterday", "two days ago", "last week", "in 1963", "after the exercise"]
    };

    const [sentence, setSentence] = useState({ s: "...", v: "...", o: "...", p: "...", t: "..." });
    const [isTransitive, setIsTransitive] = useState(true);

    const updatePart = (part: keyof typeof sentence) => {
        if (part === 'v') {
            const randomVerb = pools.verb[Math.floor(Math.random() * pools.verb.length)];
            setSentence(prev => ({ ...prev, v: randomVerb.v.toUpperCase() }));
            setIsTransitive(randomVerb.transitive);
        } else {
            const pool = pools[part as keyof typeof pools] as string[];
            const randomVal = pool[Math.floor(Math.random() * pool.length)];
            setSentence(prev => ({ ...prev, [part]: randomVal.toUpperCase() }));
        }
    };

    return (
        <div className="h-full flex flex-col items-center p-6 bg-slate-50 overflow-y-auto">
            <h2 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tighter">{data.title}</h2>
            <div className="max-w-4xl w-full bg-white border-4 border-blue-600 rounded-[2rem] overflow-hidden shadow-2xl mb-8">
                <div className="bg-slate-950 p-6 flex flex-wrap justify-center gap-3">
                    <button onClick={() => updatePart('s')} className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded font-black text-white active:scale-95 transition-all">SUBJECT</button>
                    <span className="text-white text-2xl">+</span>
                    <button onClick={() => updatePart('v')} className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded font-black text-white active:scale-95 transition-all">VERB+ed</button>
                    <span className="text-white text-2xl">+</span>
                    <button onClick={() => updatePart('o')} className={`bg-amber-600 px-4 py-2 rounded font-black text-white transition-all ${!isTransitive ? 'opacity-20 cursor-not-allowed' : 'hover:bg-amber-500 active:scale-95'}`}>OBJECT</button>
                    <span className="text-white text-2xl">+</span>
                    <button onClick={() => updatePart('p')} className="bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded font-black text-white active:scale-95 transition-all">PLACE</button>
                    <span className="text-white text-2xl">+</span>
                    <button onClick={() => updatePart('t')} className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-black text-white active:scale-95 transition-all">TIME</button>
                </div>
                <div className="p-12 bg-slate-900 min-h-[150px] flex flex-wrap items-center justify-center gap-4 text-center">
                    <span className="text-blue-400 font-black text-3xl font-mono">{sentence.s}</span>
                    <span className="text-green-400 font-black text-3xl font-mono">{sentence.v}</span>
                    {isTransitive && <span className="text-amber-400 font-black text-3xl font-mono">{sentence.o}</span>}
                    <span className="text-purple-400 font-black text-3xl font-mono">{sentence.p}</span>
                    <span className="text-red-400 font-black text-3xl font-mono">{sentence.t}</span>
                </div>
            </div>
            <div className="text-center text-slate-500 font-mono text-sm uppercase font-black animate-pulse">Tap the buttons above to build tactical sentences</div>
        </div>
    );
};

// --- Tactical Drill ---
export const TacticalDrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [results, setResults] = useState<Record<number, boolean | null>>({});
    const handleSelect = (id: number, opt: string) => {
        const scenario = data.content.scenarios.find((s:any)=>s.id===id);
        setResults({...results, [id]: scenario.correct === opt});
    };
    return (
        <div className="h-full p-6 bg-slate-900 text-white overflow-y-auto">
            <h2 className="text-center text-3xl font-black mb-8 text-blue-400 uppercase">{data.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.content.scenarios.map((s: any) => (
                    <div key={s.id} className={`p-5 rounded-2xl border-2 ${results[s.id] === true ? 'border-green-500 bg-green-900/20' : results[s.id] === false ? 'border-red-500 bg-red-900/20' : 'border-slate-800 bg-slate-800/40'}`}>
                        <p className="mb-4 font-serif italic">"{s.question}"</p>
                        <div className="flex gap-2">{s.options.map((o: string) => (<button key={o} onClick={() => handleSelect(s.id, o)} className="flex-1 py-2 bg-blue-700 rounded-lg text-xs font-black">{o}</button>))}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- Classroom Game ---
export const ClassroomGameSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedQ, setSelectedQ] = useState<{ cat: string; q: any } | null>(null);
    const [rev, setRev] = useState(false);
    return (
        <div className="h-full w-full bg-slate-950 text-white p-6 flex flex-col items-center overflow-y-auto">
             {!selectedQ ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {data.content.categories.map((c: any) => (
                        <div key={c.name} className="flex flex-col gap-4">
                            <div className="bg-slate-900 p-6 text-center text-2xl font-black border-b-8 border-amber-600 rounded-2xl">{c.name}</div>
                            {c.questions.map((q: any) => <button key={q.points} onClick={() => { setSelectedQ({ cat: c.name, q }); setRev(false); }} className="bg-blue-900 py-8 text-5xl font-black rounded-3xl text-amber-400 hover:scale-105 transition-all">{q.points}</button>)}
                        </div>
                    ))}
                </div>
             ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-10 bg-slate-900 border-[12px] border-amber-600 rounded-[3rem] w-full max-w-5xl my-10">
                    <h3 className="text-4xl md:text-6xl font-black text-center mb-10">"{selectedQ.q.q}"</h3>
                    {rev && <div className="p-8 bg-green-600/20 border-4 border-green-500 rounded-2xl text-4xl font-black text-green-400 mb-10">{selectedQ.q.a}</div>}
                    <div className="flex gap-4 w-full">
                        {!rev && <button onClick={() => setRev(true)} className="flex-1 bg-amber-600 py-6 rounded-2xl text-slate-950 font-black text-2xl">REVEAL</button>}
                        <button onClick={() => setSelectedQ(null)} className="flex-1 bg-slate-800 py-6 rounded-2xl font-black text-2xl border-4 border-slate-700">BACK</button>
                    </div>
                </div>
             )}
        </div>
    );
};

// --- 8. SAYFA (GRAMMAR ANALYSIS) ---
export const GrammarAnalysisSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-50 p-6 md:p-12 overflow-y-auto">
             <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-black text-center mb-10 text-slate-900 uppercase">{data.title}</h2>
                <div className="flex flex-col gap-6">
                    {data.content.cards.map((card: any, idx: number) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                             <div className="w-full md:w-1/3 bg-blue-50 p-8 flex flex-col justify-center border-r border-blue-100">
                                <h3 className="font-black text-blue-900 text-xl mb-4">{card.title}</h3>
                                <div className="bg-white text-blue-700 font-mono text-3xl font-black px-4 py-2 rounded-lg border-2 border-blue-200 self-start">{card.suffixDisplay}</div>
                             </div>
                             <div className="w-full md:w-2/3 p-8 flex flex-col justify-center font-serif text-2xl italic text-slate-800">
                                {card.contextSentence.split('**').map((p:string, i:number) => i%2===1 ? <span key={i} className="text-blue-700 font-black">{p}</span> : p)}
                                <p className="text-xs text-slate-400 font-mono mt-6 uppercase">RULE: {card.rule}</p>
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- Daily Report ---
export const DailyReportSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [sub, setSub] = useState(false);
    return (
        <div className="h-full p-6 bg-slate-200 flex flex-col items-center overflow-y-auto">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-3xl border-8 border-slate-900 overflow-hidden flex flex-col md:flex-row">
                <div className="bg-slate-900 p-8 md:w-20 flex md:flex-col items-center justify-center border-r border-slate-700"><span className="md:-rotate-90 text-white font-black text-2xl tracking-widest whitespace-nowrap">CADET LOG</span></div>
                <div className="flex-1 p-10 md:p-16">
                    <h2 className="text-4xl font-serif font-black mb-10 underline">Daily Activity Report</h2>
                    <div className="text-2xl font-serif leading-[2]">
                        {data.content.segments.map((s: any, i: number) => s.type === 'text' ? <span key={i}>{s.value}</span> : <input key={i} onChange={(e) => setInputs({...inputs, [s.id]: e.target.value})} className={`w-40 border-b-4 text-center bg-transparent outline-none font-black ${sub ? (inputs[s.id]?.toLowerCase() === s.answer.toLowerCase() ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'border-slate-300'}`} placeholder={`(${s.hint})`} />)}
                    </div>
                    <button onClick={() => setSub(true)} className="mt-12 bg-blue-800 text-white font-black py-4 px-10 rounded-2xl hover:bg-blue-900 transition-all">SUBMIT REPORT</button>
                </div>
            </div>
        </div>
    );
};

// --- Reading Challenge Slide (NAMIK EKIN) ---
export const ReadingChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [sub, setSub] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isP, setIsP] = useState(false);
    return (
        <div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto">
            <div className="w-full bg-slate-900 p-6 sticky top-0 z-20 flex justify-between items-center border-b border-white/10">
                <h2 className="text-3xl font-black text-red-600 uppercase">{data.title}</h2>
                <div className="flex items-center gap-4">
                    <div className="bg-slate-800 rounded-full px-4 py-2 flex items-center border border-blue-500/50">
                        <audio ref={audioRef} src="/media/namik.mp3" onEnded={() => setIsP(false)} />
                        <button onClick={() => { if(isP) audioRef.current?.pause(); else audioRef.current?.play(); setIsP(!isP); }} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-xl font-black">{isP ? '||' : '▶'}</button>
                        <span className="ml-3 text-[10px] font-mono hidden md:block uppercase tracking-tighter">namik_chronicles.mp3</span>
                    </div>
                    <button onClick={() => setSub(true)} className="bg-red-700 px-6 py-3 rounded-xl font-black uppercase">DECODE</button>
                </div>
            </div>
            <div className="p-8 md:p-16 max-w-5xl mx-auto bg-slate-900/50 rounded-3xl mt-10 mb-20">
                <p className="text-2xl md:text-3xl font-serif leading-[2] text-slate-200">
                    {data.content.parts[0].textSegments.map((seg: string, i: number) => (<React.Fragment key={i}>{seg}{data.content.parts[0].gaps.find((g: any) => g.id === i + 1) && (<input onChange={(e) => setInputs({...inputs, [i+1]: e.target.value})} className={`w-40 bg-transparent border-b-4 outline-none font-black text-center ${sub ? (inputs[i+1]?.toLowerCase().trim() === data.content.parts[0].gaps.find((g:any)=>g.id===i+1).answer ? 'text-green-500 border-green-500' : 'text-red-500 border-red-500') : 'border-white/20'}`} />)}</React.Fragment>))}
                </p>
            </div>
        </div>
    );
};

// --- Legend Dossier Slide (ŞIKLAR KARIŞIK) ---
export const LegendDossierSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [sels, setSels] = useState<Record<number, string>>({});
    const [res, setRes] = useState<Record<number, boolean>>({});
    const shuffledKeys = useMemo(() => { const map: any = {}; data.content.folders.forEach((f: any) => { map[f.id] = [...f.keys].sort(() => Math.random() - 0.5); }); return map; }, [data.id]);
    const handleS = (fId: number, k: string, c: string) => { if (res[fId] !== undefined) return; setSels({...sels, [fId]: k}); setRes({...res, [fId]: k === c}); };
    return (
        <div className="h-full w-full bg-[#0a0a0a] text-white p-6 overflow-y-auto">
            <h2 className="text-center text-4xl md:text-6xl font-black text-amber-500 mb-10 uppercase">{data.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto pb-20">
                {data.content.folders.map((f: any) => (
                    <div key={f.id} className={`p-8 rounded-[2rem] border-4 transition-all ${res[f.id] === true ? 'border-green-600 bg-green-950/20' : res[f.id] === false ? 'border-red-600 bg-red-950/20 animate-shake' : 'border-slate-800 bg-slate-900'}`}>
                        <div className="flex justify-between items-center mb-4"><span className="text-xs font-black opacity-50">{f.label}</span>{res[f.id] === false && <span className="text-red-500 text-xs font-black">CORRECT: {f.correct}</span>}</div>
                        <p className="text-2xl font-serif italic mb-8">{f.text.replace('______', sels[f.id] || '______')}</p>
                        <div className="grid grid-cols-3 gap-3">{shuffledKeys[f.id].map((k: string) => (<button key={k} onClick={() => handleS(f.id, k, f.correct)} className={`py-3 rounded-xl font-black text-sm transition-all ${sels[f.id] === k ? (res[f.id] ? 'bg-green-600' : 'bg-red-600') : 'bg-slate-800 hover:bg-slate-700'}`}>{k}</button>))}</div>
                    </div>
                ))}
            </div>
            <style>{`@keyframes shake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } } .animate-shake { animation: shake 0.3s ease-in-out; }`}</style>
        </div>
    );
};

// --- Debrief Slide ---
export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative">
        <div className="max-w-4xl w-full bg-slate-950/80 p-10 md:p-20 rounded-[4rem] border-8 border-slate-900 shadow-2xl text-center">
            <h2 className="text-5xl md:text-8xl font-black mb-10 uppercase tracking-tighter">{data.title}</h2>
            <div className="space-y-6 text-left">{data.content.checklist.map((item: any, idx: number) => (<div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-800 flex justify-between items-center"><span className="text-2xl font-mono font-black">{item.text}</span><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">✓</div></div>))}</div>
        </div>
    </div>
  );
};

// --- BOŞ KALMAMASI İÇİN DİĞERLERİ ---
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
