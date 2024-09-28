import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to Learning Companion</h1>
      <div className="space-x-4">
        <Link to="/roadmap" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          Create Roadmap
        </Link>
        <Link to="/chatbot" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300">
          Open Chatbot
        </Link>
      </div>
    </div>
  );
};

export default Home;