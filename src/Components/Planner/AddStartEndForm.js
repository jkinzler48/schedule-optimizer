import React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

const AddStartEndForm = ({ events, buildings, onChange, onClick, autoCompleteValue, status }) => {
    return (
        <div className="section">
          {/* check if a start/ending location has already been specified by the user. If it has, then don't let them create a new one */}
          {events && events.find((e) => e.get('code') === 'START/END') ? (
            <p>
              You have selected a Starting/Ending location. In order to change your Starting/Ending Location, you must remove the existing one from your schedule
              using the "Remove Event from Schedule" section below.

            </p>
          ) : (
            <>
              {status && <p>{status}</p>}
              <h4>Select Starting/Ending Location for your day.</h4>
              <form>
                {buildings.length > 0 &&
                    //* //* Create a autocomplete option for every building, where the buildings are sorted in alphabetical order  */}
                    <Autocomplete
                       value={autoCompleteValue}
                      onChange={onChange}
                      className="autocomplete"
                      disablePortal
                      options={buildings
                        .sort((a, b) => a.get('name').localeCompare(b.get('name')))
                        .map((b) => ({ name: b.get('name'), id: b.id }))}
                      sx ={{width: 350}}
                      getOptionLabel={(option) => option.name} // Display the name as the label
                      renderInput={(params) => <TextField {...params} label="Select Location" />}
                    />
                  }
                <br />
                <br />
                <button type="submit" onClick={onClick}>
                  Submit
                </button>
              </form>
            </>
          )}
        </div>
      );
    };

export default AddStartEndForm;
