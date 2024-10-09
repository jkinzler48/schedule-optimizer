import React, { useEffect, useState } from 'react';
import { getSchedule, getNextClass } from "../Services/apiService.js";
import ClassList from "./ClassList.js";
import Optimizer from "./Optimizer.js";

const Main = () => {
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

  // updates the schedule when the selected class changes in the dropdown
  const onClassChange = (e) => {
    let classSelected = e.target.value;
    // if the selected class is next, then get the next class's mapId
    if (classSelected === "next" && nextClass) {
      classSelected = nextClass.mapId;
    }
    // updates schedule shown on screen
    setClassSelected(classSelected);
  };

  // Main component JSX
  function displaySchedule() {
    return (
      <div>
        <div className="module">
          <h1>Planner</h1>
          <h2>Current classes</h2>
          <ClassList
            classes={classes}
            day={daySelected}
            selectFunction={onDateChange}
          />
        </div>
        <div className="module">
          <h1>Optimizer</h1>
          <Optimizer
            classes={classes}
            nextClass={nextClass}
            selectedMapId={classSelected}
            selectFunction={onClassChange}
          />
        </div>
      </div>
    );
  }

  // Main code

  // initializes hooks for dropdowns so they can be updated
  const [daySelected, setDaySelected] = useState(getCurrentDay());
  const [classSelected, setClassSelected] = useState("");

  // initializes hooks for classes and next class to occur
  const [classes, setSchedule] = useState([]);
  const [nextClass, setNextClass] = useState({});

  useEffect(() => {
    getSchedule().then((classes) => {
      setSchedule(classes);
      getNextClass(classes).then((c) => setNextClass(c));
    });
  }, []);

  // update classSelected when nextClass is updated
  useEffect(() => {
    if (nextClass) {
      setClassSelected(nextClass.mapId);
    }
  }, [nextClass]);

  // return the JSX for the main component
  return displaySchedule();
};

export default Main;
