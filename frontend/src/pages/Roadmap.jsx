import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Roadmap() {
  const location = useLocation();
  const { projectDescription, duration } = location.state;
  const [roadmap, setRoadmap] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/roadmap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ projectDescription, duration }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch roadmap');
        }

        const data = await response.json();
        setRoadmap(data.roadmap);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, [projectDescription, duration]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-4">Roadmap for your project</h1>
      <p className="text-lg mb-4">Duration: {duration} weeks</p>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : roadmap ? (
        <div className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-xl font-bold mb-2">Roadmap Content</h2>
          <pre className="whitespace-pre-wrap">{roadmap}</pre>
        </div>
      ) : (
        <p>No roadmap generated.</p>
      )}
    </div>
  );
}

export default Roadmap;