import axios from "axios";


class Controller {
	constructor() {}

	async getGPTResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post(
				"http://localhost:3001/api/message/GPT",
				{ messages },
			);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getGeminiResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post(
				"http://localhost:3001/api/message/Gemini",
				{ messages },
			);
			return response;
		} catch (error) {
			throw error;
		}
	}

	async getClaudeResponse(messages) {
		// eslint-disable-next-line no-useless-catch
		try {
			const response = await axios.post(
				"http://localhost:3001/api/message/Claude",
				{ messages },
			);
			return response;
		} catch (error) {
			throw error;
		}
	}
}

class UserManager {

	constructor() {


	}

	signUpUser(req, res) {
		console.log("signUpUser called");
	}

}

export { UserManager, Controller };
