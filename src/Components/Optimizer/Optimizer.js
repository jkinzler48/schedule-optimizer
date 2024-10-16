import React, { useEffect, useState } from 'react';
import { getAllEvents, getNextClass, getStartEnd, Events } from "../../Common/Services/EventService.js";

import OptimizerMap from "./OptimizerMap.js";
import EventMap from './EventMap.js';


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



  // Main component JSX
  function displayOptimizer() {
    return (
      <>
        <h1>Optimizer</h1>
        <div className="module">
          <OptimizerMap
            prevClass={prevClass}
            nextClass={nextClass}
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

  // initializes hooks for dropdowns so they can be updated
  const [classSelected, setClassSelected] = useState("");

  // initializes hooks for classes and next class to occur
  const [classes, setSchedule] = useState([]);
  const [nextClass, setNextClass] = useState(null);
  const [prevClass, setPrevClass] = useState(null);

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
  // Determine the next class after the schedule is fetched
  useEffect(() => {
    if (classes.length) {
      getNextClass(classes).then((startEnd) => {
        if (startEnd[0] === "startEnd") {
          getStartEnd(classes).then((c) => {setPrevClass(c);});
        } else {
          setPrevClass(startEnd[0]);
        }

        if (startEnd[1] === "startEnd") {
          getStartEnd(classes).then((c) => {setNextClass(c);})
        } else {
          setNextClass(startEnd[1]);
        }

      });

    }
  }, [classes]);

  // Update `classSelected` when `nextClass` changes
  useEffect(() => {
    if (nextClass) {
      setClassSelected(nextClass.get('building').get('mapId'));
    }
  }, [nextClass]);


  // return the JSX for the main component
  return displayOptimizer();
};

export default Optimizer;