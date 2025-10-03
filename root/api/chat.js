import { GoogleGenerativeAI } from '@google/generative-ai';

// IMPORTANT: Set Vercel deployment region
export const config = {
  runtime: 'edge',
  regions: ['iad1'], // US East - choose a region close to you
};

export default async function handler(req) {
  try {
    const { message } = await req.json();

    // Access the API key from environment variables
    const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // For the first version, we'll send a simple prompt directly to the LLM.
    // Later, we will add your resume data here (the RAG pattern).
    const prompt = `You are Rohan's AI assistant. Your goal is to be helpful and answer questions about his portfolio. Keep your answers concise and professional.

    User's Question: "${message}"
    
    Your Answer:`;
    
    const result = await model.generateContentStream(prompt);

    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(chunkText);
        }
        controller.close();
      },
    });
    
    return new Response(stream, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error(error);
    return new Response('Error processing your request.', { status: 500 });
  }
}