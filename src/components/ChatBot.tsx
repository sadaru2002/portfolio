'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

// Premade questions for quick access
const premadeQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "What's your experience?",
    "What technologies do you use?"
];

// Knowledge base about the portfolio owner
const knowledgeBase = `
You are a helpful AI assistant for Thilina Sandaruwan's portfolio website. 
Here's information about Thilina:

- Name: Thilina Sandaruwan
- Role: Creative Developer, Web Designer, Full-Stack Developer
- Skills: React, Next.js, TypeScript, Node.js, Python, AWS, Docker, Tailwind CSS, MongoDB, PostgreSQL
- Experience: Building modern web applications with cutting-edge technologies
- Projects: Various web applications including trading systems, portfolio sites, and AI-integrated tools
- Contact: Available through the contact form on this website

Be friendly, helpful, and concise. If asked about something not related to Thilina or web development, politely redirect to portfolio-related topics.
`;

interface ChatBotProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "Hi! 👋 I'm Thilina's AI assistant. Ask me anything about his skills, projects, or experience!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (text: string) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: text };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    context: knowledgeBase
                })
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.response || "Sorry, I couldn't process that. Please try again!"
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "Oops! Something went wrong. Please try again later."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage(input);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="fixed bottom-24 right-52 z-[70000] w-[380px] max-h-[600px] flex flex-col"
                    style={{
                        background: 'linear-gradient(180deg, rgba(5, 15, 35, 0.95) 0%, rgba(2, 8, 25, 0.98) 100%)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(0, 240, 255, 0.3)',
                        boxShadow: `
                            0 0 40px rgba(0, 240, 255, 0.15),
                            0 20px 60px rgba(0, 0, 0, 0.5),
                            inset 0 1px 1px rgba(255, 255, 255, 0.1)
                        `
                    }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between p-4 border-b"
                        style={{ borderColor: 'rgba(0, 240, 255, 0.2)' }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)',
                                    border: '1px solid rgba(0, 240, 255, 0.5)'
                                }}
                            >
                                <span className="text-xl">🤖</span>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold text-sm">AI Assistant</h3>
                                <span className="text-cyan-400 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    Online
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-4"
                        style={{ maxHeight: '350px' }}
                    >
                        {messages.map((msg, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'rounded-br-sm'
                                        : 'rounded-bl-sm'
                                        }`}
                                    style={{
                                        background: msg.role === 'user'
                                            ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.3) 0%, rgba(0, 200, 220, 0.2) 100%)'
                                            : 'rgba(255, 255, 255, 0.08)',
                                        border: msg.role === 'user'
                                            ? '1px solid rgba(0, 240, 255, 0.4)'
                                            : '1px solid rgba(255, 255, 255, 0.1)',
                                        color: '#fff'
                                    }}
                                >
                                    {msg.content}
                                </div>
                            </motion.div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div
                                    className="p-3 rounded-2xl rounded-bl-sm"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.1)'
                                    }}
                                >
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Questions */}
                    <div className="px-4 pb-2">
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                            {premadeQuestions.map((q, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(q)}
                                    disabled={isLoading}
                                    className="shrink-0 px-3 py-1.5 text-xs rounded-full text-cyan-300 transition-all hover:bg-cyan-400/20 disabled:opacity-50"
                                    style={{
                                        background: 'rgba(0, 240, 255, 0.1)',
                                        border: '1px solid rgba(0, 240, 255, 0.3)'
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSubmit} className="p-4 pt-2">
                        <div
                            className="flex items-center gap-2 p-2 rounded-full"
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.15)'
                            }}
                        >
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask me anything..."
                                disabled={isLoading}
                                className="flex-1 bg-transparent text-white text-sm px-3 py-2 outline-none placeholder:text-white/40"
                            />
                            <button
                                type="submit"
                                disabled={!input.trim() || isLoading}
                                className="w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.4) 0%, rgba(139, 92, 246, 0.4) 100%)',
                                    border: '1px solid rgba(0, 240, 255, 0.5)'
                                }}
                            >
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
