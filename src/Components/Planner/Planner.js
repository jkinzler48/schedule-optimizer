import React, { useEffect, useState } from 'react';
import { createEvent, getAllEvents, Events } from "../../Common/Services/EventService.js";
import { getAllBuildings, Buildings } from "../../Common/Services/BuildingService.js";
import EventList from "./EventList.js";
import UpdateEvents from "./UpdateEvents.js";
import AddStartEnd from './AddStartEnd.js';
import removeClass from "../../Common/Services/removeClassService.js"


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

  const refreshClasses = async () => {
    const updatedClasses = await getAllEvents();
    setSchedule(updatedClasses); // Update the state with the new list
  };

  const handleRemoveClass = async (classCode) => {
    const result = await removeClass(classCode); // Call the remove service
    console.log(result); // Optional: log the result for debugging

    // Fetch the updated list of events after removal
    await refreshClasses()
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
            onChange={onChangeStartEnd}
            onClick={onAddStartEndClick}
          />
          <UpdateEvents
            classes={classes}
			onRemoveClass={handleRemoveClass}
			refreshClasses={refreshClasses}
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


  const [startEnd, setStartEnd] = useState();
  const [addDayStart, setAddDayStart] = useState(false);


  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (startEnd && addDayStart) {
      
      const buildingPointer = { __type: 'Pointer', className: 'Building', objectId: startEnd };
      createEvent("Day Start/End", "START/END", "start/end of day", buildingPointer,['Every Day'], '', '')
        .then((newEvent) => {
        setAddDayStart(false);
          // Add the newly created lesson to the lessons array
          // to render the new list of lessons (thru spread/concatination)
          setSchedule([...classes, newEvent]);

          //Note: CANNOT MANIPULATE STATE ARRAY DIRECTLY
          //lessons = lessons.push(lesson)
          //setLessons(lessons)
      });
    }
  }, [classes, startEnd, addDayStart]);


     // Handler to handle event passed from child submit button
  const onAddStartEndClick = (e) => {
    e.preventDefault();
    // Trigger add flag to create lesson and
    // re-render list with new lesson
    setAddDayStart(true);
  };

  // Handler to track changes to the child input text
  const onChangeStartEnd = (e) => {
    e.preventDefault();
    // Continuously updating name to be added on submit
    setStartEnd(e.target.value);
  };

  // return the JSX for the main component
  return displayPlanner();
};

export default Planner;