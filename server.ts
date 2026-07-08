import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Modality } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { WebSocketServer } from "ws";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely to avoid crashing on startup if key is missing
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API endpoint for AI assistant chat with Google Search grounding
app.post("/api/assistant", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages array." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        text: "I am Muttaki Adnan's AI Assistant. Currently, the Gemini API Key is not configured in the Secrets panel, so I am running in a demo mode. Muttaki Adnan is an AI Creative Director, Growth Architect, and Visual Strategist based in Bangladesh. You can find his services, portfolio of cinematic brand films, and tools stack on this website. Please feel free to explore, or use the contact form to schedule a call!"
      });
    }

    // Format messages into Gemini conversation structure
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are the interactive personal AI Assistant for Muttaki Adnan's portfolio website. 
Muttaki Adnan is an AI Creative Director, Growth Architect, and Visual Strategist based in Bangladesh. He is the founder of Ristop and Artna Production Ltd.
Your mission is to provide helpful, engaging, and professional responses to visitors, helping them learn about Muttaki Adnan's work and guiding them to collaborate with him.

Key Information about Muttaki Adnan:
- Background: AI Creative Director, Growth Architect & Visual Strategist. Founder of Ristop and Artna Production Ltd.
- Specializations: Minimalist visual branding, creative strategy, and scalable growth architecture. He directs cinematic, Hollywood-quality, AI-generated films, commercials, and brand worlds for founders and CEOs.
- The 3 Pillars of his System:
  1. AI Creative Direction: End-to-end AI brand films, commercials, and visual worlds. (Link to /services)
  2. AI-Driven Automation: Custom agents, workflows, and systems that run business ops (link to /services)
  3. Scalable Growth Strategy: Positioning, offer design, funnel building, and compounding growth loops. (Link to /services)
- Portfolio Projects: Lumen (AI Fashion Film), Northwind (AI Commercial Spot), Aurora (AI Brand Visual World), Vela (AI-Directed Music Video), Obsidian (AI Product Launch Film), Operator GPT (Internal AI Ops), Studio AI (Client Onboarding Engine), InboxZero AI (Executive Email Agent), Northwave SaaS (Growth System), Halo DTC (Paid + Creative System).
- Tools stack: Adobe suite (Photoshop, Premiere Pro, After Effects, Illustrator), Figma, Canva, Framer, ChatGPT, Midjourney, Runway, Sora, Claude, ElevenLabs, Flux, Stable Diffusion, n8n, Make, Zapier, Notion, Airtable, Google Analytics, Meta Ads, HubSpot, etc.
- Contact: Email (muttakiadnansami@gmail.com) and WhatsApp (+880 1317 680620).

Guidelines for your responses:
1. Always maintain a professional, polite, and creative tone.
2. Be direct and concise. Avoid walls of text. Use bullet points and paragraphs.
3. Guide users to relevant links like "/services", "/portfolio", "/tools", "/about", or "/contact" to book a call if they are interested in hiring him.
4. If a user asks about pricing or booking, direct them to book a discovery call via the Contact page or send him a message.
5. Answer in beautiful Markdown.`,
      },
    });

    const replyText = response.text || "I apologize, but I could not formulate a response at this moment.";
    
    // Extract grounding URLs if search grounding was triggered
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    const sources = chunks ? chunks.map((chunk: any) => ({
      uri: chunk.web?.uri,
      title: chunk.web?.title
    })).filter((s: any) => s.uri && s.title) : [];

    res.json({ text: replyText, sources });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: error.message || "An error occurred on the AI server." });
  }
});

// Setup Vite Dev Server / Static Files Serve
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Running in DEVELOPMENT mode - Mounting Vite Middleware");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Running in PRODUCTION mode - Serving static dist assets");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });

  // Setup WebSocket Server for Live API Voice Conversations
  const wss = new WebSocketServer({ noServer: true });

  server.on("upgrade", (request, socket, head) => {
    const pathname = request.url ? new URL(request.url, `http://${request.headers.host}`).pathname : '';
    if (pathname === "/api/live") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on("connection", async (clientWs) => {
    console.log("Live Voice Connection established.");
    const ai = getGeminiClient();
    if (!ai) {
      clientWs.send(JSON.stringify({ error: "Currently in demo mode. Gemini API Key is not configured in the Secrets panel." }));
      clientWs.close();
      return;
    }

    try {
      const session = await ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } },
          },
          systemInstruction: `You are Adnan Systems AI, the voice assistant for Muttaki Adnan's portfolio website. 
Muttaki Adnan is an AI Creative Director, Growth Architect, and Visual Strategist based in Bangladesh.
Keep your answers brief, friendly, conversational, and energetic. Help the user learn about Muttaki's work in AI films, automation, and growth engineering.
Speak concisely because this is a real-time voice call. Always direct them to contact him or book a call via email (muttakiadnansami@gmail.com) if they are interested!`,
        },
        callbacks: {
          onmessage: (message) => {
            const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              clientWs.send(JSON.stringify({ audio }));
            }
            if (message.serverContent?.interrupted) {
              clientWs.send(JSON.stringify({ interrupted: true }));
            }
          },
        },
      });

      clientWs.on("message", (data) => {
        try {
          const parsed = JSON.parse(data.toString());
          if (parsed.audio) {
            session.sendRealtimeInput({
              audio: { data: parsed.audio, mimeType: "audio/pcm;rate=16000" },
            });
          }
        } catch (e) {
          console.error("Error processing websocket message", e);
        }
      });

      clientWs.on("close", () => {
        console.log("Live Voice Connection closed.");
        session.close();
      });

    } catch (err: any) {
      console.error("Live session failed to start:", err);
      clientWs.send(JSON.stringify({ error: err.message || "Failed to start AI voice session." }));
      clientWs.close();
    }
  });
}

setupServer();
