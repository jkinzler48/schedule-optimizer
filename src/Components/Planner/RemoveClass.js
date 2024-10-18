import React, { useRef, useState } from 'react';
import { removeClass } from "../../Common/Services/EventService.js";
import RemoveClassForm from './RemoveClassForm.js';



export const RemoveClass = ({ events, classUpdateFunction }) => {

const [status, setStatus] = useState('');
const [selectedClassCode, setSelectedClassCode] = useState('none');
 
const formRef = useRef(null);

const handleRemoveSubmit = (e) => {
    e.preventDefault();
    
    if (selectedClassCode === 'none') {
      setStatus('No class selected for removal.');
      return;
    }

    const result = removeClass(selectedClassCode);
    setStatus(result);

    if (result.startsWith("Class with code")) {
        classUpdateFunction(events.filter((e) => e.id !== selectedClassCode))
    }

    
    // Optionally, reset the selected class code after submission
    setSelectedClassCode('none');
  };

  const handleInputChange = (e) => {
    setSelectedClassCode(e.target.value);
  }


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