import React, { useEffect, useState } from 'react';
import { getAllEvents, getNextClass, Events } from "../../Common/Services/EventService.js";
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";

import OptimizerMap from "./OptimizerMap.js";
import Directions from "./Directions.js";

const Optimizer = () => {
  // Functions

  // updates the schedule when the selected class changes in the dropdown
  const onClassChange = (e) => {
    let classSelected = e.target.value;
    // if the selected class is next, then get the next class's mapId
    if (classSelected === "next" && nextClass) {
      classSelected = nextClass.get('building').get('mapId');
    }
    // updates schedule shown on screen
    setClassSelected(classSelected);
  };


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
        <h1>Optimizer</h1>
        <div className="module">
          <OptimizerMap
            classes={classes}
            nextClass={nextClass}
            selectedMapId={classSelected}
            selectFunction={onClassChange}
          />
        </div>
        <div className="module">
          <Directions 
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

  // initializes hooks for dropdowns so they can be updated
  const [classSelected, setClassSelected] = useState("");

  // initializes hooks for classes and next class to occur
  const [classes, setSchedule] = useState([]);
  const [nextClass, setNextClass] = useState(null);

// Fetch the schedule only once when the component mounts
useEffect(() => {
    if (Events.collection.length) {
      setSchedule(Events.collection);
    } else {
      getAllEvents().then((classes) => {
        setSchedule(classes);
      });
    }
  }, []);

  // Determine the next class after the schedule is fetched
  useEffect(() => {
    if (classes.length) {
      getNextClass(classes).then((c) => setNextClass(c));
    }
  }, [classes]);

  // Update `classSelected` when `nextClass` changes
  useEffect(() => {
    if (nextClass) {
      setClassSelected(nextClass.get('building').get('mapId'));
    }
  }, [nextClass]);


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

export default Optimizer;