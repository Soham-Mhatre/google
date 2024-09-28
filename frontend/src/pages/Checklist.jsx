import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Checklist = () => {
  const [checklistItems, setChecklistItems] = useState([]);

  useEffect(() => {
    // Fetch checklist items from API
    const fetchChecklist = async () => {
      const response = await fetch('/api/checklist');
      const data = await response.json();
      setChecklistItems(data.items);
    };
    fetchChecklist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/" className="mb-4 inline-block text-blue-500 hover:underline">&larr; Back to Home</Link>
      <h1 className="text-3xl font-bold mb-8">Checklist</h1>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        {checklistItems.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            <input type="checkbox" className="mr-4" />
            <span>{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;