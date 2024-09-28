import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RoadmapHistory = () => {
  const [roadmapHistory, setRoadmapHistory] = useState([]);

  useEffect(() => {
    // Fetch roadmap history from API
    const fetchRoadmapHistory = async () => {
      const response = await fetch('/api/roadmap-history');
      const data = await response.json();
      setRoadmapHistory(data.history);
    };
    fetchRoadmapHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="mb-4 inline-block text-blue-500 hover:underline">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-8">Roadmap History</h1>
      <div className="max-w-3xl mx-auto">
        {roadmapHistory.map((roadmap, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <p className="font-bold">Date: {new Date(roadmap.timestamp).toLocaleString()}</p>
            <p>Topic: {roadmap.topic}</p>
            <p>Duration: {roadmap.duration} weeks</p>
            <Link to={`/roadmap/${roadmap.id}`} className="text-blue-500 hover:underline">View Roadmap</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapHistory;