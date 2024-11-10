import Parse from 'parse';


// const SCHEDULE = 'test';
const SCHEDULE = 'Event';


//CREATE: function to create a new Event in the parse class
export const createEvent = (code, name, instructor, building, room, startTime, endTime, days) => {
  const Event = Parse.Object.extend('Event');
  const newEvent = new Event();

  try {

    //get the current user
    const currentUser = Parse.User.current();

    //make sure current user exists
    if (!currentUser) {
      console.log('error: no current user')
      return
    }

    //create pointer to current user
    const userPointer = { __type: 'Pointer', className: '_User', objectId: currentUser.id };

    //the building input is the id for a Building Parse Object, so classify it is a pointer for the new Event
    const buildingPointer = { __type: 'Pointer', className: 'Building', objectId: building };

    //converts startTime from a string to a date
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const startDate = new Date(0,0,0, startHours, startMinutes);
 
     //converts endTime from a string to a date
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    const endDate = new Date(0,0,0, endHours, endMinutes);

    //set all attributes for hte new event
    newEvent.set('code', code);
    newEvent.set('name', name);
    newEvent.set('instructor', instructor);
    newEvent.set('building', buildingPointer);
    newEvent.set('room', room);
    newEvent.set('startTime', startDate);
    newEvent.set('endTime', endDate);
    newEvent.set('days', days);
    newEvent.set('user', userPointer)

    return newEvent.save().then((result) => {
      // After saving the new event, fetch it including the building pointer
      //so the building's attributes can be accessed by the new event added to the Events list
      const eventQuery = new Parse.Query(Event);
      eventQuery.include('building'); 
      return eventQuery.get(result.id).then((fetchedEvent) => {
        //return the newEvent with information about its building included
        return fetchedEvent;
      });
    });

  } catch (error) {
    throw new Error(`Failed to create Event: ${error.message}`);
  }
};



//DELETE: function to remove an Event in the parse class
export const removeEvent = (eventCode) => {
  //event code input is the id for the Event Parse Object
	try {

    //find the Event Object wiht hte given id, and then delete it from the Database
	  const query = new Parse.Query('Event'); 
	  query.get(eventCode).then((event) => {
      event.destroy();
    });
	  return `Event removed successfully.`;

	} catch (error) {
    //if the event with the given id can't be removed, then return error message
	  console.error('Error while removing event:', error);
	  return `Failed to remove event: ${error.message}`;
	}
};
  

//list of Events
export let Events = {};
Events.collection = [];

// READ operation - get all events in Parse class Lesson
export const getAllEvents = () => {
  const Event = Parse.Object.extend(SCHEDULE);
  const query = new Parse.Query(Event);

  query.include("building");

  return query
    .find()
    .then((results) => {
      // console.log("results: ", results);
      // returns array of Lesson objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};



// READ operation - get all objects in Parse class Event for the current user
export const getEventsByUser = () => {

  //get the current user
  const user = Parse.User.current();

  const Event = Parse.Object.extend(SCHEDULE);
  const query = new Parse.Query(Event);

  query.include("building");
  query.equalTo("user", user);

  return query
    .find()
    .then((results) => {
      // console.log("results: ", results);
      // returns array of Lesson objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};



//function that gets the event that starts/ends a day for current user
export const getStartEnd = (events) => {

  //get the current user
  const user = Parse.User.current();

  //query to database for an Event that has a name equal to "Day Start/End" and is
  //for the current user
  const Event = Parse.Object.extend(SCHEDULE);
  const query = new Parse.Query(Event);

  query.include("building");
  query.equalTo("name", "Day Start/End");
  query.equalTo("user", user);


  return query.find()
    .then((results) => {

      //if the starting/ending event exists, return it, otherwise return null
      if (results.length > 0) {
        return results[0];
      } else {
        return null;
      }

    })
    .catch((error) => {
      console.log("Error: ", error);
    });

}



//function to get the next event in a schedule, and the event that occurs directly before it.
export const getNextEvent = async (events) => {

  let nextEvent, comingFrom;

  //get current Day/Time
  const currentDate = new Date();

  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });

  //set current time equal to the actual current time, but at Date(0,0,0) for comparison
  const currentTime = new Date(0, 0, 0, currentDate.getHours(), currentDate.getMinutes());

  //get all events that occur today
  let dayEvents = events
    .filter((c) => c.get('days').some((d) => d === currentDay))
    .sort((a, b) => a.get('startTime') - b.get('startTime'));

  //if there are no events today, or all events today have already ended, then the next event will occur on a differnet day
  if (dayEvents.length === 0 || (dayEvents.length > 0 && dayEvents[dayEvents.length - 1].get('endTime') < currentTime)) {
    
    let dayInc = 1;
    do {
      //increment the day until you find a day that has at least one event
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" });
      dayEvents = [...events
        .filter((c) => c.get('days').some((d) => d === nextDay))
        .sort((a, b) => a.get('startTime') - b.get('startTime'))];
      dayInc++;
    } while (dayEvents.length === 0 && dayInc <= 7);

    //if there is ever a next event, then the next event will be the first event to occur on the day
    if (dayEvents.length > 0) {
      nextEvent = dayEvents[0];
    }

    //if there is a next event, the coming from will be where the day is started, since it will
    //be the first event of the day
    if (nextEvent) {
      comingFrom = "startEnd";
    }


  //if there is at least one event that has not ended today, then the next event or previous event will occur today
  } else {

    //find the index of the next/current event to occur 
    let i = dayEvents.length - 1;
    while (i > 0 && dayEvents[i - 1].get('startTime') > currentTime) {
      i--;
    }

    //if the next event is the first event of the day, comingFrom will be the start/end Location for the day
    if (i === 0) {
        comingFrom = "startEnd";
        nextEvent = dayEvents[i];
    
    //if the next event is the last event of the day, nextEvent will be the start/end Location for the day
    } else if (i < 0 || ((i === dayEvents.length - 1) && dayEvents[i].get('startTime')) < currentTime) {
      comingFrom = dayEvents[dayEvents.length - 1];
      nextEvent = "startEnd";

    } else {
      comingFrom = dayEvents[i - 1];
      nextEvent = dayEvents[i];
    }

  }

  //return both the event that comes directly before the next event, and the next event
  return [comingFrom, nextEvent];
};


//displays the time for an event based in 12 hour HH:MM - HH:MM
export const displayTime = (event) => {

  const parameters = { hour: '2-digit', minute: '2-digit', hour12: true };
  
  const startTime = event.get('startTime').toLocaleString('en-US', parameters);
  const endTime = event.get('endTime').toLocaleString('en-US', parameters);
  
  return `${startTime} - ${endTime}`;
}