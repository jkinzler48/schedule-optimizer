import React, { useEffect, useState } from 'react';
import { createClass } from "../../Common/Services/EventService.js";
import AddStartEndForm from './AddStartEndForm.js';


const AddStartEnd = ({ events, buildings, classUpdateFunction }) => {

  // Main component JSX
  function displayForm() {
    return (
      <>
          <AddStartEndForm
            events={events}
            buildings={buildings}
            onChange={onChangeStartEnd}
            onClick={onAddStartEndClick}
          />
      </>
    );
  }

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
  

  // Main code


  const [startEnd, setStartEnd] = useState(null);
  const [addDayStart, setAddDayStart] = useState(false);

  useEffect(() => {
    if (buildings.length > 0) {
      // Set startEnd to the first building's id
      setStartEnd(buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id);
    }
  }, [buildings]);

  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (startEnd && addDayStart) {
      
      // createEvent("Day Start/End", "START/END", "start/end of day", buildingPointer,['Every Day'], '', '')
      createClass("START/END", "Day Start/End", '', startEnd, '', "start/end of day", ['Every Day'])
        .then((newEvent) => {
          setAddDayStart(false);
          // Add the newly created lesson to the lessons array
          // to render the new list of lessons (thru spread/concatination)
          classUpdateFunction([...events, newEvent]);

          //Note: CANNOT MANIPULATE STATE ARRAY DIRECTLY
          //lessons = lessons.push(lesson)
          //setLessons(lessons)
      });
    }
  }, [events, startEnd, addDayStart, classUpdateFunction]);


  // return the JSX for the main component
  return displayForm();
};

export default AddStartEnd;