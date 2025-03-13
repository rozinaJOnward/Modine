import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatUI.css";
import { FaRegUser, FaRobot } from "react-icons/fa";

<img src="/logo.jpg" alt="Logo" className="chat-logo" />

const TroubleshootingChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: "Call for Heat – Unit Does Nothing. Is the Green Light on the Control Board ON?", sender: "assistant" }
  ]);
  const [step, setStep] = useState(1);
  const [buttonOptions, setButtonOptions] = useState(["Yes", "No", "Main Menu"]);

  const handleResponse = (response) => {
    let newMessages = [...messages, { text: response, sender: "user" }];
    let nextMessage = "";
    let nextButtons = ["Main Menu"];

    if (response === "Done") {
      nextMessage = "Do you need any more help?";
      nextButtons = ["Yes", "No", "Main Menu"];
      setStep(1);
    } else if (response === "No" && step === 1) {
      nextMessage = "Thank you for using the troubleshooting guide!";
      nextButtons = ["Main Menu"];
    } else if (step === 1) {
      if (response === "Yes") {
        nextMessage = "Verify that the thermostat is wired correctly and there is a call for heat. Is the thermostat wired correctly?";
        nextButtons = ["Yes", "No", "Main Menu"];
        setStep(2);
      } else {
        nextMessage = "Check if there is 24 VAC between Sec & Com on the board. Is 24 VAC present?";
        nextButtons = ["Yes", "No", "Main Menu"];
        setStep(3);
      }
    } else if (step === 2) {
      if (response === "Yes") {
        nextMessage = "If the thermostat is wired correctly and the unit still does not operate, turn power off. Remove thermostat wires. Carefully install a jumper wire between terminals R & W directly on the control board. Turn power on. Did installing the jumper wire resolve the issue?";
        nextButtons = ["Yes", "No", "Main Menu"];
        setStep(4);
      } else {
        nextMessage = "Rewire the thermostat correctly and retry.";
        nextButtons = ["OK", "Main Menu"];
        setStep(1);
      }
    } else if (step === 3) {
      if (response === "Yes") {
        nextMessage = "Check the fuse for a blown element. If the fuse is bad, replace it. If the fuse is not blown, the terminal board is not letting 24 VAC through the board. Replace the board.";
        nextButtons = ["Done", "Main Menu"];
        setStep(1);
      } else {
        nextMessage = "Check for loose connections and incoming power (115 VAC). If incoming power is correct, check for 24VAC at the secondary of the transformer. If there is no voltage, replace the transformer.";
        nextButtons = ["Done", "Main Menu"];
        setStep(1);
      }
    } else if (step === 4) {
      if (response === "Yes") {
        nextMessage = "Check the field wiring to the thermostat. It may be a bad thermostat. Verify and replace if needed.";
        nextButtons = ["Done", "Main Menu"];
      } else {
        nextMessage = "Check for loose connections. Disconnect and reconnect all Molex plugs. Ensure there are no troubleshooting codes. Turn the switch to the gas valve off and on, then leave it on. If the issue persists, the control board may be bad. Verify and replace if needed.";
        nextButtons = ["Done", "Main Menu"];
      }
      setStep(1);
    }
    
    setMessages([...newMessages, { text: nextMessage, sender: "assistant" }]);
    setButtonOptions(nextButtons);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/logo.png" alt="Logo" className="chat-logo" />
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-bubble ${msg.sender}`}>
            {msg.sender === "user" ? <FaRegUser className="icon" /> : <FaRobot className="icon" />}
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-options-container">
        {buttonOptions.map((option, index) => (
          <button key={index} className="chat-option-button" onClick={() => option === "Main Menu" ? navigate("/issues") : handleResponse(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TroubleshootingChat;
