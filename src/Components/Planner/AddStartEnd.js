import React, { useEffect, useState } from 'react';
import { createEvent } from "../../Common/Services/EventService.js";
import AddStartEndForm from './AddStartEndForm.js';


const AddStartEnd = ({ events, buildings, eventsUpdateFunction }) => {

  //Handler to handle event passed from child submit button
  const onAddStartEndClick = (e) => {
      e.preventDefault();
      // Trigger add flag to create start/end event and
      // re-render list with new lesson
      setAddDayStart(true);
  };
  
  // Handler to track changes to the child input text
  const onChangeStartEnd = (e, value) => {

    e.preventDefault();
    setInputValue(value);

    //if a value is given, set the newEvent building to the selected building's id,
    //otherwise set it to an empty string
    if (value) {
      setStartEnd(value.id);
    } else {
      setStartEnd(null);
    }

  };


  function displayForm() {
    return (
      <>
          <AddStartEndForm
            events={events}
            buildings={buildings}
            onChange={onChangeStartEnd}
            onClick={onAddStartEndClick}
            autoCompleteValue={inputValue}
            status={status}
          />
      </>
    );
  }
  


  //initializes hooks for input field, sumbit button, and status message
  const [startEnd, setStartEnd] = useState(null);
  const [addDayStart, setAddDayStart] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [status, setStatus] = useState("");





  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (addDayStart) {

      if (startEnd) {

        //creates a new Event object used to store the day's start/end.
        createEvent("START/END", "Day Start/End", '', startEnd, '', "Start of Day", "End of Day", ['Every Day'])
          .then((newEvent) => {
            setAddDayStart(false);
            // Add the newly created event to the events array
            // to render the new list of lessons (thru spread/concatination)
            eventsUpdateFunction([...events, newEvent]);
        });
        setStatus("");
        setInputValue(null);
        setStartEnd(null);
      } else {
        setStatus("Please select a location for day Start/End");
      }
      setAddDayStart(false)
    
    }
  }, [events, startEnd, addDayStart, eventsUpdateFunction]);

  return displayForm();
  
};


export default AddStartEnd;