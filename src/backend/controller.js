import { initializeApp } from "firebase/app";
import "firebase/auth";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";



class ChatController{
	constructor() {




	}


	async getGPTResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post("http://localhost:3001/api/message/GPT", { messages });
			return response;
		} catch (error) {
			throw error;
		}

	}

	async getGeminiResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post("http://localhost:3001/api/message/Gemini", { messages });
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getClaudeResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post("http://localhost:3001/api/message/Claude", { messages });
			return response;
		} catch (error) {
			throw error;
		}

	}

}

class UserManager {




	constructor() {



	}


	async loginWithEmailAndPassword(email, pass) {
		//const { email, password } = req.body;
		console.log("email: ", email);
		console.log("password: ", pass);





	}

	async signUpUser(email, password) {
		try {
			const response = await axios.post('http://localhost:3001/signup', { email, password });

			console.log("response: ", response);


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

export  {UserManager, ChatController};
