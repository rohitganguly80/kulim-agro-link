
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Bot, User, Leaf } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m AgroBot, your AI agricultural assistant. I can help you with crop advice, disease identification, fertilizer recommendations, weather insights, and market prices. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const agriculturalKnowledge = {
    'tomato': {
      growing: 'Tomatoes require well-drained soil with pH 6.0-6.8, regular watering, and support structures. Plant after last frost.',
      diseases: 'Common diseases include late blight, early blight, and bacterial wilt. Use proper spacing and avoid overhead watering.',
      fertilizer: 'Use balanced NPK fertilizer. Start with 10-10-10, then switch to lower nitrogen during fruiting.'
    },
    'rice': {
      growing: 'Rice requires flooded fields, warm temperatures (20-35°C), and 1000-2000mm annual rainfall.',
      diseases: 'Watch for blast disease, brown spot, and bacterial leaf streak. Use disease-resistant varieties.',
      fertilizer: 'Apply urea in split doses: 1/3 at transplanting, 1/3 at tillering, 1/3 at panicle initiation.'
    },
    'wheat': {
      growing: 'Wheat grows best in cool, moist conditions. Sow in well-prepared soil with good drainage.',
      diseases: 'Common diseases include rust, smut, and powdery mildew. Use certified seeds and crop rotation.',
      fertilizer: 'Apply nitrogen in split doses. Use DAP at sowing and urea at crown root initiation.'
    },
    'fertilizer': {
      nitrogen: 'Promotes leaf growth and green color. Signs of deficiency: yellowing leaves, stunted growth.',
      phosphorus: 'Essential for root development and flowering. Deficiency causes purple discoloration.',
      potassium: 'Improves disease resistance and fruit quality. Deficiency causes leaf browning.'
    },
    'weather': {
      rainfall: 'Monitor rainfall patterns for irrigation planning. Excess water can cause root rot.',
      temperature: 'Most crops have optimal temperature ranges. Extreme temperatures affect growth and yield.',
      humidity: 'High humidity can promote fungal diseases. Ensure good air circulation.'
    }
  };

  const quickSuggestions = [
    'How to identify tomato diseases?',
    'Best fertilizer for rice crops',
    'Weather impact on crop growth',
    'Organic farming tips',
    'Market prices for vegetables',
    'Soil testing recommendations'
  ];

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Disease identification
    if (lowerMessage.includes('disease') || lowerMessage.includes('pest') || lowerMessage.includes('problem')) {
      if (lowerMessage.includes('tomato')) {
        return 'For tomato diseases, look for: 1) Late blight (brown spots with white edges), 2) Early blight (concentric circles), 3) Bacterial wilt (sudden wilting). I recommend uploading a photo to our Plant Disease Advisory for accurate diagnosis and treatment recommendations.';
      }
      return 'To identify plant diseases, look for symptoms like discolored leaves, spots, wilting, or unusual growth. For accurate diagnosis, visit our Plant Disease Advisory section where you can upload photos and get expert treatment recommendations.';
    }

    // Fertilizer recommendations
    if (lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrient')) {
      if (lowerMessage.includes('tomato')) {
        return agriculturalKnowledge.tomato.fertilizer + ' Also consider calcium to prevent blossom end rot.';
      }
      if (lowerMessage.includes('rice')) {
        return agriculturalKnowledge.rice.fertilizer + ' Monitor crop growth and adjust based on leaf color.';
      }
      return 'Fertilizer needs vary by crop and soil conditions. Generally: NPK ratio depends on growth stage. Soil testing is recommended. Would you like specific recommendations for a particular crop?';
    }

    // Weather-related queries
    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('temperature')) {
      return 'Weather significantly impacts farming. Check your dashboard for current conditions. Key factors: 1) Temperature affects growth rates, 2) Rainfall determines irrigation needs, 3) Humidity influences disease pressure. Plan accordingly!';
    }

    // Market prices
    if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
      return 'Current market prices are available in the Market Analysis section of your farmer dashboard. Prices vary by location and quality. Consider: 1) Seasonal demand, 2) Quality grades, 3) Local vs export markets.';
    }

    // Crop-specific advice
    for (const [crop, info] of Object.entries(agriculturalKnowledge)) {
      if (lowerMessage.includes(crop) && crop !== 'fertilizer' && crop !== 'weather') {
        if (lowerMessage.includes('grow') || lowerMessage.includes('plant')) {
          return info.growing;
        }
        if (lowerMessage.includes('disease')) {
          return info.diseases;
        }
        return `${crop.charAt(0).toUpperCase() + crop.slice(1)} farming tips: ${info.growing}`;
      }
    }

    // Organic farming
    if (lowerMessage.includes('organic')) {
      return 'Organic farming tips: 1) Use compost and green manure, 2) Practice crop rotation, 3) Biological pest control, 4) Avoid synthetic chemicals, 5) Maintain soil health with cover crops.';
    }

    // Soil testing
    if (lowerMessage.includes('soil')) {
      return 'Soil testing is crucial for optimal farming. Test for: pH levels, nutrient content (NPK), organic matter, and micronutrients. I recommend testing every 2-3 years. Based on results, adjust fertilizer applications.';
    }

    // Irrigation
    if (lowerMessage.includes('water') || lowerMessage.includes('irrigation')) {
      return 'Efficient irrigation tips: 1) Water early morning or evening, 2) Use drip irrigation to save water, 3) Monitor soil moisture, 4) Mulch to retain moisture, 5) Avoid overwatering to prevent root rot.';
    }

    // General greetings and help
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help with all your agricultural needs. I can assist with crop advice, disease identification, fertilizer recommendations, weather insights, and market information. What would you like to know?';
    }

    if (lowerMessage.includes('help')) {
      return 'I can help with: 🌱 Crop growing advice, 🦠 Disease identification, 🧪 Fertilizer recommendations, 🌤️ Weather guidance, 💰 Market insights, 🌿 Organic farming tips. Just ask me anything!';
    }

    // Default response
    return 'That\'s an interesting question about agriculture! I\'d be happy to help. Could you be more specific? I can assist with crop advice, disease identification, fertilizer recommendations, weather guidance, or market information.';
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay for more natural interaction
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-green-600 hover:bg-green-700"
        size="icon"
      >
        <div className="relative">
          <Bot className="h-6 w-6" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </div>
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 h-96 shadow-xl z-50 flex flex-col border-green-200">
      <CardHeader className="pb-3 bg-green-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <div className="relative mr-2">
              <Bot className="h-5 w-5" />
              <Leaf className="h-3 w-3 absolute -top-1 -right-1 text-green-300" />
            </div>
            AgroBot
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-green-700"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        {/* Quick Suggestions */}
        {messages.length === 1 && (
          <div className="mb-4 pt-4">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900 border'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0">
                      <Bot className="h-4 w-4 mt-0.5 text-green-600" />
                    </div>
                  )}
                  {message.sender === 'user' && (
                    <User className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 border p-3 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-green-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about crops, diseases, fertilizers..."
            className="flex-1 border-green-200 focus:border-green-500"
          />
          <Button 
            onClick={handleSendMessage} 
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
