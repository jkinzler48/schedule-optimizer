import React, { useEffect, useState } from 'react';
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import Map from "./Map.js";


const Directions = () => {
  // Function

  //dropdown functions for source and destination dropdowns
  const onSourceChange = (e) => {
    let source = e.target.value;
     
    // updates schedule shown on screen
    setSource(source);
  };

  const onDestinationChange = (e) => {
    let destination = e.target.value;
     
      // updates schedule shown on screen
      setDestination(destination);
  };




  // Main component JSX
  function displayOptimizer() {
    return (
      <>
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

  //when buildings is updated, set the source and destination equal to the first building to keep the 
  //directions map consistent with the dropdown values
  useEffect(() => {
    if (buildings.length > 0) {
      let firstBuilding = buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0];
      setSource(firstBuilding.get('mapId'));
      setDestination(firstBuilding.get('mapId'));
    }
  }, [buildings]);

  // return the JSX for the main component
  return displayOptimizer();
};

export default Directions;