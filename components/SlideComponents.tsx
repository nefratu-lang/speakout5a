import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SlideData, Vocabulary, VerbChallengeItem, ScrambleItem, DebriefItem } from '../types';

// --- COMPONENT: Hunter Verb (Helper) ---
const HunterVerb: React.FC<{ word: string; onFound: () => void }> = ({ word, onFound }) => {
    const [found, setFound] = useState(false);
    useEffect(() => { setFound(false); }, [word]);
    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Buton tıklaması üst katmanlara gitmesin
        if (!found) { setFound(true); onFound(); }
    };
    return (
        <span 
            onClick={handleClick}
            className={`cursor-pointer transition-all duration-300 px-0.5 rounded-sm inline-block ${found ? "bg-green-600 text-white font-black scale-110" : "text-slate-800 font-normal border-b-2 border-transparent hover:border-slate-300"}`}
        >
            {word}
        </span>
    );
};

const ReadingParser: React.FC<{ text: string; onVerbFound: () => void }> = ({ text, onVerbFound }) => {
    if (!text) return null;
    const parts = text.split('**');
    return (
        <span className="leading-relaxed">
            {parts.map((part, index) => {
                if (index % 2 === 1) return <HunterVerb key={index} word={part} onFound={onVerbFound} />;
                return <span key={index} className="font-normal">{part}</span>;
            })}
        </span>
    );
};

