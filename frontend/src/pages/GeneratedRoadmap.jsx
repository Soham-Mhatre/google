import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GeneratedRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedRoadmap = localStorage.getItem('generatedRoadmap');
    if (storedRoadmap) {
      try {
        const parsedRoadmap = JSON.parse(storedRoadmap);
        console.log('Retrieved roadmap:', parsedRoadmap);
        setRoadmap(parsedRoadmap);
      } catch (e) {
        console.error('Error parsing roadmap:', e);
        setError('Error loading roadmap data');
      }
      localStorage.removeItem('generatedRoadmap');
    } else {
      setError('No roadmap data found');
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <Link to="/roadmap" className="text-blue-500 hover:underline">&larr; Back to Roadmap Generator</Link>
        <div className="text-center text-lg mt-8 text-red-500">{error}</div>
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <Link to="/roadmap" className="text-blue-500 hover:underline">&larr; Back to Roadmap Generator</Link>
        <div className="text-center text-lg mt-8">Loading roadmap...</div>
      </div>
    );
  }

  // Split the roadmap string into weeks
  const weeks = roadmap.split(/\*\*Week \d+:/).filter(week => week.trim() !== '');

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/roadmap" className="text-blue-500 hover:underline">&larr; Back to Roadmap Generator</Link>
      <h1 className="text-3xl font-bold mb-8 text-center">Generated Roadmap</h1>
      <div className="max-w-4xl mx-auto">
        {weeks.map((week, index) => {
          const [topic, ...content] = week.split('\n').filter(line => line.trim() !== '');
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Week {index + 1}: {topic}</h2>
              <div className="mb-4">
                {content.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneratedRoadmap;