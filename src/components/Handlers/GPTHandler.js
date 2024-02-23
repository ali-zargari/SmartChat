// file: gpt3Handler.js
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: "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" });

export default async function getGPTResponse(messages) {
	try {
		const completion = await openai.chat.completions.create({
			messages: messages,
			model: "gpt-3.5-turbo",
			max_tokens: 100,
		});

		console.log("OpenAI response:", completion);

		return completion;
	} catch(error) {
		console.error("OpenAI request failed:", error);
		throw error;
	}
}