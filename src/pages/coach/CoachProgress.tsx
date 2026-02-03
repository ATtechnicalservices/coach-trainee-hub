import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, TrendingDown, TrendingUp, Scale, Target } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock weight data
const mockWeightData = [
  { date: 'Week 1', weight: 185 },
  { date: 'Week 2', weight: 183 },
  { date: 'Week 3', weight: 182 },
  { date: 'Week 4', weight: 180 },
  { date: 'Week 5', weight: 179 },
  { date: 'Week 6', weight: 178 },
  { date: 'Week 7', weight: 177 },
  { date: 'Week 8', weight: 176 },
];

// Mock progress photos
const mockPhotos = [
  { id: '1', date: 'Jan 1, 2024', url: '', label: 'Week 1' },
  { id: '2', date: 'Jan 15, 2024', url: '', label: 'Week 3' },
  { id: '3', date: 'Feb 1, 2024', url: '', label: 'Week 5' },
  { id: '4', date: 'Feb 15, 2024', url: '', label: 'Week 7' },
];

export default function CoachProgress() {
  const { clients } = useApp();
  const [selectedClient, setSelectedClient] = useState(clients[0]?.id || '');
  const selectedClientData = clients.find(c => c.id === selectedClient);

  const weightLost = mockWeightData[0].weight - mockWeightData[mockWeightData.length - 1].weight;
  const percentLost = ((weightLost / mockWeightData[0].weight) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Progress Review</h1>
            <p className="text-muted-foreground">Track client transformations and achievements</p>
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

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="metric-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Starting</p>
                  <p className="text-xl font-bold">{mockWeightData[0].weight} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Current</p>
                  <p className="text-xl font-bold">{mockWeightData[mockWeightData.length - 1].weight} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Goal</p>
                  <p className="text-xl font-bold">{selectedClientData?.goalWeight || 170} lbs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="metric-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Lost</p>
                  <p className="text-xl font-bold">{weightLost} lbs <span className="text-sm text-success">({percentLost}%)</span></p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="weight" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="weight">Weight Graph</TabsTrigger>
            <TabsTrigger value="photos">Progress Photos</TabsTrigger>
          </TabsList>

          {/* Weight Graph */}
          <TabsContent value="weight">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockWeightData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="date" 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        domain={['dataMin - 5', 'dataMax + 5']}
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
          </TabsContent>

          {/* Progress Photos */}
          <TabsContent value="photos">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary" />
                  Progress Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {mockPhotos.map((photo) => (
                    <div key={photo.id} className="space-y-2">
                      <div className="aspect-[3/4] rounded-xl bg-muted flex items-center justify-center border-2 border-dashed border-border hover:border-primary/50 transition-colors">
                        <Camera className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{photo.label}</p>
                        <p className="text-xs text-muted-foreground">{photo.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
