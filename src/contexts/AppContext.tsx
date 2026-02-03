import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, Client, Workout, MealPlan, DailyMetrics, ProgressPhoto, ChatMessage, TodayTask, Exercise, Meal, ExerciseLog } from '@/types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  clients: Client[];
  workouts: Workout[];
  mealPlans: MealPlan[];
  dailyMetrics: DailyMetrics[];
  progressPhotos: ProgressPhoto[];
  chatMessages: ChatMessage[];
  todayTasks: TodayTask[];
  exerciseLogs: ExerciseLog[];
  addWorkout: (workout: Workout) => void;
  addMealPlan: (mealPlan: MealPlan) => void;
  addDailyMetric: (metric: DailyMetrics) => void;
  addProgressPhoto: (photo: ProgressPhoto) => void;
  toggleTaskComplete: (taskId: string) => void;
  updateExerciseLog: (log: ExerciseLog) => void;
  sendMessage: (message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockClients: Client[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@email.com', avatar: '', lastCheckIn: '2 hours ago', status: 'active', currentWeight: 180, goalWeight: 170, joinedAt: '2024-01-15' },
  { id: '2', name: 'Sarah Williams', email: 'sarah@email.com', avatar: '', lastCheckIn: '1 day ago', status: 'active', currentWeight: 145, goalWeight: 135, joinedAt: '2024-02-01' },
  { id: '3', name: 'Mike Chen', email: 'mike@email.com', avatar: '', lastCheckIn: '3 hours ago', status: 'active', currentWeight: 200, goalWeight: 185, joinedAt: '2024-01-20' },
  { id: '4', name: 'Emma Davis', email: 'emma@email.com', avatar: '', lastCheckIn: '5 days ago', status: 'inactive', currentWeight: 130, goalWeight: 125, joinedAt: '2023-12-10' },
];

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Upper Body Power',
    exercises: [
      { id: 'e1', name: 'Bench Press', sets: 4, reps: 8, weight: 135 },
      { id: 'e2', name: 'Overhead Press', sets: 3, reps: 10, weight: 65 },
      { id: 'e3', name: 'Barbell Rows', sets: 4, reps: 8, weight: 95 },
      { id: 'e4', name: 'Tricep Dips', sets: 3, reps: 12 },
    ],
    duration: 45
  },
  {
    id: '2',
    name: 'Lower Body Focus',
    exercises: [
      { id: 'e5', name: 'Squats', sets: 5, reps: 5, weight: 185 },
      { id: 'e6', name: 'Romanian Deadlifts', sets: 4, reps: 10, weight: 135 },
      { id: 'e7', name: 'Leg Press', sets: 3, reps: 12, weight: 270 },
      { id: 'e8', name: 'Calf Raises', sets: 4, reps: 15, weight: 100 },
    ],
    duration: 50
  }
];

const mockMealPlans: MealPlan[] = [
  {
    id: '1',
    name: 'High Protein Day',
    meals: [
      { id: 'm1', name: 'Protein Oatmeal Bowl', macros: { calories: 450, protein: 35, carbs: 55, fat: 12 }, timing: '7:00 AM' },
      { id: 'm2', name: 'Grilled Chicken Salad', macros: { calories: 520, protein: 45, carbs: 25, fat: 28 }, timing: '12:00 PM' },
      { id: 'm3', name: 'Post-Workout Shake', macros: { calories: 300, protein: 40, carbs: 30, fat: 5 }, timing: '4:00 PM' },
      { id: 'm4', name: 'Salmon with Veggies', macros: { calories: 580, protein: 42, carbs: 35, fat: 32 }, timing: '7:00 PM' },
    ]
  }
];

const mockTodayTasks: TodayTask[] = [
  { id: 't1', type: 'meal', title: 'Protein Oatmeal Bowl', description: '450 cal • 35g protein', completed: true, time: '7:00 AM' },
  { id: 't2', type: 'exercise', title: 'Bench Press', description: '4 sets × 8 reps @ 135 lbs', completed: false, time: '9:00 AM' },
  { id: 't3', type: 'exercise', title: 'Overhead Press', description: '3 sets × 10 reps @ 65 lbs', completed: false, time: '9:20 AM' },
  { id: 't4', type: 'exercise', title: 'Barbell Rows', description: '4 sets × 8 reps @ 95 lbs', completed: false, time: '9:40 AM' },
  { id: 't5', type: 'meal', title: 'Grilled Chicken Salad', description: '520 cal • 45g protein', completed: false, time: '12:00 PM' },
  { id: 't6', type: 'meal', title: 'Post-Workout Shake', description: '300 cal • 40g protein', completed: false, time: '4:00 PM' },
];

const mockMessages: ChatMessage[] = [
  { id: 'msg1', senderId: 'coach', receiverId: '1', message: 'Great progress on your lifts this week! Keep it up!', timestamp: '2024-01-20T10:30:00Z', read: true },
  { id: 'msg2', senderId: '1', receiverId: 'coach', message: 'Thanks coach! Feeling stronger every day.', timestamp: '2024-01-20T10:35:00Z', read: true },
  { id: 'msg3', senderId: 'coach', receiverId: '1', message: 'Don\'t forget to log your meals today!', timestamp: '2024-01-20T14:00:00Z', read: false },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [clients] = useState<Client[]>(mockClients);
  const [workouts, setWorkouts] = useState<Workout[]>(mockWorkouts);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>(mockMealPlans);
  const [dailyMetrics, setDailyMetrics] = useState<DailyMetrics[]>([]);
  const [progressPhotos, setProgressPhotos] = useState<ProgressPhoto[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockMessages);
  const [todayTasks, setTodayTasks] = useState<TodayTask[]>(mockTodayTasks);
  const [exerciseLogs, setExerciseLogs] = useState<ExerciseLog[]>([]);

  const addWorkout = (workout: Workout) => {
    setWorkouts(prev => [...prev, workout]);
  };

  const addMealPlan = (mealPlan: MealPlan) => {
    setMealPlans(prev => [...prev, mealPlan]);
  };

  const addDailyMetric = (metric: DailyMetrics) => {
    setDailyMetrics(prev => [...prev, metric]);
  };

  const addProgressPhoto = (photo: ProgressPhoto) => {
    setProgressPhotos(prev => [...prev, photo]);
  };

  const toggleTaskComplete = (taskId: string) => {
    setTodayTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const updateExerciseLog = (log: ExerciseLog) => {
    setExerciseLogs(prev => {
      const existing = prev.findIndex(l => l.exerciseId === log.exerciseId);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = log;
        return updated;
      }
      return [...prev, log];
    });
  };

  const sendMessage = (message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    setChatMessages(prev => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      clients,
      workouts,
      mealPlans,
      dailyMetrics,
      progressPhotos,
      chatMessages,
      todayTasks,
      exerciseLogs,
      addWorkout,
      addMealPlan,
      addDailyMetric,
      addProgressPhoto,
      toggleTaskComplete,
      updateExerciseLog,
      sendMessage,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
