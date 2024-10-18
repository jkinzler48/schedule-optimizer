import React, { useRef, useState, useEffect } from 'react';
import { createClass } from "../../Common/Services/EventService.js";
import AddClassForm from './AddClassForm.js';


export const AddClass = ({ events, buildings, classUpdateFunction }) => {
  const [status, setStatus] = useState('');
  const [addClassFlag, setFlag] = useState(false);
  const [newClass, setNewClass] = useState({
    code: '',
    name: '',
    instructor: '',
    building: '',
    room: '',
    time: '',
    days: [],
  });

useEffect(() => {
    if (buildings.length > 0 && newClass.building === '') {

      setNewClass({
            code: '',
            name: '',
            instructor: '',
            building: buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id,
            room: '',
            time: '',
            days: [],
          });
    }
}, [buildings, newClass.building]);

const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewClass(() => ({
      ...newClass,  // Spread the previous state object
      [name]: value  // Dynamically update the specific field by name
    }));
  };


  const handleAddSubmit = (e) => {
    e.preventDefault();
    // Trigger add flag to create lesson and
    // re-render list with new lesson

    if (!newClass.name || !newClass.code || !newClass.time || !newClass.room || !newClass.instructor) {
        setStatus("Please Enter information for all fields")
    } else {
        setFlag(true);
    }
  };

  const handleCheckboxChange = (e) => {
	const { name, value, type, checked } = e.target;
	if (type === 'checkbox') {
	  // Update days array based on checkbox state
	  setNewClass((prev) => {
		const days = checked
		  ? [...prev.days, value] // Add day if checked
		  : prev.days.filter((day) => day !== value); // Remove day if unchecked
		return { ...prev, days };
	  });
	} else {
	  // Update other input fields
	  setNewClass((prev) => ({ ...prev, [name]: value }));
	}
  };



const formRef = useRef(null);

useEffect(() => {
    // Check for add flag
    if (addClassFlag) {

        const { code, name, instructor, building, room, time, days } = newClass;
        const classDays = days.length > 0 ? days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        // Create class and handle response
        createClass(code, name, instructor, building, room, time, classDays)
            .then((result) => {
                console.log(result)
                // Update class list
                classUpdateFunction([...events, result]);
                setStatus("Class added");

                // Reset form state
                setNewClass({
                    code: '',
                    name: '',
                    instructor: '',
                    building: buildings.sort((a, b) => a.get('name').localeCompare(b.get('name')))[0].id,
                    room: '',
                    time: '',
                    days: newClass.days,
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
}, [classUpdateFunction, addClassFlag, events, newClass, buildings]);


  return (
    <>
        <AddClassForm
            buildings={buildings}
            newClass={newClass}
            onChange={handleInputChange}
            onCheckboxChange={handleCheckboxChange}
            onClick={handleAddSubmit}
            status={status}
            formRef={formRef}
        />
    </>
  );
};

export default AddClass;
