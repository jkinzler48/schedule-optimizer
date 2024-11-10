import React from 'react';
import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';

//HTML for Map component that allows user to select source and destination location
//on campus and provides an embedded Google Map with directions
export const Map = ({ buildings, source, destination, sourceChange, destChange }) => {
  return (

    <div className='section'>
      <p>Select Source Location</p>
      {buildings.length > 0 &&
          //* Create a autocomplete option for every building, where the buildings are sorted in alphabetical order 
          <Autocomplete
            onChange={sourceChange}
            className="autocomplete"
            disablePortal
            options={buildings
              .sort((a, b) => a.get('name').localeCompare(b.get('name')))
              .map((b) => ({ name: b.get('name'), mapId: b.get('mapId') }))}
            getOptionLabel={(option) => option.name} // Display the name as the label
            renderInput={(params) => <TextField {...params} label="Select Location" />}
          />

      }

      <br />
      <br />
      
        <p>Select Destination Location</p>
        {buildings.length > 0 &&
          //* Create a autocomplete option for every building, where the buildings are sorted in alphabetical order 
          <Autocomplete
            onChange={destChange}
            className="autocomplete"
            disablePortal
            options={buildings
              .sort((a, b) => a.get('name').localeCompare(b.get('name')))
              .map((b) => ({ name: b.get('name'), mapId: b.get('mapId') }))}
            getOptionLabel={(option) => option.name} // Display the name as the label
            renderInput={(params) => <TextField {...params} label="Select Location" />}
          />

      }
    
      <br />

      {source && destination ? (
        //* Embedded map from Google Maps that contains directions between selected locations on campus */}
        <iframe
          src={`https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1931.525900232736!2d-86.24077303266317!3d41.70281405558702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s${source}!2sBasilica%20of%20the%20Sacred%20Heart%2C%20Basilica%20Dr%2C%20Notre%20Dame%2C%20IN!3m2!1d41.7026336!2d-86.23978559999999!4m5!1s${destination}!2sThe%20Golden%20Dome%2C%20Main%20Building%2C%20Notre%20Dame%2C%20IN%2046556!3m2!1d41.7031329!2d-86.2389912!5e0!3m2!1sen!2sus!4v1728877947525!5m2!1sen!2sus`}
          title="Directions Map"
          height="450"
          style={{ border: 0, padding: '10px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        >
        </iframe>
      ) : (
        // if a source or destination is not provided, display a map (wihtout directions) of Notre Dame as a default
        <>
          <h4>Select both a source and destination to display directions.</h4>
          
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.7101890836266!2d-86.23774042466196!3d41.705191671261254!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2sUniversity%20of%20Notre%20Dame!5e0!3m2!1sen!2sus!4v1731190863967!5m2!1sen!2sus" 
          title="Default Map"
          height="450"
          style={{ border: 0, padding: '10px' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </>
      )}
    
    </div>
  );
};

export default Map;