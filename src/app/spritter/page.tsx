'use client'

import { useState, useEffect, useRef } from "react"

export default function Spitter() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null); // Reference for scroll position

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add the user message to the array
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'user', text: input },
        ]);

        try {
            const res = await fetch('/api/gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            const data = await res.json();
            const botResponse = data.output;

            // Add the bot's response to the array
            setMessages((prevMessages) => [
                ...prevMessages,
                { sender: 'bot', text: botResponse },
            ]);

            setResponse(botResponse);
        } catch (error) {
            console.error('Error fetching response:', error);
            setResponse('Error fetching response');
        }
        setInput('');
    };

    // Auto-scroll to the bottom of the chat on new message or response
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <div className="flex flex-col md:flex-row items-start justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            {/* Chatbot Left Side with Image and Heading */}
            <div className="w-full md:w-1/3 flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl text-white font-semibold mb-4">Welcome to Spritter</h2>
                <img
                    src="../../ai.jpg"
                    alt="AI"
                    className="w-full h-96 object-cover rounded-lg mb-4 border-4 border-gray-600"
                />
            </div>

            {/* Chatbot Conversation Area */}
            <div className="w-full md:w-2/3 flex flex-col items-center bg-white p-4 rounded-lg shadow-lg overflow-hidden">
                <div className="w-full h-96 overflow-y-scroll bg-gray-100 p-4 rounded-lg space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs p-3 rounded-lg ${
                                    message.sender === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-700 text-white'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} /> {/* Scroll reference */}
                </div>

                <form onSubmit={handleSubmit} className="w-full mt-4 flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 text-gray-700"
                    />
                    <button
                        type="submit"
                        className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
}
