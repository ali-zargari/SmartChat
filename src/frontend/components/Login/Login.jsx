import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Controller, UserManager } from '../../../backend/controller.js';
import  '../../../backend/authenticator.js';
import Authenticator from "../../../backend/authenticator.js";



const Login = () => {

	const controller = new UserManager();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const authenticator = new Authenticator();

	const handleEmailChange = (e) => {
		setEmail(e.target.value);

	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);

	};

	const handleSignUp = () => {
		console.log("Sign Up");
		//window.location.href = "/signup";
		authenticator.signUpUser(email, password)
			.then(r => console.log(r))
			.catch(e => console.log(e));

	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const url = authenticator.loginWithGoogle()
			.then(
				r => {
					//console.log(r);
					console.log("url: ", r);
				}
			)
			.catch(
				e => console.log(e)
			);

	};


	// Function to handle response
	const handleSuccess = async (response) => {
		console.log("Success");
		console.log(response);


	};


	const handleFailure = (response) => {
		console.log("Failure");
		console.log(response);
		// Here you would handle the error


	};



	return (

			<div>
				<h1>Login Page</h1>

				<form onSubmit={handleSubmit}>
					<label>Email:</label>
					<input
						type="text"
						value={email}
						onChange={handleEmailChange}
						required
					/>
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={handlePasswordChange}
						required
					/>
					<button type="submit">Login</button>
					<button type="button" onClick={handleSignUp}>Sign Up</button>

				</form>

			</div>
	);
};

export default Login;



