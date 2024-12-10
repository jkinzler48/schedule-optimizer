import React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


//component for Add class and Add study time forms
const AddForm = ({ isClassForm, buildings, newEvent, onChange, onAutocompleteChange, onCheckboxChange, onClick, status, formRef, autoCompleteValue }) => {
    return (
        <>
          <div className="section">

            <form ref={formRef} className="addForm" id="addForm" action="#stayhere">
            
              {/* //fields to display for add class form, but not for study time form */}
              {isClassForm  ? (
                <>
                    <p>Enter Information for class to add:</p> 
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
                </>
              ) : (<></>)}

              {/* start/end time inputs */}
              <label htmlFor="startTime">Start Time: </label>
              <input type="time" id="startTime" name="startTime" className="addClass"onChange={onChange} required />
              <br />
              <label htmlFor="endTime">End Time: </label>
              <input type="time" id="endTime" name="endTime" className="addClass" onChange={onChange} required />
              <br />

              {/* //set the appropriate text based on if it is add class or add study form */}
              {isClassForm ? (
                <p>Select the Building where the class is located: </p>
              ) : (
                <p>Where would you like to study?</p>
              )}

              {/* //* Create a autocomplete option for every building, where the buildings are sorted in alphabetical order  */}
              <Autocomplete
                value={autoCompleteValue}
                onChange={onAutocompleteChange}
                className="autocomplete"
                options={buildings
                  .sort((a, b) => a.get('name').localeCompare(b.get('name')))
                  .map((b) => ({ name: b.get('name'), id: b.id }))}
                sx ={{width: 350}}
                getOptionLabel={(option) => option.name} // Display the name as the label
                renderInput={(params) => <TextField {...params} label="Select Location" />}
              />

              <p>
                 {/* //set the appropriate text based on if it is add class or add study form */}
                {isClassForm ? (
                    <>Select the days the class is held on:</>
                ) : (
                    <>Select the days you want to add the study time to:</>
                )}
                <br />
                {/* day checkbox input */}
                <input type="checkbox" name="classDays" value="Monday" checked={newEvent.days.includes('Monday')} onChange={onCheckboxChange}/> Monday
                <br />
                <input type="checkbox" name="classDays" value="Tuesday" checked={newEvent.days.includes('Tuesday')} onChange={onCheckboxChange}/> Tuesday
                <br />
                <input type="checkbox" name="classDays" value="Wednesday" checked={newEvent.days.includes('Wednesday')} onChange={onCheckboxChange}/> Wednesday
                <br />
                <input type="checkbox" name="classDays" value="Thursday" checked={newEvent.days.includes('Thursday')} onChange={onCheckboxChange}/> Thursday
                <br />
                <input type="checkbox" name="classDays" value="Friday" checked={newEvent.days.includes('Friday')} onChange={onCheckboxChange}/> Friday
                <br />
                <input type="checkbox" name="classDays" value="Saturday" checked={newEvent.days.includes('Saturday')} onChange={onCheckboxChange}/> Saturday
                <br />
                <input type="checkbox" name="classDays" value="Sunday" checked={newEvent.days.includes('Sunday')} onChange={onCheckboxChange}/> Sunday
              </p>
			        <Button tye="submit" variant="contained" onClick={onClick}>Submit</Button>
            </form>

            {/* Display status message */}
            {status && <p>{status}</p>}
          </div>
        </>
      );
    };

export default AddForm;