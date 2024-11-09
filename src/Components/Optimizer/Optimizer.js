import React, { useEffect, useState } from 'react';
import { getEventsByUser, getNextClass, getStartEnd, Events } from "../../Common/Services/EventService.js";
import OptimizerMap from "./OptimizerMap.js";
import Header from '../Header/Header.js';
import EventDirections from './EventDirections.js';


//in the future, we will build out this section so that it provides recomendations to
//the user about their schedule. This may include recommendations such as what specific time
//they shoudl leave for a class or what specific supplies they should bring to a class
const Optimizer = () => {
  // Functions

  //dropdown functions for source and destination dropdown changes
  const onSourceChange = (e) => {
    let source = e.target.value;
     
    //set source equal to the id of the building for the class selected by the dropdown
    setSource(source);
  };

  const onDestinationChange = (e) => {
    let destination = e.target.value;
     
    //set destination equal to the id of the building for the classselected by the dropdown
    setDestination(destination);
  };

  // Main component JSX
  function displayOptimizer() {
    return (
      <>
        <Header />
        <h1>Optimizer</h1>
        <div className="module">
          <OptimizerMap
            prevClass={prevClass}
            nextClass={nextClass}
            startEnd={startEnd}
          />
        </div>
        <div className="module">
          <h2>Display Directions Between Event Locations</h2>
          <EventDirections 
            events={classes}
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

  // initializes hooks for classes and next/previous class to occur
  const [classes, setSchedule] = useState([]);
  const [startEnd, setStartEnd] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  const [prevClass, setPrevClass] = useState(null);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");


// Fetch the schedule only once when the component mounts
useEffect(() => {
    if (Events.collection.length) {
      setSchedule(Events.collection);
    } else {
      getEventsByUser().then((classes) => {
        setSchedule(classes);
      });
    }
  }, []);


  //when classes changes, set the starting/ending location
  useEffect(() => {
    getStartEnd(classes).then((c) => {setStartEnd(c);});
  }, [classes]);


  //when classes is updated, set the source and destination for the events directions equal to the first class to keep the 
  //event directions consistent with the dropdown values
  useEffect(() => {
    if (classes.length > 0) {
      let firstClass = classes.sort((a, b) => a.get('time').localeCompare(b.get('time')))[0]
      setSource(firstClass.get('building').get('mapId'));
      setDestination(firstClass.get('building').get('mapId'));
    }
  }, [classes]);


  // Determine the next class after the schedule is fetched
  // and the location/class the user will be coming from to get to their next class
  useEffect(() => {
    if (classes.length) {
      getNextClass(classes).then((results) => {

        //if the user is coming from their starting/ending location, set their
        //previous class equal to this location for directions/optimzer purposes
        if (results[0] === "startEnd") {
          setPrevClass(startEnd);
        } else {
          setPrevClass(results[0]);
        }

        //if the user's next event is going to their starting/ending location, set their
        //next class equal to this location for directions/optimzer purposes
        if (results[1] === "startEnd") {
          setNextClass(startEnd);
        } else {
          setNextClass(results[1]);
        }

      });

    }
  }, [classes, startEnd]);



  // return the JSX for the main component
  return displayOptimizer();
};


export default Optimizer;