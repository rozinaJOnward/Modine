import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css"; // Create and style this file

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-message">Welcome to Troubleshooting Assistant</h1>
      <p className="tagline">Ready to assist you with anything you need!</p>
      <button className="get-started-btn" onClick={() => navigate("/issues")}>
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
