import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import RoadmapBlock from '../components/RoadmapBlock';

const Roadmap = () => {
  const [topic, setTopic] = useState('');
  const [weeks, setWeeks] = useState('');
  const [roadmap, setRoadmap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateRoadmap = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/roadmap/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ topic, weeks: parseInt(weeks) }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate roadmap');
      }

      const data = await response.json();
      console.log(data)
      if (!Array.isArray(data.roadmap)) {
        throw new Error('Invalid roadmap format received from server');
      }

      setRoadmap(data.roadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToChecklist = async (content) => {
    try {
      const response = await fetch('http://localhost:5000/api/checklist/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ content, type: 'roadmap' }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to checklist');
      }

      // Optionally, you can show a success message here
    } catch (error) {
      console.error('Error adding to checklist:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 hover:underline">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Which Roadmap Should I Do For You?</h1>

      <div className="max-w-3xl mx-auto">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {isLoading && <div className="text-center">Generating roadmap...</div>}
        {roadmap && Array.isArray(roadmap) && roadmap.length > 0 ? (
          roadmap.map((week, index) => (
            <RoadmapBlock
              key={index}
              week={week.weekNumber}
              topic={week.topic}
              learningObjectives={week.learningObjectives}
              resources={week.resources}
              practiceExercises={week.practiceExercises}
              onAddToChecklist={() => addToChecklist(week.topic)}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">
            {roadmap ? 'No roadmap data available.' : 'Generate a roadmap to see the content here.'}
          </p>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            className="flex-grow mr-2 p-2 border rounded"
          />
          <input
            type="number"
            value={weeks}
            onChange={(e) => setWeeks(e.target.value)}
            placeholder="Weeks"
            className="w-24 mr-2 p-2 border rounded"
            min="1"
          />
          <button
            onClick={generateRoadmap}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Roadmap'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;