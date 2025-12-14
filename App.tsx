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
  VerbChallengeSlide
} from './components/SlideComponents';

const App = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  const nextSlide = () => {
    if (currentSlideIndex < SLIDES.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(prev => prev - 1);
    }
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
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
      case SlideType.DEBRIEF: return <DebriefSlide data={currentSlide} />;
      default: return <div className="p-10 text-white">Slide content implementation pending for this type in Dark Mode overhaul.</div>;
    }
  };

  return (
    // FULL SCREEN CONTAINER - Dark Mode Base
    <div className="w-full h-full flex flex-col bg-slate-950 font-sans overflow-hidden text-slate-200">
        
      {/* Top Bar (Header) - Tactical Look */}
      {currentSlide.type !== SlideType.COVER && (
        <header className="bg-slate-900 border-b border-blue-900/30 h-12 md:h-14 flex items-center justify-between px-3 md:px-8 shadow-md shrink-0 z-20">
          <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
              <span className="text-xl text-gold-500">⚓</span>
              <h1 className="text-slate-100 font-bold font-mono text-xs md:text-base truncate uppercase tracking-widest">{LESSON_TITLE}</h1>
          </div>
          <div className="text-blue-400 font-mono text-xs md:text-sm bg-black/50 px-3 py-1 border border-blue-900/50 rounded">
            LOG: {currentSlideIndex + 1}/{SLIDES.length}
          </div>
        </header>
      )}

      {/* Progress Bar */}
      {currentSlide.type !== SlideType.COVER && (
        <div className="h-1 bg-slate-900 w-full shrink-0 z-20">
          <div 
            className="h-full bg-gold-600 shadow-[0_0_10px_rgba(202,138,4,0.5)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Content Area - Dark Grid Background */}
      <main className="flex-1 overflow-hidden relative w-full scanline">
        {/* CSS Grid Pattern for Tactical Effect */}
        <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px"
        }}></div>
        
        <div className="absolute inset-0 w-full h-full z-10">
            {renderSlideContent()}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-slate-900 border-t border-blue-900/30 px-3 py-3 md:px-6 md:py-4 shrink-0 z-20 flex justify-between items-center pb-safe">
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className="flex items-center justify-center gap-2 w-12 h-12 md:w-auto md:h-auto md:px-6 md:py-3 rounded-sm font-mono text-sm transition-all active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700"
        >
          <span>&lt; PREV</span>
        </button>

        {/* Slide Indicator Dots */}
        {currentSlide.type !== SlideType.COVER && (
          <div className="hidden lg:flex gap-1.5 overflow-x-auto max-w-[50%] px-2">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all shrink-0 ${idx === currentSlideIndex ? 'bg-gold-500 scale-150 shadow-[0_0_5px_rgba(234,179,8,0.8)]' : 'bg-slate-700 hover:bg-slate-500'}`}
              />
            ))}
          </div>
        )}

        <button
          onClick={nextSlide}
          disabled={currentSlideIndex === SLIDES.length - 1}
          className="flex items-center justify-center gap-2 w-auto px-6 py-3 rounded-sm font-bold font-mono text-sm transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed bg-blue-700 text-white hover:bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-500"
        >
          <span>NEXT &gt;</span>
        </button>
      </footer>
    </div>
  );
};

export default App;