import express from "express";
//import axios from "axios";
import cors from "cors";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: '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' });
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

console.log(process.env.OPENAI_API_KEY);

app.post("/api/message", async (req, res) => {
	const userMessage = req.body.message;

	try {

		const completion = await openai.chat.completions.create({
			messages: [{ role: "system", content: userMessage }],
			model: "gpt-3.5-turbo",
		});

		//console.log(completion);

		res.json({ message: completion });
	} catch (error) {
		console.error("OpenAI request failed:", error);
		res.status(500).json({ error: "Failed to fetch response from OpenAI" });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});