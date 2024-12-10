import React from 'react';
import { displayTime } from '../../Common/Services/EventService';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';



const RemoveEventForm = ({ events, selectedClass, onChange, onClick, status, formRef }) => {
    const options = [
		...events
		  .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))
		  .map((c) => ({
			label: `${displayTime(c)} | ${c.get('days').join(', ')} | ${c.get('name')} (${c.get('building').get('name')})`,
			value: c.id,
		  })),
		{ label: 'All Classes (Remove all CLASSES, not any Study Times or other events)', value: 'allClasses' },
	  ];

	const selectedOption = options.find((option) => option.value === selectedClass) || null;


    return (
        
      <div className="section">
        <h4>Remove event from Schedule</h4>
        <form className="removeForm" id="removeForm" action="#stayhere">
          <p>Select class to remove:</p>


		  <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={selectedOption}
          onChange={(event, newValue) => {
            onChange(newValue ? newValue.value : 'none');
          }}
          className="autocomplete"
          sx={{ width: 350 }}
          renderInput={(params) => <TextField {...params} label="Select Event to Remove" />}
          isOptionEqualToValue={(option, value) => option.value === value.value}
        />
      

          <br />
          {/* <button type="submit" value="Submit" onClick={onClick}>Submit</button> */}
          <Button variant="contained" onClick={onClick}>Submit</Button>
          
          {/* Display status message */}
          {status && <p>{status}</p>}
        </form>
      </div>
    
      );
    };




export default RemoveEventForm;