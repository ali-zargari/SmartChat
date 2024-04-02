var express = require("express");
var cors = require("cors");
var getGPTResponse = require("./Algorithm Handlers/GPTHandler.js");
var getGeminiResponse = require("./Algorithm Handlers/GeminiHandler.js");
var getClaudeResponse = require("./Algorithm Handlers/ClaudeHandler.js");
var passport = require("passport");
var session = require("express-session");
var crypto = require("crypto");
var dotenv = require("dotenv");
var google = require("googleapis").google;
var jwt = require("jsonwebtoken");

dotenv.config();

var app = express();
var PORT = process.env.PORT || 3001;
var secret = crypto.randomBytes(64).toString("hex");
var oauth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:8080/bridge"
);

app.use(cors());
app.use(express.json());
app.use(
	session({
		secret: secret,
		resave: false,
		saveUninitialized: true,
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

app.get("/bridge", function(req, res) {
	var code = req.query.code;
	console.log("code: ", code);
	res.send("code: " + code);
});

app.get("/auth/google", function(req, res) {
	var oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

	var scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

	var authUrl = oauth2Client.generateAuthUrl({
		access_type: "offline",
		scope: scopes,
		include_granted_scopes: true,
	});

	res.json(authUrl);
});

app.post("/auth/google/callback", function(req, res) {
	var code = req.body.code;

	oauth2Client.getToken(code, function(err, tokens) {
		if (err) {
			console.error('Error getting tokens', err);
			return res.status(500).send({ status: 'failure' });
		}

		oauth2Client.setCredentials(tokens);
		var decoded = jwt.decode(tokens.id_token);
		console.log("decoded: ", decoded);

		res.status(200).send({ status: 'success', code: decoded });
	});
});

app.use(function(req, res, next) {
	if (!req.session || !req.session.tokens) {
		return res.status(401).send({ status: 'error', message: 'unauthorized' });
	}

	if (Date.now() > req.session.tokens.expiry_date) {
		return res.status(401).send({ status: 'error', message: 'access token expired, re-login' });
	}

	oauth2Client.setCredentials(req.session.tokens);
	next();
});

app.post("/signup", function(req, res) {
	console.log("server.js output: ", req.body.email);
});

app.post("/api/message/GPT", function(req, res) {
	getGPTResponse(req.body.messages, function(err, response) {
		if (err) {
			return res.status(500).json({ error: "Failed to fetch response from OpenAI GPT" });
		}
		res.json(response);
	});
});

app.post("/api/message/Gemini", function(req, res) {
	getGeminiResponse(req.body.messages, function(err, response) {
		if (err) {
			return res.status(500).json({ error: "Failed to fetch response from Gemini" });
		}
		res.json(response);
	});
});

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
