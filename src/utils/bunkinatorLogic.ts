import type {
  BunkFormState,
  BunkResult,
  OutcomeType,
  ScoreBreakdownItem,
} from '../types/bunkinator';

const FLAVOR_TEXT_MAP: Record<OutcomeType, string[]> = {
  bed_heaven: [
    "Science says sleep debt doesn't care about your GPA.",
    'Your pillow is currently projecting an unconditional love aura. Don\'t fight it.',
    'Attending class on under 4 hours of sleep is literally cosplaying as a walking zombie.',
    'Your brain cells have unanimously voted for an emergency REM extension.',
  ],
  sit_home: [
    "Attending class won't save you from a zero on tomorrow's deadline.",
    'Future-you is crying in the corner. Open Google Docs right now!',
    'The panic monster has arrived. Time to speedrun 10 pages of academic fluff.',
    "Your professor will notice your missing homework way before they notice your empty seat.",
  ],
  go: [
    'The stars have aligned! Grab your coffee and go secure that attendance credit.',
    'No valid excuses detected in the universe. Put on your shoes and conquer the day!',
    'You slept well, weather is fine, and your conscience is clean. Go shine!',
    'You are living proof that college students can function like responsible adults today!',
  ],
  dont_go: [
    'The cosmic vibe check returned a 404 error. Stay home and recharge.',
    'Going today would be a net negative for your physical and mental equilibrium.',
    'Everything in your immediate environment is screaming "CANCEL". Listen to the signs.',
    'Today is officially designated as a self-care bunk day. Enjoy the peace!',
  ],
};

export function isFormComplete(form: BunkFormState): boolean {
  return (
    form.sleepHours !== null &&
    form.assignmentStatus !== null &&
    form.rainLevel !== null &&
    form.distance !== null &&
    form.mood !== null &&
    form.attendance !== null
  );
}

