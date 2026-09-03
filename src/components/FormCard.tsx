import React from 'react';
import type {
  AssignmentStatus,
  Attendance,
  BunkFormState,
  DistanceToCollege,
  Mood,
  RainLevel,
  SelectOption,
} from '../types/bunkinator';
import { isFormComplete } from '../utils/bunkinatorLogic';
import { SleepSlider } from './SleepSlider';
import { InputCardGroup } from './InputCardGroup';
import { Sparkles, HelpCircle } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FormCardProps {
  form: BunkFormState;
  setForm: React.Dispatch<React.SetStateAction<BunkFormState>>;
  onSubmit: () => void;
}

const ASSIGNMENT_OPTIONS: SelectOption<AssignmentStatus>[] = [
  { id: 'done', label: 'All done 😎', emoji: '😎', accentColor: '#3DDC84' },
  { id: 'pending', label: 'Some pending 😬', emoji: '😬', accentColor: '#FFD23F' },
  { id: 'tomorrow', label: 'Due tomorrow 😱', emoji: '😱', accentColor: '#FF3E9D' },
  { id: 'not_started', label: "Haven't even started 💀", emoji: '💀', accentColor: '#FF4B4B' },
];

const RAIN_OPTIONS: SelectOption<RainLevel>[] = [
  { id: 'none', label: 'No rain ☀️', emoji: '☀️', accentColor: '#FFD23F' },
  { id: 'drizzle', label: 'Light drizzle 🌦️', emoji: '🌦️', accentColor: '#3EC1FF' },
  { id: 'moderate', label: 'Moderate rain 🌧️', emoji: '🌧️', accentColor: '#FF3E9D' },
  { id: 'storm', label: 'Heavy storm ⛈️', emoji: '⛈️', accentColor: '#FF4B4B' },
];

const DISTANCE_OPTIONS: SelectOption<DistanceToCollege>[] = [
  { id: 'walking', label: 'Walking distance (<1km) 🚶', emoji: '🚶', accentColor: '#3DDC84' },
  { id: 'nearby', label: 'Nearby (1–5km) 🚲', emoji: '🚲', accentColor: '#3EC1FF' },
  { id: 'far', label: 'Far (5–15km) 🚗', emoji: '🚗', accentColor: '#FFD23F' },
  { id: 'very_far', label: 'Very far (>15km) 🚌', emoji: '🚌', accentColor: '#FF4B4B' },
];

const MOOD_OPTIONS: SelectOption<Mood>[] = [
  { id: 'energetic', label: 'Energetic 🔥', emoji: '🔥', accentColor: '#FF3E9D' },
  { id: 'neutral', label: 'Neutral 🙂', emoji: '🙂', accentColor: '#3EC1FF' },
  { id: 'tired', label: 'Tired 😴', emoji: '😴', accentColor: '#FFD23F' },
  { id: 'stressed', label: 'Stressed 😰', emoji: '😰', accentColor: '#FF4B4B' },
  { id: 'lazy', label: 'Lazy 🦥', emoji: '🦥', accentColor: '#3DDC84' },
];

const ATTENDANCE_OPTIONS: SelectOption<Attendance>[] = [
  { id: 'above75', label: 'Above 75% ✅', emoji: '✅', accentColor: '#3DDC84' },
  { id: 'below75', label: 'Below 75% ⚠️', emoji: '⚠️', accentColor: '#FF4B4B' },
];

