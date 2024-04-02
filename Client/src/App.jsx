import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import LoginComponent from "./components/Login/Login.jsx";
import ChatComponent from "./components/Chat/Chat.jsx";
import Bridge from "./components/Bridge/Bridge.jsx";
import { AuthContext } from "./AuthContext";

function App() {
	const [authToken, setAuthToken] = React.useState("no-token");

	const value = {
		authToken,
		setAuthToken,
	};

	return (
		<AuthContext.Provider value={value}>
			<Router>
				<Routes>
					<Route path="/login" element={<LoginComponent />} />
					<Route path="/chat" element={<ChatComponent />} />
					<Route path="/bridge" element={<Bridge />} />
					<Route path="*" element={<Navigate to="/login" />} />{" "}
					{/* default route */}
				</Routes>
			</Router>
		</AuthContext.Provider>
	);
}

export default App;
