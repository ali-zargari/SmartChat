import React, { useState } from "react";
import axios from "axios";
import "../../styles/Chat.css";

function Chat() {
	const [message, setMessage] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [algorithm, setAlgorithm] = useState("GPT");

	const sendMessage = async () => {
		if (message.trim() !== "") {
			const userMessage = {
				sender: "user",
				text: message,
			};

			setChatHistory((prevChatHistory) => [...prevChatHistory, userMessage]);

			const messages = chatHistory.concat(userMessage).map((chat) => ({
				role: chat.sender,
				content: chat.text,
			}));

			let r = "response_string";

			if (algorithm === "GPT") {


				r = await axios.post(
					"http://localhost:3001/api/message/GPT",
					{ messages },
					{ withCredentials: true }
				);


			} else if (algorithm === "Gemini") {

				try {
					r = await axios.post(
						"http://localhost:3001/api/message/Gemini",
						{ messages },
						{ withCredentials: true }
					);

				} catch (error) {
					throw error;
				}

			} else if (algorithm === "Claude") {

				try {
					r = await axios.post(
						"http://localhost:3001/api/message/Claude",
						{ messages },
						{ withCredentials: true }
					);

				} catch (error) {
					throw error;
				}

			}

			//console.log("response: ", response);

			//depending on the algorithm, the response will be different
			//if the response is from GPT, the response will be in response.data.choices[0].message.content
			let responseString = "response_string";

			if (algorithm === "GPT") {
				//responseString = response.data.choices[0].message.content;

				console.log("response.data: ", r);
			} else if (algorithm === "Gemini") {
				responseString = r.data;
			} else if (algorithm === "Claude") {
				responseString = r.data.content[0].text;
			}

			console.log("responseString: ", responseString);

			const aiMessage = {
				sender: "system",
				text: responseString,
			};

			setChatHistory((prevChatHistory) => [...prevChatHistory, aiMessage]);

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
				<option value="GPT">GPT</option>
				<option value="Gemini">Gemini</option>
				<option value="Claude">Claude</option>
			</select>
			<pre>
				{chatHistory.map((chat, index) => (
					<p key={index} className={chat.sender}>
						{chat.text}
					</p>
				))}
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

export default Chat;
