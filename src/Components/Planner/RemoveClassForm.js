import React from 'react';
import { displayTime } from '../../Common/Services/EventService';



const RemoveClassForm = ({ events, selectedClass, onChange, onClick, status, formRef }) => {
    return (
        
      <div>
        <h4>Remove event from Schedule</h4>
        <form className="removeForm" id="removeForm" action="#stayhere">
          <p>Select class to remove:</p>
          <select 
            name="removes" 
            value={selectedClass} 
            onChange={onChange} 
            style={{ margin: '10px' }}
          >
            {/* Dropdown for no event selected */}
            <option value="none">Select Event to Remove</option>
      
            {/* Dropdown options for each class */}
            {events.length > 0 &&
              events
                .sort((a, b) => a.get('startTime') - b.get('startTime'))
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.get('name')} - {c.get('instructor')} ({c.get('days').join(', ')} | {displayTime(c)})
                  </option>
                ))}
            {/* Dropdown for all CLASSES selected */}
            {/* this is useful because it allows a user to clear their previously existing class schedule prior to 
            importing a new class schedule from NOVO */}
            <option value="allClasses">All Classes (Remove all CLASSES, not any Study Times or other events)</option>
          </select>
      
          <br />
          <br />
          <br />
          <button type="submit" value="Submit" onClick={onClick}>Submit</button>
          
          {/* Display status message */}
          {status && <p>{status}</p>}
        </form>
      </div>
    
      );
    };




export default RemoveClassForm;