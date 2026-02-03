import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Utensils, Clock, Flame, Droplet, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export default function TraineeNutrition() {
  const { mealPlans, todayTasks, toggleTaskComplete } = useApp();
  
  const todayMealPlan = mealPlans[0];
  const mealTasks = todayTasks.filter(t => t.type === 'meal');
  const completedMeals = mealTasks.filter(t => t.completed).length;

  // Calculate totals
  const totalMacros = todayMealPlan?.meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.macros.calories,
    protein: acc.protein + meal.macros.protein,
    carbs: acc.carbs + meal.macros.carbs,
    fat: acc.fat + meal.macros.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const consumedMacros = todayMealPlan?.meals
    .filter((_, i) => mealTasks[i]?.completed)
    .reduce((acc, meal) => ({
      calories: acc.calories + meal.macros.calories,
      protein: acc.protein + meal.macros.protein,
      carbs: acc.carbs + meal.macros.carbs,
      fat: acc.fat + meal.macros.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const MacroCard = ({ label, current, total, color, icon }: { 
    label: string; 
    current: number; 
    total: number; 
    color: string;
    icon: React.ReactNode;
  }) => (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <span className="text-sm text-muted-foreground">{label}</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold">{current}</span>
            <span className="text-sm text-muted-foreground">/ {total}g</span>
          </div>
          <Progress 
            value={(current / total) * 100} 
            className="h-2 bg-muted" 
          />
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Today's Nutrition</h1>
          <p className="text-muted-foreground">{todayMealPlan?.name || 'High Protein Day'}</p>
        </div>

        {/* Calorie Overview */}
        <Card className="border-border bg-gradient-to-br from-accent/10 to-secondary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Calories Consumed</p>
                <p className="text-4xl font-bold">
                  {consumedMacros.calories}
                  <span className="text-lg font-normal text-muted-foreground ml-2">
                    / {totalMacros.calories} kcal
                  </span>
                </p>
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-accent/30 flex items-center justify-center relative">
                <Flame className="w-8 h-8 text-accent" />
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--accent))"
                    strokeWidth="8"
                    strokeDasharray={`${(consumedMacros.calories / totalMacros.calories) * 283} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
            <Progress 
              value={(consumedMacros.calories / totalMacros.calories) * 100} 
              className="h-3 bg-muted" 
            />
          </CardContent>
        </Card>

        {/* Macro Grid */}
        <div className="grid grid-cols-3 gap-4">
          <MacroCard 
            label="Protein" 
            current={consumedMacros.protein} 
            total={totalMacros.protein}
            color="primary"
            icon={<div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">P</div>}
          />
          <MacroCard 
            label="Carbs" 
            current={consumedMacros.carbs} 
            total={totalMacros.carbs}
            color="accent"
            icon={<div className="w-6 h-6 rounded bg-accent/20 flex items-center justify-center text-xs font-bold text-accent">C</div>}
          />
          <MacroCard 
            label="Fat" 
            current={consumedMacros.fat} 
            total={totalMacros.fat}
            color="warning"
            icon={<div className="w-6 h-6 rounded bg-warning/20 flex items-center justify-center text-xs font-bold text-warning">F</div>}
          />
        </div>

        {/* Meal Schedule */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-accent" />
              Meal Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayMealPlan?.meals.map((meal, index) => {
              const task = mealTasks[index];
              const isCompleted = task?.completed;

              return (
                <div
                  key={meal.id}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl transition-all",
                    isCompleted 
                      ? "bg-success/10 border border-success/20" 
                      : "bg-muted/50 hover:bg-muted"
                  )}
                >
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => task && toggleTaskComplete(task.id)}
                    className="w-6 h-6 border-2"
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={cn(
                        "font-semibold",
                        isCompleted && "line-through text-muted-foreground"
                      )}>
                        {meal.name}
                      </h4>
                      {isCompleted && (
                        <Badge variant="default" className="bg-success/20 text-success border-success/30">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Eaten
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        {meal.macros.calories} cal
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {meal.macros.protein}g protein
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {meal.macros.carbs}g carbs
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {meal.macros.fat}g fat
                      </Badge>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {meal.timing}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Hydration Reminder */}
        <Card className="border-border bg-gradient-to-r from-primary/5 to-transparent">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Droplet className="w-7 h-7 text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">Stay Hydrated!</h4>
              <p className="text-sm text-muted-foreground">
                Don't forget to drink water throughout the day. Aim for 8 glasses.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
