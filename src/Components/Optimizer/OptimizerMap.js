import React from 'react';
import { displayTime } from '../../Common/Services/EventService';


// component that tells a user what their next event is, where they will be coming from
// and shows directions between them
const OptimizerMap = ({prevEvent, nextEvent, startEnd}) => {
  return (
    <div className='section'>
      <h4>

        {/* if user has not selected a location where they start/end their day, inform them and 
        reccommend they add one */}
        {!startEnd && (
          <>
            <p>You have not selected a Starting/Ending location for your day. Please visit the Planner page to add a Starting/Ending location to your schedule.</p>
          </>
        )}

        {/* shows user their next event */}
        {(!nextEvent)
            ? "You do not have any events scheduled."
            : nextEvent.get('name') === 'Day Start/End'
              ? `Your Next Event is: ${nextEvent.get('name')} (${nextEvent.get('building').get('name')})`
              : `Your Next Event is: ${nextEvent.get('name')} in ${nextEvent.get('building').get('name')} ${nextEvent.get('room')} at ${displayTime(nextEvent)} (${nextEvent.get('days').join(', ')})`
        }
        <br />
        <br />

        {/* shows teh user where they will be coming from for their next event */}
        {(!prevEvent)
          ? ""
            : prevEvent.get('name') === 'Day Start/End'
              ? `You are coming from: ${prevEvent.get('name')} (${prevEvent.get('building').get('name')})`
              : `You are coming from: ${prevEvent.get('name')} in ${prevEvent.get('building').get('name')} ${prevEvent.get('room')} at ${displayTime(prevEvent)} (${prevEvent.get('days').join(', ')})`
          }
      </h4>

      {/* embedded directions from Google Maps that shows how to get to user's next event from where they are coming from */}
      {nextEvent && prevEvent &&
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1931.525900232736!2d-86.24077303266317!3d41.70281405558702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s${prevEvent.get('building').get('mapId')}!2sBasilica%20of%20the%20Sacred%20Heart%2C%20Basilica%20Dr%2C%20Notre%20Dame%2C%20IN!3m2!1d41.7026336!2d-86.23978559999999!4m5!1s${nextEvent.get('building').get('mapId')}!2sThe%20Golden%20Dome%2C%20Main%20Building%2C%20Notre%20Dame%2C%20IN%2046556!3m2!1d41.7031329!2d-86.2389912!5e0!3m2!1sen!2sus!4v1728877947525!5m2!1sen!2sus`}
        title="Optimizer
         Map"
        height="450"
        style={{ border: 0, padding: '10px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>}
    </div>
  );
};

export default OptimizerMap;