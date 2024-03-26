import React from 'react';

export const AuthContext = React.createContext({
	authToken: null,
	setAuthToken: (b) => {
		// eslint-disable-next-line no-undef
		this.authToken = b;
		console.log("Auth Token: ", this.authToken);
	}
});

