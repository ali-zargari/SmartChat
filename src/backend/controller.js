import * as firebase from "firebase/app";
import "firebase/auth";

import { getAuth, signInWithCredential, GoogleAuthProvider } from "firebase/auth";



class AuthenticationController {





	constructor() {
		this.idToken = googleUser.getAuthResponse().id_token;

		this.credentials = GoogleAuthProvider.credential("785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com");

		this.firebaseConfig = {
			apiKey: "AIzaSyCitDTGf3iHRV50hW0fi_cIE1ChoKmIkmE",
			authDomain: "smartchat-415203.firebaseapp.com",
			projectId: "smartchat-415203",
			storageBucket: "smartchat-415203.appspot.com",
			messagingSenderId: "785577679800",
			appId: "1:785577679800:web:ed7b5daa456f8736f74d4d",
			measurementId: "G-PJQJVD18RG"
		};

		if (!firebase.getApps().length) {
			firebase.initializeApp(this.firebaseConfig);
		} else {
			firebase.getApp();
		}
		//const app = firebase.initializeApp(firebaseConfig);

		this.auth = getAuth();


		signInWithCredential(this.auth, this.credential).catch((error) => {
			// Handle Errors here.
			const errorCode = error.code;
			const errorMessage = error.message;
			// The email of the user's account used.
			const email = error.customData.email;
			// The AuthCredential type that was used.
			const credential = GoogleAuthProvider.credentialFromError(error);
			// ...
		});
		/*




		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount)
		});

		*/

		//initializeAuth(firebaseConfig);

	}



	/*
	// Sign up function
	 async signUpUser (email, password) {

		try {
			await auth().createUserWithEmailAndPassword(email, password);
			console.log("User account created & signed in!");
		} catch (error) {
			if (error.code === "auth/email-already-in-use") {
				console.log("That email address is already in use!");
			}

			if (error.code === "auth/invalid-email") {
				console.log("That email address is invalid!");
			}

			console.error(error);
		}
	};

*/



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