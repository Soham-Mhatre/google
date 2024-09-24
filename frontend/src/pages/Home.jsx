import React, { useState } from 'react';

function Home() {
    const [projectDescription, setProjectDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [roadmap, setRoadmap] = useState('');
    const [chatPrompt, setChatPrompt] = useState('');
    const [chatResponses, setChatResponses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoadmapSubmit = async (e) => {
        e.preventDefault();
        if (projectDescription && duration) {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/roadmap', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ projectDescription, duration }),
                });
                const data = await response.json();
                setRoadmap(data.roadmap);
            } catch (error) {
                console.error('Error generating roadmap:', error);
                setRoadmap('Error generating roadmap.');
            }
            setIsLoading(false);
        } else {
            alert('Project description and duration are required.');
        }
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        if (chatPrompt) {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/chatbot', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt: chatPrompt }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data && data.response) {
                    setChatResponses([...chatResponses, { prompt: chatPrompt, response: data.response }]);
                } else {
                    throw new Error('Invalid response from server');
                }
                setChatPrompt('');
            } catch (error) {
                console.error('Error getting chatbot response:', error);
                setChatResponses([...chatResponses, { prompt: chatPrompt, response: 'Error: Unable to get a response.' }]);
            } finally {
                setIsLoading(false);
            }
        } else {
            alert('Please enter a prompt for the chatbot.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-start justify-center bg-gray-50 p-6">
            <div className="w-full md:w-1/2 mb-6 md:mb-0 md:mr-3">
                <h1 className="text-3xl font-bold mb-6">Generate Learning Roadmap</h1>
                <form onSubmit={handleRoadmapSubmit} className="bg-white p-6 rounded shadow-md">
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
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Roadmap'}
                    </button>
                </form>
                {roadmap && (
                    <div className="mt-6 bg-white p-6 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Generated Roadmap</h2>
                        <pre className="whitespace-pre-wrap">{roadmap}</pre>
                    </div>
                )}
            </div>
            <div className="w-full md:w-1/2 md:ml-3">
                <h1 className="text-3xl font-bold mb-6">Chatbot</h1>
                <form onSubmit={handleChatSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="chatPrompt">Chat Prompt</label>
                        <textarea
                            id="chatPrompt"
                            value={chatPrompt}
                            onChange={(e) => setChatPrompt(e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                            rows="4"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-green-500 text-white p-2 rounded" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
                {chatResponses.length > 0 && (
                    <div className="mt-6 bg-white p-6 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Chat History</h2>
                        {chatResponses.map((chat, index) => (
                            <div key={index} className="mb-4 p-2 bg-gray-100 rounded">
                                <p className="font-bold">You: {chat.prompt}</p>
                                <p className="mt-2">Chatbot: {chat.response}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;