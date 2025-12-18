// --- Reading Slide (Tam Görünüm Fix) ---
export const ReadingSlide: React.FC<{ data: SlideData }> = ({ data }) => {
  const [activeVocab, setActiveVocab] = useState<Vocabulary | null>(null);
  const [foundCount, setFoundCount] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const totalVerbs = useMemo(() => {
    return (data.content.text.match(/\*\*/g) || []).length / 2;
  }, [data.content.text]);

  const isComplete = foundCount === totalVerbs && totalVerbs > 0;

  useEffect(() => {
    setFoundCount(0);
    setActiveVocab(null);
    setIsZoomed(false);
  }, [data.id]);

  const paragraphs = data.content.text.split(/\n\s*\n/);
  
  return (
    <div key={data.id} className="h-full w-full flex flex-col md:flex-row bg-white overflow-hidden animate-in fade-in duration-500">
      {/* SOL TARAF: METİN ALANI */}
      <div className="flex-1 flex flex-col relative h-1/2 md:h-full overflow-y-auto border-r border-slate-200 custom-scrollbar z-10 bg-white">
          <div className="p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-20 flex justify-between items-center px-6 shadow-sm">
             <div>
                <h2 className="text-2xl font-black font-mono text-slate-900 uppercase tracking-tighter">{data.title}</h2>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-0.5">Find verbs in the text!</p>
             </div>
             <div className={`transition-all duration-500 px-4 py-2 rounded-xl font-mono font-black shadow-lg flex flex-col items-center min-w-[120px] ${isComplete ? 'bg-green-600 scale-105' : 'bg-blue-600'}`}>
                <span className="text-[10px] uppercase opacity-80">{isComplete ? 'Mission' : 'Progress'}</span>
                <span className="text-xl flex items-center gap-2">
                    {foundCount} / {totalVerbs}
                    {isComplete && <span className="text-white animate-in zoom-in">✓</span>}
                </span>
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
                      <button key={idx} onClick={() => setActiveVocab(v)} className="whitespace-nowrap px-5 py-2.5 bg-white border-2 border-slate-200 text-slate-800 text-sm font-mono font-black rounded-xl shadow-sm hover:border-blue-600 hover:text-blue-700 transition-all active:scale-95">
                          {v.word}
                      </button>
                  ))}
              </div>
               {activeVocab && (
                   <div className="absolute bottom-full left-0 right-0 bg-white border-t-8 border-blue-600 p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] z-30 animate-in slide-in-from-bottom-5">
                       <div className="flex justify-between items-start max-w-3xl mx-auto">
                           <div>
                               <span className="text-blue-600 font-mono text-[10px] uppercase font-black tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">Dictionary</span>
                               <div className="font-black text-slate-900 text-3xl mt-3">{activeVocab.word}</div>
                               <div className="text-slate-700 text-xl italic mt-4 leading-relaxed font-serif bg-slate-50 p-4 rounded-xl border-l-4 border-slate-200">{activeVocab.definition}</div>
                           </div>
                           <button onClick={() => setActiveVocab(null)} className="text-2xl bg-slate-100 w-12 h-12 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 transition-colors shadow-inner">✕</button>
                       </div>
                   </div>
               )}
          </div>
      </div>
      
      {/* SAĞ TARAF: GÖRSEL ALANI (FIXED) */}
      <div 
        className="flex-1 h-1/2 md:h-full relative bg-slate-900 flex items-center justify-center overflow-hidden p-6 cursor-pointer group"
        onClick={() => setIsZoomed(true)}
      >
          {/* Arkaplan Deseni (Estetik için) */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-950"></div>
          
          {/* GÖRSEL: object-contain ile sığdırma */}
          <img 
            src={data.content.backgroundImage} 
            className="max-w-full max-h-full object-contain shadow-2xl rounded-sm z-10 transition-transform duration-500 group-hover:scale-[1.02]" 
            alt="Visual Intel" 
          />
          
          {/* Zoom İpucu */}
          <div className="absolute top-4 right-4 text-white/30 group-hover:text-white transition-colors z-20">
            <span className="text-3xl drop-shadow-md">🔍</span>
          </div>

          <div className="absolute bottom-4 right-4 text-slate-400 text-[9px] font-mono uppercase tracking-widest z-20 bg-slate-950/80 px-2 py-1 rounded border border-white/10">
            Tap to Inspect
          </div>
      </div>

      {/* LIGHTBOX (Tam Ekran Modu) */}
      {isZoomed && (
        <div 
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md animate-in fade-in duration-200"
            onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(false);
            }}
        >
            <img 
                src={data.content.backgroundImage} 
                className="max-w-full max-h-full object-contain rounded shadow-2xl" 
                alt="Full Screen Intel" 
            />
            <button className="absolute top-6 right-6 text-white/50 hover:text-white text-4xl transition-colors">&times;</button>
        </div>
      )}
    </div>
  );
};
