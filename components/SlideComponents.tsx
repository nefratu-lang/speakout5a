import React, { useState, useRef, useEffect } from 'react';
import { SlideData, QuestionTF, QuestionMC, GrammarItem, Vocabulary, KeyPoint, DrillItem, GrammarBankSection, GrammarBankItem, MatchingPair, ChecklistItem, QAItem, ScrambleItem, DebriefItem, ImperativeSign, MissionLogStep, GrammarQuizItem, VerbChallengeItem } from '../types';

// --- HELPER: Text Reference Modal (DARK MODE ENHANCED) ---
interface HighlightData {
    id: number | string;
    text: string;
    colorClass: string;
}

// Updated colors for dark mode visibility (brighter/neon)
const HIGHLIGHT_COLORS = [
    'bg-yellow-900/50 border-yellow-500 text-yellow-200',
    'bg-green-900/50 border-green-500 text-green-200',
    'bg-blue-900/50 border-blue-500 text-blue-200',
    'bg-pink-900/50 border-pink-500 text-pink-200',
];

const TextReferenceModal: React.FC<{ text?: string; highlights?: HighlightData[] }> = ({ text, highlights = [] }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!text) return null;

    const renderHighlightedText = () => {
        if (!highlights || highlights.length === 0) return text;

        let parts: { text: string; highlight?: HighlightData }[] = [{ text }];

        highlights.forEach(h => {
            if (!h.text || h.text.trim() === "") return;
            const safeText = h.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const pattern = new RegExp(`(${safeText})`, 'g');
            
            const newParts: typeof parts = [];
            parts.forEach(p => {
                if (p.highlight) {
                    newParts.push(p);
                } else {
                    const split = p.text.split(pattern);
                    split.forEach(s => {
                        if (s === h.text) {
                            newParts.push({ text: s, highlight: h });
                        } else {
                            newParts.push({ text: s });
                        }
                    });
                }
            });
            parts = newParts;
        });

        return parts.map((part, i) => {
            if (part.highlight) {
                return (
                    <span key={i} className={`${part.highlight.colorClass} font-mono px-1 mx-0.5 rounded border border-dashed`}>
                        <sup className="text-[0.6em] font-bold mr-1 bg-black/30 px-1 rounded">REF-{part.highlight.id}</sup>
                        {part.text}
                    </span>
                );
            }
            return <span key={i}>{part.text}</span>;
        });
    };

    return (
        <>
            <button 
                onClick={() => setIsOpen(true)}
                className="absolute top-2 right-2 md:top-4 md:right-4 z-30 bg-ocean-100 hover:bg-ocean-200 text-gold-400 font-mono text-xs md:text-sm border border-gold-500/50 px-3 py-2 rounded shadow-[0_0_10px_rgba(234,179,8,0.2)] flex items-center gap-2 transition-all active:scale-95"
            >
                <span className="animate-pulse">📂</span>
                <span className="hidden md:inline">OPEN INTEL</span>
                <span className="md:hidden">INTEL</span>
            </button>

            {isOpen && (
                <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-200">
                    <div className="bg-ocean-100 w-full max-w-4xl max-h-full rounded border border-ocean-300 shadow-[0_0_50px_rgba(59,130,246,0.1)] flex flex-col relative">
                        <div className="bg-ocean-50/50 border-b border-ocean-200 p-3 md:p-4 flex justify-between items-center shrink-0">
                             <div className="flex flex-col">
                                <h3 className="font-mono font-bold text-lg md:text-xl text-gold-400 tracking-widest uppercase">CLASSIFIED INTEL</h3>
                                <p className="text-ocean-400 text-[10px] md:text-xs">EYES ONLY</p>
                             </div>
                             <button onClick={() => setIsOpen(false)} className="text-ocean-400 hover:text-white font-mono text-xl px-2">[CLOSE]</button>
                        </div>
                        
                        <div className="p-4 md:p-8 overflow-y-auto custom-scrollbar font-serif text-base md:text-xl leading-relaxed text-slate-300 whitespace-pre-wrap">
                            {renderHighlightedText()}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};


// --- Cover Slide ---
export const CoverSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden bg-black text-white">
       <div className="absolute inset-0 z-0">
          <img src={data.content.backgroundImage} alt="Cover" className="w-full h-full object-cover opacity-30 grayscale contrast-125" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
       </div>

       <div className="relative z-10 text-center px-4 animate-in zoom-in duration-1000 w-full max-w-4xl border-y-2 border-gold-500/30 py-10 bg-black/40 backdrop-blur-sm">
          <div className="mb-4 flex justify-center">
             <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-2 border-gold-500 flex items-center justify-center text-4xl md:text-5xl shadow-[0_0_30px_rgba(234,179,8,0.4)] bg-black">⚓</div>
          </div>
          <h1 className="text-4xl md:text-7xl font-mono font-bold text-slate-100 mb-2 tracking-tighter uppercase drop-shadow-2xl">{data.title}</h1>
          <p className="text-sm md:text-xl text-gold-400 font-mono tracking-[0.3em] uppercase">{data.subtitle}</p>
          
          <div className="mt-12 md:mt-16 animate-pulse">
            <p className="text-xs md:text-sm text-ocean-400 font-mono mb-2">[ TAP TO INITIALIZE ]</p>
            <span className="text-2xl text-gold-500">▼</span>
          </div>
       </div>
    </div>
  );
};