export function calculateBunkinatorScore(inputs: BunkFormState): BunkResult {
  let score = 50;
  const breakdown: ScoreBreakdownItem[] = [];

  const sleep = inputs.sleepHours ?? 7;
  // Sleep Hours: <4 → −30 | 4–5.9 → −15 | 6–7.9 → +10 | ≥8 → +20
  if (sleep < 4) {
    score -= 30;
    breakdown.push({ label: 'Critical sleep debt (<4h)', points: -30, icon: '🛌' });
  } else if (sleep < 6) {
    score -= 15;
    breakdown.push({ label: 'Groggy sleep penalty (4-5.9h)', points: -15, icon: '🥱' });
  } else if (sleep < 8) {
    score += 10;
    breakdown.push({ label: 'Decent rest bonus (6-7.9h)', points: 10, icon: '😊' });
  } else {
    score += 20;
    breakdown.push({ label: 'Full battery sleep bonus (≥8h)', points: 20, icon: '⚡' });
  }

  // Assignment Status: All done → +20 | Some pending → 0 | Due tomorrow → −20 | Haven't started → −35
  if (inputs.assignmentStatus === 'done') {
    score += 20;
    breakdown.push({ label: 'All assignments done 😎', points: 20, icon: '✅' });
  } else if (inputs.assignmentStatus === 'pending') {
    breakdown.push({ label: 'Some pending 😬', points: 0, icon: '📝' });
  } else if (inputs.assignmentStatus === 'tomorrow') {
    score -= 20;
    breakdown.push({ label: 'Assignment due tomorrow 😱', points: -20, icon: '🚨' });
  } else if (inputs.assignmentStatus === 'not_started') {
    score -= 35;
    breakdown.push({ label: 'Haven\'t started assignment 💀', points: -35, icon: '☠️' });
  }

  // Rain Level: No rain → +15 | Light drizzle → 0 | Moderate → −15 | Heavy storm → −30
  if (inputs.rainLevel === 'none') {
    score += 15;
    breakdown.push({ label: 'Clear skies ☀️', points: 15, icon: '☀️' });
  } else if (inputs.rainLevel === 'drizzle') {
    breakdown.push({ label: 'Light drizzle 🌦️', points: 0, icon: '🌦️' });
  } else if (inputs.rainLevel === 'moderate') {
    score -= 15;
    breakdown.push({ label: 'Moderate rain 🌧️', points: -15, icon: '🌧️' });
  } else if (inputs.rainLevel === 'storm') {
    score -= 30;
    breakdown.push({ label: 'Heavy storm ⛈️', points: -30, icon: '⛈️' });
  }

  // Distance: Walking → +15 | Nearby → 0 | Far → −15 | Very far → −25
  if (inputs.distance === 'walking') {
    score += 15;
    breakdown.push({ label: 'Walking distance (<1km) 🚶', points: 15, icon: '🚶' });
  } else if (inputs.distance === 'nearby') {
    breakdown.push({ label: 'Nearby commute (1-5km) 🚲', points: 0, icon: '🚲' });
  } else if (inputs.distance === 'far') {
    score -= 15;
    breakdown.push({ label: 'Long distance (5-15km) 🚗', points: -15, icon: '🚗' });
  } else if (inputs.distance === 'very_far') {
    score -= 25;
    breakdown.push({ label: 'Extreme commute (>15km) 🚌', points: -25, icon: '🚌' });
  }

  // Mood: Energetic → +20 | Neutral → +5 | Tired → −10 | Stressed → −15 | Lazy → −25
  if (inputs.mood === 'energetic') {
    score += 20;
    breakdown.push({ label: 'High energy 🔥', points: 20, icon: '🔥' });
  } else if (inputs.mood === 'neutral') {
    score += 5;
    breakdown.push({ label: 'Neutral mood 🙂', points: 5, icon: '🙂' });
  } else if (inputs.mood === 'tired') {
    score -= 10;
    breakdown.push({ label: 'Tired mood 😴', points: -10, icon: '😴' });
  } else if (inputs.mood === 'stressed') {
    score -= 15;
    breakdown.push({ label: 'Stressed mood 😰', points: -15, icon: '😰' });
  } else if (inputs.mood === 'lazy') {
    score -= 25;
    breakdown.push({ label: 'Peak laziness 🦥', points: -25, icon: '🦥' });
  }

  // Attendance: Below 75% → +25 | Above 75% → 0
  if (inputs.attendance === 'below75') {
    score += 25;
    breakdown.push({ label: 'Attendance <75% emergency boost ⚠️', points: 25, icon: '⚠️' });
  } else if (inputs.attendance === 'above75') {
    breakdown.push({ label: 'Attendance >75% safe buffer ✅', points: 0, icon: '✅' });
  }

  // Clamp 0-100
  const finalScore = Math.max(0, Math.min(100, score));

  // Determine signature bar color: red under 40, yellow 40-70, green above 70
  let scoreColorClass: 'red' | 'yellow' | 'green' = 'yellow';
  if (finalScore < 40) {
    scoreColorClass = 'red';
  } else if (finalScore > 70) {
    scoreColorClass = 'green';
  }

  // Determine headline strictly IN ORDER:
  // 1. Sleep Hours < 4 → "Bed is Heaven 🛌"
  // 2. Else if Assignment Status is "Due tomorrow" or "Haven't even started" → "Sit at Home and Do the Assignment 📚"
  // 3. Else if score >= 60 → "Go 🚶‍♂️"
  // 4. Else → "Don't Go 🙅"
  let outcomeId: OutcomeType;
  let headline: string;
  let signatureColor: string;

  if (sleep < 4) {
    outcomeId = 'bed_heaven';
    headline = 'Bed is Heaven 🛌';
    signatureColor = '#3EC1FF'; // Sky Blue
  } else if (inputs.assignmentStatus === 'tomorrow' || inputs.assignmentStatus === 'not_started') {
    outcomeId = 'sit_home';
    headline = 'Sit at Home and Do the Assignment 📚';
    signatureColor = '#FFD23F'; // Zest Yellow
  } else if (finalScore >= 60) {
    outcomeId = 'go';
    headline = 'Go 🚶‍♂️';
    signatureColor = '#3DDC84'; // Grass Green
  } else {
    outcomeId = 'dont_go';
    headline = "Don't Go 🙅";
    signatureColor = '#FF4B4B'; // Cherry Red
  }

  const lines = FLAVOR_TEXT_MAP[outcomeId];
  const flavorText = lines[Math.floor(Math.random() * lines.length)];

  return {
    score: finalScore,
    outcomeId,
    headline,
    signatureColor,
    flavorText,
    breakdown,
    scoreColorClass,
  };
}
