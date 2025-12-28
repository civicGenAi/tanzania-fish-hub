import React, { useState } from 'react';
import { MessageSquare, Search, Send, Paperclip, MoreVertical } from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SellerSidebar from '@/components/dashboard/SellerSidebar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SellerMessages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: '1',
      name: 'John Makundi',
      lastMessage: 'When will my order arrive?',
      time: '5 min ago',
      unread: 2,
      avatar: 'J',
      online: true,
    },
    {
      id: '2',
      name: 'Grace Kimaro',
      lastMessage: 'Thank you for the fresh fish!',
      time: '1 hour ago',
      unread: 0,
      avatar: 'G',
      online: false,
    },
    {
      id: '3',
      name: 'Serena Hotel',
      lastMessage: 'Can we get a bulk discount?',
      time: '2 hours ago',
      unread: 1,
      avatar: 'S',
      online: true,
    },
    {
      id: '4',
      name: 'Mama Lisu Restaurant',
      lastMessage: 'Perfect quality as always!',
      time: 'Yesterday',
      unread: 0,
      avatar: 'M',
      online: false,
    },
  ];

  const messages = [
    { id: '1', sender: 'customer', text: 'Hello! Do you have fresh Tilapia today?', time: '10:30 AM' },
    { id: '2', sender: 'me', text: 'Yes! We have fresh Tilapia caught this morning. How much do you need?', time: '10:32 AM' },
    { id: '3', sender: 'customer', text: 'I need about 5kg. What\'s the price?', time: '10:35 AM' },
    { id: '4', sender: 'me', text: 'TZS 15,000 per kg. Total would be TZS 75,000. We can deliver within 2 hours.', time: '10:36 AM' },
    { id: '5', sender: 'customer', text: 'Great! Can you deliver to Masaki area?', time: '10:40 AM' },
    { id: '6', sender: 'me', text: 'Absolutely! We deliver to Masaki. Delivery fee is TZS 5,000. Would you like to place the order?', time: '10:42 AM' },
    { id: '7', sender: 'customer', text: 'When will my order arrive?', time: '11:15 AM' },
  ];

  return (
    <DashboardLayout
      sidebar={<SellerSidebar />}
      title="Messages"
      subtitle="Chat with your customers"
    >
      <div className="bg-card border border-border rounded-2xl overflow-hidden h-[calc(100vh-16rem)]">
        <div className="grid md:grid-cols-3 h-full">
          {/* Conversations List */}
          <div className="border-r border-border flex flex-col">
            {/* Search */}
            <div className="p-4 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv.id)}
                  className={cn(
                    "w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b border-border",
                    selectedChat === conv.id && "bg-ocean-light"
                  )}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                      {conv.avatar}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold text-sm truncate">{conv.name}</p>
                      <span className="text-xs text-muted-foreground shrink-0">{conv.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
                  J
                </div>
                <div>
                  <p className="font-semibold">John Makundi</p>
                  <p className="text-xs text-secondary">Online</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'me' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-2xl px-4 py-2",
                      msg.sender === 'me'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn(
                      "text-xs mt-1",
                      msg.sender === 'me' ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button variant="ocean">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SellerMessages;
