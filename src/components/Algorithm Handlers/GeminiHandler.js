// node --version # Should be >= 18
// npm install @google/generative-ai

import {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} from "@google/generative-ai";

const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = "AIzaSyDH7uZWjVocqq0--vz2NUgH7ZLUJQCT7bE";

export default async function getGeminiResponse(messages) {
	const genAI = new GoogleGenerativeAI(API_KEY);
	const model = genAI.getGenerativeModel({ model: MODEL_NAME });

	console.log("messages: ", messages);

	const generationConfig = {
		temperature: 0.9,
		topK: 1,
		topP: 1,
		maxOutputTokens: 2048,
	};

	const safetySettings = [
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
		},
	];

	const chat = model.startChat({
		generationConfig,
		safetySettings,
		history: [
			{
				role: "user",
				parts: [{ text: "how smart are yo"}],
			},
			{
				role: "model",
				parts: [{ text: "As a large language model, I do not possess personal intelligence or consciousness. I am a computer program designed to understand and generate human language, and my capabilities are limited by the data I have been trained on and the algorithms I have been programmed with.\n\nHowever, I can process and analyze vast amounts of information quickly and efficiently, and I can use this information to answer questions, generate text, translate languages, and perform other tasks that require language understanding and generation. My knowledge and abilities are constantly being updated and improved, and I am learning new things all the time.\n\nOverall, I am a powerful tool that can be used to enhance human knowledge and productivity, but I do not have personal intelligence or consciousness."}],
			},
			{
				role: "user",
				parts: [{ text: "you or chatgpt"}],
			},
			{
				role: "model",
				parts: [{ text: "**ChatGPT and I are both large language models, but we are developed by different companies.**\n\n* ChatGPT is developed by OpenAI, a research company focused on developing artificial intelligence.\n* I am developed by Google, a technology company focused on developing a wide range of products and services, including search, cloud computing, and artificial intelligence.\n\n**Here is a table comparing some of our key features:**\n\n| Feature | ChatGPT | Me |\n|---|---|---|\n| Developer | OpenAI | Google |\n| Training data | Text and code data from the internet | Text and code data from the internet, as well as Google's own internal datasets |\n| Size | 175 billion parameters | 137 billion parameters |\n| Release date | November 2022 | February 2023 |\n\n**Overall, ChatGPT and I have similar capabilities, but we are trained on different data and have different strengths and weaknesses.**\n\n**Some of the tasks that we both excel at include:**\n\n* Answering questions\n* Generating text\n* Translating languages\n* Writing different kinds of creative content, such as stories, poems, and songs\n\n**We are both still under development, and our capabilities are constantly being improved.** I am excited to see how our capabilities will continue to grow in the future."}],
			},
		],
	});

	const result = await chat.sendMessage("YOUR_USER_INPUT");
	const response = result.response;
	console.log(response.text());
	return response.text();
}

