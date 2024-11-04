import React, { useEffect, useState } from 'react';
import { getEventsByUser, getNextClass, getStartEnd, Events } from "../../Common/Services/EventService.js";
import OptimizerMap from "./OptimizerMap.js";
import EventMap from './EventMap.js';
import Header from '../Header/Header.js';


//in the future, we will build out this section so that it provides recomendations to
//the user about their schedule. This may include recommendations such as what specific time
//they shoudl leave for a class or what specific supplies they should bring to a class
const Optimizer = () => {
  // Functions

  // updates the schedule when the selected class changes in the dropdown
  const onClassChange = (e) => {
    let classSelected = e.target.value;

    // if the selected class is next, then get the next class's mapId
    if (classSelected === "next" && nextClass) {
      classSelected = nextClass.get('building').get('mapId');
    }

    //updates schedule that will be shown on screen
    setClassSelected(classSelected);
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
          <h2>Display Any Event Location</h2>
          <EventMap
              classes={classes}
              selectedMapId={classSelected}
              selectFunction={onClassChange}
            />
        </div>
      </>
    );
  }


  // Main code

  // initializes hooks for dropdown so it can be updated
  const [classSelected, setClassSelected] = useState("");

  // initializes hooks for classes and next/previous class to occur
  const [classes, setSchedule] = useState([]);
  const [startEnd, setStartEnd] = useState(null);
  const [nextClass, setNextClass] = useState(null);
  const [prevClass, setPrevClass] = useState(null);


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


  // Update `classSelected`, which stores a mapId, when `nextClass` changes
  useEffect(() => {
    if (nextClass) {
      setClassSelected(nextClass.get('building').get('mapId'));
    }
  }, [nextClass]);


  // return the JSX for the main component
  return displayOptimizer();
};


export default Optimizer;