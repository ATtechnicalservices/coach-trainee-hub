import { NavLink, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, BarChart3, Dumbbell, Utensils, Camera, Settings, LogOut } from 'lucide-react';
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

export function Sidebar() {
  const location = useLocation();
  const { currentUser } = useApp();
  
  const isCoach = currentUser?.role === 'coach';
  const navItems = isCoach ? coachNavItems : traineeNavItems;

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-sidebar border-r border-sidebar-border">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 h-16 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center neon-glow">
          <Dumbbell className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg text-sidebar-foreground">FitCoach</h1>
          <p className="text-xs text-muted-foreground capitalize">{currentUser?.role} Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20 neon-glow" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent/50">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {currentUser?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              {currentUser?.name || 'User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {currentUser?.email || 'user@email.com'}
            </p>
          </div>
        </div>

        <NavLink
          to="/"
          className="flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-muted-foreground hover:bg-sidebar-accent transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Switch Role</span>
        </NavLink>
      </div>
    </aside>
  );
}
