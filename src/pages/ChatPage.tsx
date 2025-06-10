import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaperAirplaneIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const ChatPage = () => {
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState(searchParams.get('q') || '');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If there's an initial query, submit it automatically
    if (searchParams.get('q')) {
      handleSubmit(new Event('submit') as any);
    }
  }, []);
  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setError(null);
    const timestamp = new Date();

    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', content: message, timestamp }]);
    setIsLoading(true);

    try {
      // Simulate AI response - In production, this would be replaced with an actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setChatHistory(prev => [...prev, {
        type: 'ai',
        content: 'This is a simulated AI response. In the actual implementation, this would be replaced with a real AI-generated response based on your legal question.',
        timestamp: new Date()
      }]);
    } catch (err) {
      setError('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
      setMessage('');
    }
  };

  return (    <div className="max-w-3xl mx-auto px-4 pt-2">
      {error && (
        <div className="flex items-center gap-2 p-3 mb-2 bg-red-50 text-red-700 rounded-lg">
          <ExclamationCircleIcon className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-[calc(100vh-120px)] overflow-y-auto p-2 space-y-2">
            <p className="text-sm">Ask your legal question below:</p>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  chat.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {chat.content}
                <div className="text-xs opacity-50 mt-1">
                  {chat.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3 flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your legal question..."
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Legal question input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
              disabled={isLoading}
              aria-label="Send message"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
