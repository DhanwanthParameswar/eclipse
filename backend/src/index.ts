/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
// This "export interface" tells TypeScript what's in your 'env' object.
// This is a best practice and gives you auto-complete.
export interface Env {
	ELEVENLABS_API_KEY: string;
	GEMINI_API_KEY: string;
  }
  
  export default {
	// The 'env' parameter is how you access your secrets!
	async fetch(
	  request: Request,
	  env: Env, // <-- Right here!
	  ctx: ExecutionContext
	): Promise<Response> {
	  
	  // --- THIS IS HOW YOU USE YOUR KEYS ---
	  // Your code can now securely use these variables.
	  const elevenKey = env.ELEVENLABS_API_KEY;
	  const geminiKey = env.GEMINI_API_KEY;
  
	  // For now, let's just log to the *console* that we have them.
	  // (Never return your actual keys in a Response!)
	  console.log("ElevenLabs Key starts with:", elevenKey.substring(0, 4));
	  console.log("Gemini Key starts with:", geminiKey.substring(0, 4));
  
	  return new Response('Hello from the Convo Coach backend! Secrets are loaded.');
	},
  };