export const FormCard: React.FC<FormCardProps> = ({ form, setForm, onSubmit }) => {
  const complete = isFormComplete(form);

  // Calculate completed count for progress badge
  const completedCount = [
    form.sleepHours !== null,
    form.assignmentStatus !== null,
    form.rainLevel !== null,
    form.distance !== null,
    form.mood !== null,
    form.attendance !== null,
  ].filter(Boolean).length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!complete) return;
    sounds.playPop();
    onSubmit();
  };

  return (
    <div className="relative z-10 w-full max-w-2xl mx-auto mb-12 sm:mb-16">
      {/* Outer Card Container */}
      <div className="bg-[#FFFDF9] border-2 sm:border-3 border-[#1B1B2F] rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 shadow-[5px_5px_0px_#FF3E9D] sm:shadow-[8px_8px_0px_#FF3E9D] transition-shadow duration-300 hover:shadow-[7px_7px_0px_#FF3E9D] sm:hover:shadow-[10px_10px_0px_#FF3E9D]">
        
        {/* Progress Bar & Header inside Card */}
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-[#1B1B2F]/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF3E9D] animate-ping" />
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-fredoka text-[#1B1B2F]">
              Answer 6 Quick Questions
            </h2>
          </div>
          <div className="px-2.5 sm:px-3 py-0.5 sm:py-1 bg-[#FFFDF9] border-2 border-[#1B1B2F] rounded-full text-[10px] sm:text-xs font-extrabold text-[#1B1B2F] shadow-[2px_2px_0px_#1B1B2F]">
            {completedCount}/6 Completed
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          {/* 1. Sleep Hours */}
          <SleepSlider
            value={form.sleepHours}
            onChange={(val) => setForm((prev) => ({ ...prev, sleepHours: val }))}
          />

          {/* 2. Assignment Status */}
          <InputCardGroup
            stepNumber={2}
            title="Assignment Status"
            options={ASSIGNMENT_OPTIONS}
            selectedValue={form.assignmentStatus}
            onSelect={(val) => setForm((prev) => ({ ...prev, assignmentStatus: val }))}
          />

          {/* 3. Rain Level */}
          <InputCardGroup
            stepNumber={3}
            title="Rain Level"
            options={RAIN_OPTIONS}
            selectedValue={form.rainLevel}
            onSelect={(val) => setForm((prev) => ({ ...prev, rainLevel: val }))}
          />

          {/* 4. Distance to College */}
          <InputCardGroup
            stepNumber={4}
            title="Distance to College"
            options={DISTANCE_OPTIONS}
            selectedValue={form.distance}
            onSelect={(val) => setForm((prev) => ({ ...prev, distance: val }))}
          />

          {/* 5. Today's Mood */}
          <InputCardGroup
            stepNumber={5}
            title="Today's Mood"
            options={MOOD_OPTIONS}
            selectedValue={form.mood}
            gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
            onSelect={(val) => setForm((prev) => ({ ...prev, mood: val }))}
          />

          {/* 6. Average Attendance */}
          <InputCardGroup
            stepNumber={6}
            title="Average Attendance"
            options={ATTENDANCE_OPTIONS}
            selectedValue={form.attendance}
            gridCols="grid-cols-2"
            onSelect={(val) => setForm((prev) => ({ ...prev, attendance: val }))}
          />

          {/* CTA Button Area */}
          <div className="pt-3 sm:pt-4 flex flex-col items-center">
            <button
              type="submit"
              disabled={!complete}
              className={`w-full py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#1B1B2F] font-fredoka text-xl sm:text-2xl font-extrabold text-white tracking-wide transition-all transform flex items-center justify-center gap-2 sm:gap-3 ${
                complete
                  ? 'bg-[#FF3E9D] shadow-[4px_4px_0px_#1B1B2F] sm:shadow-[6px_6px_0px_#1B1B2F] hover:bg-[#ff2590] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1B1B2F] active:translate-y-[2px] active:shadow-[2px_2px_0px_#1B1B2F] cursor-pointer'
                  : 'bg-[#1B1B2F]/30 text-[#1B1B2F]/50 shadow-none cursor-not-allowed border-[#1B1B2F]/20'
              }`}
            >
              <span>Predict My Fate 🔮</span>
              {complete && <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-[#FFD23F] animate-spin" />}
            </button>

            {!complete && (
              <p className="mt-2.5 sm:mt-3 text-[11px] sm:text-xs font-bold text-[#FF4B4B] flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Please answer all 6 questions above to unlock your prediction!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
