import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../contexts/LanguageContext';
import { useProfile } from '../contexts/ProfileContext';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m here to help you with farming questions. How can I assist you today?',
      time: new Date(),
    },
  ]);
  const { t, language } = useLanguage();
  const { selectedProfile } = useProfile();

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || message;
    if (!textToSend.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: textToSend,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: `Thank you for asking about "${textToSend}". ${selectedProfile ? `For your ${selectedProfile.cropType} farm` : 'For your farming needs'}, I recommend checking current weather conditions and soil moisture levels. Would you like specific advice about crop management or pest control?`,
        time: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const quickActions = [
    { label: 'Weather Update', action: () => handleSendMessage('What\'s the weather forecast?') },
    { label: 'Pest Control', action: () => handleSendMessage('How to control pests?') },
    { label: 'Fertilizer Advice', action: () => handleSendMessage('When to apply fertilizer?') },
  };

  return (
    <>
      {/* Floating Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-2xl text-white border-4 border-white/20 transition-all duration-300 transform hover:scale-110 relative"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          {!isOpen && messages.length > 1 && (
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{messages.length - 1}</span>
            </div>
          )}
        </Button>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`fixed bottom-24 right-6 w-80 ${isMinimized ? 'h-16' : 'h-96'} bg-white rounded-2xl shadow-2xl border border-green-100 z-40 flex flex-col overflow-hidden transition-all duration-300`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">{language === 'ml' ? 'കൃഷി സഖി AI' : 'Krishi Sakhi AI'}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                  <p className="text-green-100 text-sm">{language === 'ml' ? 'എപ്പോഴും സഹായിക്കാൻ ഇവിടെ' : 'Always here to help'}</p>
                </div>
              </div>
              </div>
              <div className="flex items-center space-x-2">
                {selectedProfile && (
                  <Badge className="bg-white/20 text-white text-xs">
                    {selectedProfile.name}
                  </Badge>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  className="p-1 text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mb-3 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`inline-block max-w-xs p-3 rounded-lg shadow-sm ${
                        msg.type === 'user' 
                          ? 'bg-green-500 text-white' 
                          : 'bg-white text-gray-700'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.type === 'user' ? 'text-green-100' : 'text-gray-500'
                        }`}>
                          {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">{language === 'ml' ? 'വേഗത്തിലുള്ള പ്രവർത്തനങ്ങൾ:' : 'Quick actions:'}</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs rounded-full border-green-200 text-green-600 hover:bg-green-50"
                          onClick={action.action}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-white">
                  <div className="flex items-center space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 border-gray-200 rounded-lg"
                />
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!message.trim()}
                  size="sm"
                  className="bg-green-500 hover:bg-green-600 rounded-lg p-2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
                </div>
              </>
            )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;