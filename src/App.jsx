import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginComponent from "./frontend/components/Login/Login.jsx";
import ChatComponent from "./frontend/components/Chat/Chat.jsx";

function App() {
	return (
		<LoginComponent />
	);
}

export default App;