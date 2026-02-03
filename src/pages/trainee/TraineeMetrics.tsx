import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Scale, Droplets, Smile, Meh, Frown, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const moodOptions = [
  { value: 'great', label: 'Great', icon: Smile, color: 'text-success' },
  { value: 'good', label: 'Good', icon: Smile, color: 'text-primary' },
  { value: 'okay', label: 'Okay', icon: Meh, color: 'text-warning' },
  { value: 'bad', label: 'Bad', icon: Frown, color: 'text-destructive' },
];

// Mock historical data
const mockWeightHistory = [
  { date: 'Mon', weight: 181 },
  { date: 'Tue', weight: 180.5 },
  { date: 'Wed', weight: 180.2 },
  { date: 'Thu', weight: 180 },
  { date: 'Fri', weight: 179.8 },
  { date: 'Sat', weight: 179.5 },
  { date: 'Today', weight: 179.2 },
];

export default function TraineeMetrics() {
  const { addDailyMetric } = useApp();
  const [weight, setWeight] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [mood, setMood] = useState<string>('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!weight && !waterIntake && !mood) return;
    
    addDailyMetric({
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      weight: weight ? parseFloat(weight) : undefined,
      waterIntake: waterIntake ? parseFloat(waterIntake) : undefined,
      mood: mood as 'great' | 'good' | 'okay' | 'bad',
    });
    
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const currentWeight = mockWeightHistory[mockWeightHistory.length - 1].weight;
  const weekAgoWeight = mockWeightHistory[0].weight;
  const weeklyChange = currentWeight - weekAgoWeight;

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Daily Metrics</h1>
          <p className="text-muted-foreground">Track your weight, water intake, and mood</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current Weight</p>
                  <p className="text-2xl font-bold">{currentWeight} <span className="text-sm font-normal">lbs</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  weeklyChange < 0 ? "bg-success/10" : "bg-warning/10"
                )}>
                  {weeklyChange < 0 ? (
                    <TrendingDown className="w-6 h-6 text-success" />
                  ) : (
                    <TrendingUp className="w-6 h-6 text-warning" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">This Week</p>
                  <p className={cn(
                    "text-2xl font-bold",
                    weeklyChange < 0 ? "text-success" : "text-warning"
                  )}>
                    {weeklyChange > 0 ? '+' : ''}{weeklyChange.toFixed(1)} <span className="text-sm font-normal">lbs</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border md:col-span-1 col-span-2">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Today's Water</p>
                  <p className="text-2xl font-bold">6/8 <span className="text-sm font-normal">glasses</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Log Today's Metrics */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Log Today's Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Weight */}
              <div className="space-y-2">
                <Label htmlFor="weight" className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-primary" />
                  Weight (lbs)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="179.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="bg-muted border-border"
                />
              </div>

              {/* Water Intake */}
              <div className="space-y-2">
                <Label htmlFor="water" className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-accent" />
                  Water (glasses)
                </Label>
                <Input
                  id="water"
                  type="number"
                  placeholder="8"
                  value={waterIntake}
                  onChange={(e) => setWaterIntake(e.target.value)}
                  className="bg-muted border-border"
                />
              </div>

              {/* Mood */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Smile className="w-4 h-4 text-success" />
                  How do you feel?
                </Label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger className="bg-muted border-border">
                    <SelectValue placeholder="Select mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className={cn("w-4 h-4", option.color)} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              variant={saved ? 'success' : 'neon'} 
              onClick={handleSave}
              className="w-full md:w-auto"
            >
              {saved ? 'Saved!' : 'Save Today\'s Metrics'}
            </Button>
          </CardContent>
        </Card>

        {/* Weight Graph */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Weight Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockWeightHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    labelStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{
                      fill: 'hsl(var(--primary))',
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: 'hsl(var(--primary))',
                      stroke: 'hsl(var(--background))',
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
