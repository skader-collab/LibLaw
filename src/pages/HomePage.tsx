import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { ChatBubbleLeftRightIcon, ScaleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to chat page with the query
      window.location.href = `/chat?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Get Expert Legal Advice <br />
            <span className="text-primary">When You Need It</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Access instant legal guidance powered by AI. Get answers to your legal questions
            in simple, easy-to-understand language.
          </p>
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex items-center shadow-lg rounded-lg overflow-hidden bg-white">
              <label htmlFor="legal-search" className="sr-only">
                Search for legal advice
              </label>
              <input
                id="legal-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ask your legal question..."
                className="flex-1 px-6 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Legal question search"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-primary text-white hover:bg-green-600 transition-colors duration-200"
                aria-label="Search"
              >
                <MagnifyingGlassIcon className="h-6 w-6" />
              </button>
            </div>
          </form>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Fast Responses</h3>
              <p className="text-gray-600">Get instant answers to your legal questions, available 24/7 through our AI-powered chat system.</p>
              <Link to="/chat" className="mt-4 inline-block text-primary hover:text-green-600">Try it now →</Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <ScaleIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Simple Language</h3>
              <p className="text-gray-600">Complex legal concepts explained in plain English, making law accessible to everyone.</p>
              <Link to="/about" className="mt-4 inline-block text-primary hover:text-green-600">Learn more →</Link>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <DocumentTextIcon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Comprehensive Topics</h3>
              <p className="text-gray-600">Explore a wide range of legal topics, from family law to business regulations.</p>
              <Link to="/topics" className="mt-4 inline-block text-primary hover:text-green-600">Browse topics →</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
