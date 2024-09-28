import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setIsSidebarOpen, isLoggedIn, setIsLoggedIn }) => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <button onClick={() => setIsSidebarOpen(true)} className="text-2xl">☰</button>
      <Link to="/" className="text-xl font-bold">Learning Companion</Link>
      <div>
        {isLoggedIn ? (
          <button onClick={() => setIsLoggedIn(false)} className="bg-red-500 px-4 py-2 rounded">Logout</button>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;