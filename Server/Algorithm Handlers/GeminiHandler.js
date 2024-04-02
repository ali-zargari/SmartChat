var GoogleGenerativeAI = require("@google/generative-ai").GoogleGenerativeAI;
var HarmCategory = require("@google/generative-ai").HarmCategory;
var HarmBlockThreshold = require("@google/generative-ai").HarmBlockThreshold;

var MODEL_NAME = "gemini-1.0-pro";
var API_KEY = process.env.GEMINI_API_KEY;

function getGeminiResponse(messages, callback) {
	var genAI = new GoogleGenerativeAI(API_KEY);
	var model = genAI.getGenerativeModel({ model: MODEL_NAME });

	var roles = ["user", "model"];
	var partsArray = [
		"Hello, I have 2 dogs in my house.",
		"Great to meet you. What would you like to know?",
	];

	var messagesArray = roles.map(function(role, index) {
		return {
			role: role,
			parts: partsArray[index],
		};
	});

	var test = messages.map(function(msg, index) {
		return {
			role: index % 2 === 0 ? "user" : "model",
			parts: msg.content,
		};
	});

	var safetySettings = [
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

	console.log("test: ", test);
	console.log("working message", messagesArray);

	var chat = model.startChat({
		history: messagesArray,
		safety: safetySettings,
	});

	chat.sendMessage(messages[0].content).then(function(result) {
		var response = result.response;
		console.log(response.promptFeedback);
		callback(null, response.text());
	}).catch(function(error) {
		console.error("Error sending message:", error);
		callback(error);
	});
}

module.exports = getGeminiResponse;
