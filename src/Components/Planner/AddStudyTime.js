import React, { useRef, useState, useEffect } from 'react';
import { createClass } from "../../Common/Services/EventService.js";
import AddForm from './AddForm.js';


//component that allows user to dynamically add a study time to their schedule.
export const AddStudyTime = ({ events, buildings, studyUpdateFunction }) => {

  //Functions

  //function to handle change to the autocomplete input
  const handleAutocompleteChange = (e, value) => {

    e.preventDefault();
    setAutoValue(value);

    //if a value is given, set the newClass building to the selected building's id,
    //otherwise set it to an empty string
    if (value) {
      setNewStudyTime((prev) => ({
        ...prev,
        building: value.id
      }));
    } else {
      setNewStudyTime((prev) => ({
        ...prev,
        building: ''
      }));
    }
  }

  //function to handle change to input field
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //update the new study time's variable's attribute whose corresponding input was altered
    setNewStudyTime(() => ({
      ...newStudyTime,  // Spread the previous state object
      [name]: value  // Dynamically update the specific field by name
    }));
  };

  //function to attempt to create a new study time
  const handleAddSubmit = (e) => {
    e.preventDefault();

    //if all input fields are not filled out, don't attempt to create a new class
    if ((newStudyTime.days.length === 0) || !newStudyTime.startTime || !newStudyTime.endTime || !newStudyTime.building) {
        setStatus("Please Enter information for all fields")
    } else {
        // Trigger add flag to create event and
        // re-render list with new event
        setFlag(true);
    }
  };


  //function to handle a change to the checkbox input that tracks days
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


  //Main Code

  //initializes hook to manage the value selected by autocomplete input
  const  [autoValue, setAutoValue] = useState(null)

  //initializes hooks for status, the button to create new study time, and the new study time to create
  const [status, setStatus] = useState('');
  const [addStudyFlag, setFlag] = useState(false);
  const [newStudyTime, setNewStudyTime] = useState({
    building: '',
    startTime: '',
    endTime: '',
    days: [],
  });


  useEffect(() => {
    // Check for add flag
    if (addStudyFlag) {

        const { building, startTime, endTime, days } = newStudyTime;
        const classDays = days.length > 0 ? days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Create event and handle response
        createClass('STUDY', 'Study Time', '', building, '', startTime, endTime, classDays)
            .then((result) => {

                // Update event list
                studyUpdateFunction([...events, result]);
                setStatus("Study Time added");

                // Reset new study times's state and attributes
                setNewStudyTime({
                    building: '',
                    startTime: '',
                    endTime: '',
                    days: newStudyTime.days,
                });
                
                // Reset the form element
                if (formRef.current) {
                    formRef.current.reset();
                }
                // Clear autocomplete 
                setAutoValue(null)
            })
            .catch((error) => {
                setStatus("Failed to add class");
                console.error(error);
            })
            .finally(() => {
                // After everything else is done, reset the add class flag
                setFlag(false);
            });
    }
  }, [studyUpdateFunction, addStudyFlag, events, newStudyTime, buildings]);


  //reference to form html element, which allows the form to be reset in the JS code
  const formRef = useRef(null);


  return (
    <>
        <AddForm
            isAddFrom={false}
            buildings={buildings}
            newEvent={newStudyTime}
            onChange={handleInputChange}
            onAutocompleteChange={handleAutocompleteChange}
            onCheckboxChange={handleCheckboxChange}
            onClick={handleAddSubmit}
            status={status}
            formRef={formRef}
            autoCompleteValue={autoValue}
        />
    </>
  );
};

export default AddStudyTime;