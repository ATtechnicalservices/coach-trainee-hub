import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { ChatSidebar } from '@/components/chat/ChatSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MobileNav />
      
      <main className="flex-1 md:ml-0">
        <div className="pt-14 pb-20 md:pt-0 md:pb-0 min-h-screen">
          {children}
        </div>
      </main>

      <ChatSidebar />
    </div>
  );
}
