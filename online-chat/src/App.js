import React from "react"
import './App.css';
import Sidebar from "./sidebar"
import Chatbar from "./chat"
function App() {
  return (
    <div className="App">
      <div className="app_body">
      <Sidebar />
      <Chatbar />
      </div>
    </div>
  );
}

export default App;
