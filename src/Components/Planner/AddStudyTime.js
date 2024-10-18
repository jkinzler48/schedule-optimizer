import React, { useRef, useState, useEffect } from 'react';
import { createClass } from "../../Common/Services/EventService.js";
import AddStudyTimeForm from './AddStudyTimeForm.js';


export const AddStudyTime = ({ events, buildings, studyUpdateFunction }) => {
  const [status, setStatus] = useState('');
  const [addStudyFlag, setFlag] = useState(false);
  const [newStudyTime, setNewStudyTime] = useState({
    building: '',
    time: '',
    days: [],
  });

useEffect(() => {
    if (buildings.length > 0 && newStudyTime.building === '') {

      setNewStudyTime({
            building: buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id,
            time: '',
            days: [],
          });
    }
}, [buildings, newStudyTime.building]);

const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewStudyTime(() => ({
      ...newStudyTime,  // Spread the previous state object
      [name]: value  // Dynamically update the specific field by name
    }));
  };


  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Trigger add flag to create lesson and
    // re-render list with new lesson

    if (!newStudyTime.time) {
        setStatus("Please Enter information for all fields")
    } else {
        setFlag(true);
    }
  };

  const handleCheckboxChange = (e) => {
	const { name, value, type, checked } = e.target;
	if (type === 'checkbox') {
	  // Update days array based on checkbox state
	  setNewStudyTime((prev) => {
		const days = checked
		  ? [...prev.days, value] // Add day if checked
		  : prev.days.filter((day) => day !== value); // Remove day if unchecked
		return { ...prev, days };
	  });
	} else {
	  // Update other input fields
	  setNewStudyTime((prev) => ({ ...prev, [name]: value }));
	}
  };



const formRef = useRef(null);

useEffect(() => {
    // Check for add flag
    if (addStudyFlag) {

        const { building, time, days } = newStudyTime;
        const classDays = days.length > 0 ? days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Create class and handle response
        createClass('STUDY', 'Study Time', '', building, '', time, classDays)
            .then((result) => {
                console.log(result)
                // Update class list
                studyUpdateFunction([...events, result]);
                setStatus("Study Time added");

                // Reset form state
                setNewStudyTime({
                    building: buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id,
                    time: '',
                    days: newStudyTime.days,
                });
                
                // Reset the form element
                if (formRef.current) {
                    formRef.current.reset();
                }
            })
            .catch((error) => {
                setStatus("Failed to add class");
                console.error(error);
            })
            .finally(() => {
                // Reset the add class flag
                setFlag(false);
            });
    }
}, [studyUpdateFunction, addStudyFlag, events, newStudyTime, buildings]);


  return (
    <>
        <AddStudyTimeForm
            buildings={buildings}
            newStudyTime={newStudyTime}
            onChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onClick={handleAddSubmit}
            status={status}
            formRef={formRef}
        />
    </>
  );
};

export default AddStudyTime;