import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY,
});

export default async function getClaudeResponse(messages) {

	//console.log("messages: ", messages);

	try {
		const response = await anthropic.messages.create({
			model: "claude-3-opus-20240229",
			max_tokens: 1024,
			messages: [{ role: "user", content: messages.map(message => message.content).join(" ")}],
		});

		//console.log("Anthropic response:", response);

		return response;
	} catch (error) {
		console.error("Anthropic request failed:", error);
		throw error;
	}
}