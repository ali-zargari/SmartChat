import React from "react";

export const AuthContext = React.createContext({
	authToken: null,
	setAuthToken: (b) => {
		this.authToken = b;
	},
});
