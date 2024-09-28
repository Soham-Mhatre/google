import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', content: input }]);
    
    // API call to get chatbot response
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await response.json();
    
    setMessages([...messages, { type: 'user', content: input }, { type: 'bot', content: data.response }]);
    setInput('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Chatbot</h1>
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {msg.content}
              </span>
            </div>
          ))}
        </div>
        <div className="border-t p-4">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow mr-2 p-2 border rounded"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;