import React, { useState } from 'react';

function Chatbot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSend = async (e) => {
    e.preventDefault();
    const userMessage = input;

    // Append the user message
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: userMessage },
    ]);

    // Clear the input field
    setInput('');

    // Send the question to the backend API
    try {
      const response = await fetch('http://localhost:5000/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
      });

      const data = await response.json();

      // Append the chatbot's response
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: data.answer || 'Error in response' },
      ]);
    } catch (error) {
      // Handle any errors
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: 'bot', content: 'Sorry, something went wrong!' },
      ]);
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
        <div className="chat-window h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message my-2 p-2 ${
                msg.role === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <p>{msg.content}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSend} className="mt-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 w-full rounded-l"
            placeholder="Ask a question..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbot;
