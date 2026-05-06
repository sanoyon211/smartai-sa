import { GoogleGenerativeAI } from "@google/generative-ai";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { messages, conversationId } = await req.json();

    // If no conversationId, create one
    let activeConversationId = conversationId;
    if (!activeConversationId) {
      const conversation = await prisma.conversation.create({
        data: {
          title: messages[messages.length - 1].content.substring(0, 50),
          userId: session.user.id,
        },
      });
      activeConversationId = conversation.id;
    }

    // Save user message
    const userMessage = messages[messages.length - 1];
    await prisma.message.create({
      data: {
        role: "user",
        content: userMessage.content,
        conversationId: activeConversationId,
      },
    });

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({ history });

    // Streaming response
    const result = await chat.sendMessageStream(userMessage.content);

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) {
            fullResponse += text;
            controller.enqueue(encoder.encode(text));
          }
        }
        
        // Save assistant message to DB after stream ends
        await prisma.message.create({
          data: {
            role: "assistant",
            content: fullResponse,
            conversationId: activeConversationId,
          },
        });
        
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Conversation-Id": activeConversationId,
      },
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "AI response failed. Please try again." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
