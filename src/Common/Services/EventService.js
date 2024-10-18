import Parse from 'parse';


// const CLASS_SCHEDULE = 'test';
const CLASS_SCHEDULE = 'Event';

export const createEvent = (name, code, time, building, days, room, instructor) => {
  //console.log("Creating: ", name);
  const Event = Parse.Object.extend(CLASS_SCHEDULE);
  const event = new Event();
  // using setter to UPDATE the object
  event.set("name", name);
  event.set('code', code);
  event.set("time", time);
  event.set('building', building);
  event.set("days", days);
  event.set('room', room);
  event.set("instructor", instructor);

  return event.save().then((result) => {
    // returns new Lesson object
    return result;
  });
};


export const createClass = (code, name, instructor, building, room, time, days) => {
  const Class = Parse.Object.extend('Event'); // Change 'Class' to your class name in Back4App
  const newClass = new Class();

  // const Building = Parse.Object.extend('Building'); // Change 'Building' to your building class name
  // const query = new Parse.Query(Building);
  
  // // Assuming buildingName is the name of the building you want to set as a pointer
  // query.equalTo('name', building); // Change 'name' to the field you are querying by
  
  // try {
  //   const buildingObject = await query.first(); // Fetch the building object

  //   if (!buildingObject) {
  //     throw new Error(`Building "${building}" not found.`);
  //   }


  try {
    const buildingPointer = { __type: 'Pointer', className: 'Building', objectId: building };

    newClass.set('code', code);
    newClass.set('name', name);
    newClass.set('instructor', instructor);
    newClass.set('building', buildingPointer);
    newClass.set('room', room);
    newClass.set('time', time);
    newClass.set('days', days);

    return newClass.save().then((result) => {
      // After saving the new class, fetch it including the building pointer
      const classQuery = new Parse.Query(Class);
      classQuery.include('building'); // Include the building pointer

      return classQuery.get(result.id).then((fetchedClass) => {
        return fetchedClass; // This will include the building details
      });
    });

  } catch (error) {
    throw new Error(`Failed to create class: ${error.message}`);
  }
};




export const removeClass = (classCode) => {
	try {
	  const query = new Parse.Query('Event'); // Adjust 'Class' to your Parse class name.
	  query.get(classCode).then((event) => {
      event.destroy();
    });
	  return `Class with code ${classCode} removed successfully.`;
	} catch (error) {
	  console.error('Error while removing class:', error);
	  return `Failed to remove class: ${error.message}`;
	}
};
  


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



// export const getSchedule = async () => {
//   const query = new Parse.Query(CLASS_SCHEDULE);

//   try {
//     const results = await query.find();
//     return results.map(result => ({
//       id: result.id,
//       code: result.get('code'),
//       name: result.get('name'),
//       instructor: result.get('instructor'),
//       time: result.get('time'),
//       days: result.get('days'),
//       building: result.get('building'),
//       coords: result.get('coords'),
//       room: result.get('room'),
//     }));
//   } catch (error) {
//     console.error('Error while fetching schedule:', error.message || error);
//     throw error;
//   }
// };

export const getStartEnd = (classes) => {

  const Event = Parse.Object.extend(CLASS_SCHEDULE);
  const query = new Parse.Query(Event);

  query.include("building");
  query.equalTo("name", "Day Start/End");

  return query.find()
    .then((results) => {
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

export const getNextClass = async (classes) => {
  const currentDate = new Date();

  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" });
  const currentTime = currentDate.toTimeString().slice(0, 5);


  let dayEvents = classes
    .filter((c) => c.get('days').some((d) => d === currentDay))
    .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time')));
  
  let nextClass, comingFrom;

  if (dayEvents.length === 0 || (dayEvents.length > 0 && dayEvents[dayEvents.length - 1].get('time').substring(6, 11) < currentTime)) {
    let dayInc = 1;

    do {
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" });
      dayEvents = [...classes
        .filter((c) => c.get('days').some((d) => d === nextDay))
        .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time')))];
      dayInc++;
    } while (dayEvents.length === 0 && dayInc <= 7);

    if (dayEvents.length > 0) {
      nextClass = dayEvents[0];
    }

    //if there is a next class, the coming from will be where the day is started, since it will
    //be the first class of the day
    if (nextClass) {
      comingFrom = "startEnd";
    }

  } else {
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


  return [comingFrom, nextClass];
};


