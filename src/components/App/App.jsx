import React, { useState } from "react";
import axios from "axios";
import "../../styles/App.css";

function App() {
	const [message, setMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);

	const sendMessage = async () => {
		if (message.trim() !== "") {
			const userMessage = {
				sender: "user",
				text: message
			};

			setChatHistory(prevChatHistory => [...prevChatHistory, userMessage]);

			try {
				const messages = chatHistory.concat(userMessage).map(chat => ({
					role: chat.sender,
					content: chat.text
				}));

				const response = await axios.post("http://localhost:3001/api/message/GPT", { messages });

				const aiMessage = {
					sender: "system",
					text: response.data.choices[0].message.content
				};

				setChatHistory(prevChatHistory => [...prevChatHistory, aiMessage]);

			} catch (error) {
				console.error("Error sending message:", error);
			}

			setMessage("");
		}
	};

	return (
		<div>
			<pre>
				{
					chatHistory.map((chat, index) => (
						<p key={index} className={chat.sender}>
							{chat.text}
						</p>
					))
				}
			</pre>
			<input
				type="text"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyPress={(e) => e.key === "Enter" && sendMessage()}
			/>
			<button onClick={sendMessage}>Send</button>
		</div>
	);
}

export default App;