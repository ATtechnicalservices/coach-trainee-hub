import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Dumbbell, Utensils, CheckCircle, Clock, Flame, Target } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export default function TraineeDashboard() {
  const { todayTasks, toggleTaskComplete } = useApp();

  const completedTasks = todayTasks.filter(t => t.completed).length;
  const progress = (completedTasks / todayTasks.length) * 100;

  const workoutTasks = todayTasks.filter(t => t.type === 'exercise');
  const mealTasks = todayTasks.filter(t => t.type === 'meal');

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold gradient-text">Good morning, Alex!</h1>
          <p className="text-muted-foreground mt-1">Let's crush today's goals. 💪</p>
        </div>

        {/* Progress Overview */}
        <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Today's Progress</p>
                <p className="text-3xl font-bold">
                  {completedTasks}/{todayTasks.length} <span className="text-lg font-normal text-muted-foreground">completed</span>
                </p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-primary/30 flex items-center justify-center relative">
                <span className="text-2xl font-bold text-primary">{Math.round(progress)}%</span>
                <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeDasharray={`${progress * 2.83} 283`}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-muted" />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Dumbbell className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{workoutTasks.filter(t => t.completed).length}/{workoutTasks.length}</p>
              <p className="text-xs text-muted-foreground">Exercises</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Utensils className="w-6 h-6 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold">{mealTasks.filter(t => t.completed).length}/{mealTasks.length}</p>
              <p className="text-xs text-muted-foreground">Meals</p>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 text-center">
              <Flame className="w-6 h-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">1,850</p>
              <p className="text-xs text-muted-foreground">Calories</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Today's Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl transition-all",
                  task.completed 
                    ? "bg-success/10 border border-success/20" 
                    : "bg-muted/50 hover:bg-muted"
                )}
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTaskComplete(task.id)}
                  className="w-6 h-6 border-2"
                />
                
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  task.type === 'exercise' ? 'bg-primary/10' : 'bg-accent/10'
                )}>
                  {task.type === 'exercise' ? (
                    <Dumbbell className="w-5 h-5 text-primary" />
                  ) : (
                    <Utensils className="w-5 h-5 text-accent" />
                  )}
                </div>

                <div className="flex-1">
                  <p className={cn(
                    "font-medium",
                    task.completed && "line-through text-muted-foreground"
                  )}>
                    {task.title}
                  </p>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {task.time}
                  </div>
                  {task.completed && (
                    <Badge variant="default" className="bg-success/20 text-success border-success/30 mt-1">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card className="border-border bg-gradient-to-r from-secondary/10 to-accent/10">
          <CardContent className="p-6 text-center">
            <p className="text-lg font-medium italic">
              "The only bad workout is the one that didn't happen."
            </p>
            <p className="text-sm text-muted-foreground mt-2">— Keep pushing! 🔥</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
