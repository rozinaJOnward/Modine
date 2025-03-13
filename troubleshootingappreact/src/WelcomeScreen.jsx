import React from 'react';

function WelcomeScreen({ onStart }) {
    return (
        <div className="welcome-screen">
            <img src="logo.jpg" alt="Company Logo" />
            <h2>Welcome to the Modine Troubleshooting Assistant</h2>
            <p>We’re here to help you diagnose and fix your unit issues step by step.</p>
            <button onClick={onStart}>Get Started</button>
        </div>
    );
}

export default WelcomeScreen;
