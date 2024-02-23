import React, { useState } from "react";
import axios from "axios";

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
				const response = await axios.post("http://localhost:3001/api/message", {
					message: message
				});

				//const aiMessage = response.data.message.choices[0].message;
				const aiMessage = {
					sender: "ai",
					text: response.data.message.choices[0].message.content
				};

				console.log(aiMessage.text);
				console.log(chatHistory);

				setChatHistory(prevChatHistory => [...prevChatHistory, aiMessage]);


			} catch (error) {
				console.error("Error sending message:", error);
			}

			setMessage("");
		}
	};

	return (
		<div>
			<div>
				{
					chatHistory.map((chat, index) => (
						<p key={index} className={chat.sender}>
							{chat.text}
						</p>
					))
				}
			</div>
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