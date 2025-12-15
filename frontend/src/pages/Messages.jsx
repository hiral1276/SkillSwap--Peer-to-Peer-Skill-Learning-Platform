import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ScrollArea } from '../components/ui/scroll-area';
import { Badge } from '../components/ui/badge';
import { Send, Bot, Sparkles } from 'lucide-react';
import { mockConversations, mockMessages, mockCurrentUser } from '../mock';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: 'ai-1',
      type: 'ai',
      message: 'Hi! I\'m your AI assistant. I can help you with skill matching recommendations, conversation starters, or answer questions about SkillSwap. How can I help you today?'
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const messagesEndRef = useRef(null);
  const aiMessagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      const convMessages = mockMessages.filter(
        m => m.conversationId === selectedConversation.id
      );
      setMessages(convMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    aiMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: mockCurrentUser.id,
      senderName: mockCurrentUser.name,
      senderAvatar: mockCurrentUser.avatar,
      receiverId: selectedConversation.participantId,
      message: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate receiving a response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        conversationId: selectedConversation.id,
        senderId: selectedConversation.participantId,
        senderName: selectedConversation.participantName,
        senderAvatar: selectedConversation.participantAvatar,
        receiverId: mockCurrentUser.id,
        message: 'Thanks for your message! I\'d love to discuss the skill exchange.',
        timestamp: new Date().toISOString(),
        read: false
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleSendAIMessage = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: aiInput
    };

    setAiMessages([...aiMessages, userMessage]);
    setAiInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        message: getAIResponse(aiInput)
      };
      setAiMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getAIResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('match') || lowerInput.includes('recommend')) {
      return 'Based on your profile, I recommend connecting with Sarah Miller for cooking lessons, as she\'s interested in learning web development which you can teach. She has a 4.9 rating and 22 completed exchanges!';
    } else if (lowerInput.includes('conversation') || lowerInput.includes('start')) {
      return 'Here\'s a great conversation starter: "Hi! I noticed we have complementary skills. I\'d love to learn [their skill] and can teach you [your skill]. Would you be interested in setting up a skill exchange session?"';
    } else if (lowerInput.includes('how') || lowerInput.includes('work')) {
      return 'SkillSwap works by matching people with complementary skills. You list what you can teach and what you want to learn, then our AI finds the best matches. You can message potential partners and schedule exchange sessions!';
    } else {
      return 'That\'s a great question! I can help you find the best skill exchange partners, suggest conversation starters, or explain how to use SkillSwap effectively. What would you like to know more about?';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Conversations List */}
          <Card className="lg:col-span-4 flex flex-col">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>Messages</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAIAssistant(!showAIAssistant)}
                  className="gap-2"
                >
                  <Bot className="h-4 w-4" />
                  AI Assistant
                </Button>
              </div>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-2">
                {conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedConversation(conv);
                      setShowAIAssistant(false);
                    }}
                    className={cn(
                      'w-full p-4 rounded-lg text-left transition-all hover:bg-muted',
                      selectedConversation?.id === conv.id && !showAIAssistant
                        ? 'bg-muted border-2 border-primary'
                        : 'border border-border'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conv.participantAvatar} alt={conv.participantName} />
                        <AvatarFallback>{conv.participantName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold truncate">{conv.participantName}</h4>
                          {conv.unreadCount > 0 && (
                            <Badge variant="destructive" className="ml-2">
                              {conv.unreadCount}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(conv.lastMessageTime)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Area */}
          <Card className="lg:col-span-8 flex flex-col">
            {showAIAssistant ? (
              <>
                {/* AI Assistant Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        AI Assistant
                        <Sparkles className="h-4 w-4 text-purple-500" />
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">Always here to help</p>
                    </div>
                  </div>
                </CardHeader>

                {/* AI Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {aiMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'flex',
                          msg.type === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        <div
                          className={cn(
                            'max-w-[80%] rounded-lg p-4',
                            msg.type === 'user'
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                              : 'bg-muted'
                          )}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={aiMessagesEndRef} />
                  </div>
                </ScrollArea>

                {/* AI Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendAIMessage} className="flex gap-2">
                    <Input
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      placeholder="Ask the AI assistant..."
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-blue-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : selectedConversation ? (
              <>
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={selectedConversation.participantAvatar}
                        alt={selectedConversation.participantName}
                      />
                      <AvatarFallback>
                        {selectedConversation.participantName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{selectedConversation.participantName}</CardTitle>
                      <p className="text-sm text-muted-foreground">Active now</p>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((msg) => {
                      const isOwn = msg.senderId === mockCurrentUser.id;
                      return (
                        <div
                          key={msg.id}
                          className={cn('flex', isOwn ? 'justify-end' : 'justify-start')}
                        >
                          <div className={cn('flex gap-3 max-w-[80%]', isOwn && 'flex-row-reverse')}>
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={msg.senderAvatar} alt={msg.senderName} />
                              <AvatarFallback>{msg.senderName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div
                                className={cn(
                                  'rounded-lg p-4',
                                  isOwn
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : 'bg-muted'
                                )}
                              >
                                <p className="text-sm">{msg.message}</p>
                              </div>
                              <span className="text-xs text-muted-foreground mt-1 block">
                                {formatTime(msg.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-8">
                <div>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                    <Send className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">No conversation selected</h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list or try the AI Assistant
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Messages;
