// import logo from './logo.svg';
import React from 'react';
import './App.css';
import * as Env from "./environments";
import Parse from "parse";
import Components from "./Components/Components.js"

// Initialize Parse
Parse.initialize(Env.APPLICATION_ID, Env.JAVASCRIPT_KEY);
Parse.serverURL = Env.SERVER_URL;

function App() {
  return (
    <Components />
  );
}

export default App;

/* Future ideas - Add a back4app class for class materials and have a list of what you should bring in your backpack */
/* Another idea - auto schedule meals based on user set critieria (X time away from dorm, X time to eat, etc) */
