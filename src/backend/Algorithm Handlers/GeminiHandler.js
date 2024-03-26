// node --version # Should be >= 18
// npm install @google/generative-ai

import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = process.env.GEMINI_API_KEY;

export default async function getGeminiResponse(messages) {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	//console.log("messages: ", messages);

	const roles = ["user", "model"];
	const partsArray = ["Hello, I have 2 dogs in my house.", "Great to meet you. What would you like to know?"];

	const messagesArray = roles.map((role, index) => {
		return {
			role: role,
			parts: partsArray[index],
		};
	});


	const test = messages.map((msg, index) => {
		return {
			role: index % 2 === 0 ? "user" : "model",
			parts: msg.content,
		};
	});

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
	];

	//console.log("test: ", test);
	console.log("test: ", test);

	console.log("working message", messagesArray);

	const chat = model.startChat({

		history: messagesArray,

		// add safety settings
		safety: safetySettings


	});

	const result = await chat.sendMessage(messages[0].content);
	const response = result.response;
	console.log(response.promptFeedback);
	return response.text();
}


