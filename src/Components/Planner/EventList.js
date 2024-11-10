import React from 'react';
import { displayTime } from '../../Common/Services/EventService';


const EventList = ({ events, day, selectFunction }) => {
  return (
    <>
        <div className="section">
            This is your schedule for the selected day.
            <select id="daySelect" className="daySelect" onChange={selectFunction} value={day}>
                <option value="Today">Today</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="All Days">All Days</option>
            </select>
            <h4>{day}'s Schedule</h4>
            <ol className="eventList">
                {/* if All days option is selected, then display all events for user in order of start time */}
                {day === "All Days" ? (
                  <>
                    {events.length === 0 ? 
                    (
                      <p>No Events are on your schedule fo any day.</p>
                    ) : (
                    events
                        .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))
                        .map((c) => (
                        <li key={c.id}>
                            {c.get('name')} ({c.get('building').get("name")})  
                            <br />
                            {displayTime(c)} | {c.get('days').join(', ')}
                        </li>
                        ))
                    )}
                  </> 
                ) : ( 
                  // if an option other than "All Days" is selected, then only display events for that day
                  <> 
                    {events.filter((c) => c.get('days').some((d) => d === day)).length === 0 ? 
                    (
                      <p>Nothing scheduled for {day}.</p>
                    ) : (
                    events
                        .filter((c) => c.get('days').some((d) => d === day))
                        .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))
                        .map((c) => (
                        <li key={c.id}>
                            {c.get('name')} ({c.get('building').get("name")})  
                            <br />
                            {displayTime(c)} | {c.get('days').join(', ')}
                        </li>
                        ))
                    )}
                  </>
                )
              }
            </ol>
        </div>
    </>
  );
};


export default EventList;
