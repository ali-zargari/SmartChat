import axios from "axios";


class Authenticator {
	constructor() {
		//this.OA2Client = new OAuth2Client();
	}

	async login_email(email, password) {
		//const { email, password } = req.body;
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post("http://localhost:3001/login_email", { email, password });
			return response;
		} catch (error) {
			throw error;
		}
	}


	async ensureAuthenticated(req, res, next) {
		if (req.isAuthenticated()) {
			return next(); // If the user is authenticated, allow them to proceed
		}
		// If not authenticated, redirect to the login page
		// Or you can send a response instead, like a 403 forbidden error
		return res.redirect('/login');
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


	async loginWithGoogle() {

		let url = "";

		axios.get(`http://localhost:3001/prepare-auth/google`)
			.then(response => {
				// Assuming the response contains the URL to redirect to for Google OAuth
				url = response.data;
				//window.location.href = url;
				console.log("authUrl: ", url);
			})
			.catch(error => {
				console.error('Error preparing for Google authentication:', error);
				// Handle error (show message, log error, etc.)
			});
		//console.log("authUrl: ", url);

	}


}

export default Authenticator;