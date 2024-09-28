import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RoadmapHistory = () => {
  const [roadmapHistory, setRoadmapHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmapHistory = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roadmap/history', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch roadmap history');
        }
        const data = await response.json();
        setRoadmapHistory(data.history);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoadmapHistory();
  }, []);

  if (isLoading) return <div>Loading roadmap history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-6">Roadmap History</h1>
      {roadmapHistory.length === 0 ? (
        <p>No roadmap history available.</p>
      ) : (
        <div className="space-y-4">
          {roadmapHistory.map((roadmap, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">{roadmap.topic}</h2>
              <p>Duration: {roadmap.duration} weeks</p>
              <p className="text-sm text-gray-500">{new Date(roadmap.createdAt).toLocaleString()}</p>
              <Link to={`/roadmap/${roadmap._id}`} className="text-blue-500 hover:underline">View Roadmap</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoadmapHistory;