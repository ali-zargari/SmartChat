const OpenAI = require("openai").OpenAI;
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

function getGPTResponse(messages) {
	return new Promise((resolve, reject) => {
		openai.chat.completions.create({
			messages: messages,
			model: "gpt-3.5-turbo",
			max_tokens: 2000,
		}).then(completion => {
			resolve(completion);
		}).catch(error => {
			console.error("Error calling OpenAI:", error);
			reject(error);
		});
	});
}

module.exports = getGPTResponse;
