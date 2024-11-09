import React from 'react';

const getStartTime = (time) =>
  parseInt(time.split('-')[0].replace(':', ''), 10);

const EventList = ({ classes, day, selectFunction }) => {
  return (
    <>
        <div>
            This is your schedule for the selected day.
            <select id="daySelect" className="daySelect" onChange={selectFunction}>
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
            <ol>
                {/* if All days option is selected, then display all classes for user in order of start time */}
                {day === "All Days" ? (
                  <>
                    {classes.length === 0 ? 
                    (
                      <p>No Events are on your schedule for any day.</p>
                    ) : (
                    classes
                        .sort((a, b) => a.get('time').localeCompare(b.get('time')))
                        .map((c) => (
                        <li key={c.id}>
                            {c.get('time')} | {c.get('days').join('/')} | {c.get('name')} ({c.get('building').get("name")} )
                        </li>
                        ))
                    )}
                  </> 
                ) : ( 
                  // if an option other than "All Days" is selected, then only display events for that day
                  <> 
                    {classes.filter((c) => c.get('days').some((d) => d === day)).length === 0 ? 
                    (
                      <p>Nothing scheduled for {day}.</p>
                    ) : (
                    classes
                        .filter((c) => c.get('days').some((d) => d === day))
                        .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time'))) // Sort by start time
                        .map((c) => (
                        <li key={c.id}>
                            {c.get('time')} | {c.get('name')} ({c.get('building').get("name")})
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
