export interface Env {
	ELEVENLABS_API_KEY: string;
	GEMINI_API_KEY: string;
  }
  
  /**
   * Main fetch handler for the Cloudflare Worker.
   * This is the single endpoint your frontend will call.
   */
  export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
	  
	  // Set up CORS headers to allow your frontend to call this
	  const corsHeaders = {
		"Access-Control-Allow-Origin": "*", // In production, lock this to your domain
		"Access-Control-Allow-Methods": "POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	  };
  
	  // Handle OPTIONS requests (for CORS preflight)
	  if (request.method === "OPTIONS") {
		return new Response(null, { headers: corsHeaders });
	  }
	  
	  // We only accept POST requests
	  if (request.method !== "POST") {
		return new Response(JSON.stringify({ error: "Method Not Allowed" }), { 
		  status: 405, 
		  headers: { ...corsHeaders, "Content-Type": "application/json" } 
		});
	  }
  
	  try {
		// 1. Get the audio file from the frontend's form-data
		const formData = await request.formData();
		const audioFile = formData.get("audio"); // "audio" must match the frontend's key
  
		if (!audioFile || !(audioFile instanceof Blob)) {
		  return new Response(JSON.stringify({ error: "No audio file found" }), { 
			status: 400, 
			headers: { ...corsHeaders, "Content-Type": "application/json" } 
		  });
		}
  
		// 2. Pass to the ElevenLabs function
		const transcript = await getTranscript(audioFile, env);
  
		// 3. Pass to the Gemini function
		const analysis = await getAnalysis(transcript, env);
  
		// 4. Combine and send the final JSON back to the frontend
		const finalResponse = {
		  transcript: transcript,
		  analysis: analysis,
		};
  
		return new Response(JSON.stringify(finalResponse), {
		  headers: {
			...corsHeaders,
			"Content-Type": "application/json",
		  },
		});
  
	  } catch (error) {
		console.error("Error in main handler:", error);
		const errorMessage = (error instanceof Error) ? error.message : "Unknown error";
		return new Response(JSON.stringify({ error: errorMessage }), {
		  status: 500,
		  headers: {
			...corsHeaders,
			"Content-Type": "application/json",
		  },
		});
	  }
	},
  };
  
  /**
   * Transcribes audio using the ElevenLabs Speech-to-Text API.
   */
  async function getTranscript(audioBlob: Blob, env: Env): Promise<string> {
	console.log("Sending audio to ElevenLabs...");
	const apiKey = env.ELEVENLABS_API_KEY;
  
	const formData = new FormData();
	// We send the blob as a file. "audio.wav" is just a filename hint.
	formData.append("file", audioBlob, "audio.wav");
	// You may need to add a model_id if you aren't using the default
	// formData.append("model_id", "eleven_multilingual_v2");
  
	const response = await fetch("https://api.elevenlabs.io/v1/speech-to-text", {
	  method: "POST",
	  headers: {
		"Xi-Api-Key": apiKey,
		// Do NOT set "Content-Type": "multipart/form-data" here.
		// The `fetch` API does it automatically when given a FormData body.
	  },
	  body: formData,
	});
  
	if (!response.ok) {
	  const errorText = await response.text();
	  console.error("ElevenLabs API Error:", errorText);
	  throw new Error(`Failed to transcribe audio: ${errorText}`);
	}
  
	const transcriptData: any = await response.json();
	
	if (!transcriptData.text) {
	   console.error("ElevenLabs Response Format Error:", transcriptData);
	   throw new Error("Invalid response format from ElevenLabs");
	}
  
	console.log("Got transcript.");
	return transcriptData.text;
  }
  
  /**
   * Analyzes a transcript using the Google Gemini API.
   */
  async function getAnalysis(transcript: string, env: Env): Promise<any> {
	console.log("Sending transcript to Gemini...");
	const apiKey = env.GEMINI_API_KEY;
  
	// The prompt is the most important part!
	const systemPrompt = `You are a world-class career coach. A student just had a conversation with a recruiter. Here is the transcript: "${transcript}".
  Analyze this transcript and return ONLY a valid JSON object (no other text, no markdown wrappers like \`\`\`json) with the following keys: "summary", "sentiment", "email_draft", "coaching_tip".
  - summary: A brief 2-sentence summary of the conversation.
  - sentiment: One word: "Positive", "Neutral", or "Negative".
  - email_draft: A professional follow-up email draft based on the conversation.
  - coaching_tip: One actionable tip for the student for next time.`;
  
	// Adjust model as needed (e.g., gemini-1.5-flash-latest)
	const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${apiKey}`;
  
	const body = {
	  contents: [{
		parts: [{ "text": systemPrompt }]
	  }],
	  // Add safety settings to reduce chances of being blocked
	  safetySettings: [
		  { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
		  { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
		  { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
		  { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
	  ],
	  // Force Gemini to output JSON
	  generationConfig: {
		"responseMimeType": "application/json",
	  }
	};
  
	const response = await fetch(apiUrl, {
	  method: "POST",
	  headers: {
		"Content-Type": "application/json",
	  },
	  body: JSON.stringify(body),
	});
  
	if (!response.ok) {
	  const errorText = await response.text();
	  console.error("Gemini API Error:", errorText);
	  throw new Error(`Failed to get analysis: ${errorText}`);
	}
  
	const data: any = await response.json();
  
	// With responseMimeType, we *should* get clean JSON directly.
	const jsonResponseText = data.candidates[0].content.parts[0].text;
	
	console.log("Got analysis.");
	// The text itself *is* the JSON object, so we parse it.
	return JSON.parse(jsonResponseText);
  }