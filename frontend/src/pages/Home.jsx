import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [projectDescription, setProjectDescription] = useState('');
    const [duration, setDuration] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectDescription && duration) {
            navigate('/roadmap', { state: { projectDescription, duration } });
        } else {
            alert('Project description and duration are required.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6">Generate Learning Roadmap</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="description">Project Description</label>
                    <textarea
                        id="description"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="duration">Duration (weeks)</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Generate Roadmap
                </button>
            </form>
        </div>
    );
}

export default Home;
