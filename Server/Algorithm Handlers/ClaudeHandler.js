const dotenv = require("dotenv");
const Anthropic = require("@anthropic-ai/sdk").default;

dotenv.config();

const anthropic = new Anthropic({
	apiKey: process.env.ANTHROPIC_API_KEY
});

function getClaudeResponse(messages, callback) {
	console.log("Requesting Claude response for messages:", messages);

	try {
		anthropic.messages.create({
			model: "claude-3-opus-20240229",
			max_tokens: 1024,
			messages: [
				{
					role: "user",
					content: messages.map(function(message) { return message.content; }).join(" "),
				},
			],
		}).then(function(response) {
			callback(null, response);
		}).catch(function(error) {
			console.error("Anthropic request failed:", error);
			callback(error);
		});
	} catch (error) {
		console.error("Caught error:", error);
		callback(error);
	}
}

module.exports = getClaudeResponse;
