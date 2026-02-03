import { useNavigate } from 'react-router-dom';
import { Dumbbell, Users, ArrowRight, Sparkles, Target, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useApp } from '@/contexts/AppContext';

const Index = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();

  const handleRoleSelect = (role: 'coach' | 'trainee') => {
    setCurrentUser({
      id: role === 'coach' ? 'coach' : '1',
      name: role === 'coach' ? 'Coach Smith' : 'Alex Johnson',
      email: role === 'coach' ? 'coach@fitcoach.com' : 'alex@email.com',
      role,
    });
    navigate(role === 'coach' ? '/coach' : '/trainee');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent/10 via-transparent to-transparent opacity-50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 min-h-screen flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="flex items-center gap-4 mb-8 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center neon-glow">
            <Dumbbell className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text">FitCoach</h1>
            <p className="text-muted-foreground">Health Coaching Platform</p>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-center text-muted-foreground max-w-2xl mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Transform your fitness journey with personalized coaching, 
          <span className="text-primary"> real-time tracking</span>, and 
          <span className="text-accent"> measurable results</span>.
        </p>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {/* Coach Card */}
          <Card 
            className="group relative overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 cursor-pointer card-glow"
            onClick={() => handleRoleSelect('coach')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8 relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Users className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Coach</h2>
              <p className="text-muted-foreground mb-6">
                Manage clients, create custom programs, and track their progress all in one place.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4 text-primary" />
                  Client management dashboard
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Workout & meal plan builder
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  Progress analytics & photos
                </li>
              </ul>
              <Button variant="neon" className="w-full group-hover:shadow-lg group-hover:shadow-primary/20">
                Enter Coach Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Trainee Card */}
          <Card 
            className="group relative overflow-hidden bg-card border-border hover:border-accent/50 transition-all duration-300 cursor-pointer card-glow"
            onClick={() => handleRoleSelect('trainee')}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="p-8 relative">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Dumbbell className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-2">I'm a Trainee</h2>
              <p className="text-muted-foreground mb-6">
                Follow your personalized plan, log workouts, and track your transformation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Target className="w-4 h-4 text-accent" />
                  Daily workout & meal plan
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Interactive exercise logging
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  Progress photos & metrics
                </li>
              </ul>
              <Button variant="accent" className="w-full group-hover:shadow-lg group-hover:shadow-accent/20">
                Enter Trainee Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <p className="text-sm text-muted-foreground mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          Built for performance. Designed for results.
        </p>
      </div>
    </div>
  );
};

export default Index;
