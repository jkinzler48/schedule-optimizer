import React, { useEffect, useState } from 'react';
import { getEventsByUser, getNextEvent, getStartEnd, Events } from "../../Common/Services/EventService.js";
import OptimizerMap from "./OptimizerMap.js";
import Header from '../Header/Header.js';
import EventDirections from './EventDirections.js';


//in the future, we will build out this section so that it provides recomendations to
//the user about their schedule. This may include recommendations such as what specific time
//they shoudl leave for a event or what specific supplies they should bring to a event
const Optimizer = () => {
  // Functions

  //dropdown functions for source and destination dropdown changes
  const onSourceChange = (e) => {
    let source = e.target.value;
     
    //set source equal to the id of the building for the event selected by the dropdown
    setSource(source);
  };

  const onDestinationChange = (e) => {
    let destination = e.target.value;
     
    //set destination equal to the id of the building for the eventselected by the dropdown
    setDestination(destination);
  };

  // Main component JSX
  function displayOptimizer() {
    return (
      <>
        <Header />
        <h1>Optimizer</h1>
        <div className="module">
          <OptimizerMap
            prevEvent={prevEvent}
            nextEvent={nextEvent}
            startEnd={startEnd}
          />
        </div>
        <div className="module">
          <h2>Display Directions Between Event Locations</h2>
          <EventDirections 
            events={events}
            source={source}
            destination={destination}
            sourceChange={onSourceChange}
            destChange={onDestinationChange}
          />
        </div>
      </>
    );
  }


  // Main code

  // initializes hooks for events and next/previous event to occur
  const [events, setSchedule] = useState([]);
  const [startEnd, setStartEnd] = useState(null);
  const [nextEvent, setNextEvent] = useState(null);
  const [prevEvent, setPrevEvent] = useState(null);

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");


// Fetch the schedule only once when the component mounts
useEffect(() => {
    if (Events.collection.length) {
      setSchedule(Events.collection);
    } else {
      getEventsByUser().then((events) => {
        setSchedule(events);
      });
    }
  }, []);


  //when events changes, set the starting/ending location
  useEffect(() => {
    getStartEnd(events).then((c) => {setStartEnd(c);});
  }, [events]);


  //when events is updated, set the source and destination for the events directions equal to the first event to keep the 
  //event directions consistent with the dropdown values
  useEffect(() => {
    if (events.length > 0) {
      let firstEvent = events.sort((a, b) => a.get('startTime') - b.get('startTime'))[0]
      setSource(firstEvent.get('building').get('mapId'));
      setDestination(firstEvent.get('building').get('mapId'));
    }
  }, [events]);


  // Determine the next event after the schedule is fetched
  // and the location/event the user will be coming from to get to their next event
  useEffect(() => {
    if (events.length) {
      getNextEvent(events).then((results) => {

        //if the user is coming from their starting/ending location, set their
        //previous event equal to this location for directions/optimzer purposes
        if (results[0] === "startEnd") {
          setPrevEvent(startEnd);
        } else {
          setPrevEvent(results[0]);
        }

        //if the user's next event is going to their starting/ending location, set their
        //next event equal to this location for directions/optimzer purposes
        if (results[1] === "startEnd") {
          setNextEvent(startEnd);
        } else {
          setNextEvent(results[1]);
        }

      });

    }
  }, [events, startEnd]);



  // return the JSX for the main component
  return displayOptimizer();
};


export default Optimizer;