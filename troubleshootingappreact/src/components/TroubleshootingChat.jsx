import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatUI.css";

const validIssues = [
  "unit does nothing",
  "ignition failure",
  "fan not working",
  "error code displayed"
];

const TroubleshootingChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Hello! What issue are you facing today? (e.g., 'Unit does nothing', 'Ignition failure')", sender: "assistant" }
  ]);

  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [resolved, setResolved] = useState(false);

  const handleUserResponse = (response) => {
    let userInput = response.trim().toLowerCase();
    let newMessages = [...messages, { text: response, sender: "user" }];

    if (userInput === "main menu") {
      navigate("/issues");
      return;
    }

    if (step === 0) {
      if (!validIssues.includes(userInput)) {
        newMessages.push({ text: "Invalid issue. Please type a valid issue like 'Unit does nothing' or 'Ignition failure'.", sender: "assistant" });
        setMessages(newMessages);
        return;
      }
      newMessages.push({ text: "Is the Green Light on the Control Board ON or OFF? (Type 'ON' or 'OFF')", sender: "assistant" });
      setStep(1);
    } 
    
    else if (step === 1) {
      if (userInput === "on") {
        newMessages.push({ text: "Verify that the thermostat is wired correctly between R & W terminals. Have you checked this? (Yes/No)", sender: "assistant" });
        setStep(2);
      } else if (userInput === "off") {
        newMessages.push({ text: "Check for 24V between Sec & Com terminals on the board.", sender: "assistant" });
        setStep(2);
      } else {
        newMessages.push({ text: "Invalid response. Please type 'ON' or 'OFF'.", sender: "assistant" });
        setMessages(newMessages);
        return;
      }
    } 
    
    else if (step === 2) {
      if (userInput === "yes") {
        newMessages.push({ text: "Has the unit started to work? (Type Yes or No)", sender: "assistant" });
        setStep(3);
      } else if (userInput === "no") {
        newMessages.push({ text: "Turn off power. Remove thermostat wires. Carefully install a jumper wire between R & W terminals on the control board. Then turn power back on. Be aware, the unit may start.", sender: "assistant" });
        newMessages.push({ text: "Did installing the jumper wire resolve the issue? (Yes/No)", sender: "assistant" });
        setStep(4);
      } else {
        newMessages.push({ text: "Please type 'Yes' or 'No'.", sender: "assistant" });
        setMessages(newMessages);
        return;
      }
    } 
    
    else if (step === 3) {
      if (userInput === "yes") {
        newMessages.push({ text: "Great! Glad I could help. 😊", sender: "assistant" });
        newMessages.push({ text: "Is there anything else I can assist you with?", sender: "assistant" });
        setResolved(true);
        setStep(5);
      } else {
        newMessages.push({ text: "Turn off power. Remove thermostat wires. Carefully install a jumper wire between R & W terminals on the control board. Then turn power back on. Be aware, the unit may start.", sender: "assistant" });
        newMessages.push({ text: "Did installing the jumper wire resolve the issue? (Yes/No)", sender: "assistant" });
        setStep(4);
      }
    } 
    
    else if (step === 4) {
      if (userInput === "yes") {
        newMessages.push({ text: "Great! Your thermostat might need replacement.", sender: "assistant" });
      } else {
        newMessages.push({ text: "Further troubleshooting might be required. Consider checking field wiring or contacting support.", sender: "assistant" });
      }
      newMessages.push({ text: "Is there anything else I can help you with? You can also type 'Main Menu' to go back.", sender: "assistant" });
      setStep(5);
    } 
    
    else if (step === 5) {
      if (userInput === "no") {
        newMessages.push({ text: "Great! Glad I could help. 😊", sender: "assistant" });
        setResolved(true);
      } else {
        newMessages.push({ text: "What else can I assist you with?", sender: "assistant" });
      }
    }

    setMessages(newMessages);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleUserResponse(input);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>{msg.text}</div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your response..."
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>➤</button>
      </div>
    </div>
  );
};

export default TroubleshootingChat;
