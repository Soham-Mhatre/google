import React from 'react';

const RoadmapBlock = ({ week, topic, learningObjectives, resources, practiceExercises, onAddToChecklist }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <h3 className="font-bold text-lg mb-2">Week {week}: {topic}</h3>
      {learningObjectives.length > 0 && (
        <div>
          <h4 className="font-bold mb-2">Learning Objectives:</h4>
          <ul className="list-disc pl-6">
            {learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}
      {resources.length > 0 && (
        <div>
          <h4 className="font-bold mb-2">Resources:</h4>
          <ul className="list-disc pl-6">
            {resources.map((resource, index) => (
              <li key={index}>{resource}</li>
            ))}
          </ul>
        </div>
      )}
      {practiceExercises.length > 0 && (
        <div>
          <h4 className="font-bold mb-2">Practice Exercises:</h4>
          <ul className="list-disc pl-6">
            {practiceExercises.map((exercise, index) => (
              <li key={index}>{exercise}</li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={onAddToChecklist} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Add to Checklist</button>
    </div>
  );
};

export default RoadmapBlock;