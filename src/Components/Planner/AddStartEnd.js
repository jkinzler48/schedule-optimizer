import React, { useEffect, useState } from 'react';
import { createClass } from "../../Common/Services/EventService.js";
import AddStartEndForm from './AddStartEndForm.js';


const AddStartEnd = ({ events, buildings, classUpdateFunction }) => {

  //Functions

  //Handler to handle event passed from child submit button
  const onAddStartEndClick = (e) => {
      e.preventDefault();
      // Trigger add flag to create start/end event and
      // re-render list with new lesson
      setAddDayStart(true);
  };
  
  // Handler to track changes to the child input text
  const onChangeStartEnd = (e) => {
      e.preventDefault();
      // Continuously updating name to be added on submit
      setStartEnd(e.target.value);
  };


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
  

  // Main code

  //initializes hooks for input field and sumbit button
  const [startEnd, setStartEnd] = useState(null);
  const [addDayStart, setAddDayStart] = useState(false);


  //initialize the start/End location equal to the first building (in alphabetical order)
  //keeps code consisitent with the dropdown
  useEffect(() => {
    if (buildings.length > 0) {
      // Set startEnd to the first building's id
      setStartEnd(buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id);
    }
  }, [buildings]);



  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (startEnd && addDayStart) {

      //creates a new Event object used to store the day's start/end.
      createClass("START/END", "Day Start/End", '', startEnd, '', "00:00", "00:00", ['Every Day'])
        .then((newEvent) => {
          setAddDayStart(false);
          // Add the newly created event to the events array
          // to render the new list of lessons (thru spread/concatination)
          classUpdateFunction([...events, newEvent]);
      });
    }
  }, [events, startEnd, addDayStart, classUpdateFunction]);

  // return the JSX for the main component
  return displayForm();
  
};


export default AddStartEnd;