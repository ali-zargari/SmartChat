import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../../AuthContext"; // Update the path based on your project structure
import axios from "axios";

export function Bridge() {
	const navigate = useNavigate();
	const { authToken, setAuthToken } = useContext(AuthContext);

	useEffect(() => {
		console.log("auth token: ", authToken);
		const url = window.location.href;

		const urlObj = new URL(url);

		const code = new URLSearchParams(urlObj.search).get("code");

		//console.log(code);

		axios.post("http://localhost:3001/auth/google/callback", { code })
			.then((response) => {
				const { token } = response;
				console.log("HERE, token: ", response);
				//setAuthToken(token);
			})
			.catch((error) => {
				console.error("Error preparing for Google authentication:", error);
			});

		//TODO
		// If user has account then route them to their account
		// If user does not have an account then route them to the signup page


		console.log("code: ", code);
		console.log("url: ", url);


	}, [authToken]);

	return <>Authorizing</>;
}

export default Bridge;
