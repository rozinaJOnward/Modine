import React, { useState } from 'react';

function ChatAssistant() {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I help you troubleshoot your unit today?", sender: "assistant" }
    ]);

    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { text: input, sender: "user" }]);
        setInput("");

        setTimeout(() => {
            setMessages([...messages, { text: input, sender: "user" }, { text: getTroubleshootingResponse(input.toLowerCase()), sender: "assistant" }]);
        }, 1000);
    };

    const getTroubleshootingResponse = (input) => {
        if (input.includes("unit does nothing")) {
            return "Is the green light on? (Yes/No)";
        } else if (input.includes("yes")) {
            return "Check if the thermostat is wired correctly and there is a call for heat.";
        } else if (input.includes("no")) {
            return "Check for 24VAC between Sec & Com terminals on the board.";
        } else {
            return "I didn't understand that. Please describe your issue in more detail.";
        }
    };

    return (
        <div className="assistant-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}-message`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="user-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your issue..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button onClick={sendMessage}><i className="fas fa-paper-plane"></i></button>
            </div>
        </div>
    );
}

export default ChatAssistant;
