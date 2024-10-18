import React from 'react';


const getStartTime = (time) =>
    parseInt(time.split('-')[0].replace(':', ''), 10);


const RemoveClassForm = ({ events, selectedClass, onChange, onClick, status, formRef }) => {
    return (
        
    <div>
        <h4>Remove event from Schedule</h4>
        <form className="removeForm" id="removeForm" action="#stayhere" style={{ margin: '10px' }}>
          <p>Select class to remove:</p>
          <input 
            type="radio" 
            name="removes" 
            value="none" 
            style={{ margin: '10px' }} 
            checked={selectedClass === 'none'}
            onChange={onChange}
          />
          I don't want to drop any classes
          <br />
          {/* Creates radio button option for every class in the classes list */}
          {events.length > 0 &&
            events
              .sort((a, b) => getStartTime(a.get('time')) - getStartTime(b.get('time')))
              .map((c) => (
                <span key={c.id}>
                  <input
                    type="radio"
                    name="removes"
                    value={c.id}
                    style={{ margin: '10px' }}
                    checked={selectedClass === c.id}
                    onChange={onChange}
                  />
                  {c.get('name')} - {c.get('instructor')} ({c.get('days').join(', ')} | {c.get('time')})
                  <br />
                </span>
              ))}
              <br />
          <button type="submit" value="Submit" onClick={onClick}>Submit</button>
          
          {/* Display status message */}
          {status && <p>{status}</p>}
        </form>
      </div>
      );
    };




export default RemoveClassForm;