import React, { useEffect, useState } from 'react';
import {  getEventsByUser, Events } from "../../Common/Services/EventService.js";
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import { Link } from 'react-router-dom';
import EventList from "./EventList.js";
import AddStartEnd from './AddStartEnd.js';
import AddClass from './AddClass.js';
import AddStudyTime from './AddStudyTime.js';
import RemoveEvent from './RemoveEvent.js';
import Header from '../Header/Header.js';
import Button from '@mui/material/Button';



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
            events={events}
            day={daySelected}
            selectFunction={onDateChange}
          />
        </div> 
        <h1>Update Schedule</h1>
        <div className='module'>
            <h2>Import Class Schedule (from NOVO)</h2>
            <p>It is recommended that you remove all classes that have already been added to your schedule prior
              to importing a new schedule. You can use the "Remove Event from Schedule" section below
              to accomplish this.
            </p>
            <Link to="/upload">
			      	<Button variant="contained" >Import Schedule</Button>
            </Link>
        </div>
        <div className="module">
            <h2>Remove Event from Schedule</h2>
            <RemoveEvent
              events={events}
              eventsUpdateFunction={setSchedule}
            />
        </div>
        <div className="module">
          <h2>Manually Add Class to Schedule</h2>
          <AddClass
            events={events}
            buildings={buildings}
            eventsUpdateFunction={setSchedule}
          />
		    </div>
        <div className="module">
            <h2>Add Study time</h2>
            <AddStudyTime
              events={events}
              buildings={buildings}
              eventsUpdateFunction={setSchedule}
        />
        </div>
        <div className="module">
          <h2>Add Day Starting/Ending Location</h2>
            <AddStartEnd 
              events={events}
              buildings={buildings}
              eventsUpdateFunction={setSchedule}
            />
		    </div>
          {/* We may also add section for adding additional "special" events, such as
          adding a meal time or break time */}
      </>
    );
  }


  // Main code

  // initializes hooks for day dropdown so schedule can be updated
  const [daySelected, setDaySelected] = useState(getCurrentDay());

  // initializes hooks for events and building Parse object lists
  const [events, setSchedule] = useState([]);
  const [buildings, setBuildings] = useState([]);

  // Fetch the schedule only once when the component mounts, otherwise refresh
  useEffect(() => {
    if (Events.collection.length) {
      setSchedule(Events.collection);
    } else {
      getEventsByUser().then((events) => {
        setSchedule(events);
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