import {VertexAI, HarmCategory, HarmBlockThreshold} from "@google-cloud/vertexai";

const project = "your-cloud-project";
const location = "us-central1";

const vertex_ai = new VertexAI({project: project, location: location});

// Instantiate models
const generativeModel = vertex_ai.getGenerativeModel({
	model: "gemini-pro",
	// The following parameters are optional
	// They can also be passed to individual content generation requests
	safety_settings: [{category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE}],
	generation_config: {max_output_tokens: 256},
});

const generativeVisionModel = vertex_ai.getGenerativeModel({
	model: "gemini-pro-vision",
});

export default async function getGeminiResponse(messages) {

	try{

	} catch (error) {
		console.error("VertexAI request failed:", error);
		throw error;
	}

}