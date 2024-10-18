import React from 'react';

const getStartTime = (time) =>
  parseInt(time.split("-")[0].replace(":", ""), 10);


//component that displays the location of a user's event/class and allows a 
//user to display the location of any of their events
const EventMap = ({ classes, selectedMapId, selectFunction }) => {
  return (
    <div>
      <p>Select Event to Display</p>

      <select id="classSelect" className="classSelect" onChange={selectFunction}>
        {/* create a dropdown option for every event in a user's schedule */}
        <option value="next">Next Event</option>
        {classes.length > 0 &&
          classes
            .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time')))
            .map((c) => (
              <option key={c.id} value={c.get('building').get('mapId')}>
                {`${c.get('name')} - ${c.get('building').get('name')} ${c.get('room')} (${c.get('days')} | ${c.get('time')})`}
              </option>
            ))}
      </select>

      {/* embedded map from google maps that displays an event's location */}
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1814.7798247622434!2d-86.23881703909602!3d41.70043978720793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${selectedMapId}!2sNotre%20Dame%2C%20IN%2046556!5e0!3m2!1sen!2sus!4v1727830026873!5m2!1sen!2sus`}
        title="Event Map"
        height="450"
        style={{ border: 0, padding: '10px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default EventMap;