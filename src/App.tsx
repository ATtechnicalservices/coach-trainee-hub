import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Coach Pages
import CoachDashboard from "./pages/coach/CoachDashboard";
import CoachClients from "./pages/coach/CoachClients";
import CoachPrograms from "./pages/coach/CoachPrograms";
import CoachCalendar from "./pages/coach/CoachCalendar";
import CoachProgress from "./pages/coach/CoachProgress";

// Trainee Pages
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import TraineeWorkout from "./pages/trainee/TraineeWorkout";
import TraineeNutrition from "./pages/trainee/TraineeNutrition";
import TraineeMetrics from "./pages/trainee/TraineeMetrics";
import TraineeGallery from "./pages/trainee/TraineeGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Coach Routes */}
            <Route path="/coach" element={<CoachDashboard />} />
            <Route path="/coach/clients" element={<CoachClients />} />
            <Route path="/coach/programs" element={<CoachPrograms />} />
            <Route path="/coach/calendar" element={<CoachCalendar />} />
            <Route path="/coach/progress" element={<CoachProgress />} />
            
            {/* Trainee Routes */}
            <Route path="/trainee" element={<TraineeDashboard />} />
            <Route path="/trainee/workout" element={<TraineeWorkout />} />
            <Route path="/trainee/nutrition" element={<TraineeNutrition />} />
            <Route path="/trainee/metrics" element={<TraineeMetrics />} />
            <Route path="/trainee/gallery" element={<TraineeGallery />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
