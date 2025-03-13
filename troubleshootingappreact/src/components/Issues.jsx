import React from "react";
import { useNavigate } from "react-router-dom";
import "./Issues.css";

const issues = [
  "Definitions and basic operation",
  "Call for heat and unit does nothing",
  "Troubleshooting codes for ignition control",
  "Unit starts but flame does not ignite",
  "Flame lights & shuts down within 10 seconds",
  "Main fan / air mover does not operate",
  "Replace control board only after completing these steps",
  "For additional help and live operators",
];

const Issues = () => {
  const navigate = useNavigate();

  const handleIssueClick = (issue) => {
    navigate(`/chat?issue=${encodeURIComponent(issue)}`);
  };

  return (
    <div className="issue-container">
      <h1 className="issue-title">Can I help you with anything?</h1>
      <p className="issue-subtitle">
        Ready to assist you with anything you need, from answering questions to providing recommendations.
      </p>
      <div className="issue-grid">
        {issues.map((issue, index) => (
          <button key={index} className="issue-button" onClick={() => handleIssueClick(issue)}>
            {issue}
          </button>
        ))}
      </div>
      <div className="input-container">
        <input type="text" placeholder="Ask anything..." className="issue-input" />
        <button className="send-button">➤</button>
      </div>
    </div>
  );
};

export default Issues;
