import React, { useState } from 'react';
import { removeClass, createClass } from '../../Common/Services/EventService';

const getStartTime = (time) =>
  parseInt(time.split('-')[0].replace(':', ''), 10);

const UpdateEvents = ({ classes, refreshClasses, setSchedule }) => {
  const [status, setStatus] = useState('');
  const [selectedClassCode, setSelectedClassCode] = useState('none');
  const [newClass, setNewClass] = useState({
    code: '',
    name: '',
    instructor: '',
    building: '',
    room: '',
    time: '',
    days: [],
  });
  const [newStudyTime, setNewStudyTime] = useState({
	code: '',
    name: '',
    instructor: '',
    building: '',
    room: '',
    time: '',
    days: [],
  })

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedClassCode === 'none') {
      setStatus('No class selected for removal.');
      return;
    }
	console.log(selectedClassCode)

    const result = await removeClass(selectedClassCode);
	setSchedule(classes.filter((c) => {
		return c.id !== selectedClassCode;
	}))

    setStatus(result);

    setSelectedClassCode('none');
  };


  const handleAddSubmit = async (e) => {
	e.preventDefault();
	console.log("Submitting Class: ", newClass)
	try {
		const {code, name, instructor, building, room, time, days} = newClass;
		const classDays = days.length > 0 ? days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Default to all days if none selected

		const newClassObj = await createClass(code, name, instructor, building, room, time, classDays);

		// await refreshClasses();
		// setSchedule((prevClasses) => [...prevClasses, newClassObj]);
		setSchedule([...classes, newClassObj]);

		setNewClass({
			code: '',
        	name: '',
        	instructor: '',
        	building: '',
        	room: '',
        	time: '',
        	days: [],
		});

		setStatus("Class added")

	} catch (error) {
		console.error("ERROR: ", error);
		setStatus("Failed to add class");
	}
  };


  const handleAddStudyTime = async (e) => {
	e.preventDefault();
	console.log("Submitting Class: ", newStudyTime)
	try {
		const {building, time, days} = newStudyTime;
		const classDays = days.length > 0 ? days : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Default to all days if none selected

		const newClassObj = await createClass(" ", "Study Time", "", building, "", time, classDays);

		// await refreshClasses();
		setSchedule([...classes, newClassObj]);

		setNewStudyTime({
			code: '',
        	name: '',
        	instructor: '',
        	building: '',
        	room: '',
        	time: '',
        	days: [],
		});

		setStatus("Study Time added")

	} catch (error) {
		console.error("ERROR: ", error);
		setStatus("Failed to add study time");
	}
  };



  const handleInputChangeClass = (e) => {
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

  const handleInputChangeClassStudy = (e) => {
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









  return (
    <>
      <div>
        <h4>Add class to Schedule</h4>
        <p>Enter Information for class to add:</p>
        <form className="addForm" id="addForm" action="#stayhere" onSubmit={handleAddSubmit}>
          <label htmlFor="codeInput">Class Code: </label>
          <input type="text" id="codeInput" className="addClass" placeholder="XYZ 12345" onChange={(e) => setNewClass({ ...newClass, code: e.target.value })} required />
          <br />
          <label htmlFor="nameInput">Class Name: </label>
          <input type="text" id="nameInput" className="addClass" placeholder="Name" onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} required />
          <br />
          <label htmlFor="instructorInput">Instructor Name: </label>
          <input type="text" id="instructorInput" className="addClass" placeholder="Instructor" onChange={(e) => setNewClass({ ...newClass, instructor: e.target.value })} required />
          <br />
          <label htmlFor="buildingInput">Building: </label>
          <input type="text" id="buildingInput" className="addClass" placeholder="Building Name" onChange={(e) => setNewClass({ ...newClass, building: e.target.value })} required />
          <br />
          <label htmlFor="roomInput">Room: </label>
          <input type="text" id="roomInput" className="addClass" placeholder="123" onChange={(e) => setNewClass({ ...newClass, room: e.target.value })} required />
          <br />
          <label htmlFor="timeInput">Enter Time in 24hr format: </label>
          <input type="text" id="timeInput" className="addClass" placeholder="HH:MM-HH:MM" onChange={(e) => setNewClass({ ...newClass, time: e.target.value })} required />
          <br />
          <p>
            Select the days the class is held on:
            <br />
            <input type="checkbox" name="classDays" value="Mo" checked={newClass.days.includes('Mo')} onChange={handleInputChangeClass}/> Monday
            <br />
            <input type="checkbox" name="classDays" value="Tu" checked={newClass.days.includes('Tu')} onChange={handleInputChangeClass}/> Tuesday
            <br />
            <input type="checkbox" name="classDays" value="We" checked={newClass.days.includes('We')} onChange={handleInputChangeClass}/> Wednesday
            <br />
            <input type="checkbox" name="classDays" value="Th" checked={newClass.days.includes('Th')} onChange={handleInputChangeClass}/> Thursday
            <br />
            <input type="checkbox" name="classDays" value="Fr" checked={newClass.days.includes('Fr')} onChange={handleInputChangeClass}/> Friday
            <br />
            <input type="checkbox" name="classDays" value="Sa" checked={newClass.days.includes('Sa')} onChange={handleInputChangeClass}/> Saturday
            <br />
            <input type="checkbox" name="classDays" value="Su" checked={newClass.days.includes('Su')} onChange={handleInputChangeClass}/> Sunday
          </p>
          <input type="submit" value="Submit" />
        </form>
		{status && <p>{status}</p>} {/* Display status message */}
      </div>

      <div>
        <h4>Remove event from Schedule</h4>
        <form className="removeFrom" id="removeForm" action="#stayhere" style={{ margin: '10px' }}>
          <p>Select class to remove:</p>
          <input 
            type="radio" 
            name="removes" 
            value="none" 
            style={{ margin: '10px' }} 
            checked={selectedClassCode === 'none'}
            onChange={() => setSelectedClassCode('none')}
          />
          I don't want to drop any classes
          <br />
          {/* Creates radio button option for every class in the classes list */}
          {classes.length > 0 &&
            classes
              .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time')))
              .map((c) => (
                <div key={c.id}>
                  <input
                    type="radio"
                    name="removes"
                    value={c.id}
                    style={{ margin: '10px' }}
                    checked={selectedClassCode === c.id}
                    onChange={() => setSelectedClassCode(c.id)}
                  />
                  {c.get('name')} - {c.get('instructor')} ({c.get('days').join(', ')} | {c.get('time')})
                  <br />
                </div>
              ))}
          <button type="submit" value="Submit" onClick={handleRemoveSubmit}>Submit</button>
          {status && <p>{status}</p>} {/* Display status message */}
        </form>
      </div>

      <div>
        <h4>Add study time to Schedule</h4>
        <form className="studyForm" id="studyForm" action="#stayhere" onSubmit={handleAddStudyTime}>
          <p>How much study time do you want to add?</p>
          <p>
		  	<label htmlFor="timeInput">Enter Time in 24hr format: </label>
          	<input type="text" id="timeInput" className="addClass" placeholder="HH:MM-HH:MM" onChange={(e) => setNewStudyTime({ ...newStudyTime, time: e.target.value })} required />
          </p>
          <p>Where would you like to study?</p>
          <p>
            <input type="text" id="studyBuilding" placeholder="Enter Building Name" onChange={(e) => setNewStudyTime({ ...newStudyTime, building: e.target.value })}required />
          </p>
          <p id="daysInput">
            Select the days you want to add the study time to:
            <br />
            <input type="checkbox" name="studyDays" value="Mo" checked={newStudyTime.days.includes('Monday')} onChange={handleInputChangeClassStudy}/> Monday
            <br />
            <input type="checkbox" name="studyDays" value="Tu" checked={newStudyTime.days.includes('Tuesday')} onChange={handleInputChangeClassStudy}/> Tuesday
            <br />
            <input type="checkbox" name="studyDays" value="We" checked={newStudyTime.days.includes('Wednesday')} onChange={handleInputChangeClassStudy}/> Wednesday
            <br />
            <input type="checkbox" name="studyDays" value="Th" checked={newStudyTime.days.includes('Thursday')} onChange={handleInputChangeClassStudy}/> Thursday
            <br />
            <input type="checkbox" name="studyDays" value="Fr" checked={newStudyTime.days.includes('Friday')} onChange={handleInputChangeClassStudy}/> Friday
            <br />
            <input type="checkbox" name="studyDays" value="Sa" checked={newStudyTime.days.includes('Saturday')} onChange={handleInputChangeClassStudy}/> Saturday
            <br />
            <input type="checkbox" name="studyDays" value="Su" checked={newStudyTime.days.includes('Sunday')} onChange={handleInputChangeClassStudy}/> Sunday
          </p>
          <input type="submit" value="Submit" />
		  {status && <p>{status}</p>} {/* Display status message */}
        </form>
      </div>
    </>
  );
};

export default UpdateEvents;
