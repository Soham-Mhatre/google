import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
      <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-white">
        &times;
      </button>
      <nav className="mt-8">
        <Link to="/chat-history" className="block py-2 px-4 hover:bg-gray-700">Chat History</Link>
        <Link to="/roadmap-history" className="block py-2 px-4 hover:bg-gray-700">Roadmap History</Link>
      </nav>
    </div>
  );
};

export default Sidebar;