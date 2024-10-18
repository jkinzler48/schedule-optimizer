import React from 'react';


const AddClassForm = ({ buildings, newClass, onChange, onCheckboxChange, onClick, status, formRef }) => {
    return (
        <>
          <div>
            <h4>Add class to Schedule</h4>
            <p>Enter Information for class to add:</p>
            <form ref={formRef} className="addForm" id="addForm" action="#stayhere">
              <label htmlFor="codeInput">Class Code: </label>
              <input type="text" id="codeInput" name="code" className="addClass" placeholder="XYZ 12345" onChange={onChange} required />
              <br />
              <label htmlFor="nameInput">Class Name: </label>
              <input type="text" id="nameInput" name="name" className="addClass" placeholder="Name" onChange={onChange} required />
              <br />
              <label htmlFor="instructorInput">Instructor Name: </label>
              <input type="text" id="instructorInput" name="instructor" className="addClass" placeholder="Instructor" onChange={onChange} required />
              <br />
              <label htmlFor="roomInput">Room: </label>
              <input type="text" id="roomInput" name="room" className="addClass" placeholder="123" onChange={onChange} required />
              <br />
              <label htmlFor="timeInput">Enter Time in 24hr format: </label>
              <input type="text" id="timeInput" name="time" className="addClass" placeholder="HH:MM-HH:MM" onChange={onChange} required />
              <br />
              <p>Select the Building where the class is located: </p>
              <select id="buildingSelect" name="building" className="classSelect" onChange={onChange}>
                  {buildings.length > 0 &&
                    buildings
                      .sort((a, b) => a.get('name').localeCompare(b.get('name')))
                      .filter((b) => (b.get('type') === 'parking lot' || b.get('type') === 'dorm'))
                      .map((b) => (
                        <option key={b.id} value={b.id}>
                          {`${b.get('name')}`}
                        </option>
                      ))}
                </select>
              <p>
                Select the days the class is held on:
                <br />
                <input type="checkbox" name="classDays" value="Monday" checked={newClass.days.includes('Monday')} onChange={onCheckboxChange}/> Monday
                <br />
                <input type="checkbox" name="classDays" value="Tuesday" checked={newClass.days.includes('Tuesday')} onChange={onCheckboxChange}/> Tuesday
                <br />
                <input type="checkbox" name="classDays" value="Wednesday" checked={newClass.days.includes('Wednesday')} onChange={onCheckboxChange}/> Wednesday
                <br />
                <input type="checkbox" name="classDays" value="Thursday" checked={newClass.days.includes('Thursday')} onChange={onCheckboxChange}/> Thursday
                <br />
                <input type="checkbox" name="classDays" value="Friday" checked={newClass.days.includes('Friday')} onChange={onCheckboxChange}/> Friday
                <br />
                <input type="checkbox" name="classDays" value="Saturday" checked={newClass.days.includes('Saturday')} onChange={onCheckboxChange}/> Saturday
                <br />
                <input type="checkbox" name="classDays" value="Sunday" checked={newClass.days.includes('Sunday')} onChange={onCheckboxChange}/> Sunday
              </p>
              <input type="submit" value="Submit" onClick={onClick}/>
            </form>
            {status && <p>{status}</p>} {/* Display status message */}
          </div>
        </>
      );
    };

export default AddClassForm;