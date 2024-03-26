import { useNavigate } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../../AuthContext'; // Update the path based on your project structure


export function Bridge() {
	const navigate = useNavigate();
	const { authToken, setAuthToken } = useContext(AuthContext);

	useEffect(() => {
		var hash = window.location.hash.substr(1);
		var result = hash.split('&').reduce(function (result, item) {
			var parts = item.split('=');
			result[parts[0]] = parts[1];
			return result;
		}, {});

		setAuthToken(result.access_token); // Save token to context here

	}, [navigate]);


	useEffect(() => {
		console.log("auth token: ", authToken);
	}, [authToken]);


	return (
		<>
			Authorizing
		</>
	);
}

export default Bridge;