// --- COVER SLIDE (GÜNCELLENDİ: VİDEO SORUNU ÇÖZÜLDÜ) ---
export const CoverSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data, onNext }) => {
  return (
    // 1. En dış katmana onClick verdik. Ekrana neresine basarsan bas çalışır.
    <div 
        onClick={onNext}
        className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-white text-slate-900 cursor-pointer group"
    >
       {/* 2. Video Katmanı: pointer-events-none ekledik. Tıklamayı engellemez. */}
       <div className="absolute inset-0 z-0 pointer-events-none">
          {data.content.videoBg ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                  <source src={data.content.videoBg} type="video/mp4" />
              </video>
          ) : (
              <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-10" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/20"></div>
       </div>

       {/* İçerik Katmanı */}
       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl border-y-4 border-blue-900 py-12 bg-white/95 backdrop-blur-md shadow-2xl rounded-xl pointer-events-none"> 
          {/* pointer-events-none ile içeriğin tıklamayı bloklamasını da engelledik, dış div yakalayacak */}
          <div className="mb-6 flex justify-center">
             <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-blue-900 flex items-center justify-center text-5xl md:text-6xl text-blue-900 bg-white shadow-inner">⚓</div>
          </div>
          <h1 className="text-4xl md:text-7xl font-mono font-black text-slate-900 mb-2 tracking-tighter uppercase drop-shadow-sm">{data.title}</h1>
          <p className="text-sm md:text-xl text-blue-700 font-bold font-mono tracking-[0.3em] uppercase">{data.subtitle}</p>
          
          <div className="mt-12 md:mt-16 animate-pulse">
            <p className="text-xs md:text-sm text-slate-500 font-mono mb-2 font-black tracking-widest">[ TAP ANYWHERE TO INITIALIZE ]</p>
            <span className="text-3xl text-blue-900 font-bold group-hover:scale-125 transition-transform duration-300 inline-block">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- Diğer Bileşenler (Aynen Kalıyor) ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full relative flex items-center justify-center p-0 overflow-hidden bg-slate-950">
      {data.content.videoBg && (
          <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
             <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-50 contrast-125">
                <source src={data.content.videoBg} type="video/mp4" />
             </video>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-950/95 via-blue-950/60 to-transparent"></div>
          </div>
      )}
      
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-7xl px-6 md:px-12 py-10 overflow-y-auto">
        <div className="w-full text-center mb-8 md:mb-14 shrink-0">
            <span className="bg-amber-500 text-slate-950 px-5 py-1.5 text-xs md:text-sm font-mono font-black uppercase tracking-[0.5em] rounded-full shadow-2xl">Classroom Briefing</span>
            <h2 className="text-4xl md:text-9xl font-mono font-black text-white mt-4 tracking-tighter uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">{data.title}</h2>
            <div className="h-2 w-48 bg-amber-500 mx-auto mt-6 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)]"></div>
        </div>

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
                <h3 className="text-amber-400 font-mono font-black text-xl mb-6 uppercase flex items-center gap-3"><span className="w-4 h-4 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,1)]"></span> MISSION TARGETS</h3>
                <ul className="space-y-5 font-mono text-sm md:text-lg text-slate-100">
                    {data.content.objectives?.map((obj: string, i: number) => <li key={i} className="flex items-start gap-4 leading-tight"><span className="text-amber-500 font-black">0{i+1}</span><span>{obj}</span></li>)}
                </ul>
            </div>
            <div className="bg-slate-900/90 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-amber-500/30">
                <h3 className="text-amber-500 font-mono font-black text-xl mb-6 uppercase tracking-widest">TACTICAL PROTOCOLS</h3>
                <div className="flex flex-col gap-5">
                    {data.content.grammar?.map((g: string, i: number) => <div key={i} className="bg-slate-950/80 px-6 py-5 border-l-8 border-amber-600 text-slate-100 font-mono text-xs md:text-base rounded-r-2xl shadow-inner border border-white/5"><span className="text-amber-500 font-black block text-[10px] mb-1">STRAT-0{i+1}</span> {g}</div>)}
                </div>
            </div>
            <div className="bg-white/10 backdrop-blur-2xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 lg:col-span-1 md:col-span-2">
                <h3 className="text-blue-400 font-mono font-black text-xl mb-6 uppercase flex items-center gap-3"><span className="w-4 h-4 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></span> SUCCESS CRITERIA</h3>
                <ul className="space-y-5 font-mono text-sm md:text-lg text-slate-200">
                    {data.content.expectedOutcomes?.map((out: string, i: number) => <li key={i} className="flex items-center gap-4 italic"><span className="text-blue-400 font-bold">➤</span><span>{out}</span></li>)}
                </ul>
                <div className="mt-12 pt-8 border-t border-white/10 text-center"><p className="text-xs text-slate-500 font-mono uppercase tracking-[0.3em] animate-pulse">Awaiting commander signal...</p></div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const IceBreakerSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-600 rounded-full blur-[150px] animate-pulse delay-700"></div>
            </div>
            <div className="relative z-10 max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row border-[12px] border-slate-900">
                <div className="bg-slate-900 p-12 text-center flex flex-col justify-center items-center md:w-2/5 border-r-8 border-slate-800">
                    <div className="text-[10rem] mb-6 drop-shadow-2xl animate-bounce">🧊</div>
                    <h2 className="text-amber-500 font-mono font-black text-3xl uppercase tracking-widest border-y-4 border-amber-500/30 py-4 w-full">ICE BREAKER</h2>
                    <p className="text-slate-500 font-mono text-[10px] uppercase mt-6 tracking-[0.5em] font-black">Commence Discussion</p>
                </div>
                <div className="p-12 md:p-20 md:w-3/5 flex flex-col justify-center bg-slate-50">
                    <div className="mb-10 flex items-center gap-4">
                        <span className="w-12 h-1 bg-amber-500 rounded-full"></span>
                        <span className="text-slate-400 font-mono font-black text-sm uppercase tracking-widest">Operational Inquiry</span>
                    </div>
                    <h3 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-12 leading-[1.15] tracking-tight italic">"{data.content.question || "How did you prepare for your MSÜ exams?"}"</h3>
                </div>
            </div>
        </div>
    );
};

export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const totalVerbs = useMemo(() => (data.content.text.match(/\*\*/g) || []).length / 2, [data.content.text]);
  const isComplete = foundCount === totalVerbs && totalVerbs > 0;
  useEffect(() => { setFoundCount(0); setActiveVocab(null); }, [data.id]);
  const paragraphs = data.content.text.split(/\n\s*\n/);
  
  return (
    <div key={data.id} className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden animate-in fade-in duration-500">
      <div className="flex-1 flex flex-col relative h-1/2 md:h-full overflow-y-auto border-r border-slate-200 custom-scrollbar">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 flex justify-between items-center px-6 shadow-sm">
             <div><h2 className="text-2xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2><p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Find Past Tense verbs!</p></div>
             <div className={`transition-all duration-500 px-4 py-2 rounded-xl font-mono font-black shadow-lg flex flex-col items-center min-w-[120px] ${isComplete ? 'bg-green-600 scale-105' : 'bg-blue-600'}`}><span className="text-[10px] uppercase opacity-80">{isComplete ? 'Area Secured' : 'Past Actions'}</span><span className="text-xl flex items-center gap-2 text-white">{foundCount} / {totalVerbs}{isComplete && <span className="text-white animate-in zoom-in">✓</span>}</span></div>
          </div>
          <div className="p-6 md:p-16 flex-1 font-serif text-xl md:text-4xl leading-[1.8] text-slate-800 space-y-12">
             {paragraphs.map((para: string, idx: number) => (<div key={idx} className="relative pl-10 border-l-8 border-slate-100 hover:border-blue-600 transition-colors"><p><ReadingParser text={para} onVerbFound={() => setFoundCount(c => c + 1)} /></p></div>))}
          </div>
          <div className="p-4 bg-slate-50 border-t border-slate-200 sticky bottom-0 z-20">
              <div className="flex gap-2 overflow-x-auto pb-2 px-2 custom-scrollbar">{data.content.vocabulary?.map((v: Vocabulary, idx: number) => (<button key={idx} onClick={() => setActiveVocab(v)} className="whitespace-nowrap px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-800 text-sm font-mono font-black rounded-xl shadow-sm hover:border-blue-600 hover:text-blue-700 transition-all active:scale-95">{v.word}</button>))}</div>
               {activeVocab && (<div className="absolute bottom-full left-0 right-0 bg-white border-t-8 border-blue-600 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-30 animate-in slide-in-from-bottom-5"><div className="flex justify-between items-start max-w-3xl mx-auto"><div><span className="text-blue-600 font-mono text-[10px] uppercase font-black tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Intel Definition</span><div className="font-black text-slate-900 text-3xl mt-3">{activeVocab.word}</div><div className="text-slate-700 text-xl italic mt-4 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border-l-4 border-slate-200">{activeVocab.definition}</div></div><button onClick={() => setActiveVocab(null)} className="text-2xl bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-inner">✕</button></div></div>)}
          </div>
      </div>
      <div className="flex-1 h-1/2 md:h-full relative bg-slate-200 overflow-hidden group">
          <img src={data.content.backgroundImage} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[8s] ease-out" alt="Visual Recon" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20"></div>
      </div>
    </div>
  );
};

export const ScrambleSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [shuffledItems, setShuffledItems] = useState<ScrambleItem[]>([]);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [complete, setComplete] = useState(false);
    useEffect(() => { if (data.content.items) { setShuffledItems([...data.content.items].sort(() => Math.random() - 0.5)); setSelectedIds([]); setComplete(false); } }, [data.id]);
    const handleSelect = (id: number) => { if (selectedIds.includes(id) || complete) return; if (id === selectedIds.length + 1) { const next = [...selectedIds, id]; setSelectedIds(next); if (next.length === data.content.items.length) setComplete(true); } };
    return (
        <div className="h-full w-full bg-[#1a1a1a] flex flex-col items-center justify-center p-4 overflow-hidden relative">
            <div className="relative z-10 w-full max-w-7xl h-full flex flex-col overflow-hidden">
                <div className="text-center py-4 shrink-0"><h3 className="text-3xl md:text-5xl font-black text-amber-500 uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-none">{data.title}</h3></div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch p-2 overflow-hidden">
                    <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-[2rem] border-4 border-slate-800 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-4 pb-10">
                            {shuffledItems.map((item) => { const isUsed = selectedIds.includes(item.id); return (<button key={item.id} onClick={() => handleSelect(item.id)} disabled={isUsed} className={`w-full p-4 rounded-xl text-left font-serif transition-all transform shadow-lg relative ${isUsed ? 'opacity-0 scale-50 pointer-events-none' : 'bg-[#fffcf0] border-l-[10px] border-amber-600 text-slate-800 hover:-translate-y-1 active:scale-95'}`}>{item.parts.join(' ')}</button>); })}
                        </div>
                    </div>
                    <div className="bg-slate-950/90 p-8 rounded-[2rem] border-4 border-slate-900 flex flex-col shadow-inner overflow-hidden">
                        <div className="flex-1 space-y-3 overflow-y-auto custom-scrollbar pr-2 pb-10">
                            {Array.from({ length: data.content.items.length }).map((_, i) => { const filledItem = data.content.items.find((item: any) => item.id === selectedIds[i]); return (<div key={i} className={`min-h-[60px] rounded-xl border flex items-center px-6 transition-all duration-500 ${filledItem ? 'bg-green-950/20 border-green-500 text-green-100' : 'bg-slate-900/30 border-slate-800 border-dashed text-slate-600'}`}><span className="mr-4 font-mono font-black">{i+1}</span><span className="italic">{filledItem ? filledItem.parts.join(' ') : '...'}</span></div>); })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const VerbChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());
    const toggleReveal = (idx: number) => { setRevealedIds(prev => { const next = new Set(prev); if (next.has(idx)) next.delete(idx); else next.add(idx); return next; }); };
    const getRule = (item: VerbChallengeItem) => { const base = item.base.toUpperCase(); if (base.endsWith('E')) return `${base} + D`; if (base.endsWith('Y') && item.past.toUpperCase().endsWith('IED')) return `${base} (Y ➔ IED)`; return `${base} + ED`; };
    return (
        <div className="h-full flex flex-col items-center p-2 bg-slate-900 overflow-y-auto pt-4 pb-12 custom-scrollbar">
            <div className="max-w-7xl w-full flex flex-col gap-6">
                <div className="text-center border-b-2 border-slate-800 pb-4"><h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase">{data.title}</h2></div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {data.content.verbs.map((item: VerbChallengeItem, idx: number) => {
                        const isRevealed = revealedIds.has(idx);
                        return (
                            <button key={idx} onClick={() => toggleReveal(idx)} className="h-32 md:h-40 perspective-1000 group relative transition-all duration-700 w-full active:scale-95">
                                <div className={`relative w-full h-full transition-all duration-700 preserve-3d ${isRevealed ? 'rotate-y-180' : ''}`}>
                                    <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center p-4 bg-slate-800 border-2 border-slate-700 rounded-2xl shadow-xl text-slate-300 font-black text-xl md:text-2xl uppercase">{item.base}</div>
                                    <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-4 bg-blue-900 border-2 border-blue-500 rounded-2xl shadow-inner text-white font-black text-2xl md:text-3xl uppercase"><span className="text-[9px] block mb-2 opacity-70">{getRule(item)}</span>{item.past}</div>
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

export const GrammarRecapSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-100 overflow-y-auto pt-10 pb-20 custom-scrollbar">
             <div className="max-w-6xl w-full">
                <div className="text-center mb-10"><h2 className="text-5xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2></div>
                <div className="bg-white border-4 border-blue-700 rounded-3xl p-8 shadow-2xl mb-12">
                    <h3 className="font-black text-blue-900 text-xl mb-6 flex items-center gap-4 uppercase tracking-tighter">THE FULL SENTENCE ENGINE</h3>
                    <div className="bg-slate-950 p-8 rounded-2xl font-mono text-center text-xl md:text-3xl text-white border-b-8 border-blue-900 shadow-inner flex flex-wrap justify-center items-center gap-3"><span className="bg-blue-600 px-3 py-1 rounded">SUBJECT</span><span>+</span><span className="bg-green-600 px-3 py-1 rounded">VERB+ed</span><span>+</span><span className="bg-amber-600 px-3 py-1 rounded">OBJECT</span><span>+</span><span className="bg-purple-600 px-3 py-1 rounded">PLACE</span><span>+</span><span className="bg-red-600 px-3 py-1 rounded">TIME</span></div>
                </div>
             </div>
        </div>
    );
};

export const TacticalDrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selections, setSelections] = useState<Record<number, string>>({});
    const [results, setResults] = useState<Record<number, boolean | null>>({});
    const handleSelect = (id: number, opt: string) => { if (results[id] !== undefined) return; const scenario = data.content.scenarios.find((s:any)=>s.id===id); setSelections({...selections, [id]: opt}); setResults({...results, [id]: scenario.correct === opt}); };
    return (
        <div className="h-full w-full bg-slate-900 text-white flex flex-col items-center p-4 overflow-y-auto pt-6 pb-20 custom-scrollbar">
             <div className="max-w-7xl w-full space-y-6">
                <div className="text-center border-b border-slate-800 pb-4"><h2 className="text-3xl md:text-5xl font-black font-mono text-blue-400 uppercase tracking-tighter">{data.title}</h2></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{data.content.scenarios.map((scenario: any) => (<div key={scenario.id} className={`p-5 rounded-xl border-2 transition-all shadow-xl flex flex-col justify-between ${results[scenario.id] === true ? 'bg-green-950/40 border-green-500' : results[scenario.id] === false ? 'bg-red-950/40 border-red-500' : 'bg-slate-950/30 border-slate-800'}`}><div><p className="text-base md:text-lg font-serif mb-4 leading-tight">{scenario.question.split('_______').map((part: string, i: number) => (<React.Fragment key={i}>{part}{i === 0 && <span className={`inline-block border-b-2 min-w-[60px] text-center font-black px-1 ${results[scenario.id] === true ? 'text-green-400 border-green-400' : results[scenario.id] === false ? 'text-red-500 border-red-500 line-through' : 'text-blue-400 border-blue-500'}`}>{selections[scenario.id] || "_______"}</span>}</React.Fragment>))}</p></div><div className="flex gap-2">{scenario.options.map((opt: string) => (<button key={opt} onClick={() => handleSelect(scenario.id, opt)} disabled={results[scenario.id] !== undefined} className={`flex-1 py-2 rounded text-xs font-mono font-black transition-all shadow-lg ${results[scenario.id] !== undefined ? (scenario.correct === opt ? 'bg-green-600' : (selections[scenario.id] === opt ? 'bg-red-600 opacity-50' : 'bg-slate-800 opacity-20')) : 'bg-blue-700 hover:bg-blue-600'}`}>{opt}</button>))}</div></div>))}</div>
             </div>
        </div>
    );
};

export const ClassroomGameSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedQ, setSelectedQ] = useState<{ cat: string; q: any } | null>(null);
    const [revealedA, setRevealedA] = useState(false);
    const [clickedTiles, setClickedTiles] = useState<Set<string>>(new Set());
    const updatedCategories = [{name: "ACTIONS (+ed)", questions: [{ points: 100, q: "Yesterday, Namık Ekin ____ (swim) for hours.", a: "swam" }, { points: 200, q: "The recruit ____ (clean) the deck yesterday.", a: "cleaned" }]}, {name: "QUESTIONS", questions: [{ points: 100, q: "____ you finish the mission?", a: "Did" }]}]; 
    return (
        <div className="h-full w-full bg-slate-950 text-white p-6 flex flex-col items-center overflow-y-auto custom-scrollbar">
             <div className="max-w-7xl w-full h-full flex flex-col gap-10">
                <div className="text-center border-b-4 border-slate-800 pb-8"><h2 className="text-5xl md:text-8xl font-black font-mono text-amber-500 uppercase tracking-tighter">{data.title}</h2></div>
                {!selectedQ ? (<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 pb-20">{updatedCategories.map((cat: any) => (<div key={cat.name} className="flex flex-col gap-6"><div className="bg-slate-900 p-8 text-center font-mono font-black text-xl border-b-[12px] border-amber-600 rounded-3xl">{cat.name}</div>{cat.questions.map((q: any) => <button key={q.points} onClick={() => { setSelectedQ({ cat: cat.name, q }); setRevealedA(false); setClickedTiles(new Set(clickedTiles).add(`${cat.name}-${q.points}`)); }} className={`flex-1 min-h-[120px] flex items-center justify-center text-7xl font-black font-mono rounded-[2.5rem] border-8 shadow-2xl ${clickedTiles.has(`${cat.name}-${q.points}`) ? 'bg-slate-900 border-slate-800 text-slate-800 grayscale' : 'bg-blue-900 border-blue-700 text-amber-400 hover:bg-blue-700'}`}>{q.points}</button>)}</div>))}</div>) : (<div className="flex-1 flex flex-col items-center justify-center p-12 bg-slate-900 border-[16px] border-amber-600 rounded-[4rem] mx-4 md:mx-20 my-10 relative"><span className="text-amber-500 font-mono text-3xl mb-6 uppercase font-black">{selectedQ.cat} // {selectedQ.q.points}</span><h3 className="text-5xl md:text-8xl font-black text-center mb-24 font-serif text-white">{selectedQ.q.q}</h3><div className="flex flex-col gap-8 w-full max-w-4xl">{revealedA && <div className="p-14 bg-green-600/20 border-8 border-green-500 rounded-[3rem] text-center text-6xl md:text-9xl font-black text-green-400 uppercase">{selectedQ.q.a}</div>}<div className="flex flex-col md:flex-row gap-6">{!revealedA && <button onClick={() => setRevealedA(true)} className="flex-1 bg-amber-600 text-slate-950 py-10 font-black rounded-[2rem] text-4xl hover:bg-amber-500 uppercase">REVEAL</button>}<button onClick={() => setSelectedQ(null)} className="flex-1 bg-slate-800 hover:bg-slate-700 py-10 font-black rounded-[2rem] text-4xl uppercase border-8 border-slate-700">RETURN</button></div></div></div>)}
             </div>
        </div>
    );
};

export const GrammarAnalysisSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full w-full bg-slate-50 p-6 md:p-12 overflow-y-auto custom-scrollbar">
             <div className="max-w-5xl w-full mx-auto">
                <div className="text-center mb-10 border-b-2 border-slate-200 pb-6"><h2 className="text-3xl font-mono font-black text-slate-900 uppercase tracking-tighter">{data.title}</h2></div>
                <div className="flex flex-col gap-6">{data.content.cards?.map((card: any, idx: number) => (<div key={idx} className="bg-white border border-slate-200 rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden"><div className="w-full md:w-1/3 bg-blue-50 p-6 flex flex-col justify-center border-b md:border-b-0 md:border-r border-blue-100"><h3 className="font-bold text-blue-900 text-xl mb-2">{card.title}</h3><div className="bg-white text-blue-700 font-mono text-2xl font-black px-4 py-2 rounded border border-blue-200 self-start shadow-sm">{card.suffixDisplay}</div></div><div className="w-full md:w-2/3 p-6 flex flex-col justify-center font-serif italic text-slate-800 text-xl font-black">{card.contextSentence}</div></div>))}</div>
             </div>
        </div>
    );
};

