import React, { useState } from 'react';
import type { BunkFormState, BunkResult } from './types/bunkinator';
import { calculateBunkinatorScore } from './utils/bunkinatorLogic';
import { BlobBackground } from './components/BlobBackground';
import { FloatingTaunts } from './components/FloatingTaunts';
import { Header } from './components/Header';
import { FormCard } from './components/FormCard';
import { ResultCard } from './components/ResultCard';
import { AnimatePresence } from 'framer-motion';

const INITIAL_FORM_STATE: BunkFormState = {
  sleepHours: null,
  assignmentStatus: null,
  rainLevel: null,
  distance: null,
  mood: null,
  attendance: null,
};

export const App: React.FC = () => {
  const [form, setForm] = useState<BunkFormState>(INITIAL_FORM_STATE);
  const [result, setResult] = useState<BunkResult | null>(null);

  const handlePredict = () => {
    const res = calculateBunkinatorScore(form);
    setResult(res);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setResult(null);
    setForm(INITIAL_FORM_STATE);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-[#FF3E9D] selection:text-white pb-12">
      {/* Background Animated Blobs & Ambient Floating Taunts */}
      <BlobBackground />
      <FloatingTaunts />

      <div className="relative z-10">
        {/* Header */}
        <Header />

        {/* Main Content Area: Form Card or Result Card */}
        <main className="px-4">
          <AnimatePresence mode="wait">
            {result === null ? (
              <FormCard
                key="form"
                form={form}
                setForm={setForm}
                onSubmit={handlePredict}
              />
            ) : (
              <ResultCard
                key="result"
                result={result}
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Playful Footer */}
      <footer className="relative z-10 text-center py-6 text-xs font-bold text-[#1B1B2F]/60">
        <p>Bunkinator 🔮 • Satirical Decision Engine</p>
        <p className="mt-1 text-[11px] text-[#1B1B2F]/40">
          Disclaimer: Please actually pass your classes. Bunkinator is not liable for low GPAs.
        </p>
      </footer>
    </div>
  );
};

export default App;
