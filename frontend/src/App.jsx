import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Roadmap from './pages/Roadmap';
import Chatbot from './pages/Chatbot';
import Checklist from './pages/Checklist';
import ChatHistory from './pages/ChatHistory';
import RoadmapHistory from './pages/RoadmapHistory';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ChatbotFloater from './components/ChatbotFloater';
import GeneratedRoadmap from './pages/GeneratedRoadmap';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-blue-100">
        <Navbar setIsSidebarOpen={setIsSidebarOpen} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          <main className="flex-grow p-6">
            <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg border border-blue-500 border-opacity-30 shadow-lg">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/roadmap" element={<Roadmap />} />
                <Route path="/generated-roadmap" element={<GeneratedRoadmap />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/checklist" element={<Checklist />} />
                <Route path="/chat-history" element={<ChatHistory />} />
                <Route path="/roadmap-history" element={<RoadmapHistory />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </div>
          </main>
        </div>
        <ChatbotFloater />
      </div>
    </Router>
  );
}