// --- Objectives Slide (TACTICAL LIST) ---
export const ObjectivesSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  return (
    <div className="h-full w-full flex flex-col items-center p-4 md:p-8 overflow-y-auto bg-slate-900 text-slate-200">
      <div className="max-w-6xl w-full flex flex-col gap-4 md:gap-6 pb-20">
        
        <div className="border-b border-ocean-300 pb-4 mb-2">
           <h2 className="text-2xl md:text-4xl font-mono font-bold text-white mb-1">{data.title}</h2>
           <p className="text-ocean-400 font-mono text-xs md:text-sm uppercase tracking-widest">/// {data.subtitle} ///</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Main Objectives */}
            <div className="bg-ocean-100/50 border border-ocean-300 p-6 rounded-sm shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 text-ocean-300 opacity-20 text-6xl font-black">01</div>
                <h3 className="text-gold-400 font-mono font-bold mb-4 flex items-center gap-2"><span className="w-2 h-2 bg-gold-400 rounded-full"></span> PRIMARY TARGETS</h3>
                <ul className="space-y-3 font-mono text-sm md:text-base">
                    {data.content.objectives.map((obj: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 border-l-2 border-ocean-300 pl-3">
                            <span className="text-blue-400 font-bold">></span>
                            {obj}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Grammar Focus */}
            <div className="bg-ocean-100/30 border border-ocean-300 p-6 rounded-sm">
                <h3 className="text-blue-400 font-mono font-bold mb-4">SYSTEM MECHANICS (GRAMMAR)</h3>
                <div className="flex flex-col gap-2">
                    {data.content.grammar.map((g: string, i: number) => (
                        <div key={i} className="bg-black/30 px-3 py-2 border-l-4 border-blue-500 text-slate-300 font-mono text-xs md:text-sm">{g}</div>
                    ))}
                </div>
            </div>

             {/* Vocabulary */}
             <div className="md:col-span-2 bg-black/40 border border-ocean-300 p-6 rounded-sm">
                <h3 className="text-green-400 font-mono font-bold mb-4">DATA PACKETS (VOCABULARY)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                     {data.content.vocabulary.map((v: string, i: number) => (
                        <span key={i} className="bg-ocean-100 px-2 py-1 text-slate-300 text-xs font-mono border border-ocean-200/50 truncate hover:text-white hover:border-gold-500 transition-colors">{v}</span>
                    ))}
                </div>
            </div>
            
            {/* Importance */}
            <div className="md:col-span-2 bg-gold-900/10 border border-gold-600/30 p-4 text-center">
                 <p className="text-gold-200 font-serif italic text-sm md:text-lg">"{data.content.importance}"</p>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- Ice Breaker (RADAR / SCANNER THEME) ---
export const IceBreakerSlide: React.FC<{ data: SlideData; onNext?: () => void }> = ({ data, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const content = data.content;

  useEffect(() => {
    setSelectedOption(null);
  }, [data.id]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4 relative bg-black text-white overflow-y-auto">
      {/* Radar Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] border border-green-500/10 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] border border-green-500/10 rounded-full"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] border border-green-500/10 rounded-full"></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,20,0,0.8),black)]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col bg-ocean-100/80 backdrop-blur-md border border-ocean-300/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] p-1 shrink-0 pb-10">
          <div className="p-4 border-b border-ocean-300/30 bg-black/40">
               <h2 className="text-green-400 font-mono text-xs tracking-[0.2em] animate-pulse">>>> INCOMING TRANSMISSION</h2>
          </div>

          <div className="p-6 md:p-10 flex flex-col items-center">
              <h3 className="text-xl md:text-3xl font-bold mb-8 text-center font-mono">{content.question}</h3>
              
              <div className="flex flex-col md:flex-row gap-4 w-full">
                  {content.options.map((option: any, idx: number) => (
                      <button 
                        key={idx}
                        onClick={() => setSelectedOption(idx)}
                        className={`flex-1 p-6 border-2 transition-all group relative overflow-hidden ${selectedOption === idx ? 'border-gold-500 bg-gold-900/20' : 'border-ocean-300 bg-black/50 hover:border-ocean-200'}`}
                      >
                          <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{option.icon}</div>
                          <div className="text-left">
                              <div className="text-lg font-bold font-mono text-white mb-1">{option.text}</div>
                              <div className="text-xs text-ocean-400">{option.subtext}</div>
                          </div>
                          {selectedOption === idx && <div className="absolute top-2 right-2 text-gold-500 text-xs font-mono">[SELECTED]</div>}
                      </button>
                  ))}
              </div>
              
              <div className="mt-8 text-center border-t border-ocean-300/20 pt-4 w-full">
                  <p className="text-ocean-400 text-xs font-mono">{content.prompt}</p>
              </div>
          </div>
      </div>
    </div>
  );
};

// --- Reading (ARCHIVE FILE THEME) ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);

  const renderInteractiveText = (text: string) => {
    const parts = text.split(/(\b)/); 
    return parts.map((part, index) => {
      const vocabMatch = data.content.vocabulary?.find((v: Vocabulary) => v.word.toLowerCase() === part.toLowerCase());
      if (vocabMatch) {
        return (
          <span 
            key={index} 
            onClick={(e) => { e.stopPropagation(); setActiveVocab(vocabMatch); }}
            className={`cursor-pointer font-bold text-gold-300 hover:text-white hover:bg-gold-600/50 px-1 rounded transition-colors ${activeVocab === vocabMatch ? 'bg-gold-600 text-white' : ''}`}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const paragraphs = data.content.text.split(/\n\s*\n/);

  return (
    <div className="h-full w-full flex flex-col relative overflow-hidden bg-slate-900" onClick={() => setActiveVocab(null)}>
      
      {/* Main Content */}
      <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header */}
          <div className="p-4 bg-ocean-100 border-b border-ocean-300 flex justify-between items-center shadow-md">
             <div>
                <h2 className="text-lg md:text-2xl font-mono font-bold text-white uppercase tracking-wider">{data.title}</h2>
                <p className="text-xs text-gold-500 font-mono">SECURE ARCHIVE /// {data.subtitle}</p>
             </div>
          </div>

          {/* Text Area */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-12">
             <div className="max-w-4xl mx-auto bg-black/20 p-6 md:p-10 border-l-4 border-gold-600">
                <div className="font-serif text-lg md:text-2xl leading-relaxed text-slate-300 space-y-6">
                   {paragraphs.map((para: string, pIdx: number) => (
                     <p key={pIdx}>{renderInteractiveText(para)}</p>
                   ))}
                </div>
                
                {/* Images in Text */}
                {data.content.backgroundImage && (
                    <div className="mt-8 border border-ocean-300 p-1 bg-ocean-100/50 transform rotate-1 shadow-lg w-full md:w-2/3 mx-auto">
                        <img src={data.content.backgroundImage} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" alt="Historical Evidence" />
                        <div className="text-center text-[10px] font-mono text-ocean-400 mt-1">FIG. 1.A - HISTORICAL RECORD</div>
                    </div>
                )}
             </div>
          </div>

          {/* Vocab Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-ocean-100 border-t-4 border-gold-500 p-6 transition-transform duration-300 ${activeVocab ? 'translate-y-0' : 'translate-y-full'}`}>
              {activeVocab && (
                  <div className="flex justify-between items-start max-w-4xl mx-auto">
                      <div>
                          <div className="text-xs text-gold-500 font-mono mb-1">DEFINITION:</div>
                          <h4 className="text-3xl font-bold text-white capitalize mb-2">{activeVocab.word}</h4>
                          <p className="text-lg text-slate-300 font-serif">"{activeVocab.definition}"</p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setActiveVocab(null); }} className="text-ocean-400 hover:text-white text-xl">✕</button>
                  </div>
              )}
          </div>
      </div>
    </div>
  );
};

// --- NEW COMPONENT: VERB CHALLENGE (Tactical Grid) ---
export const VerbChallengeSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [revealed, setRevealed] = useState<Record<string, boolean>>({});

    const handleReveal = (base: string) => {
        setRevealed(prev => ({ ...prev, [base]: true }));
    };

    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-900 overflow-y-auto">
            <div className="max-w-6xl w-full flex flex-col gap-6 pb-20">
                <div className="text-center border-b border-ocean-300 pb-4">
                    <h2 className="text-3xl md:text-5xl font-mono font-black text-white uppercase tracking-tighter">{data.title}</h2>
                    <p className="text-green-500 font-mono animate-pulse">{data.subtitle}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {data.content.verbs.map((item: VerbChallengeItem, idx: number) => {
                        const isRevealed = revealed[item.base];
                        return (
                            <button
                                key={idx}
                                onClick={() => handleReveal(item.base)}
                                className={`h-24 md:h-32 border-2 relative overflow-hidden transition-all duration-300 group ${isRevealed ? 'border-green-500 bg-green-900/20' : 'border-ocean-300 bg-ocean-100 hover:border-gold-400'}`}
                            >
                                <div className="absolute top-2 left-2 text-[10px] font-mono text-ocean-400 uppercase">
                                    V-CODE: {idx + 1}
                                </div>
                                <div className="flex flex-col items-center justify-center h-full">
                                    {isRevealed ? (
                                        <>
                                            <span className="text-xs text-green-500 font-mono mb-1">PAST FORM:</span>
                                            <span className="text-xl md:text-2xl font-black text-white uppercase tracking-wider animate-in zoom-in">{item.past}</span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-lg md:text-xl font-bold text-slate-300 uppercase group-hover:text-gold-400">{item.base}</span>
                                            <span className="text-[10px] text-ocean-500 mt-2 font-mono group-hover:text-white">[CLICK TO DECRYPT]</span>
                                        </>
                                    )}
                                </div>
                                {isRevealed && (
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};


// --- Comprehension MC (TACTICAL QUIZ) ---
export const ComprehensionMCSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [selections, setSelections] = useState<Record<number, number>>({});

  const highlights = data.content.questions.map((q: QuestionMC, index: number) => ({
      id: q.id,
      text: q.contextHighlight || '',
      colorClass: HIGHLIGHT_COLORS[index % HIGHLIGHT_COLORS.length]
  })).filter((h: HighlightData) => h.text !== '');

  return (
    <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-900 justify-start pt-8 pb-20 relative">
      <TextReferenceModal text={data.content.referenceText} highlights={highlights} />

      <div className="w-full max-w-6xl relative z-10 shrink-0">
         <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-mono font-bold text-white uppercase">{data.subtitle}</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mt-2"></div>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.content.questions.map((q: QuestionMC, idx: number) => {
               const selection = selections[q.id];
               const showResult = selection !== undefined;
               
               return (
                  <div key={q.id} className="bg-ocean-100 border border-ocean-300 p-4 rounded-sm flex flex-col gap-4 hover:border-blue-500 transition-colors">
                     <div className="flex gap-3">
                        <div className="w-8 h-8 bg-black border border-ocean-300 flex items-center justify-center font-mono text-xs text-blue-400 shrink-0">0{q.id}</div>
                        <h4 className="text-white font-bold text-lg">{q.question}</h4>
                     </div>
                     <div className="space-y-2">
                        {q.options.map((opt, optIdx) => {
                           let btnClass = "w-full text-left p-3 border font-mono text-sm transition-all relative ";
                           if (showResult) {
                              if (optIdx === q.correctIndex) btnClass += "bg-green-900/50 border-green-500 text-green-100";
                              else if (optIdx === selection) btnClass += "bg-red-900/50 border-red-500 text-red-100";
                              else btnClass += "border-transparent opacity-30";
                           } else {
                              btnClass += "bg-transparent border-ocean-300 text-slate-300 hover:bg-ocean-200 hover:text-white";
                           }
                           return (
                              <button key={optIdx} onClick={() => !showResult && setSelections(prev => ({...prev, [q.id]: optIdx}))} className={btnClass}>
                                 <span className="opacity-50 mr-2">[{String.fromCharCode(65+optIdx)}]</span> {opt}
                              </button>
                           );
                        })}
                     </div>
                     {showResult && (
                         <div className="text-xs font-mono text-ocean-400 border-t border-ocean-300/30 pt-2 mt-auto">
                             > ANALYSIS: {q.explanation}
                         </div>
                     )}
                  </div>
               );
            })}
         </div>
      </div>
    </div>
  );
};

// --- Grammar (ENGINE ROOM LOGIC) ---
export const GrammarSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const checkAnswers = () => setChecked(true);

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 overflow-y-auto pb-20 bg-slate-900">
      <div className="bg-ocean-100 border border-ocean-300 p-8 max-w-4xl w-full shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
        
        <div className="text-center mb-8">
            <h3 className="text-2xl font-mono font-bold text-white">{data.title}</h3>
            <p className="text-ocean-400 font-mono text-sm">{data.subtitle}</p>
        </div>

        <div className="space-y-6">
          {data.content.items.map((item: GrammarItem) => {
             const userVal = (inputs[item.id] || "").toLowerCase().trim();
             const possibleAnswers = item.correctAnswer.split('/').map(s => s.trim().toLowerCase());
             const isCorrect = possibleAnswers.includes(userVal);
             return (
               <div key={item.id} className="flex flex-wrap items-center text-lg md:text-2xl border-b border-ocean-200/20 pb-2 text-slate-300">
                 <span className="text-gold-500 font-mono text-sm mr-4">0{item.id}</span>
                 <span className="mr-2">{item.prefix}</span>
                 <input 
                    type="text" 
                    value={inputs[item.id] || ""} 
                    onChange={(e) => { setChecked(false); setInputs({...inputs, [item.id]: e.target.value}); }} 
                    className={`bg-black/50 border-b-2 text-center w-32 font-mono text-white focus:outline-none transition-colors ${checked ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-ocean-300 focus:border-gold-400'}`} 
                 />
                 <span className="ml-2">{item.suffix}</span>
               </div>
             );
          })}
        </div>
        
        <div className="mt-10 flex justify-center">
          <button onClick={checkAnswers} className="bg-gold-600 hover:bg-gold-500 text-black font-bold font-mono py-3 px-12 uppercase tracking-widest shadow-[0_0_20px_rgba(234,179,8,0.3)]">
            Verify Logic
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Drill (TARGET PRACTICE) ---
export const DrillSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-slate-900 overflow-y-auto pb-20">
             <div className="max-w-4xl w-full">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{data.title}</h3>
                    <p className="text-red-400 font-mono animate-pulse">{data.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.content.items && data.content.items.map((item: DrillItem) => (
                        <div key={item.id} className="p-6 bg-ocean-100 border border-ocean-300 flex flex-col items-center text-center hover:bg-ocean-200 transition-colors">
                             <div className="text-4xl mb-2 text-gold-500 font-black">
                                 {item.text.split('->')[1]?.trim() || "???"}
                             </div>
                             <div className="text-xs font-mono text-ocean-400 uppercase tracking-widest">
                                 BASE: {item.text.split('->')[0]}
                             </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
};

// --- Matching (DECRYPTION) ---
export const MatchingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [matchedIds, setMatchedIds] = useState<number[]>([]);
    const [rightItems, setRightItems] = useState<MatchingPair[]>([]);
    
    useEffect(() => {
        if (data.content.pairs) {
            setRightItems([...(data.content.pairs as MatchingPair[])].sort(() => Math.random() - 0.5));
        }
    }, [data.content.pairs]);

    const handleLeftClick = (id: number) => {
        if (matchedIds.includes(id)) return;
        setSelectedId(id === selectedId ? null : id);
    };

    const handleRightClick = (id: number) => {
        if (matchedIds.includes(id)) return;
        if (selectedId === null) return;
        if (selectedId === id) {
            setMatchedIds([...matchedIds, id]);
            setSelectedId(null);
        } else {
            setSelectedId(null);
        }
    };

    return (
        <div className="h-full flex flex-col items-center p-4 overflow-y-auto bg-slate-900 justify-start pt-10 pb-20">
             <div className="max-w-6xl w-full shrink-0">
                <div className="text-center mb-8">
                    <h3 className="text-3xl font-mono font-bold text-white">{data.title}</h3>
                    <p className="text-ocean-400">{data.subtitle}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
                    {/* Left Column */}
                    <div className="flex-1 space-y-3">
                        {data.content.pairs.map((pair: MatchingPair) => {
                            const isMatched = matchedIds.includes(pair.id);
                            const isSelected = selectedId === pair.id;
                            
                            return (
                                <button
                                    key={pair.id}
                                    onClick={() => handleLeftClick(pair.id)}
                                    disabled={isMatched}
                                    className={`w-full p-4 text-left border font-mono text-sm transition-all ${
                                        isMatched ? 'border-green-500 text-green-500 opacity-50 bg-black' :
                                        isSelected ? 'border-gold-500 bg-gold-900/20 text-white' :
                                        'border-ocean-300 bg-ocean-100 text-slate-300 hover:border-ocean-200'
                                    }`}
                                >
                                    <span className="text-xs opacity-50 mr-2">CODE-{pair.id}</span>
                                    {pair.left}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Column */}
                    <div className="flex-1 space-y-3">
                         {rightItems.map((pair: MatchingPair) => {
                            const isMatched = matchedIds.includes(pair.id);
                            
                            return (
                                <button
                                    key={pair.id}
                                    onClick={() => handleRightClick(pair.id)}
                                    disabled={isMatched}
                                    className={`w-full p-4 text-right border font-mono text-sm transition-all ${
                                        isMatched ? 'border-green-500 text-green-500 opacity-50 bg-black' :
                                        (selectedId !== null && !isMatched) ? 'border-blue-500 bg-blue-900/20 text-white animate-pulse cursor-pointer' :
                                        'border-ocean-300 bg-ocean-100 text-slate-300 opacity-50'
                                    }`}
                                >
                                     {pair.right}
                                </button>
                            );
                         })}
                    </div>
                </div>
             </div>
        </div>
    );
};

// --- Debrief (PROMOTION CEREMONY) ---
export const DebriefSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    const [promoted, setPromoted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setPromoted(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="h-full w-full flex items-center justify-center bg-black relative overflow-hidden">
             {/* Background Particles */}
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse"></div>

             <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
                 <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tighter">{data.title}</h1>
                 <p className="text-gold-500 font-mono text-xl tracking-[0.5em] mb-12">{data.subtitle}</p>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-8">
                     {data.content.checklist.map((item: DebriefItem, i: number) => (
                         <div key={i} className="bg-ocean-100 border border-ocean-300 p-4 flex justify-between items-center opacity-0 animate-in slide-in-from-bottom-5 fill-mode-forwards" style={{animationDelay: `${i * 200}ms`}}>
                             <span className="font-mono text-ocean-400 text-sm">{item.text}</span>
                             <span className="font-bold text-green-400">{item.reflection}</span>
                         </div>
                     ))}
                 </div>

                 {/* Rank Badge Animation */}
                 <div className={`mt-12 transition-all duration-1000 transform ${promoted ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                     <div className="w-48 h-48 bg-gold-600 rounded-full flex items-center justify-center shadow-[0_0_100px_rgba(234,179,8,0.6)] relative">
                         <div className="absolute inset-0 border-4 border-white rounded-full animate-ping opacity-20"></div>
                         <span className="text-7xl">⭐⭐</span>
                     </div>
                     <div className="text-center mt-6 text-gold-300 font-mono text-sm">AUTHORIZATION CODE: DELTA-9</div>
                 </div>
             </div>
        </div>
    );
};

// Placeholders for other types to prevent errors, styled minimally
export const ChecklistSlide: React.FC<{ data: SlideData }> = ({ data }) => {
    return (
        <div className="h-full flex flex-col items-center p-4 bg-slate-900 pt-10">
            <div className="bg-ocean-100 border border-ocean-300 p-8 w-full max-w-4xl">
                 <h3 className="text-white font-mono text-2xl mb-6">{data.title}</h3>
                 <div className="space-y-4">
                     {data.content.items.map((item: ChecklistItem) => (
                         <div key={item.id} className="flex items-center gap-4 text-slate-300 border-b border-ocean-200 pb-2">
                             <div className="w-6 h-6 border border-gold-500 flex items-center justify-center text-gold-500 text-xs">{item.isCorrect ? '✓' : ''}</div>
                             <span>{item.text}</span>
                         </div>
                     ))}
                 </div>
            </div>
        </div>
    );
}

export const MediaSlide: React.FC<{ data: SlideData }> = () => <div className="text-white">Media Placeholder</div>;
export const LogicPuzzleSlide: React.FC<{ data: SlideData }> = () => null;
export const ComprehensionTFSlide: React.FC<{ data: SlideData }> = () => null;
export const SpeakingSlide: React.FC<{ data: SlideData }> = () => null;
export const QASlide: React.FC<{ data: SlideData }> = () => null;
export const ScrambleSlide: React.FC<{ data: SlideData }> = () => null;
export const MissionLogSlide: React.FC<{ data: SlideData }> = () => null;
export const GrammarBankSlide: React.FC<{ data: SlideData }> = () => null;
export const ImperativesSlide: React.FC<{ data: SlideData }> = ({data}) => {
    // Reusing the Drill layout mostly
     return (
        <div className="h-full flex flex-col items-center justify-center p-4 bg-slate-900 overflow-y-auto pb-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl">
                {data.content.signs?.map((sign: ImperativeSign, i: number) => (
                    <div key={i} className="bg-ocean-100 border border-ocean-300 p-6 flex flex-col items-center justify-center gap-4 hover:border-gold-500 group transition-all cursor-pointer h-40">
                         <span className="text-4xl grayscale group-hover:grayscale-0">{sign.icon}</span>
                         <span className="font-mono text-white text-sm bg-black px-2 py-1">{sign.rule}</span>
                    </div>
                ))}
            </div>
        </div>
     )
};