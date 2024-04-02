import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import http from "http";
import axios from "axios";



const Login = () => {
	//const controller = new UserManager();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	//const authenticator = new Authenticator();

	const handleSubmit = (e) => {
		e.preventDefault();

		const url = continueWithGoogle()
			.then((r) => {
				console.log("url: ", r.data);
				window.location.href = r.data;
			})
			.catch((e) => {
				console.log(e);
			});



		//console.log(url);
	};

	async function continueWithGoogle() {
		return new Promise((resolve, reject) => {
			axios
				.get("http://localhost:3001/auth/google")
				.then((response) => {
					//this.auth = response;
					console.log("response: ", response);
					resolve(response); // resolves the Promise with the url
				})
				.catch((error) => {
					console.error("Error preparing for Google authentication:", error);
					reject(error); // rejects the if an error occurred
				});
		});
	}

	return (
		<div>
			<h1>Login Page</h1>

			<form onSubmit={handleSubmit}>
				<button type="submit">Continue With Google</button>
			</form>
		</div>
	);
};

export default Login;