export const DailyReportSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [inputs, setInputs] = useState<Record<number, string>>({});
    const [submitted, setSubmitted] = useState(false);
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-200 overflow-y-auto pt-10 pb-24">
            <div className="w-full max-w-5xl bg-white shadow-2xl min-h-[700px] flex flex-col md:flex-row overflow-hidden rounded-3xl border-8 border-slate-900">
                <div className="bg-slate-900 text-white p-8 md:w-24 flex md:flex-col items-center justify-center border-r border-slate-700 shrink-0"><div className="md:-rotate-90 font-mono font-black tracking-[0.5em] uppercase text-2xl whitespace-nowrap">CADET LOG</div></div>
                <div className="flex-1 p-10 md:p-16 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')]"><div className="font-serif text-2xl md:text-3xl leading-[1.8] text-slate-800">{data.content.segments?.map((seg: any, idx: number) => seg.type === 'text' ? <span key={idx} className="whitespace-pre-wrap">{seg.value}</span> : <span key={idx} className="inline-block relative mx-2"><input type="text" value={inputs[seg.id] || ""} onChange={(e) => { setInputs({...inputs, [seg.id]: e.target.value}); setSubmitted(false); }} placeholder={`(${seg.hint})`} className={`border-b-4 px-3 py-1 outline-none w-48 text-center font-mono font-black transition-all bg-transparent ${submitted ? ((inputs[seg.id] || "").trim().toLowerCase() === seg.answer.toLowerCase() ? 'text-green-600 border-green-500' : 'text-red-600 border-red-500') : 'border-slate-300 focus:border-blue-600'}`} /></span>)}</div><div className="mt-16 flex justify-center"><button onClick={() => setSubmitted(true)} className="bg-blue-800 text-white font-mono font-black py-5 px-14 rounded-2xl shadow-2xl uppercase tracking-[0.3em] hover:bg-blue-900 active:scale-95 border-b-8 border-blue-950">SUBMIT REPORT</button></div></div>
            </div>
        </div>
    );
};

