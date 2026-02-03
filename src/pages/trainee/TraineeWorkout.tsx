import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dumbbell, CheckCircle, Play, Pause, Timer, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export default function TraineeWorkout() {
  const { workouts, exerciseLogs, updateExerciseLog, toggleTaskComplete, todayTasks } = useApp();
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [timer, setTimer] = useState(0);

  const todayWorkout = workouts[0]; // Use first workout as today's workout
  const workoutTasks = todayTasks.filter(t => t.type === 'exercise');
  const completedExercises = workoutTasks.filter(t => t.completed).length;

  const getExerciseLog = (exerciseId: string) => {
    return exerciseLogs.find(log => log.exerciseId === exerciseId);
  };

  const handleWeightChange = (exerciseId: string, weight: number) => {
    const existing = getExerciseLog(exerciseId);
    updateExerciseLog({
      exerciseId,
      completed: existing?.completed || false,
      actualWeight: weight,
      actualReps: existing?.actualReps,
    });
  };

  const handleComplete = (exerciseId: string) => {
    const existing = getExerciseLog(exerciseId);
    updateExerciseLog({
      exerciseId,
      completed: !existing?.completed,
      actualWeight: existing?.actualWeight,
      actualReps: existing?.actualReps,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Today's Workout</h1>
            <p className="text-muted-foreground">{todayWorkout?.name || 'Upper Body Power'}</p>
          </div>
          <Button
            variant={isWorkoutActive ? 'destructive' : 'neon'}
            size="lg"
            onClick={() => setIsWorkoutActive(!isWorkoutActive)}
          >
            {isWorkoutActive ? (
              <>
                <Pause className="w-5 h-5 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start
              </>
            )}
          </Button>
        </div>

        {/* Workout Timer */}
        {isWorkoutActive && (
          <Card className="border-primary/50 bg-primary/5 neon-glow">
            <CardContent className="p-6 flex items-center justify-center gap-8">
              <div className="text-center">
                <Timer className="w-8 h-8 text-primary mx-auto mb-2 animate-pulse" />
                <p className="text-4xl font-mono font-bold text-primary">{formatTime(timer)}</p>
                <p className="text-sm text-muted-foreground">Workout Duration</p>
              </div>
              <div className="h-16 w-px bg-border" />
              <div className="text-center">
                <p className="text-4xl font-bold">{completedExercises}/{todayWorkout?.exercises.length || 4}</p>
                <p className="text-sm text-muted-foreground">Exercises Done</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Workout Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedExercises}/{todayWorkout?.exercises.length || 4} exercises
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500 progress-glow"
                style={{ 
                  width: `${(completedExercises / (todayWorkout?.exercises.length || 4)) * 100}%` 
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Exercise List */}
        <div className="space-y-4">
          {todayWorkout?.exercises.map((exercise, index) => {
            const log = getExerciseLog(exercise.id);
            const isExpanded = expandedExercise === exercise.id;
            const isCompleted = log?.completed;

            return (
              <Card 
                key={exercise.id} 
                className={cn(
                  "border-border transition-all duration-300",
                  isCompleted && "border-success/30 bg-success/5"
                )}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedExercise(isExpanded ? null : exercise.id)}
                    className="w-full p-4 flex items-center gap-4 text-left"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg",
                      isCompleted 
                        ? "bg-success/20 text-success" 
                        : "bg-primary/10 text-primary"
                    )}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className={cn(
                        "font-semibold text-lg",
                        isCompleted && "line-through text-muted-foreground"
                      )}>
                        {exercise.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Badge variant="outline">{exercise.sets} sets</Badge>
                        <Badge variant="outline">{exercise.reps} reps</Badge>
                        {exercise.weight && (
                          <Badge variant="outline">{exercise.weight} lbs</Badge>
                        )}
                      </div>
                    </div>

                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-muted-foreground">Actual Weight (lbs)</label>
                          <Input
                            type="number"
                            placeholder={exercise.weight?.toString() || '0'}
                            value={log?.actualWeight || ''}
                            onChange={(e) => handleWeightChange(exercise.id, parseInt(e.target.value) || 0)}
                            className="mt-1 bg-muted border-border"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-muted-foreground">Target</label>
                          <p className="mt-1 p-2 bg-muted rounded-lg text-center font-medium">
                            {exercise.sets} × {exercise.reps} @ {exercise.weight || 'BW'} lbs
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant={isCompleted ? 'outline' : 'success'}
                          className="flex-1"
                          onClick={() => handleComplete(exercise.id)}
                        >
                          {isCompleted ? (
                            <>Undo Complete</>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Complete Workout */}
        {completedExercises === (todayWorkout?.exercises.length || 4) && (
          <Card className="border-success/50 bg-success/10">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold text-success mb-2">Workout Complete! 🎉</h3>
              <p className="text-muted-foreground">Great job crushing today's session!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
