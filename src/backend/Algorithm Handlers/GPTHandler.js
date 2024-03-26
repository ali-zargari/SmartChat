// file: gpt3Handler.js
import { OpenAI } from "openai";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export default async function getGPTResponse(messages) {

	const completion = await openai.chat.completions.create({
		messages: messages,
		model: "gpt-3.5-turbo",
		max_tokens: 2000,
	});

	//console.log("OpenAI response:", completion);

	return completion;

}