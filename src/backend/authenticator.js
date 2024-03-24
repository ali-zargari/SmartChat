import axios from "axios";


class Authenticator {
	constructor() {
		//this.OA2Client = new OAuth2Client();
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

		return new Promise((resolve, reject) => {
			axios.get('http://localhost:3001/auth/google')
				.then(response => {
					let url = response;
					console.log("authUrl: ", url);
					resolve(url);  // resolves the Promise with the url
				})
				.catch(error => {
					console.error('Error preparing for Google authentication:', error);
					reject(error);  // rejects the if an error occurred
				});
		});

	}


}

export default Authenticator;