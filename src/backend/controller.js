import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";



class AppController{
	constructor() {




	}
}

class AuthenticationController {




	constructor() {

	}


	async loginWithEmailAndPassword(req, res) {
		const { email, password } = req.body;

		const db = pgp()({
			host: 'ceu9lmqblp8t3q.cluster-czrs8kj4isg7.us-east-1.rds.amazonaws.com',
			port: 5432,
			database: 'd5pkpgj13kfpht',
			user: 'u4qk55uoqs21p8',
			password: 'pda8b826e164179457d0f8cab3dfa1d43dc070ee1a0b11ae11b8ca0138c58441d'
		});

		const user = await db.one('SELECT * FROM SCUser WHERE email = $1', [email]);

		if (!user) {
			return res.status(400).send({ message: 'User not found' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).send({ message: 'Invalid credentials' });
		}

		// Create a signed JWT
		const token = jwt.sign({ email }, 'secret-key', { expiresIn: '1h' });

		// Send JWT to the client
		res.send({ token });
	}

	async signUpUser(email, password) {
		try {
			const response = await axios.post('https://your-heroku-app.com/register', { email, password });
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	}


	async getGoogleToken() {

		let oauth2Endpoint = "https://accounts.google.com/o/oauth2/v2/auth";

		// Parameters to pass to OAuth 2.0 endpoint.
		let params = {
			"client_id": "785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com", // replace with your client ID
			"redirect_uri": encodeURIComponent("https://localhost:8080/chat"), // replace with your redirect URI
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

		
		// Also return the generated URL in case you want to use it elsewhere
		return url;
	}
}

export default AuthenticationController;