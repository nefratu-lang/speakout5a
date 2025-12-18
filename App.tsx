
import React, { useState, useEffect } from 'react';
import { SLIDES, LESSON_TITLE } from './constants';
import { SlideType } from './types';
import {
  CoverSlide,
  ObjectivesSlide,
  IceBreakerSlide,
  ReadingSlide,
  ComprehensionMCSlide,
  GrammarSlide,
  DrillSlide,
  MatchingSlide,
  ChecklistSlide,
  DebriefSlide,
  ImperativesSlide,
  VerbChallengeSlide,
  ScrambleSlide,
  GrammarAnalysisSlide,
  DailyReportSlide,
  ReadingChallengeSlide,
  LegendDossierSlide, // New Component
  GrammarRecapSlide,
  TacticalDrillSlide,
  ClassroomGameSlide
} from './components/SlideComponents';

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  const nextSlide = () => { if (currentSlideIndex < SLIDES.length - 1) setCurrentSlideIndex(prev => prev + 1); };
  const prevSlide = () => { if (currentSlideIndex > 0) setCurrentSlideIndex(prev => prev - 1); };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const renderSlideContent = () => {
    switch (currentSlide.type) {
      case SlideType.COVER: return <CoverSlide data={currentSlide} />;
      case SlideType.OBJECTIVES: return <ObjectivesSlide data={currentSlide} />;
      case SlideType.ICE_BREAKER: return <IceBreakerSlide data={currentSlide} onNext={nextSlide} />;
      case SlideType.READING: return <ReadingSlide data={currentSlide} />;
      case SlideType.COMPREHENSION_MC: return <ComprehensionMCSlide data={currentSlide} />;
      case SlideType.GRAMMAR: return <GrammarSlide data={currentSlide} />;
      case SlideType.DRILL: return <DrillSlide data={currentSlide} />;
      case SlideType.MATCHING: return <MatchingSlide data={currentSlide} />;
      case SlideType.CHECKLIST: return <ChecklistSlide data={currentSlide} />;
      case SlideType.IMPERATIVES: return <ImperativesSlide data={currentSlide} />;
      case SlideType.VERB_CHALLENGE: return <VerbChallengeSlide data={currentSlide} />;
      case SlideType.SCRAMBLE: return <ScrambleSlide data={currentSlide} />;
      case SlideType.GRAMMAR_ANALYSIS: return <GrammarAnalysisSlide data={currentSlide} />;
      case SlideType.DAILY_REPORT: return <DailyReportSlide data={currentSlide} />;
      case SlideType.READING_CHALLENGE: return <ReadingChallengeSlide data={currentSlide} />;
      case SlideType.LEGEND_DOSSIER: return <LegendDossierSlide data={currentSlide} />; // Wired up
      case SlideType.GRAMMAR_RECAP: return <GrammarRecapSlide data={currentSlide} />;
      case SlideType.TACTICAL_DRILL: return <TacticalDrillSlide data={currentSlide} />;
      case SlideType.CLASSROOM_GAME: return <ClassroomGameSlide data={currentSlide} />;
      case SlideType.DEBRIEF: return <DebriefSlide data={currentSlide} />;
      default: return <div className="p-10 text-slate-800">Slide content implementation pending.</div>;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 font-sans overflow-hidden text-slate-800">
      {currentSlide.type !== SlideType.COVER && (
        <header className="bg-white border-b border-slate-200 h-12 md:h-14 flex items-center justify-between px-3 md:px-8 shadow-sm shrink-0 z-20">
          <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
              <span className="text-xl text-blue-600">⚓</span>
              <h1 className="text-slate-800 font-bold font-mono text-xs md:text-base truncate uppercase tracking-widest">{LESSON_TITLE}</h1>
          </div>
          <div className="text-slate-500 font-mono text-xs md:text-sm bg-slate-100 px-3 py-1 border border-slate-200 rounded">LOG: {currentSlideIndex + 1}/{SLIDES.length}</div>
        </header>
      )}
      {currentSlide.type !== SlideType.COVER && (
        <div className="h-1 bg-slate-200 w-full shrink-0 z-20"><div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
      )}
      <main className="flex-1 overflow-hidden relative w-full"><div className="absolute inset-0 w-full h-full z-10">{renderSlideContent()}</div></main>
      <footer className="bg-white border-t border-slate-200 px-3 py-3 md:px-6 md:py-4 shrink-0 z-20 flex justify-between items-center pb-safe">
        <button onClick={prevSlide} disabled={currentSlideIndex === 0} className="px-6 py-3 rounded-sm font-mono text-sm disabled:opacity-20 bg-slate-100 border border-slate-200"><span>&lt; PREV</span></button>
        <button onClick={nextSlide} disabled={currentSlideIndex === SLIDES.length - 1} className="px-6 py-3 rounded-sm font-bold font-mono text-sm bg-blue-700 text-white shadow-lg border border-blue-600"><span>NEXT &gt;</span></button>
      </footer>
    </div>
  );
};

export default App;
