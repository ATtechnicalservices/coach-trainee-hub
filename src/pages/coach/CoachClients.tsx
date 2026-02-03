import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Mail, Phone, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export default function CoachClients() {
  const { clients } = useApp();

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Clients</h1>
            <p className="text-muted-foreground">Manage your client roster</p>
          </div>
          <Button variant="neon">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search clients..." 
            className="pl-10 bg-muted border-border"
          />
        </div>

        {/* Client Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => {
            const progress = client.currentWeight && client.goalWeight 
              ? ((client.currentWeight - client.goalWeight) / client.currentWeight * 100)
              : 0;
            const isLosingWeight = progress > 0;

            return (
              <Card key={client.id} className="border-border hover:border-primary/30 transition-colors card-glow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {client.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{client.name}</h3>
                        <Badge 
                          variant={client.status === 'active' ? 'default' : 'secondary'}
                          className={client.status === 'active' ? 'bg-success/20 text-success border-success/30' : ''}
                        >
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {client.email}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last check-in</span>
                      <span>{client.lastCheckIn}</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weight Progress</span>
                      <div className="flex items-center gap-1">
                        {isLosingWeight ? (
                          <TrendingDown className="w-4 h-4 text-success" />
                        ) : (
                          <TrendingUp className="w-4 h-4 text-warning" />
                        )}
                        <span className="text-sm font-medium">
                          {Math.abs(progress).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Current: <strong>{client.currentWeight} lbs</strong></span>
                      <span>Goal: <strong>{client.goalWeight} lbs</strong></span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-background overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.abs(progress) * 10)}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1" size="sm">
                      View Profile
                    </Button>
                    <Button variant="neon" className="flex-1" size="sm">
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
