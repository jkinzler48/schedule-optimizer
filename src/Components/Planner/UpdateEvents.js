import React, { useState } from 'react';
import removeClass from "../../Common/Services/removeClassService";
import createClass from "../../Common/Services/createClassService"

const getStartTime = (time) =>
  parseInt(time.split('-')[0].replace(':', ''), 10);

const UpdateEvents = ({ classes, refreshClasses }) => {
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

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedClassCode === 'none') {
      setStatus('No class selected for removal.');
      return;
    }

    const result = await removeClass(selectedClassCode);
    setStatus(result);

	await refreshClasses();
    
    // Optionally, reset the selected class code after submission
    setSelectedClassCode('none');
  };










  const handleAddSubmit = async (e) => {
	e.preventDefault();
	try {
		const {code,name, instructor, building, room, time, days} = newClass;
		const classDays = days.length > 0 ? days : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']; // Default to all days if none selected

		await createClass(code, name, instructor, building, room, time, classDays);

		await refreshClasses();

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
		setStatus("Failed to add class")
	}
  };

  const handleInputChange = (e) => {
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
            <input type="checkbox" name="classDays" value="Mo" checked={newClass.days.includes('Mo')} onChange={handleInputChange}/> Monday
            <br />
            <input type="checkbox" name="classDays" value="Tu" checked={newClass.days.includes('Tu')} onChange={handleInputChange}/> Tuesday
            <br />
            <input type="checkbox" name="classDays" value="We" checked={newClass.days.includes('We')} onChange={handleInputChange}/> Wednesday
            <br />
            <input type="checkbox" name="classDays" value="Th" checked={newClass.days.includes('Th')} onChange={handleInputChange}/> Thursday
            <br />
            <input type="checkbox" name="classDays" value="Fr" checked={newClass.days.includes('Fr')} onChange={handleInputChange}/> Friday
            <br />
            <input type="checkbox" name="classDays" value="Sa" checked={newClass.days.includes('Sa')} onChange={handleInputChange}/> Saturday
            <br />
            <input type="checkbox" name="classDays" value="Su" checked={newClass.days.includes('Su')} onChange={handleInputChange}/> Sunday
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
                <div key={c.get('code')}>
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
        <form className="studyForm" id="studyForm" action="#stayhere">
          <p>How much study time do you want to add?</p>
          <p>
            <select id="studyLengthSelect" className="studyLengthSelect">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="75">1 hour 15 minutes</option>
              <option value="90">1 hour 30 minutes</option>
              <option value="105">1 hour 45 minutes</option>
              <option value="120">2 hours</option>
            </select>
          </p>
          <p>Where would you like to study?</p>
          <p>
            <input type="text" id="studyBuilding" placeholder="Enter Building Name" required />
          </p>
          <p id="daysInput">
            Select the days you want to add the study time to:
            <br />
            <input type="checkbox" name="studyDays" value="Mo" /> Monday
            <br />
            <input type="checkbox" name="studyDays" value="Tu" /> Tuesday
            <br />
            <input type="checkbox" name="studyDays" value="We" /> Wednesday
            <br />
            <input type="checkbox" name="studyDays" value="Th" /> Thursday
            <br />
            <input type="checkbox" name="studyDays" value="Fr" /> Friday
            <br />
            <input type="checkbox" name="studyDays" value="Sa" /> Saturday
            <br />
            <input type="checkbox" name="studyDays" value="Su" /> Sunday
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default UpdateEvents;
