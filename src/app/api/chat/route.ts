import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = 'AIzaSyCIrOr2C3dDS481R38I5P0IOWLvSR9kfg4';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, context } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        console.log('Sending to Gemini:', message);

        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${context}\n\nUser: ${message}\n\nRespond in 1-2 short sentences, be friendly and helpful.`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 150,
                    }
                })
            }
        );

        console.log('Gemini response status:', geminiResponse.status);

        if (!geminiResponse.ok) {
            const errorText = await geminiResponse.text();
            console.error('Gemini error:', errorText);

            // Provide fallback responses based on keywords
            const lowerMessage = message.toLowerCase();
            if (lowerMessage.includes('skill')) {
                return NextResponse.json({
                    response: "I specialize in React, Next.js, TypeScript, Node.js, Python, and cloud technologies like AWS and Docker! 💻"
                });
            }
            if (lowerMessage.includes('project')) {
                return NextResponse.json({
                    response: "I've built trading systems, portfolio websites, and AI-integrated tools. Check out the Work section to see more! 🚀"
                });
            }
            if (lowerMessage.includes('contact')) {
                return NextResponse.json({
                    response: "You can reach me through the contact form below, or connect with me on LinkedIn and GitHub! 📧"
                });
            }
            if (lowerMessage.includes('experience')) {
                return NextResponse.json({
                    response: "I have experience building modern web applications with cutting-edge technologies. I love creating beautiful, functional user experiences! ✨"
                });
            }
            if (lowerMessage.includes('technolog')) {
                return NextResponse.json({
                    response: "My tech stack includes React, Next.js, TypeScript, Node.js, Python, MongoDB, PostgreSQL, AWS, and Docker! 🛠️"
                });
            }

            return NextResponse.json({
                response: "I'm Thilina's AI assistant! Ask me about his skills, projects, or how to contact him. 😊"
            });
        }

        const data = await geminiResponse.json();
        console.log('Gemini data:', JSON.stringify(data, null, 2));

        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (aiText) {
            return NextResponse.json({ response: aiText.trim() });
        }

        return NextResponse.json({
            response: "I'm here to help! Ask me anything about Thilina's skills or projects. 🎯"
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({
            response: "Feel free to ask about my skills, projects, or experience! I'm happy to help. 😊"
        });
    }
}
