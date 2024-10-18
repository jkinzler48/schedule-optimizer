import React from 'react';


const AddStartEndForm = ({ events, buildings, onChange, onClick }) => {
    return (
        <div>
          {/* check if a start/ending location has already been specified by the user. If it has, then don't let them create a new one */}
          {events && events.find((e) => e.get('code') === 'START/END') ? (
            <p>
              You have selected a Starting/Ending location. In order to change your Starting/Ending Location, you must remove the existing one from your schedule.
            </p>
          ) : (
            <>
              <h4>Select Starting/Ending Location for your day.</h4>
              <form>
                {/* dropdown with an option for every Building (in alphabetical order) that is either a dorm or parking lot*/}
                <select id="addStartSelect" className="classSelect" onChange={onChange}>
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
