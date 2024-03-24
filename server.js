import express from "express";
import cors from "cors";
import getGPTResponse from "./src/Algorithm Handlers/GPTHandler.js";
import getGeminiResponse from "./src/Algorithm Handlers/GeminiHandler.js";
import getClaudeResponse from "./src/Algorithm Handlers/ClaudeHandler.js";
import passport from 'passport';
import session from "express-session";
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import {google} from 'googleapis';

const app = express();
const PORT = process.env.PORT || 3001;
const secret = crypto.randomBytes(64).toString('hex');
const sessionSecret = process.env.SESSION_SECRET;





dotenv.config();

app.use(cors());
app.use(express.json());
app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));


// Test route to confirm session works
app.get('/bridge', (req, res) => {
	// The `code` is returned as a query parameter in the redirect
	const { code } = req.query;
	console.log("code: ", code);

	res.send("code: " + code);
});


app.get('/auth/google', (req, res) => {

	// Construct the OAuth URL or perform any prior logic needed
	let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

	// Parameters to pass to OAuth 2.0 endpoint.
	let params = {
		"client_id": "785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com", // replace with your client ID
		"redirect_uri": encodeURIComponent("http://localhost:8080/bridge"), // replace with your redirect URI
		"response_type": "token",
		"scope": encodeURIComponent("https://www.googleapis.com/auth/drive.metadata.readonly"),
		"include_granted_scopes": "true",
		"state": "pass-through_value"
	};

	// Convert the parameters object into url query
	let query = Object.keys(params).map(k => {
		return k + "=" + params[k];
	}).join("&");

	// Full URL
	let url = oauth2Endpoint + "?" + query;

	console.log("url: ", url);
	//res.writeHead(301, { "Location": url });

	res.json( url );
});



app.post('/signup', async (req, res) => {
	//let controller = new Controller();
	//await controller.signUpUser(req, res);
	console.log("server.js output: ", req.body.email);
	//loginWithEmailAndPassword(req, res);
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


