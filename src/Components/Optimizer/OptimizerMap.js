import React from 'react';

const OptimizerMap = ({prevClass, nextClass}) => {
  return (
    <div>
      <h4>
        {(!nextClass)
            ? "You do not have any events scheduled."
            :nextClass.get('name') === 'Day Start/End'
              ? `Your Next Event is: ${nextClass.get('name')} (${nextClass.get('building').get('name')})`
              : `Your Next Event is: ${nextClass.get('name')} in ${nextClass.get('building').get('name')} ${nextClass.get('room')} at ${nextClass.get('time')} (${nextClass.get('days').join(', ')})`
          }
        <br />
        <br />
          {(!prevClass)
          ? ""
            : prevClass.get('name') === 'Day Start/End'
              ? `You are coming from: ${prevClass.get('name')} (${prevClass.get('building').get('name')})`
              : `You are coming from: ${prevClass.get('name')} in ${prevClass.get('building').get('name')} ${prevClass.get('room')} at ${prevClass.get('time')} (${prevClass.get('days').join(', ')})`
          }
      </h4>
      {nextClass && prevClass &&
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1931.525900232736!2d-86.24077303266317!3d41.70281405558702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s${prevClass.get('building').get('mapId')}!2sBasilica%20of%20the%20Sacred%20Heart%2C%20Basilica%20Dr%2C%20Notre%20Dame%2C%20IN!3m2!1d41.7026336!2d-86.23978559999999!4m5!1s${nextClass.get('building').get('mapId')}!2sThe%20Golden%20Dome%2C%20Main%20Building%2C%20Notre%20Dame%2C%20IN%2046556!3m2!1d41.7031329!2d-86.2389912!5e0!3m2!1sen!2sus!4v1728877947525!5m2!1sen!2sus`}
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