
// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Main from './Components/Main.js'; // Import the Main component
import * as Env from "./environments";
import Parse from "parse";

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
