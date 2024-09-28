import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // Fetch chat history from API
    const fetchChatHistory = async () => {
      const response = await fetch('/api/chat-history');
      const data = await response.json();
      setChatHistory(data.history);
    };
    fetchChatHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="mb-4 inline-block text-blue-500 hover:underline">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-8">Chat History</h1>
      <div className="max-w-3xl mx-auto">
        {chatHistory.map((chat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="font-bold">Date: {new Date(chat.timestamp).toLocaleString()}</p>
            <p>User: {chat.userMessage}</p>
            <p>Bot: {chat.botResponse}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;