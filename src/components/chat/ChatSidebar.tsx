import { useState } from 'react';
import { MessageCircle, Send, X, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useApp } from '@/contexts/AppContext';

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const { chatMessages, sendMessage, currentUser } = useApp();

  const handleSend = () => {
    if (!message.trim()) return;
    
    sendMessage({
      senderId: currentUser?.id || 'user',
      receiverId: currentUser?.role === 'coach' ? '1' : 'coach',
      message: message.trim(),
    });
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 md:bottom-6 md:right-6 w-14 h-14 rounded-full shadow-lg z-40"
        variant="neon"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div 
      className={cn(
        "fixed z-50 bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300",
        "bottom-24 right-4 md:bottom-6 md:right-6",
        isMinimized 
          ? "w-72 h-14" 
          : "w-80 md:w-96 h-[500px] md:h-[600px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-14 border-b border-border bg-muted/50 rounded-t-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {currentUser?.role === 'coach' ? 'Client Chat' : 'Coach Chat'}
            </p>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <ScrollArea className="flex-1 h-[calc(100%-7rem)] p-4">
            <div className="space-y-4">
              {chatMessages.map((msg) => {
                const isOwnMessage = msg.senderId === currentUser?.id || 
                  (currentUser?.role === 'coach' && msg.senderId === 'coach');
                
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex",
                      isOwnMessage ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] px-4 py-2 rounded-2xl",
                        isOwnMessage 
                          ? "bg-primary text-primary-foreground rounded-br-md" 
                          : "bg-muted text-foreground rounded-bl-md"
                      )}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className={cn(
                        "text-xs mt-1",
                        isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-muted border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
              <Button 
                onClick={handleSend} 
                size="icon" 
                variant="neon"
                disabled={!message.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
