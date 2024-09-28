import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chatbot/history', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
        const data = await response.json();
        setChatHistory(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChatHistory();
  }, []);

  if (isLoading) return <div>Loading chat history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-6">Chat History</h1>
      {chatHistory.length === 0 ? (
        <p>No chat history available.</p>
      ) : (
        <div className="space-y-4">
          {chatHistory.map((chat, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <p className="font-bold">User: {chat.userMessage}</p>
              <p>Bot: {chat.botResponse}</p>
              <p className="text-sm text-gray-500">{new Date(chat.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatHistory;