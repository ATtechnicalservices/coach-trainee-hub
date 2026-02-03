import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Dumbbell, Utensils, Trash2, GripVertical, Save } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Exercise, Meal, MealMacros } from '@/types';

export default function CoachPrograms() {
  const { workouts, mealPlans, addWorkout, addMealPlan } = useApp();
  const [activeTab, setActiveTab] = useState('workouts');
  
  // Workout form state
  const [workoutName, setWorkoutName] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: '', sets: 3, reps: 10 }
  ]);

  // Meal plan form state
  const [mealPlanName, setMealPlanName] = useState('');
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: '', macros: { calories: 0, protein: 0, carbs: 0, fat: 0 }, timing: '8:00 AM' }
  ]);

  const addExercise = () => {
    setExercises([
      ...exercises,
      { id: `${Date.now()}`, name: '', sets: 3, reps: 10 }
    ]);
  };

  const updateExercise = (index: number, field: keyof Exercise, value: string | number) => {
    const updated = [...exercises];
    updated[index] = { ...updated[index], [field]: value };
    setExercises(updated);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const addMeal = () => {
    setMeals([
      ...meals,
      { id: `${Date.now()}`, name: '', macros: { calories: 0, protein: 0, carbs: 0, fat: 0 }, timing: '12:00 PM' }
    ]);
  };

  const updateMeal = (index: number, field: string, value: string | number) => {
    const updated = [...meals];
    if (field.startsWith('macros.')) {
      const macroField = field.split('.')[1] as keyof MealMacros;
      updated[index] = {
        ...updated[index],
        macros: { ...updated[index].macros, [macroField]: Number(value) }
      };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setMeals(updated);
  };

  const removeMeal = (index: number) => {
    setMeals(meals.filter((_, i) => i !== index));
  };

  const saveWorkout = () => {
    if (!workoutName.trim()) return;
    addWorkout({
      id: `${Date.now()}`,
      name: workoutName,
      exercises: exercises.filter(e => e.name.trim()),
    });
    setWorkoutName('');
    setExercises([{ id: '1', name: '', sets: 3, reps: 10 }]);
  };

  const saveMealPlan = () => {
    if (!mealPlanName.trim()) return;
    addMealPlan({
      id: `${Date.now()}`,
      name: mealPlanName,
      meals: meals.filter(m => m.name.trim()),
    });
    setMealPlanName('');
    setMeals([{ id: '1', name: '', macros: { calories: 0, protein: 0, carbs: 0, fat: 0 }, timing: '8:00 AM' }]);
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Program Creator</h1>
          <p className="text-muted-foreground">Build workout routines and meal plans for your clients</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="workouts" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              Workouts
            </TabsTrigger>
            <TabsTrigger value="meals" className="flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              Meal Plans
            </TabsTrigger>
          </TabsList>

          {/* Workout Tab */}
          <TabsContent value="workouts" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Create Workout */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-primary" />
                    Create Workout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="workout-name">Workout Name</Label>
                    <Input
                      id="workout-name"
                      placeholder="e.g., Upper Body Power"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                      className="bg-muted border-border mt-1"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Exercises</Label>
                    {exercises.map((exercise, index) => (
                      <div key={exercise.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <Input
                          placeholder="Exercise name"
                          value={exercise.name}
                          onChange={(e) => updateExercise(index, 'name', e.target.value)}
                          className="flex-1 bg-background border-border"
                        />
                        <div className="flex items-center gap-1">
                          <Input
                            type="number"
                            placeholder="Sets"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                            className="w-16 bg-background border-border text-center"
                          />
                          <span className="text-muted-foreground">×</span>
                          <Input
                            type="number"
                            placeholder="Reps"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                            className="w-16 bg-background border-border text-center"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeExercise(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addExercise} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Exercise
                    </Button>
                  </div>

                  <Button variant="neon" onClick={saveWorkout} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Workout
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Workouts */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Saved Workouts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {workouts.map((workout) => (
                    <div key={workout.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{workout.name}</h4>
                        <Badge variant="outline">{workout.exercises.length} exercises</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {workout.exercises.slice(0, 3).map((ex) => (
                          <Badge key={ex.id} variant="secondary" className="text-xs">
                            {ex.name}
                          </Badge>
                        ))}
                        {workout.exercises.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{workout.exercises.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Meal Plans Tab */}
          <TabsContent value="meals" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Create Meal Plan */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5 text-accent" />
                    Create Meal Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="meal-plan-name">Meal Plan Name</Label>
                    <Input
                      id="meal-plan-name"
                      placeholder="e.g., High Protein Day"
                      value={mealPlanName}
                      onChange={(e) => setMealPlanName(e.target.value)}
                      className="bg-muted border-border mt-1"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Meals</Label>
                    {meals.map((meal, index) => (
                      <div key={meal.id} className="p-3 bg-muted/50 rounded-lg space-y-3">
                        <div className="flex items-center gap-2">
                          <Input
                            placeholder="Meal name"
                            value={meal.name}
                            onChange={(e) => updateMeal(index, 'name', e.target.value)}
                            className="flex-1 bg-background border-border"
                          />
                          <Input
                            placeholder="Time"
                            value={meal.timing}
                            onChange={(e) => updateMeal(index, 'timing', e.target.value)}
                            className="w-24 bg-background border-border"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeMeal(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div>
                            <Label className="text-xs">Calories</Label>
                            <Input
                              type="number"
                              value={meal.macros.calories}
                              onChange={(e) => updateMeal(index, 'macros.calories', e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Protein</Label>
                            <Input
                              type="number"
                              value={meal.macros.protein}
                              onChange={(e) => updateMeal(index, 'macros.protein', e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Carbs</Label>
                            <Input
                              type="number"
                              value={meal.macros.carbs}
                              onChange={(e) => updateMeal(index, 'macros.carbs', e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                          <div>
                            <Label className="text-xs">Fat</Label>
                            <Input
                              type="number"
                              value={meal.macros.fat}
                              onChange={(e) => updateMeal(index, 'macros.fat', e.target.value)}
                              className="bg-background border-border"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" onClick={addMeal} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Meal
                    </Button>
                  </div>

                  <Button variant="accent" onClick={saveMealPlan} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Meal Plan
                  </Button>
                </CardContent>
              </Card>

              {/* Existing Meal Plans */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle>Saved Meal Plans</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mealPlans.map((plan) => {
                    const totalCalories = plan.meals.reduce((sum, m) => sum + m.macros.calories, 0);
                    const totalProtein = plan.meals.reduce((sum, m) => sum + m.macros.protein, 0);
                    
                    return (
                      <div key={plan.id} className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{plan.name}</h4>
                          <Badge variant="outline">{plan.meals.length} meals</Badge>
                        </div>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>{totalCalories} cal</span>
                          <span>{totalProtein}g protein</span>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
