import React, { useRef, useState } from 'react';
import { removeEvent } from "../../Common/Services/EventService.js";
import RemoveEventForm from './RemoveEventForm.js';


//component that allows user to dynamically remove an event to their schedule.
export const RemoveEvent = ({ events, eventsUpdateFunction }) => {


  //funciton that handles removing a single event
  const removeOneEvent = (eventCode) => {

    //check if the selected code to remove is valid
    if (!(events.find((e) => e.id === eventCode))) {
      return;
    }

    //remove event
    return removeEvent(eventCode);

  }


  //function to handle when submit button is pressed
  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    

    if (selectedClassCode === 'none') {
      setStatus('No event selected for removal.');
      return;

    //if all classes option is selected, then remove all Events that correspond to Classes
    } else if (selectedClassCode === 'allClasses') {

      //filter events to contain only classes, not study times or other events
      let allClasses = events.filter((event) => (event.get('code') !== "STUDY" && event.get('code') !== "START/END" ));

      //check if there are no classes to remove
      if (allClasses.length === 0) {
        setStatus("You have no classes to remove.");
        return;
      }

      // Create a new array to hold events that were successfully removed
      let updatedEvents = [...events];

      //varaible to track if all events are successfully removed
      let removalSuccess = true;

      // Remove all events in allClasses
      for (let i = 0; i < allClasses.length; i++) {

        let result = removeOneEvent(allClasses[i].id);

        // If any removal fails, stop and set an error message
        if (!result.startsWith("Event removed successfully")) {
          removalSuccess = false;
          setStatus("Error removing all classes.");
          break;
        }

        // If event was removed successfully, filter it out of the updatedEvents array
        updatedEvents = updatedEvents.filter((e) => e.id !== allClasses[i].id);
      }

      //update events to reflect the events that were successfully removed
      eventsUpdateFunction(updatedEvents);

      // If all classes were removed successfully, update the status
      if (removalSuccess) {
        setStatus("All classes removed successfully.");
      }
    
    //otherwise, remove the one selecetd class
    } else {

      //remove the selected event
      let result = removeOneEvent(selectedClassCode);

      //update status message
      setStatus(result);

      //update events list so that the removed class dissapears from teh user's view
      if (result.startsWith("Event removed successfully")) {
        eventsUpdateFunction(events.filter((e) => e.id !== selectedClassCode))
      }
    }

    //reset the selected class code after submission
    setSelectedClassCode('none');
  };


  const handleInputChange = (newValue) => {	
    setSelectedClassCode(newValue);
  }


  //Main Code

  //initializises hooks for selected class and status
  const [status, setStatus] = useState('');
  const [selectedClassCode, setSelectedClassCode] = useState('none');
  
  const formRef = useRef(null);


  //JSX
  return (
    <>
        <RemoveEventForm
            events={events}
            selectedClass={selectedClassCode}
            onChange={handleInputChange}
            onClick={handleRemoveSubmit}
            status={status}
            formRef={formRef}
        />
    </>
  );
};

export default RemoveEvent;