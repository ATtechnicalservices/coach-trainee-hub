// User types
export type UserRole = 'coach' | 'trainee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Exercise and Workout types
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  duration?: number;
}

// Meal and Nutrition types
export interface MealMacros {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Meal {
  id: string;
  name: string;
  macros: MealMacros;
  timing: string;
  notes?: string;
}

export interface MealPlan {
  id: string;
  name: string;
  meals: Meal[];
}

// Schedule types
export interface ScheduleItem {
  id: string;
  date: string;
  type: 'workout' | 'meal';
  workout?: Workout;
  mealPlan?: MealPlan;
  clientId: string;
}

// Client/Trainee types
export interface Client {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastCheckIn?: string;
  status: 'active' | 'inactive';
  currentWeight?: number;
  goalWeight?: number;
  joinedAt: string;
}

// Progress tracking types
export interface DailyMetrics {
  id: string;
  date: string;
  weight?: number;
  waterIntake?: number;
  mood: 'great' | 'good' | 'okay' | 'bad';
  notes?: string;
}

export interface ProgressPhoto {
  id: string;
  url: string;
  date: string;
  notes?: string;
}

export interface ExerciseLog {
  exerciseId: string;
  completed: boolean;
  actualWeight?: number;
  actualReps?: number;
  notes?: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// Task for today view
export interface TodayTask {
  id: string;
  type: 'exercise' | 'meal';
  title: string;
  description?: string;
  completed: boolean;
  time?: string;
  details?: Exercise | Meal;
}
