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
