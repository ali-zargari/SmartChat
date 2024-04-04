const express = require("express");
const session = require("express-session");
const crypto = require("crypto");
const dotenv = require("dotenv");
const google = require("googleapis").google;
const jwt = require("jsonwebtoken");
const redis = require("redis");
const RedisStore = require("connect-redis").default;
const redisClient = redis.createClient({
	url: "redis://localhost:6379",
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
	client: redisClient,
});


//const getGPTResponse = require("./Algorithm Handlers/GPTHandler.js");
//const getGeminiResponse = require("./Algorithm Handlers/GeminiHandler.js");
const getClaudeResponse = require("./Algorithm Handlers/ClaudeHandler.js");


dotenv.config();

const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const secret = crypto.randomBytes(64).toString("hex");
const oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:8080/bridge"
);


app.use(
	session({
		store: redisStore,
		secret: secret,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false, // Set to true if using HTTPS, false for HTTP (localhost development)
			httpOnly: true,
			sameSite: 'lax', // 'strict', 'lax', or 'none' (use 'none' only if secure: true)
			maxAge: 24 * 60 * 60 * 1000 // 24 hours
		}
	})
);


app.use(cors({
	origin: 'http://localhost:8080', // replace with the origin of your client-side application
	credentials: true
}));

app.use(express.json());

app.get("/bridge", function(req, res) {
	const code = req.query.code;
	console.log("code: ", code);
	res.send("code: " + code);
});

app.get("/auth/google", function(req, res) {
	//const oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

	const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

	const authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
		include_granted_scopes: true,
	});


	res.json(authUrl);
});

app.post("/auth/google/callback", function(req, res) {
	const code = req.body.code;

	oauth2Client.getToken(code, function(err, tokens) {
		if (err) {
			console.error('Error getting tokens', err);
			return; // Don't send a response here
		} else {
			req.session.tokens = tokens;

			console.log("req.session.tokens: ", req.session.tokens);

			req.session.save(err => {
				if (err) {
					console.error('Error saving session', err);
					return res.status(500).send({ status: 'failure' }); // Send response here
				}

				oauth2Client.setCredentials(tokens);
				const decoded = jwt.decode(tokens.id_token);

				return res.status(200).send({ status: 'success', code: decoded }); // Send response here
			});
		}
	});
});


app.use(function(req, res, next) {
	if (!req.session || !req.session.tokens) {
	//	console.log("req.session: ", req.session);
	//	console.log("req.session.tokens: ", req.session.tokens);
	//	return res.status(401).send({ status: 'error', message: 'unauthorized' });
	}

	console.log("req.session.tokens in middleware: ", req.session);

	//if (Date.now() > req.session.tokens.expiry_date) {
	//	return res.status(401).send({ status: 'error', message: 'access token expired, re-login' });
	//}

	//oauth2Client.setCredentials(req.session.tokens);
	//next();
});

// Example route to check session persistence


app.post("/api/message/GPT", function(req, res) {
	console.log("req.body: ", req.body);

});

/*
app.post("/api/message/Gemini", function(req, res) {
	getGeminiResponse(req.body.messages, function(err, response) {
		if (err) {
			return res.status(500).json({ error: "Failed to fetch response from Gemini" });
		}
		res.json(response);
	});
});*/

app.post("/api/message/Claude", function(req, res) {
	getClaudeResponse(req.body.messages, function(err, response) {
		if (err) {
			return res.status(500).json({ error: "Failed to fetch response from Claude" });
		}
		res.json(response);
	});
});

app.listen(PORT, function() {
	console.log("Server is running on port " + PORT);
});
