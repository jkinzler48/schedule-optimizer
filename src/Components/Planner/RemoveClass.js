import React, { useRef, useState } from 'react';
import { removeClass } from "../../Common/Services/EventService.js";
import RemoveClassForm from './RemoveClassForm.js';


//component that allows user to dynamically remove an event to their schedule.
export const RemoveClass = ({ events, classUpdateFunction }) => {

  //function to handle when submit button is pressed
  const handleRemoveSubmit = (e) => {
    e.preventDefault();
    
    if (selectedClassCode === 'none') {
      setStatus('No class selected for removal.');
      return;
    }

    //remove class if one is selected
    const result = removeClass(selectedClassCode);
    setStatus(result);
   
    //update events list so that the removed class dissapears from teh user's view
    if (result.startsWith("Class removed successfully")) {
        classUpdateFunction(events.filter((e) => e.id !== selectedClassCode))
    }

    // Optionally, reset the selected class code after submission
    setSelectedClassCode('none');
  };

  const handleInputChange = (e) => {	
    setSelectedClassCode(e.target.value);
  }


  //Main Code

  //initializises hooks for selected class and status
  const [status, setStatus] = useState('');
  const [selectedClassCode, setSelectedClassCode] = useState('none');
  
  const formRef = useRef(null);


  //JSX
  return (
    <>
        <RemoveClassForm
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

export default RemoveClass;