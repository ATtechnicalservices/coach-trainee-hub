import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Home, Users, Calendar, BarChart3, Dumbbell, Utensils, Camera, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

const coachNavItems = [
  { path: '/coach', label: 'Overview', icon: Home },
  { path: '/coach/clients', label: 'Clients', icon: Users },
  { path: '/coach/programs', label: 'Programs', icon: Dumbbell },
  { path: '/coach/calendar', label: 'Calendar', icon: Calendar },
  { path: '/coach/progress', label: 'Progress', icon: BarChart3 },
];

const traineeNavItems = [
  { path: '/trainee', label: 'Today', icon: Home },
  { path: '/trainee/workout', label: 'Workout', icon: Dumbbell },
  { path: '/trainee/nutrition', label: 'Nutrition', icon: Utensils },
  { path: '/trainee/metrics', label: 'Metrics', icon: BarChart3 },
  { path: '/trainee/gallery', label: 'Gallery', icon: Camera },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { currentUser } = useApp();
  
  const isCoach = currentUser?.role === 'coach';
  const navItems = isCoach ? coachNavItems : traineeNavItems;

  return (
    <>
      {/* Mobile Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14 bg-background/95 backdrop-blur border-b border-border md:hidden">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow">
            <Dumbbell className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">FitCoach</span>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-64 bg-sidebar border-l border-sidebar-border">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-lg">Menu</span>
              </div>
              
              <nav className="flex-1 space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
                      isActive 
                        ? "bg-primary/10 text-primary neon-text" 
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="pt-4 border-t border-sidebar-border">
                <NavLink
                  to="/"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent transition-all"
                >
                  Switch Role
                </NavLink>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border md:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[60px]",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "neon-text")} />
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
