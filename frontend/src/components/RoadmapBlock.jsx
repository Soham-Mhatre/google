import React from 'react';

const RoadmapBlock = ({ week, topic, learningMaterial, practiceMaterial, onAddToChecklist }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="font-bold text-lg mb-2">Week {week}: {topic}</h3>
      <p className="mb-2">
        <strong>Learning Material:</strong> <a href={learningMaterial} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{learningMaterial}</a>
      </p>
      <p className="mb-2">
        <strong>Practice Material:</strong> <a href={practiceMaterial} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{practiceMaterial}</a>
      </p>
      <button onClick={onAddToChecklist} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Add to Checklist</button>
    </div>
  );
};

export default RoadmapBlock;