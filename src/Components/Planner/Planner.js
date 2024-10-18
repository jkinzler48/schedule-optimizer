import React, { useEffect, useState } from 'react';
import {  getAllEvents, Events } from "../../Common/Services/EventService.js";
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import EventList from "./EventList.js";

import AddStartEnd from './AddStartEnd.js';
import AddClass from './AddClass.js';
import AddStudyTime from './AddStudyTime.js';
import RemoveClass from './RemoveClass.js';



const Planner = () => {
  // Functions

  // function that returns the current day of the week it is
  function getCurrentDay() {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDay = new Date().getDay();
    return daysOfWeek[currentDay];
  }

  // dropdown functions
  // updates the schedule when the selected day changes in the dropdown
  const onDateChange = (e) => {
    let daySelected = e.target.value;
    // if the selected day is Today, then get the current day
    if (daySelected === "Today") {
      daySelected = getCurrentDay();
    }
    // updates schedule shown on screen
    setDaySelected(daySelected);
  };


  // Main component JSX
  function displayPlanner() {
    return (
      <>
        <h1>Planner</h1>
        <div className="module">
          <h2>Current Schedule</h2>
          <EventList
            classes={classes}
            day={daySelected}
            selectFunction={onDateChange}
          />
        </div> 
        <div className="module">
        <h2>Update Schedule</h2>
          <AddStartEnd 
            events={classes}
            buildings={buildings}
            classUpdateFunction={setSchedule}
          />
          <AddClass
            events={classes}
            buildings={buildings}
            classUpdateFunction={setSchedule}
          />
          <RemoveClass
            events={classes}
            classUpdateFunction={setSchedule}
          />
           <AddStudyTime
            events={classes}
            buildings={buildings}
            studyUpdateFunction={setSchedule}
          />
        </div>
      </>
    );
  }

  // Main code

  // initializes hooks for dropdowns so they can be updated
  const [daySelected, setDaySelected] = useState(getCurrentDay());

  // initializes hooks for classes and next class to occur
  const [classes, setSchedule] = useState([]);

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


  //initalize hooks for directions component
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
  return displayPlanner();
};

export default Planner;