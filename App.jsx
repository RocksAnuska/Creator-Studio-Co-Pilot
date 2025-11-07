import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
// Note: Removed 'import "./App.css";' as all styles are now handled by Tailwind CSS classes.

// --- Constants ---
// Fix: Removed reference to process.env.REACT_APP_API_URL as `process` is not defined in the browser environment.
// Hardcoding the API URL.
const API_URL = 'http://localhost:5000/api';

const CONTENT_TYPES = ['YouTube Shorts', 'Instagram Reel', 'TikTok', 'LinkedIn Post', 'Blog Post', 'Twitter Thread'];
const TONES = ['Casual', 'Professional', 'Humorous', 'Motivational', 'Educational', 'Gen-Z Slang'];
const THEMES = ['Educational', 'Motivational', 'Business', 'Lifestyle', 'Entertainment', 'Tech'];

// --- Helper Functions ---

// Simple unique ID generator for user
const getUserId = () => {
  let userId = localStorage.getItem('creator_studio_userId');
  if (!userId) {
    userId = `user_${new Date().getTime()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('creator_studio_userId', userId);
  }
  return userId;
};

// Custom Alert component
const CustomAlert = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div className="relative rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
        <p className="text-sm font-medium text-gray-900">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-1 right-1 rounded-md p-1 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

// Copy to clipboard fallback for iframes
const copyToClipboard = (text, setAlertMessage) => {
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy'); // Using execCommand as a fallback
    document.body.removeChild(ta);
    setAlertMessage('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    setAlertMessage('Failed to copy text.');
  }
};

// --- Helper Components ---

const FormInput = ({ label, value, onChange, name, placeholder, type = 'text' }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base"
      />
    )}
  </div>
);

const FormSelect = ({ label, value, onChange, name, options }) => (
  <div className="mb-5">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-base appearance-none bg-white bg-no-repeat bg-right-3"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1.25em 1.25em',
      }}
    >
      <option value="" disabled>Select {label.toLowerCase()}...</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const ResultCard = ({ title, content, onRegenerate, setAlertMessage }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = Array.isArray(content) ? content.join(' ') : content;
    copyToClipboard(textToCopy, setAlertMessage);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formattedContent = Array.isArray(content)
    ? <p className="text-gray-600">{content.join(' ')}</p>
    : content.split('\n').map((line, i) => (
        <p key={i} className="text-gray-600 mb-2 min-h-[1.5rem]">
          {line || '\u00A0'}
        </p>
      )); // Render newlines

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6 animate-fadeIn">
      <div className="bg-indigo-50 p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-indigo-700">{title}</h3>
          <div className="flex space-x-2">
            <button
              className="p-1 rounded-full text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              onClick={onRegenerate}
              title={`Regenerate ${title}`}
              aria-label={`Regenerate ${title}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m-15.357-2A8.001 8.001 0 0019.418 15m0 0H15"></path></svg>
            </button>
            <button
              className="p-1 rounded-full text-gray-500 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              onClick={handleCopy}
              title={`Copy ${title}`}
              aria-label={`Copy ${title}`}
            >
              {isCopied ? (
                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="p-5 text-sm leading-relaxed whitespace-pre-wrap">
        {formattedContent}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <div className="flex flex-col justify-center items-center text-center p-8">
    <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin mb-4"></div>
    <p className="text-gray-600 font-medium">Your Co-pilot is thinking...</p>
    <p className="text-gray-500 text-sm">This can take up to 30 seconds.</p>
  </div>
);

const ErrorMessage = ({ message, onClear }) => (
  <div className="bg-red-50 border border-red-300 text-red-700 rounded-md p-5 text-center">
    <p className="font-bold mb-2">Oops! Something went wrong.</p>
    <p className="text-sm mb-4">{message}</p>
    <button
      onClick={onClear}
      className="px-4 py-2 bg-white text-red-700 border border-red-300 rounded-md text-sm font-medium hover:bg-red-50 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const HistoryModal = ({ isOpen, onClose, userId }) => {
  // In a real app, you would fetch history from the API here
  // e.g., using a useEffect hook that triggers on `isOpen`
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-40 flex justify-center items-center animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Generation History</h2>
          <button
            className="p-1 rounded-full text-gray-400 hover:bg-gray-200"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-600 mb-4">User ID: {userId}</p>
          <p className="text-gray-500 mb-4">History list would appear here...</p>
          {/* Example item */}
          <div className="border border-gray-200 rounded-md p-4">
            <strong className="text-gray-700">Topic:</strong> How to make sourdough
            <br />
            <strong className="text-gray-700">Type:</strong> YouTube Shorts
            <br />
            <strong className="text-gray-700">Date:</strong> 2025-11-06
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
function App() {
  const [formData, setFormData] = useState({
    topic: '',
    contentType: CONTENT_TYPES[0],
    tone: TONES[0],
    targetAudience: '',
    theme: THEMES[0],
  });
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState('');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setUserId(getUserId());
  }, []);

  const handleAlertClose = () => {
    setAlertMessage('');
  };

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResults(null);

    const dataToSubmit = { ...formData, userId };

    try {
      const response = await axios.post(`${API_URL}/generate/complete`, dataToSubmit);
      if (response.data && response.data.success) {
        setResults(response.data.data);
      } else {
        throw new Error(response.data.message || 'Invalid response from server.');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err.response?.data?.message || err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!results) return;
    
    const dataToSave = {
      ...formData,
      userId,
      generatedScript: results.script,
      generatedCaption: results.caption,
      generatedHashtags: results.hashtags,
      generatedThumbnailPrompt: results.thumbnailPrompt,
      audioSuggestion: results.audioSuggestion,
    };

    try {
      const response = await axios.post(`${API_URL}/content/save`, dataToSave);
      if (response.data && response.data.success) {
        setAlertMessage('Content saved successfully!');
      } else {
        throw new Error(response.data.message || 'Could not save content.');
      }
    } catch (err) {
      console.error('Save error:', err);
      setAlertMessage(`Save failed: ${err.message}`);
    }
  };

  // Memoized regeneration function
  const handleRegenerate = useCallback(async (field) => {
    const endpointMap = {
      script: 'script',
      caption: 'caption',
      hashtags: 'hashtags',
      thumbnailPrompt: 'thumbnail-prompt',
      audioSuggestion: 'audio-suggestion',
    };

    const endpoint = endpointMap[field];
    if (!endpoint) return;

    // Set loading state for this specific card (visual feedback)
    const originalContent = results[field];
    setResults(prev => ({ ...prev, [field]: 'Regenerating...' }));
    
    const dataToSubmit = { ...formData, userId };

    try {
      const response = await axios.post(`${API_URL}/generate/${endpoint}`, dataToSubmit);
      if (response.data && response.data.success) {
        setResults(prev => ({ ...prev, [field]: response.data.data }));
      } else {
        throw new Error(response.data.message || 'Invalid response.');
      }
    } catch (err) {
      console.error(`Regeneration error for ${field}:`, err);
      // Restore previous content on error
      setResults(prev => ({ ...prev, [field]: originalContent }));
      setAlertMessage(`Failed to regenerate ${field}.`);
    }
  }, [formData, userId, results]);


  return (
    <div className="font-sans bg-gray-50 min-h-screen text-gray-900">
      <CustomAlert message={alertMessage} onClose={handleAlertClose} />
      
      <header className="bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-800">
            Creator Studio <span className="text-indigo-600 font-medium">Co-pilot</span>
          </h1>
          <button
            className="px-4 py-2 bg-white text-sm font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            onClick={() => setIsHistoryModalOpen(true)}
          >
            View History
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* --- Left Panel: Form --- */}
          <div className="lg:col-span-4">
            <div className="sticky top-6 bg-white p-6 rounded-lg shadow border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your Content Kit</h2>
              <p className="text-gray-600 text-sm mb-6">Fill in the details and let your AI co-pilot do the work.</p>
              <form onSubmit={handleSubmit}>
                <FormInput
                  label="Topic"
                  name="topic"
                  type="textarea"
                  value={formData.topic}
                  onChange={handleChange}
                  placeholder="e.g., 'How to make the perfect sourdough bread'"
                />
                <FormSelect
                  label="Content Type"
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  options={CONTENT_TYPES}
                />
                <FormSelect
                  label="Tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleChange}
                  options={TONES}
                />
                <FormInput
                  label="Target Audience"
                  name="targetAudience"
                  value={formData.targetAudGence}
                  onChange={handleChange}
                  placeholder="e.g., 'Beginner bakers in their 20s'"
                />
                <FormSelect
                  label="Theme"
                  name="theme"
                  value={formData.theme}
                  onChange={handleChange}
                  options={THEMES}
                />
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 bg-indigo-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    '✨ Generate Kit'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* --- Right Panel: Results --- */}
          <div className="lg:col-span-8 mt-6 lg:mt-0">
            {isLoading && <LoadingSpinner />}
            
            {error && <ErrorMessage message={error} onClear={() => setError(null)} />}
            
            {!isLoading && !error && !results && (
              <div className="flex flex-col justify-center items-center text-center p-10 h-96 border-2 border-dashed border-gray-300 rounded-lg bg-white">
                <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3M6.343 6.343l-.707-.707m12.728 0l.707-.707M6.343 17.657l-.707.707m12.728 0l.707.707M12 21v-1m-6.364-1.636l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"></path></svg>
                <h3 className="text-xl font-semibold text-gray-800">Your AI-generated content will appear here.</h3>
                <p className="text-gray-500 mt-2">Let's create something amazing!</p>
              </div>
            )}

            {results && (
              <div className="animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-5">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 sm:mb-0">Your Content Kit is Ready!</h2>
                  <button
                    className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                    onClick={handleSave}
                  >
                    Save to History
                  </button>
                </div>

                <ResultCard
                  title="Video Script"
                  content={results.script}
                  onRegenerate={() => handleRegenerate('script')}
                  setAlertMessage={setAlertMessage}
                />
                <ResultCard
                  title="Caption"
                  content={results.caption}
                  onRegenerate={() => handleRegenerate('caption')}
                  setAlertMessage={setAlertMessage}
                />
                <ResultCard
                  title="Hashtags"
                  content={results.hashtags}
                  onRegenerate={() => handleRegenerate('hashtags')}
                  setAlertMessage={setAlertMessage}
                />
                <ResultCard
                  title="Thumbnail Prompt (for DALL-E/Midjourney)"
                  content={results.thumbnailPrompt}
                  onRegenerate={() => handleRegenerate('thumbnailPrompt')}
                  setAlertMessage={setAlertMessage}
                />
                <ResultCard
                  title="Audio Suggestion"
                  content={results.audioSuggestion}
                  onRegenerate={() => handleRegenerate('audioSuggestion')}
                  setAlertMessage={setAlertMessage}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        userId={userId}
      />

      {/* Tailwind CSS JIT Engine Enabler */}
      {/* This ensures all dynamic classes are available in a single-file setup */}
      <div className="hidden">
        <span className="bg-red-50 border-red-300 text-red-700"></span>
        <span className="bg-green-600 hover:bg-green-700 focus:ring-green-500"></span>
        <span className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-600"></span>
        <span className="bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 disabled:bg-indigo-300"></span>
        <span className="text-green-500"></span>
      </div>
    </div>
  );
}

// Add CSS keyframes for animations
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }
`;
document.head.appendChild(style);


export default App;