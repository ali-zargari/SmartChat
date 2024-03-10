import express from "express";
import axios from "axios";
import cors from "cors";
import getGPTResponse from "./src/Algorithm Handlers/GPTHandler.js";
import getGeminiResponse from "./src/Algorithm Handlers/GeminiHandler.js";
import getClaudeResponse from "./src/Algorithm Handlers/ClaudeHandler.js";
import AuthenticationController from "./src/backend/controller.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/login", async (req, res) => {

	//console.log(""req.body.username);

	let auth = new AuthenticationController();

	try{
		//res.redirect_uri = await auth.login(req);
		//res.redirect("https://www.google.com");
		//await axios.get("https://www.google.com");
		//auth.google_login(req);
		//console.log("redirect_uri: ", res.redirect_uri);
	} catch (error) {
		console.error("Error logging in:", error);
	}

});

app.post("/api/message/GPT", async (req, res) => {

	try {
		const response = await getGPTResponse(req.body.messages);
		res.json(response);
	} catch (error) {
		// handle error
		res.status(500).json({ error: "Failed to fetch response from OpenAI GPT" });
	}

});

app.post("/api/message/Gemini", async (req, res) => {
	//res.json({ message: "Gemini response" });
	//console.log("messages: ", req.body.messages);

	try {
		const response = await getGeminiResponse(req.body.messages);
		res.json(response);
	}
	catch (error) {
		// handle error
		res.status(500).json({ error: "Failed to fetch response from Gemini" });
	}

});

app.post("/api/message/Claude", async (req, res) => {
	//console.log("messages: ", req.body.messages);

	try{
		const response = await getClaudeResponse(req.body.messages);
		res.json(response);
		//console.log("response: ", response);

	} catch (error) {
		res.status(500).json({ error: "Failed to fetch response from Claude" });
	}

});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});