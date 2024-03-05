import React, { useState } from "react";
import axios from "axios";
import "../../styles/App.css";

function App() {
	const [message, setMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [algorithm, setAlgorithm] = useState("GPT");

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

				let response = "response_string";

				if(algorithm === "GPT") {
					response = await axios.post("http://localhost:3001/api/message/GPT", { messages });
				}
				else if(algorithm === "Gemini") {
					response = await axios.post("http://localhost:3001/api/message/Gemini", { messages });
				}
				else if(algorithm === "Claude") {
					response = await axios.post("http://localhost:3001/api/message/Claude", { messages });
				}

				//depending on the algorithm, the response will be different
				//if the response is from GPT, the response will be in response.data.choices[0].message.content
				let responseString = "response_string";

				if(algorithm === "GPT") {
					responseString = response.data.choices[0].message.content;
				} else if(algorithm === "Gemini") {
					responseString = response.data;
				} else if(algorithm === "Claude") {
					responseString = response.data.content[0].text;
				}

				console.log("responseString: ", responseString);

				const aiMessage = {
					sender: "system",
					text: responseString
				};




				setChatHistory(prevChatHistory => [...prevChatHistory, aiMessage]);

			} catch (error) {
				console.error("Error sending message:", error);
			}

			setMessage("");
		}
	};

	const handleAlgorithmChange = (e) => {
		setAlgorithm(e.target.value);
	};

	return (
		<div>
			<h1>{algorithm}</h1> {/* Display the selected option */}

			<select onChange={handleAlgorithmChange}>
				<option value='GPT'>GPT</option>
				<option value='Gemini'>Gemini</option>
				<option value='Claude'>Claude</option>
			</select>
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