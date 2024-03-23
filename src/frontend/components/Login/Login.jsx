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
		/*const url = authenticator.getGoogleToken()
			.then(r => {
				window.location.href = r;
				//console.log(r);
			})
			.catch(e => console.log(e));
*/

		const url = authenticator.loginWithGoogle()
			.then(r => console.log(r))
			.catch(e => console.log(e));

		//console.log(authenticator.loginWithGoogle());

		//console.log("url: ", url);
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
		<GoogleOAuthProvider
			clientId="785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com"
			redirectUri="http://localhost:3000"
		>
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


				<GoogleLogin
					clientId="785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com"
					buttonText="Login with Google"
					onSuccess={handleSuccess}
					onFailure={handleFailure}
					cookiePolicy={"single_host_origin"}
				/>
			</div>
		</GoogleOAuthProvider>
	);
};

export default Login;



