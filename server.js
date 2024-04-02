import express from "express";
import cors from "cors";
import getGPTResponse from "./src/backend/Algorithm Handlers/GPTHandler.js";
import getGeminiResponse from "./src/backend/Algorithm Handlers/GeminiHandler.js";
import getClaudeResponse from "./src/backend/Algorithm Handlers/ClaudeHandler.js";
import passport from "passport";
import session from "express-session";
import crypto from "crypto";
import dotenv from "dotenv";
import { google } from "googleapis";
import jwt from "jsonwebtoken";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const secret = crypto.randomBytes(64).toString("hex");
const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:8080/bridge",
);

app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: secret,
		resave: false,
		saveUninitialized: true,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Test route to confirm session works
app.get("/bridge", (req, res) => {
	// The `code` is returned as a query parameter in the redirect
	const { code } = req.query;
	console.log("code: ", code);

	res.send("code: " + code);
});

app.get("/auth/google", (req, res) => {
	// Construct the OAuth URL or perform any prior logic needed
	let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

	const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
		include_granted_scopes: true,
	});

	res.json(authUrl);
});

app.post("/auth/google/callback", async (req, res) => {
	try {
		const code = req.body.code;

		// Get tokens with the authorization code from OAuth flow
		let { tokens } = await oauth2Client.getToken(code);

		// Save tokens in user session for later use
		//req.session.tokens = tokens;
		oauth2Client.setCredentials(tokens);

		let decoded = jwt.decode(tokens.id_token);
		console.log("decoded: ", decoded);

		res.status(200).send({ status: 'success', code: decoded});
	} catch (error) {
		console.error('Error getting tokens', error);
		res.status(500).send({ status: 'failure' });
	}
});

// A middleware that checks if user is authenticated before accessing any route handlers
app.use((req, res, next) => {
	// Ensure user session and tokens exist
	if (!req.session || !req.session.tokens) {
		return res.status(401).send({ status: 'error', message: 'unauthorized' });
	}

	// check if current time is past the token expiry time
	if (Date.now() > req.session.tokens.expiry_date) {
		return res.status(401).send({ status: 'error', message: 'access token expired, re-login' });
	}

	// Set credentials for OAuth2 Client
	oauth2Client.setCredentials(req.session.tokens);

	// Token is valid, pass control to next route handler
	next();
});

app.post("/signup", async (req, res) => {
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
	} catch (error) {
		// handle error
		res.status(500).json({ error: "Failed to fetch response from Gemini" });
	}
});

app.post("/api/message/Claude", async (req, res) => {
	//console.log("messages: ", req.body.messages);

	try {
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
