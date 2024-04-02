import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Controller, UserManager } from "../../../backend/controller.js";
import "../../../backend/authenticator.js";
import Authenticator from "../../../backend/authenticator.js";
import http from "http";

const Login = () => {
	const controller = new UserManager();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const authenticator = new Authenticator();

	const handleSubmit = (e) => {
		e.preventDefault();

		const url = authenticator
			.continueWithGoogle()
			.then((r) => {
				console.log("url: ", r.data);
				window.location.href = r.data;
			})
			.catch((e) => {
				console.log(e);
			});

		console.log(url);
	};

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
