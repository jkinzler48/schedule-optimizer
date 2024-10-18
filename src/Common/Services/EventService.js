import Parse from 'parse';


// const CLASS_SCHEDULE = 'test';
const CLASS_SCHEDULE = 'Event';


//CREATE: function to create a new Event in the parse class
export const createClass = (code, name, instructor, building, room, time, days) => {
  const Class = Parse.Object.extend('Event'); // Change 'Class' to your class name in Back4App
  const newClass = new Class();

  try {

    //the building input is the id for a Building Parse Object, so classify it is a pointer for the new Event
    const buildingPointer = { __type: 'Pointer', className: 'Building', objectId: building };

    //set all attributes for hte new event
    newClass.set('code', code);
    newClass.set('name', name);
    newClass.set('instructor', instructor);
    newClass.set('building', buildingPointer);
    newClass.set('room', room);
    newClass.set('time', time);
    newClass.set('days', days);

    return newClass.save().then((result) => {
      // After saving the new class, fetch it including the building pointer
      //so the building's attributes can be accessed by the new event added to the Events list
      const classQuery = new Parse.Query(Class);
      classQuery.include('building'); 
      return classQuery.get(result.id).then((fetchedClass) => {
        //return the newClass with information about its building included
        return fetchedClass;
      });
    });

  } catch (error) {
    throw new Error(`Failed to create class: ${error.message}`);
  }
};



//DELETE: function to remove an Event in the parse class
export const removeClass = (classCode) => {
  //class code input is the id for the Event Parse Object
	try {

    //find the Event Object wiht hte given id, and then delete it from the Database
	  const query = new Parse.Query('Event'); 
	  query.get(classCode).then((event) => {
      event.destroy();
    });
	  return `Class removed successfully.`;

	} catch (error) {
    //if the class with the given id can't be removed, then return error message
	  console.error('Error while removing class:', error);
	  return `Failed to remove class: ${error.message}`;
	}
};
  

//list of Events
export let Events = {};
Events.collection = [];

// READ operation - get all events in Parse class Lesson
export const getAllEvents = () => {
  const Event = Parse.Object.extend(CLASS_SCHEDULE);
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


//function that gets the event that starts/ends a day
export const getStartEnd = (classes) => {

  //query to database for an Event that has a name equal to "Day Start/End"
  const Event = Parse.Object.extend(CLASS_SCHEDULE);
  const query = new Parse.Query(Event);

  query.include("building");
  query.equalTo("name", "Day Start/End");

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



const parseTime = (time) => {
  const [start] = time.split("-");
  return parseInt(start.replace(":", ""), 10);
};


//function to get the next class in a schedule, and the event that occurs directly before it.
export const getNextClass = async (classes) => {

  let nextClass, comingFrom;

  //get current Day/Time
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
  const currentTime = currentDate.toTimeString().slice(0, 5);

  //get all events that occur today
  let dayEvents = classes
    .filter((c) => c.get('days').some((d) => d === currentDay))
    .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time')));

  //if there are no events today, or all events today have already ended, then the next event will occur on a differnet day
  if (dayEvents.length === 0 || (dayEvents.length > 0 && dayEvents[dayEvents.length - 1].get('time').substring(6, 11) < currentTime)) {
    
    let dayInc = 1;
    do {
      //increment the day until you find a day that has at least one class
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" });
      dayEvents = [...classes
        .filter((c) => c.get('days').some((d) => d === nextDay))
        .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time')))];
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
    while (i > 0 && dayEvents[i - 1].get('time').substring(0,5) > currentTime) {
      i--;
    }

    //if the next class is the first class of the day, comingFrom will be the start/end Location for the day
    if (i === 0) {
        comingFrom = "startEnd";
        nextClass = dayEvents[i];
    
    //if the next class is the last class of the day, nextClass will be the start/end Location for the day
    } else if (i < 0 || ((i === dayEvents.length - 1) && dayEvents[i].get('time').substring(0,5) < currentTime)) {
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


