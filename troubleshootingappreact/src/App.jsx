import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/Welcome";  
import Issues from "./components/Issues";    
import TroubleshootingChat from "./components/TroubleshootingChat";  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />  
        <Route path="/issues" element={<Issues />} />  
        <Route path="/chat" element={<TroubleshootingChat />} />  
      </Routes>
    </Router>
  );
}

export default App;
