export type AssignmentStatus = 'done' | 'pending' | 'tomorrow' | 'not_started';
export type RainLevel = 'none' | 'drizzle' | 'moderate' | 'storm';
export type DistanceToCollege = 'walking' | 'nearby' | 'far' | 'very_far';
export type Mood = 'energetic' | 'neutral' | 'tired' | 'stressed' | 'lazy';
export type Attendance = 'above75' | 'below75';

export interface BunkFormState {
  sleepHours: number | null;
  assignmentStatus: AssignmentStatus | null;
  rainLevel: RainLevel | null;
  distance: DistanceToCollege | null;
  mood: Mood | null;
  attendance: Attendance | null;
}

export type OutcomeType = 'bed_heaven' | 'sit_home' | 'go' | 'dont_go';

export interface ScoreBreakdownItem {
  label: string;
  points: number;
  icon: string;
}

export interface BunkResult {
  score: number;
  outcomeId: OutcomeType;
  headline: string;
  signatureColor: string;
  flavorText: string;
  breakdown: ScoreBreakdownItem[];
  scoreColorClass: 'red' | 'yellow' | 'green';
}

export interface SelectOption<T> {
  id: T;
  label: string;
  emoji: string;
  accentColor?: string;
}
