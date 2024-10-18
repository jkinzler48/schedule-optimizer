import React from 'react';


const AddStudyTimeForm = ({ buildings, newStudyTime, onChange, onCheckboxChange, onClick, status, formRef }) => {
    return (
        <>
          <div>
            <h4>Add study time to Schedule</h4>
            <form ref={formRef} className="studyForm" id="studyForm" action="#stayhere">
              <p>What time would you like to study?</p>
              <label htmlFor="timeInput">Enter Time in 24hr format: </label>
                  <input type="text" id="timeInput" name="time" className="addClass" placeholder="HH:MM-HH:MM" onChange={onChange} required />
              <p>Where would you like to study?</p>
              <p>
                {/* Create dropdown option for all buildings in list */}
                <select id="buildingSelect" name="building" className="classSelect" onChange={onChange}>
                      {buildings.length > 0 &&
                        buildings
                          .sort((a, b) => a.get('name').localeCompare(b.get('name')))
                          .map((b) => (
                            <option key={b.id} value={b.id}>
                              {`${b.get('name')}`}
                            </option>
                          ))}
                </select>
              </p>

              <p>
                Select the days you want to add the study time to:
                <br />
                <input type="checkbox" name="classDays" value="Monday" checked={newStudyTime.days.includes('Monday')} onChange={onCheckboxChange}/> Monday
                <br />
                <input type="checkbox" name="classDays" value="Tuesday" checked={newStudyTime.days.includes('Tuesday')} onChange={onCheckboxChange}/> Tuesday
                <br />
                <input type="checkbox" name="classDays" value="Wednesday" checked={newStudyTime.days.includes('Wednesday')} onChange={onCheckboxChange}/> Wednesday
                <br />
                <input type="checkbox" name="classDays" value="Thursday" checked={newStudyTime.days.includes('Thursday')} onChange={onCheckboxChange}/> Thursday
                <br />
                <input type="checkbox" name="classDays" value="Friday" checked={newStudyTime.days.includes('Friday')} onChange={onCheckboxChange}/> Friday
                <br />
                <input type="checkbox" name="classDays" value="Saturday" checked={newStudyTime.days.includes('Saturday')} onChange={onCheckboxChange}/> Saturday
                <br />
                <input type="checkbox" name="classDays" value="Sunday" checked={newStudyTime.days.includes('Sunday')} onChange={onCheckboxChange}/> Sunday
              </p>
              <input type="submit" value="Submit" onClick={onClick}/>
        </form>
        {/* Display status message */}
        {status && <p>{status}</p>}
      </div>
        </>
      );
    };




export default AddStudyTimeForm;