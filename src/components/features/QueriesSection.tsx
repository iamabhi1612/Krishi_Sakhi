import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Bot, User, Image, Paperclip, Smile } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';
import { useProfile } from '../../contexts/ProfileContext';

const QueriesSection = () => {
  const { t, language } = useLanguage();
  const { selectedProfile } = useProfile();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: language === 'ml' 
        ? 'നമസ്കാരം! ഞാൻ നിങ്ങളുടെ കൃഷി സഖി AI അസിസ്റ്റന്റ് ആണ്. ഇന്ന് നിങ്ങളുടെ കൃഷിയിൽ എങ്ങനെ സഹായിക്കാം?'
        : 'Hello! I\'m your Krishi Sakhi AI assistant. How can I help you with your farming today?',
      time: new Date(),
      suggestions: ['Weather forecast', 'Crop diseases', 'Fertilizer advice', 'Market prices'],
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses = {
    'weather': language === 'ml' 
      ? 'ഇന്നത്തെ കാലാവസ്ഥ: 28°C, 75% ആർദ്രത. ഇന്ന് 15mm മഴ പ്രതീക്ഷിക്കുന്നു. നിങ്ങളുടെ വിളകൾ സംരക്ഷിക്കാൻ ശ്രദ്ധിക്കുക.'
      : 'Today\'s weather: 28°C, 75% humidity. Expecting 15mm rainfall today. Please protect your crops accordingly.',
    'fertilizer': language === 'ml' 
      ? 'നിങ്ങളുടെ വിളയുടെ വളർച്ചാ ഘട്ടം അനുസരിച്ച്, നൈട്രജൻ സമ്പുഷ്ടമായ വളം പ്രയോഗിക്കാൻ ഇത് അനുയോജ്യമായ സമയമാണ്.'
      : 'Based on your crop growth stage, this is the ideal time to apply nitrogen-rich fertilizer for optimal growth.',
    'pest': language === 'ml' 
      ? 'തവിട്ട് ചാടി പ്രാണികളുടെ പ്രവർത്തനം സമീപ പ്രദേശങ്ങളിൽ റിപ്പോർട്ട് ചെയ്യപ്പെട്ടിട്ടുണ്ട്. നിങ്ങളുടെ വിളകൾ സൂക്ഷ്മമായി നിരീക്ഷിക്കുക.'
      : 'Brown planthopper activity has been reported in nearby areas. Please monitor your crops closely and consider organic pest control methods.',
    'market': language === 'ml' 
      ? 'നിലവിലെ വിപണി വിലകൾ അനുകൂലമാണ്. പാകമായ വിളകൾ വിളവെടുക്കാൻ പരിഗണിക്കുക.'
      : 'Current market prices are favorable. Consider harvesting mature crops. Rice: ₹2,800/quintal, Vegetables: 15-20% above average.',
  };

  const handleSendMessage = (message?: string) => {
    const messageText = message || inputMessage;
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      time: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let botMessage = '';
      const lowerMessage = messageText.toLowerCase();
      
      if (lowerMessage.includes('weather') || lowerMessage.includes('കാലാവസ്ഥ')) {
        botMessage = predefinedResponses.weather;
      } else if (lowerMessage.includes('fertilizer') || lowerMessage.includes('വളം')) {
        botMessage = predefinedResponses.fertilizer;
      } else if (lowerMessage.includes('pest') || lowerMessage.includes('കീടം')) {
        botMessage = predefinedResponses.pest;
      } else if (lowerMessage.includes('market') || lowerMessage.includes('വിപണി')) {
        botMessage = predefinedResponses.market;
      } else {
        botMessage = language === 'ml'
          ? `നിങ്ങളുടെ "${messageText}" എന്ന ചോദ്യത്തിന് നന്ദി! ${selectedProfile ? selectedProfile.cropType + ' കൃഷിയെ' : 'കൃഷിയെ'} കുറിച്ച് കൂടുതൽ വിവരങ്ങൾക്ക് ഞാൻ സഹായിക്കാം. മണ്ണിന്റെ ഈർപ്പം പരിശോധിക്കുകയും ജൈവ വളങ്ങൾ പരിഗണിക്കുകയും ചെയ്യുക.`
          : `Thank you for your question about "${messageText}"! For ${selectedProfile ? selectedProfile.cropType : 'your crops'}, I recommend checking soil moisture levels and considering organic fertilizers for better crop health.`;
      }

      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        message: botMessage,
        time: new Date(),
        suggestions: lowerMessage.includes('weather') ? ['Irrigation schedule', 'Crop protection', 'Drainage tips'] : 
                    lowerMessage.includes('fertilizer') ? ['Application timing', 'Organic options', 'Soil testing'] :
                    ['Weather update', 'Pest control', 'Market prices'],
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would be implemented here
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">AI Chat Assistant</h2>
          {selectedProfile && (
            <Badge className="bg-green-100 text-green-700">Profile: {selectedProfile.name}</Badge>
          )}
        </div>

        <Card className="h-[500px] flex flex-col shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bot className="w-6 h-6 text-green-600" />
              <span>{language === 'ml' ? 'കൃഷി സഖി AI' : 'Krishi Sakhi AI'}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              {isTyping && (
                <span className="text-sm text-gray-500 animate-pulse">
                  {language === 'ml' ? 'ടൈപ്പ് ചെയ്യുന്നു...' : 'Typing...'}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-xl max-h-80">
              {messages.map((message) => (
                <div key={message.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-blue-500' : 'bg-green-500'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-4 h-4 text-white" />
                        ) : (
                          <Bot className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className={`px-4 py-2 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}>
                        <p className="text-sm">{message.message}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Suggestions */}
                  {message.type === 'bot' && message.suggestions && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-2 mt-2 ml-10"
                    >
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs rounded-full border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-white px-4 py-2 rounded-2xl shadow-sm">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex items-center space-x-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-500 hover:text-green-600"
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-500 hover:text-green-600"
              >
                <Image className="w-4 h-4" />
              </Button>
              <div className="flex-1 relative">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={t('chatbot.placeholder')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="pr-12 rounded-xl"
                  disabled={isTyping}
                />
                <Button
                  onClick={toggleVoiceInput}
                  variant="ghost"
                  size="sm"
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 ${
                    isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'
                  }`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="p-2 text-gray-500 hover:text-green-600"
              >
                <Smile className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-green-500 hover:bg-green-600 p-3 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default QueriesSection;