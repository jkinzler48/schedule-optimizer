
// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Planner from './Components/Planner/Planner.js'; // Import the Main component
import Optimizer from "./Components/Optimizer/Optimizer.js"
import * as Env from "./environments";
import Parse from "parse";
import Components from "./Components/Components.js"

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Components />
    // <div className="App">
    //   <Planner />
    //   <Optimizer /> 
    // </div>
  );
}

export default App;
