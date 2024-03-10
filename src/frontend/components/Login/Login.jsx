import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// Function to handle response
const responseGoogle = (response) => {
	console.log(response);
	// Here you would use the response token to log in the user



};

const Login = () => {
	return (
		<GoogleOAuthProvider
			clientId="785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com"
			redirectUri="http://localhost:3000"
		>
			<div>
				<h1>Login Page</h1>
				<GoogleLogin
					clientId="785577679800-2d1uuoajkbn9p63cgfpt7lusj1qqsepq.apps.googleusercontent.com"
					buttonText="Login with Google"
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					cookiePolicy={"single_host_origin"}
				/>
			</div>
		</GoogleOAuthProvider>
	);
};

export default Login;



