import express from "express";
import cors from "cors";
//import OpenAI from "openai";
import getGPTResponse from "./src/components/Algorithm Handlers/GPTHandler.js";

//const openai = new OpenAI({ apiKey: "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" });
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

//console.log(process.env.OPENAI_API_KEY);

app.post("/api/message/GPT", async (req, res) => {


	try {
		const response = await getGPTResponse(req.body.messages);
		res.json(response);
	} catch (error) {
		// handle error
		res.status(500).json({ error: "Failed to fetch response from OpenAI GPT" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});