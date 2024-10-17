import React from 'react';

const getStartTime = (time) =>
  parseInt(time.split('-')[0].replace(':', ''), 10);

const EventList = ({ classes, day, selectFunction }) => {
  return (
    <>
        <div>
            This is your class schedule for the selected day.
            <select id="daySelect" className="daySelect" onChange={selectFunction}>
                <option value="Today">Today</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
            </select>
            <h4>{day}'s Schedule</h4>
            <ol>
                {/* Displays all classes that occur on selected day */}
                {classes.filter((c) => c.get('days').some((d) => d === day)).length === 0 ? (
                <p>Nothing scheduled for {day}.</p>
                ) : (
                classes
                    .filter((c) => c.get('days').some((d) => d === day))
                    .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time'))) // Sort by start time
                    .map((c) => (
                    <li key={c.get('code')}>
                        {c.get('time')} | {c.get('name')} ({c.get('building').get("name")})
                    </li>
                    ))
                )}
            </ol>
				
        </div>
    </>
  );
};


export default EventList;
