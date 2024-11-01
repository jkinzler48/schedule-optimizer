import React, { useEffect, useState } from 'react';
import {  getAllEvents, Events } from "../../Common/Services/EventService.js";
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import EventList from "./EventList.js";
import AddStartEnd from './AddStartEnd.js';
import AddClass from './AddClass.js';
import AddStudyTime from './AddStudyTime.js';
import RemoveClass from './RemoveClass.js';
import Header from '../Header/Header.js';


//In future, we will add user feautres, so that each user can have their own schedule,
//and this will allow them to have personalized recommendations
const Planner = () => {

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
    //sets day to update schedule shown on screen
    setDaySelected(daySelected);
  };


  // Main component JSX
  function displayPlanner() {
    return (
      <>
        <Header/>

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
		</div>
		<div className="module">
          <AddClass
            events={classes}
            buildings={buildings}
            classUpdateFunction={setSchedule}
          />
		</div>
		<div className="module">
          <RemoveClass
            events={classes}
            classUpdateFunction={setSchedule}
          />
		</div>
		<div className="module">
           <AddStudyTime
            events={classes}
            buildings={buildings}
            studyUpdateFunction={setSchedule}
          />
          {/* We may also add section for adding additional "special" events, such as
          adding a meal time or break time */}
        </div>
      </>
    );
  }


  // Main code

  // initializes hooks for day dropdown so schedule can be updated
  const [daySelected, setDaySelected] = useState(getCurrentDay());

  // initializes hooks for classes and building Parse object lists
  const [classes, setSchedule] = useState([]);
  const [buildings, setBuildings] = useState([]);

  // Fetch the schedule only once when the component mounts, otherwise refresh
  useEffect(() => {
    if (Events.collection.length) {
      setSchedule(Events.collection);
    } else {
      getAllEvents().then((classes) => {
        setSchedule(classes);
      });
    }
  }, []);


  // Fetch the buildings only once when the component mounts, otherwise refresh
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