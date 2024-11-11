import React, { useEffect, useState } from 'react';
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import Map from "./Map.js";
import Header from '../Header/Header.js';

const Directions = () => {

  ///Functions

  //dropdown functions for source and destination dropdown changes
  const onSourceChange = (e, value) => {
    //if a building is selected, update the destination mapId to be the selected
    //building's mapId
    if (value) {
      setSource(value.mapId);
    } else {
      setSource("");
    }
  };

  const onDestinationChange = (e, value) => {

    //if a building is selected, update the destination mapId to be the selected
    //building's mapId
    if (value) {
      setDestination(value.mapId);
    } else {
      setDestination("");
    }
  };


  // Main component JSX
  function displayOptimizer() {
    return (
      <>
       <Header/>
        <h1>Campus Directions</h1>
        <div className="module">
          <Map 
            buildings={buildings}
            source={source}
            destination={destination}
            sourceChange={onSourceChange}
            destChange={onDestinationChange}
          />
        </div>
      </>
    );
  }


  // Main code

  //initalize hooks for directions component
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [buildings, setBuildings] = useState([]);

  // Fetch the buildings only once when the component mounts
  useEffect(() => {
    if (Buildings.collection.length) {
      setBuildings(Buildings.collection);
    } else {
      getAllBuildings().then((buildings) => {
        setBuildings(buildings);
      });
    }
  }, []);


  // return the JSX for the main component
  return displayOptimizer();
};


export default Directions;