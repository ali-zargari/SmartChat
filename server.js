import express from "express";
import cors from "cors";
import getGPTResponse from "./src/Algorithm Handlers/GPTHandler.js";
import getGeminiResponse from "./src/Algorithm Handlers/GeminiHandler.js";
import getClaudeResponse from "./src/Algorithm Handlers/ClaudeHandler.js";
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import session from "express-session";
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3001;
const secret = crypto.randomBytes(64).toString('hex');
const sessionSecret = process.env.SESSION_SECRET;
console.log(sessionSecret);  // log this secret only once for configuration and then remove this log

app.use(cors());
app.use(express.json());
app.use(session({
	secret: secret,
	resave: false,
	saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
	clientID: '785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com',
	clientSecret: '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',
	callbackURL: 'http://localhost:3001/auth/google/callback',
	passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
	console.log("profile: ", profile);
	return done(null, profile);
}
));



// Serialize and deserialize user instances to and from the session.
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));





// Test route to confirm session works
app.get('/', function(req, res, next) {
	if(req.session.views) {
		req.session.views++;
		res.setHeader('Content-Type', 'text/html');
		res.write('<p>views: ' + req.session.views + '</p>');
		res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
	} else {
		req.session.views = 1;
		res.end('welcome to the session demo. refresh!');
	}
});



app.get('/auth/google',
	passport.authenticate('google', {
		successRedirect: "/chat",
		failureRedirect: "/login",
		scope: ['profile']
	}));


app.get('/auth/google/callback',
	passport.authenticate('google'),
	(req, res) => console.log(res)
);


app.get('/prepare-auth/google', (req, res) => {
	// Construct the OAuth URL or perform any prior logic needed
	let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

	// Parameters to pass to OAuth 2.0 endpoint.
	let params = {
		"client_id": "785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com", // replace with your client ID
		"redirect_uri": encodeURIComponent("http://localhost:8080/chat"), // replace with your redirect URI
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

	//console.log("url: ", url);

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

app.listen(3000, function() {
	console.log('Listening on port 3000');
});