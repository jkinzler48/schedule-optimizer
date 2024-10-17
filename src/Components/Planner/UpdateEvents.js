import React from 'react';

const getStartTime = (time) =>
  parseInt(time.split('-')[0].replace(':', ''), 10);

const UpdateEvents = ({ classes }) => {
  return (
    <>
      <div>
        <h4>Add class to Schedule</h4>
        <p>Enter Information for class to add:</p>
        <form className="addForm" id="addForm" action="#stayhere">
          <label htmlFor="codeInput">Class Code: </label>
          <input type="text" id="codeInput" className="addClass" placeholder="XYZ 12345" required />
          <br />
          <label htmlFor="nameInput">Class Name: </label>
          <input type="text" id="nameInput" className="addClass" placeholder="Name" required />
          <br />
          <label htmlFor="instructorInput">Instructor Name: </label>
          <input type="text" id="instructorInput" className="addClass" placeholder="Instructor" required />
          <br />
          <label htmlFor="buildingInput">Building: </label>
          <input type="text" id="buildingInput" className="addClass" placeholder="Building Name" required />
          <br />
          <label htmlFor="roomInput">Room: </label>
          <input type="text" id="roomInput" className="addClass" placeholder="123" required />
          <br />
          <label htmlFor="timeInput">Enter Time in 24hr format: </label>
          <input type="text" id="timeInput" className="addClass" placeholder="HH:MM-HH:MM" required />
          <br />
          <p>
            Select the days the class is held on:
            <br />
            <input type="checkbox" name="classDays" value="Mo" /> Monday
            <br />
            <input type="checkbox" name="classDays" value="Tu" /> Tuesday
            <br />
            <input type="checkbox" name="classDays" value="We" /> Wednesday
            <br />
            <input type="checkbox" name="classDays" value="Th" /> Thursday
            <br />
            <input type="checkbox" name="classDays" value="Fr" /> Friday
            <br />
            <input type="checkbox" name="classDays" value="Sa" /> Saturday
            <br />
            <input type="checkbox" name="classDays" value="Su" /> Sunday
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div>
        <h4>Remove event from Schedule</h4>
        <form className="removeFrom" id="removeForm" action="#stayhere" style={{ margin: '10px' }}>
          <p>Select class to remove:</p>
          <input type="radio" name="removes" value="none" style={{ margin: '10px' }} defaultChecked />
          I don't want to drop any classes
          <br />
          {/* Creates radio button option for every class in the classes list */}
          {classes.length > 0 &&
            classes
              .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time')))
              .map((c) => (
                <div key={c.get('code')}>
                  <input
                    type="radio"
                    name="removes"
                    value={c.get('code')}
                    style={{ margin: '10px' }}
                  />
                  {c.get('name')} - {c.get('instructor')} ({c.get('days').join(', ')} | {c.get('time')})
                  <br />
                </div>
              ))}
          <input type="submit" value="Submit" />
        </form>
      </div>

      <div>
        <h4>Add study time to Schedule</h4>
        <form className="studyForm" id="studyForm" action="#stayhere">
          <p>How much study time do you want to add?</p>
          <p>
            <select id="studyLengthSelect" className="studyLengthSelect">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="75">1 hour 15 minutes</option>
              <option value="90">1 hour 30 minutes</option>
              <option value="105">1 hour 45 minutes</option>
              <option value="120">2 hours</option>
            </select>
          </p>
          <p>Where would you like to study?</p>
          <p>
            <input type="text" id="studyBuilding" placeholder="Enter Building Name" required />
          </p>
          <p id="daysInput">
            Select the days you want to add the study time to:
            <br />
            <input type="checkbox" name="studyDays" value="Mo" /> Monday
            <br />
            <input type="checkbox" name="studyDays" value="Tu" /> Tuesday
            <br />
            <input type="checkbox" name="studyDays" value="We" /> Wednesday
            <br />
            <input type="checkbox" name="studyDays" value="Th" /> Thursday
            <br />
            <input type="checkbox" name="studyDays" value="Fr" /> Friday
            <br />
            <input type="checkbox" name="studyDays" value="Sa" /> Saturday
            <br />
            <input type="checkbox" name="studyDays" value="Su" /> Sunday
          </p>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
};

export default UpdateEvents;