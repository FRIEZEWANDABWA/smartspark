import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  type Message = {
    text: string;
    sender: 'user' | 'agent';
    time: string;
  };
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: 'Hi! How can I assist you today? 😊', 
      sender: 'agent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowPopup(true);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = { 
      text: message, 
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setMessage('');

    // Generate friendly, human-like responses
    setTimeout(() => {
      let responseText = '';
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('service') || lowerMessage.includes('what do you do')) {
        responseText = 'Great question! 😊 We offer 5 main services: Virtual Assistance, Freelance Writing, Web & Graphic Design, Video Editing, and AI & Data Services. Which one catches your interest?';
      } else if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
        responseText = 'I\'d love to help with pricing! 💰 Each project is unique, so we customize our quotes. Click "Get a Quote" on any service or let me connect you with one of our agents for detailed pricing.';
      } else if (lowerMessage.includes('location') || lowerMessage.includes('where')) {
        responseText = 'We\'re proudly based in the USA 🇺🇸 but serve amazing clients all around the world! Our remote team provides 24/7 support across all time zones.';
      } else if (lowerMessage.includes('ai') || lowerMessage.includes('artificial intelligence')) {
        responseText = 'AI is our specialty! 🤖 We do prompt engineering, ChatGPT automation, and data annotation. We truly believe technology should make life easier for everyone!';
      } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
        responseText = 'I\'m happy to connect you! 📞 Email us at frizywandabwa@gmail.com or call 0718300236. We\'re here 24/7 to help!';
      } else if (lowerMessage.includes('experience') || lowerMessage.includes('portfolio')) {
        responseText = 'We\'re quite proud of our work! 🌟 We\'ve completed 100+ projects across 50+ countries. Check out our portfolio section to see our amazing work in writing, design, video, AI, and web development!';
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        responseText = 'Hello there! 👋 It\'s wonderful to meet you! How can I assist you today? Feel free to ask about our services, pricing, or anything else!';
      } else {
        responseText = 'Thanks for reaching out! 😊 I\'m here to help with questions about our services, pricing, or anything else. If I\'m not sure about something, I can refer you to ChatGPT, Google, or better yet - connect you with one of our friendly agents for personalized assistance!';
      }
      
      const agentMessage: Message = {
        text: responseText, 
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, agentMessage]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPopup(false);
        }}
        className="fixed bottom-6 right-6 bg-accent-500 text-white rounded-full p-4 shadow-lg hover:bg-accent-600 transition-all z-50"
        aria-label="Chat with us"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Popup Notification */}
      {showPopup && !isOpen && (
        <div className="fixed bottom-20 right-6 bg-primary-800 dark:bg-primary-800 light:bg-secondary-50 rounded-lg shadow-xl p-4 max-w-xs animate-bounce-slow z-50">
          <button 
            onClick={() => setShowPopup(false)}
            className="absolute -top-2 -right-2 bg-accent-500 text-white rounded-full p-1"
          >
            <X size={14} />
          </button>
          <p className="text-text-dark dark:text-text-dark light:text-text-light font-medium">Hi there! 👋</p>
          <p className="text-text-dark/80 dark:text-text-dark/80 light:text-text-light/80 text-sm">How can I assist?</p>
        </div>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 bg-primary-800 dark:bg-primary-800 light:bg-secondary-50 rounded-lg shadow-xl w-80 sm:w-96 z-50 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary-900 dark:bg-primary-900 light:bg-accent-600 text-text-dark dark:text-text-dark light:text-white p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-accent-500 rounded-full p-2 mr-3">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold">SmartSpark Support</h3>
                <p className="text-xs text-text-dark/70 dark:text-text-dark/70 light:text-white/70">We typically reply in a few minutes</p>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-primary-700 dark:bg-primary-700 light:bg-secondary-100">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`rounded-lg p-3 max-w-[80%] ${
                    msg.sender === 'user' 
                      ? 'bg-accent-500 text-white' 
                      : 'bg-primary-800 dark:bg-primary-800 light:bg-accent-600 text-text-dark dark:text-text-dark light:text-white'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender === 'user' ? 'text-white/70' : 'text-text-dark/70 dark:text-text-dark/70 light:text-white/70'
                  }`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-primary-600 dark:border-primary-600 light:border-secondary-300 flex">
            <input
              type="text"
              value={message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-primary-600 dark:border-primary-600 light:border-secondary-300 bg-primary-600 dark:bg-primary-600 light:bg-secondary-50 text-text-dark dark:text-text-dark light:text-text-light rounded-l-lg focus:outline-none focus:border-accent-500"
            />
            <button 
              type="submit"
              className="bg-accent-500 text-white p-2 rounded-r-lg hover:bg-accent-600"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}