export const ReadingChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (<div className="h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto custom-scrollbar"><div className="w-full bg-slate-900 border-b border-white/10 p-6 sticky top-0 z-20 flex justify-between items-center shadow-2xl"><h2 className="text-3xl font-black font-mono text-red-600 uppercase tracking-widest">{data.title}</h2></div><div className="max-w-6xl mx-auto w-full p-6 md:p-12 space-y-10 pb-32"><div className="bg-slate-900/50 p-10 md:p-16 rounded-3xl font-serif text-2xl md:text-3xl leading-[2] text-slate-200 shadow-2xl border border-white/5 backdrop-blur-xl">Reading Challenge Content Here</div></div></div>);
};

export const LegendDossierSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (<div className="h-full w-full bg-[#0a0a0a] text-white p-6 overflow-y-auto custom-scrollbar"><div className="max-w-7xl mx-auto space-y-10"><div className="text-center"><h2 className="text-4xl md:text-6xl font-black font-mono text-amber-500 uppercase tracking-tighter">{data.title}</h2></div><div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-20">{data.content.folders?.map((folder: any) => (<div key={folder.id} className="p-8 rounded-[2rem] border-4 bg-slate-900 border-slate-800"><div className="flex justify-between items-center mb-6"><span className="font-mono text-xs font-black text-slate-500 tracking-[0.3em] uppercase">{folder.label}</span></div><p className="text-xl md:text-2xl font-serif leading-relaxed mb-8 italic">{folder.text}</p></div>))}</div></div></div>);
};

export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full bg-slate-900 flex items-center justify-center p-6 text-white overflow-hidden relative">
        <div className="max-w-4xl w-full relative z-10 bg-slate-950/80 backdrop-blur-3xl p-10 md:p-20 rounded-[4rem] border-8 border-slate-900 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
            <div className="text-center mb-16"><div className="inline-block bg-green-600 text-white px-6 py-2 rounded-full font-mono font-black text-sm uppercase tracking-[0.5em] mb-6 shadow-[0_0_30px_rgba(22,163,74,0.6)] animate-bounce">Mission Complete</div><h2 className="text-5xl md:text-8xl font-black font-mono uppercase tracking-tighter drop-shadow-2xl">{data.title}</h2></div>
            <div className="space-y-6">{data.content.checklist?.map((item: any, idx: number) => (<div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border-2 border-slate-800 flex justify-between items-center"><span className="text-xl md:text-3xl font-mono font-black text-slate-300">{item.text}</span><div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">✓</div></div>))}</div>
        </div>
    </div>
  );
};

export const ChecklistSlide: React.FC<{ data: SlideData }> = () => null;
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
