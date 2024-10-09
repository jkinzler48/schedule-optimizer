import React from 'react';

const getStartTime = (time) =>
  parseInt(time.split("-")[0].replace(":", ""), 10);

const Optimizer = ({ classes, nextClass, selectedMapId, selectFunction }) => {
  return (
    <div>
      <h4>
        {classes.length === 0
          ? "You do not have any classes scheduled."
          : `Your Next Event is ${nextClass.name} in ${nextClass.building} ${nextClass.room} at ${nextClass.time} (${nextClass.days})`}
      </h4>
      <p>Select Event to Display</p>
      <select id="classSelect" className="classSelect" onChange={selectFunction}>
        <option value="next">Next Event</option>
        {classes.length > 0 &&
          classes
            .sort((a, b) => getStartTime(a.time) - getStartTime(b.time))
            .map((c) => (
              <option key={c.mapId} value={c.mapId}>
                {`${c.name} - ${c.building} ${c.room} (${c.days} | ${c.time})`}
              </option>
            ))}
      </select>
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1814.7798247622434!2d-86.23881703909602!3d41.70043978720793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${selectedMapId}!2sNotre%20Dame%2C%20IN%2046556!5e0!3m2!1sen!2sus!4v1727830026873!5m2!1sen!2sus`}
        height="450"
        style={{ border: 0, padding: '10px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default Optimizer;
