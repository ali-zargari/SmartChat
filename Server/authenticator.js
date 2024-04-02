import axios from "axios";

class Authenticator {
	constructor() {
		this.authnum = null;
	}

	async continueWithGoogle() {
		return new Promise((resolve, reject) => {
			axios
				.get("http://localhost:3001/auth/google")
				.then((response) => {
					this.auth = response;
					console.log("response: ", response);
					resolve(response); // resolves the Promise with the url
				})
				.catch((error) => {
					console.error("Error preparing for Google authentication:", error);
					reject(error); // rejects the if an error occurred
				});
		});
	}
}

export default Authenticator;
