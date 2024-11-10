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

    //set all attributes for hte new event
    newEvent.set('code', code);
    newEvent.set('name', name);
    newEvent.set('instructor', instructor);
    newEvent.set('building', buildingPointer);
    newEvent.set('room', room);
    newEvent.set('startTime', startTime);
    newEvent.set('endTime', endTime);
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



//function to get the next class in a schedule, and the event that occurs directly before it.
export const getNextEvent = async (events) => {

  // Helper function to convert HH:MM string to minutes
  //so that times can be directly compared
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  let nextClass, comingFrom;

  //get current Day/Time
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
  const currentTime = currentDate.toTimeString().slice(0, 5);

  //get all events that occur today
  let dayEvents = events
    .filter((c) => c.get('days').some((d) => d === currentDay))
    .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))

  //if there are no events today, or all events today have already ended, then the next event will occur on a differnet day
  if (dayEvents.length === 0 || (dayEvents.length > 0 && timeToMinutes(dayEvents[dayEvents.length - 1].get('endTime')) < timeToMinutes(currentTime))) {
    
    let dayInc = 1;
    do {
      //increment the day until you find a day that has at least one class
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" });
      dayEvents = [...events
        .filter((c) => c.get('days').some((d) => d === nextDay))
        .sort((a, b) => a.get('startTime').localeCompare(b.get('startTime')))];
      dayInc++;
    } while (dayEvents.length === 0 && dayInc <= 7);

    //if there is ever a next class, then the next class will be the first class to occur on the day
    if (dayEvents.length > 0) {
      nextClass = dayEvents[0];
    }

    //if there is a next class, the coming from will be where the day is started, since it will
    //be the first class of the day
    if (nextClass) {
      comingFrom = "startEnd";
    }


  //if there is at least one class that has not ended today, then the next class or previous class will occur today
  } else {

    //find the index of the next/current event to occur 
    let i = dayEvents.length - 1;
    while (i > 0 && timeToMinutes(dayEvents[i - 1].get('startTime')) > timeToMinutes(currentTime)) {
      i--;
    }

    //if the next class is the first class of the day, comingFrom will be the start/end Location for the day
    if (i === 0) {
        comingFrom = "startEnd";
        nextClass = dayEvents[i];
    
    //if the next class is the last class of the day, nextClass will be the start/end Location for the day
    } else if (i < 0 || ((i === dayEvents.length - 1) && timeToMinutes(dayEvents[i].get('startTime')) < timeToMinutes(currentTime))) {
      comingFrom = dayEvents[dayEvents.length - 1];
      nextClass = "startEnd";

    } else {
      comingFrom = dayEvents[i - 1];
      nextClass = dayEvents[i];
    }

  }

  //return both the event that comes directly before the next class, and the next class
  return [comingFrom, nextClass];
};



//displays the time for an event based in 12 hour HH:MM AM/PM - HH:MM AM/PM
export const displayTime = (event) => {

  //internal function that returns a string in HH:MM AM/PM format for a singel time string
  const getString = (time) => {

      //if the time is either the start or end of day, then just return time
      //to handle the strings for Day Start/End event
      if (time === "Start of Day" || time === "End of Day") {
        return time;
      }

      //extract hours and minutes from time string
      //convert hours to a number so it can be compared, but keep minutes a string
      //so the mintues always appear as 2 digits
      let [hours, minutes] = time.split(':');
      hours = Number(hours);

      //if the hour is 12 AM or 12 PM
      if ((hours % 12) === 0) {
        return `12:${minutes} ${(hours === 0) ? 'AM' : 'PM'}`

      //if the hour is not 12 AM, but before 12 PM
      } else if (hours < 12) {
        return `${hours}:${minutes} AM`

      // if the hour is after 12 PM
      } else {
        return `${hours - 12}:${minutes} PM`
      }

  }

  return `${getString(event.get('startTime'))} - ${getString(event.get('endTime'))}`;
}