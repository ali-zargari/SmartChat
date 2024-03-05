import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
	apiKey: "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",
});

export default async function getClaudeResponse(messages) {

	console.log("messages: ", messages);

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