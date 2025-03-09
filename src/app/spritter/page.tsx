'use client'

import { useState, useEffect } from "react"

export default function Spitter() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        try {
            const res = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            const data = await res.json();
            setResponse(data.output);
        } catch (error) {
            console.error('Error fetching response:', error);
            setResponse('Error fetching response');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter text" 
                    className="w-full p-2 border border-gray-600 rounded-lg mb-4 bg-gray-700 text-white placeholder-gray-400"
                />
                <button 
                    type="submit" 
                    className="w-full p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Submit
                </button>
            </form>
            {response && (
                <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4 mt-4 text-white">
                    <div>
                        <h2 className="text-lg font-bold mb-2">Response:</h2>
                        <pre className="whitespace-pre-wrap break-words bg-gray-900 p-2 rounded-lg">{response}</pre>
                    </div>
                </div>
            )}
        </div>
    )
}