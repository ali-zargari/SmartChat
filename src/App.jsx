import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./frontend/components/Login/Login.jsx";
import ChatComponent from "./frontend/components/Chat/Chat.jsx";
import { Bridge } from "./frontend/components/Bridge/Bridge.jsx";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginComponent />} />
				<Route path="/chat" element={<ChatComponent />} />
				<Route path="/bridge" element={ <></> } /> {/* React.Fragment */}
				<Route path="*" element={<Navigate to="/login" />} /> {/* default route */}
			</Routes>
		</Router>
	);
}

export default App;