import React, { useState } from 'react';

const ChatbotFloater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { type: 'user', content: input }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chatbot/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT token in localStorage
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from chatbot');
      }

      const data = await response.json();
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error in chatbot request:', error);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: 'Sorry, I encountered an error.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-white rounded-full p-4">
          Chat
        </button>
      ) : (
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold">Chatbot</h3>
            <button onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded ${msg.type === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {isLoading && <div className="text-center text-gray-500">Loading...</div>}
          </div>
          <div className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded-l px-2 py-1"
                placeholder="Type a message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend} className="bg-blue-500 text-white px-4 py-1 rounded-r">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotFloater;