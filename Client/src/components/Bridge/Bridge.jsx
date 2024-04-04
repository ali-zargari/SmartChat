import { useNavigate } from "react-router-dom";
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthContext.jsx"; // Update the path based on your project structure
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

		axios
			.post("http://localhost:3001/auth/google/callback", { code }, { withCredentials: true })
			.then((response) => {
				const { token } = response;
				console.log("HERE, token: ", response);
				navigate("/chat");
			})
			.catch((error) => {
				console.error("Error preparing for Google authentication:", error);
			});

		console.log("code: ", code);
		console.log("url: ", url);
	}, [authToken]);

	return <>Authorizing</>;
}

export default Bridge;
