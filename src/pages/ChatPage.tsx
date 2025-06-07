import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PaperAirplaneIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import styles from './ChatPage.module.css';

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

  return (
    <div className={styles.chatContainer}>
      {error && (
        <div className={styles.error}>
          <ExclamationCircleIcon className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}
      
      <div className={styles.chatWrapper}>
        <div className={styles.chatMessages}>
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${styles[chat.type]}`}
            >
              <div className={`${styles.message} ${styles[chat.type]}`}>
                {chat.content}
                <div className="text-xs opacity-50 mt-1">
                  {chat.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={styles.messageRow}>
              <div className={styles.loadingDots}>
                <div className={styles.dot} />
                <div className={styles.dot} />
                <div className={styles.dot} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your legal question..."
              className={styles.input}
              aria-label="Legal question input"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendButton}
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
