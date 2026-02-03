import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, Dumbbell, Utensils, Plus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December'];

export default function CoachCalendar() {
  const { clients, workouts, mealPlans } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  // Mock scheduled items
  const [scheduledItems] = useState<Record<string, Array<{ type: 'workout' | 'meal'; name: string }>>>({
    '2024-01-15': [{ type: 'workout', name: 'Upper Body Power' }],
    '2024-01-16': [{ type: 'meal', name: 'High Protein Day' }],
    '2024-01-17': [{ type: 'workout', name: 'Lower Body Focus' }, { type: 'meal', name: 'High Protein Day' }],
    '2024-01-18': [{ type: 'workout', name: 'Upper Body Power' }],
    '2024-01-19': [{ type: 'meal', name: 'High Protein Day' }],
  });

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const getDateKey = (day: number) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${currentDate.getFullYear()}-${month}-${dayStr}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && 
           today.getMonth() === currentDate.getMonth() && 
           today.getFullYear() === currentDate.getFullYear();
  };

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground">Schedule workouts and meals for your clients</p>
          </div>
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-[200px] bg-muted border-border">
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              {clients.map((client) => (
                <SelectItem key={client.id} value={client.id}>
                  {client.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-2 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <CardTitle>
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent>
              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Empty cells for days before the first */}
                {Array.from({ length: startingDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateKey = getDateKey(day);
                  const items = scheduledItems[dateKey] || [];
                  const hasWorkout = items.some(item => item.type === 'workout');
                  const hasMeal = items.some(item => item.type === 'meal');

                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "aspect-square rounded-lg p-1 transition-all relative",
                        "hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary",
                        isToday(day) && "bg-primary/10 border border-primary/30",
                        selectedDate === day && "ring-2 ring-primary bg-primary/10",
                      )}
                    >
                      <span className={cn(
                        "text-sm font-medium",
                        isToday(day) && "text-primary"
                      )}>
                        {day}
                      </span>
                      
                      {/* Indicators */}
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                        {hasWorkout && (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                        {hasMeal && (
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm text-muted-foreground">Workout</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-sm text-muted-foreground">Meal Plan</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Selected Date Details */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">
                  {selectedDate 
                    ? `${MONTHS[currentDate.getMonth()]} ${selectedDate}`
                    : 'Select a date'
                  }
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedDate ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      {(scheduledItems[getDateKey(selectedDate)] || []).map((item, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex items-center gap-3 p-3 rounded-lg",
                            item.type === 'workout' ? 'bg-primary/10' : 'bg-accent/10'
                          )}
                        >
                          {item.type === 'workout' ? (
                            <Dumbbell className="w-4 h-4 text-primary" />
                          ) : (
                            <Utensils className="w-4 h-4 text-accent" />
                          )}
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                      ))}

                      {!(scheduledItems[getDateKey(selectedDate)] || []).length && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          No items scheduled
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="w-full">
                        <Dumbbell className="w-4 h-4 mr-2" />
                        Add Workout
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        <Utensils className="w-4 h-4 mr-2" />
                        Add Meal
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Click on a date to view or add schedules
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Add */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-lg">Available Programs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-xs text-muted-foreground mb-2">Drag to calendar</p>
                {workouts.slice(0, 2).map((workout) => (
                  <div
                    key={workout.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 cursor-grab active:cursor-grabbing"
                  >
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span className="text-sm">{workout.name}</span>
                  </div>
                ))}
                {mealPlans.slice(0, 2).map((plan) => (
                  <div
                    key={plan.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-accent/10 cursor-grab active:cursor-grabbing"
                  >
                    <Utensils className="w-4 h-4 text-accent" />
                    <span className="text-sm">{plan.name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
