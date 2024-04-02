import React from "react";

export const UserContext = React.createContext({
	accessToken: null,
	setAccessToken: (b) => {
		this.authToken = b;
	},
	refreshToken: null,
	setRefreshToken: (b) => {
		this.refreshToken = b;
	},
	idToken: null,
	setIdToken: (b) => {
		this.idToken = b;
	},
	firstName: null,
	setFirstName: (b) => {
		this.firstName = b;
	},
	lastName: null,
	setLastName: (b) => {
		this.lastName = b;
	},
	email: null,
	setEmail: (b) => {
		this.email = b;
	},
});
