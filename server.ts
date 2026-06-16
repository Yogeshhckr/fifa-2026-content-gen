import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Primary generation API endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const { topic, style, duration, language, tone } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const promptText = `Create a viral YouTube Shorts script about the FIFA World Cup 2026.
Topic: ${topic}
Content Style: ${style}
Duration: ${duration}
Language: ${language}
Tone: ${tone}

IMPORTANT CONSTRAINTS FOR THE RESPONSE:
1. Script text ('scriptText') MUST only contain clean spoken narration. Do NOT include camera notes, fx hints, brackets, screen directions, speaker tags (e.g. [Host], (Voiceover)) or non-spoken symbols.
2. The spoken speed should correspond to ${duration}. A standard rate is roughly 2.5 to 3 words per second:
   - 30 seconds: ~75 to 90 words
   - 45 seconds: ~110 to 135 words
   - 60 seconds: ~150 to 180 words
   - 90 seconds: ~225 to 270 words
   Adjust the text density to fit the requested duration exactly, and keep retention maximized.
3. The visualBreakdown segment must span from 0 seconds to the requested ${duration} in logical increments (e.g., 3 to 5 second intervals).
4. All text fields, titles, descriptions, hashtags, keywords, and Hooks should be written/translated and outputted in ${language}. (For "Hinglish", use Hindi words typed in Latin script, which is extremely viral in India).
5. Generate EXACTLY 20 relevant hashtags starting with "#".
6. Generate EXACTLY 20 SEO key phrases or keywords.
7. Provide 5 alternative opening hooks and 5 alternative closing CTAs in the requested language.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: `You are an elite YouTube sports documentary writer and growth hacker. You specialize in viral YouTube Shorts content focusing on the FIFA World Cup 2026. Your scripts possess incredible hooks, high retention pacing, storytelling beats, and massive viral loops.
You must return a valid JSON object matching the defined response schema. Crucially: The 'scriptText' field must be ONLY spoken narration with zero production instructions, bracketed words, scene numbers, or camera tags. Everything in 'scriptText' is spoken verbatim. All other elements like hashtags (exactly 20), keywords (exactly 20), titles (5 options), hooks, and CTAs must be in the specified output language.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            scriptText: {
              type: Type.STRING,
              description: "The complete clean spoken narration script. No bracketed instructions, camera angles or FX notes.",
            },
            visualBreakdown: {
              type: Type.ARRAY,
              description: "Sequence of scenes outlining timings and what is visualised on screen.",
              items: {
                type: Type.OBJECT,
                properties: {
                  timeRange: {
                    type: Type.STRING,
                    description: "Timing range, e.g., '0-3 sec', '3-6 sec'. Ensure they sum exactly to the selected duration.",
                  },
                  suggestion: {
                    type: Type.STRING,
                    description: "High-retention visual suggestion matching the narration at this moment.",
                  },
                },
                required: ["timeRange", "suggestion"],
              },
            },
            thumbnail: {
              type: Type.OBJECT,
              properties: {
                text: {
                  type: Type.STRING,
                  description: "High-contrast short thumbnail text (3-5 words maximum).",
                },
                concept: {
                  type: Type.STRING,
                  description: "Stunning graphic layout design and photo composition suggestion.",
                },
                emotionTrigger: {
                  type: Type.STRING,
                  description: "The exact psychological driver (e.g., Shock, Suspense, Curiosity, Patriotism).",
                },
              },
              required: ["text", "concept", "emotionTrigger"],
            },
            viralPackage: {
              type: Type.OBJECT,
              properties: {
                title: {
                  type: Type.STRING,
                  description: "The primary viral YouTube Shorts title (less than 60 chars) with high-relevance emojis.",
                },
                alternativeTitles: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "Exactly 5 click-maximizing alternative titles.",
                },
                seoDescription: {
                  type: Type.STRING,
                  description: "Short Description with timestamps and tags maximized for search query discoverability.",
                },
                hashtags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of exactly 20 highly relevant viral tags starting with '#'.",
                },
                seoKeywords: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "List of exactly 20 keywords for tags column and search visibility.",
                },
              },
              required: ["title", "alternativeTitles", "seoDescription", "hashtags", "seoKeywords"],
            },
            engagementHooks: {
              type: Type.OBJECT,
              properties: {
                openingHooks: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "5 alternative highly grabbing opening lines.",
                },
                endCtas: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                  description: "5 action-packed closing lines to boost subscriber rate and shares.",
                },
              },
              required: ["openingHooks", "endCtas"],
            },
          },
          required: ["scriptText", "visualBreakdown", "thumbnail", "viralPackage", "engagementHooks"],
        },
      },
    });

    const text = response.text || "{}";
    const data = JSON.parse(text);
    return res.json(data);
  } catch (error: any) {
    console.error("Failure inside API generator router:", error);
    return res.status(500).json({
      error: error.message || "An error occurred while generating your script.",
    });
  }
});

async function startServer() {
  // Vite middleware setup for Development or Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FIFA 2026 Shorts Script Generator running on http://localhost:${PORT}`);
  });
}

startServer();
