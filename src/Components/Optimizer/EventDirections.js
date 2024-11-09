import React from 'react';
import { displayTime } from '../../Common/Services/EventService';


//HTML for Map component that allows user to select source and destination location
//on campus and provides an embedded Google Map with directions
export const EventDirections = ({ events, source, destination, sourceChange, destChange }) => {
  return (

    <div>
      <p>Select Source Event</p>
      {/* Create a dropdown option for every event, where the event are sorted in order of the time they start */}
      <select className="classSelect" onChange={sourceChange}>
      {events.length > 0 &&
          events
            .sort((a, b) => a.get('startTime') - b.get('startTime'))
            .map((c) => (
              <option key={c.id} value={c.get('building').get('mapId')}>
                {`${c.get('name')} - ${c.get('building').get('name')} ${c.get('room')} (${c.get('days')} | ${displayTime(c)})`}
              </option>
            ))}
      </select>


      <p>Select Destination Event</p>
      {/* Create a dropdown option for every event, where the event are sorted in order of the time they start */}
      <select className="classSelect" onChange={destChange}>
      {events.length > 0 &&
          events
            .sort((a, b) => a.get('startTime') - b.get('startTime'))
            .map((c) => (
              <option key={c.id} value={c.get('building').get('mapId')}>
                {`${c.get('name')} - ${c.get('building').get('name')} ${c.get('room')} (${c.get('days')} | ${displayTime(c)})`}
              </option>
            ))}
      </select>
      <br />

      {/* Embedded map from Google Maps that contains directions between selected events*/}
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1931.525900232736!2d-86.24077303266317!3d41.70281405558702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s${source}!2sBasilica%20of%20the%20Sacred%20Heart%2C%20Basilica%20Dr%2C%20Notre%20Dame%2C%20IN!3m2!1d41.7026336!2d-86.23978559999999!4m5!1s${destination}!2sThe%20Golden%20Dome%2C%20Main%20Building%2C%20Notre%20Dame%2C%20IN%2046556!3m2!1d41.7031329!2d-86.2389912!5e0!3m2!1sen!2sus!4v1728877947525!5m2!1sen!2sus`}
        title="Directions Map"
        height="450"
        style={{ border: 0, padding: '10px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

    </div>
  );
};

export default EventDirections;