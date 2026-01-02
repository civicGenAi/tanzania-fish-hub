import React, { useState } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Star,
  Archive,
  Trash2,
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  User
} from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState('CONV-001');
  const [messageText, setMessageText] = useState('');
  const [filter, setFilter] = useState('all');

  const conversations = [
    {
      id: 'CONV-001',
      customer: 'John Mwamba',
      customerId: 'CUS-001',
      subject: 'Question about order delivery',
      lastMessage: 'When can I expect my order to arrive?',
      time: '2 mins ago',
      unread: true,
      priority: 'high',
      status: 'open',
      avatar: 'JM'
    },
    {
      id: 'CONV-002',
      customer: 'Sarah Kimaro',
      customerId: 'CUS-002',
      subject: 'Product quality inquiry',
      lastMessage: 'Is the fish fresh daily?',
      time: '15 mins ago',
      unread: true,
      priority: 'normal',
      status: 'open',
      avatar: 'SK'
    },
    {
      id: 'CONV-003',
      customer: 'David Mtui',
      customerId: 'CUS-003',
      subject: 'Refund request',
      lastMessage: 'Thank you for processing my refund',
      time: '1 hour ago',
      unread: false,
      priority: 'urgent',
      status: 'resolved',
      avatar: 'DM'
    },
    {
      id: 'CONV-004',
      customer: 'Grace Mollel',
      customerId: 'CUS-004',
      subject: 'Bulk order inquiry',
      lastMessage: 'I need to order for my restaurant',
      time: '3 hours ago',
      unread: false,
      priority: 'high',
      status: 'pending',
      avatar: 'GM'
    },
    {
      id: 'CONV-005',
      customer: 'James Kondo',
      customerId: 'CUS-005',
      subject: 'Payment issue',
      lastMessage: 'My payment was declined',
      time: '5 hours ago',
      unread: false,
      priority: 'urgent',
      status: 'open',
      avatar: 'JK'
    }
  ];

  const messages = [
    {
      id: 'MSG-001',
      sender: 'customer',
      senderName: 'John Mwamba',
      text: 'Hello, I placed an order yesterday (ORD-2345) and I wanted to check when I can expect delivery?',
      time: '10:30 AM',
      read: true
    },
    {
      id: 'MSG-002',
      sender: 'admin',
      senderName: 'Support Team',
      text: 'Hello John! Thank you for reaching out. Let me check the status of your order.',
      time: '10:32 AM',
      read: true
    },
    {
      id: 'MSG-003',
      sender: 'admin',
      senderName: 'Support Team',
      text: 'Your order is currently being prepared and will be dispatched today. You can expect delivery within 24-48 hours.',
      time: '10:35 AM',
      read: true
    },
    {
      id: 'MSG-004',
      sender: 'customer',
      senderName: 'John Mwamba',
      text: 'Great! Thank you for the quick response. Will I receive a tracking number?',
      time: '10:38 AM',
      read: true
    },
    {
      id: 'MSG-005',
      sender: 'admin',
      senderName: 'Support Team',
      text: 'Yes, absolutely! You will receive an SMS and email with the tracking number once your order is dispatched.',
      time: '10:40 AM',
      read: true
    }
  ];

  const stats = [
    { label: 'Total Messages', value: '234', color: 'bg-blue-500' },
    { label: 'Unread', value: '12', color: 'bg-orange-500' },
    { label: 'Pending', value: '8', color: 'bg-yellow-500' },
    { label: 'Resolved', value: '214', color: 'bg-green-500' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      default: return 'text-blue-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'open': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      default: return null;
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'unread') return conv.unread;
    if (filter === 'urgent') return conv.priority === 'urgent';
    return true;
  });

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Manage customer communications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="grid grid-cols-12 h-[600px]">
          {/* Conversations List */}
          <div className="col-span-4 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 text-sm rounded-lg ${filter === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('unread')}
                  className={`px-3 py-1 text-sm rounded-lg ${filter === 'unread' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  Unread
                </button>
                <button
                  onClick={() => setFilter('urgent')}
                  className={`px-3 py-1 text-sm rounded-lg ${filter === 'urgent' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}
                >
                  Urgent
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`p-4 border-b border-gray-200 cursor-pointer transition-colors ${
                    selectedConversation === conv.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                      {conv.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">{conv.customer}</p>
                        <span className="text-xs text-gray-500 flex-shrink-0">{conv.time}</span>
                      </div>
                      <p className="text-sm text-gray-600 truncate mb-1">{conv.subject}</p>
                      <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        {getStatusIcon(conv.status)}
                        <span className={`text-xs font-medium ${getPriorityColor(conv.priority)}`}>
                          {conv.priority}
                        </span>
                        {conv.unread && (
                          <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Messages Area */}
          <div className="col-span-8 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  JM
                </div>
                <div>
                  <p className="font-medium text-gray-900">John Mwamba</p>
                  <p className="text-sm text-gray-500">Question about order delivery</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Star className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Archive className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-md ${message.sender === 'admin' ? 'order-2' : 'order-1'}`}>
                    <div className="flex items-center space-x-2 mb-1">
                      {message.sender === 'customer' && (
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                          JM
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'admin'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end space-x-2">
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Paperclip className="h-5 w-5" />
                </button>
                <div className="flex-1">
                  <textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
