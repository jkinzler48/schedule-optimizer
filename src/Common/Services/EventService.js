import Parse from 'parse';


// const CLASS_SCHEDULE = 'test';
const CLASS_SCHEDULE = 'Event';

export const addClass = async (code, name, instructor, time, days, building, coords, room) => {
  const ClassSchedule = new Parse.Object(CLASS_SCHEDULE);

  // Set attributes
  ClassSchedule.set({ code, name, instructor, time, days, building, coords, room });

  try {
    const savedClass = await ClassSchedule.save();
    console.log('Class added successfully:', savedClass);
    return savedClass;
  } catch (error) {
    console.error('Error while adding class:', error.message || error);
    throw error;
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

const parseTime = (time) => {
  const [start] = time.split("-");
  return parseInt(start.replace(":", ""), 10);
};

export const getNextClass = async (classes) => {
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
  const currentTime = currentDate.toTimeString().slice(0, 5);

  const dayEvents = classes
    .filter((c) => c.get('days').some((d) => d === currentDay.substring(0, 2)))
    .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time')));
  
  let nextClass;

  if (dayEvents.length === 0 || (dayEvents.length > 0 && dayEvents[dayEvents.length - 1].get('time').substring(6, 11) < currentTime)) {
    let dayInc = 1;

    do {
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
      dayEvents.push(...classes
        .filter((c) => c.get('days').some((d) => d === nextDay.substring(0, 2)))
        .sort((a, b) => parseTime(a.get('time')) - parseTime(b.get('time'))));
      dayInc++;
    } while (dayEvents.length === 0 && dayInc <= 7);

    if (dayEvents.length > 0) {
      nextClass = dayEvents[0];
    }
  } else {
    let i = dayEvents.length - 1;
    nextClass = dayEvents[i];
    while (i > 0 && dayEvents[i - 1].get('time').substring(6, 11) > currentTime) {
      i--;
      nextClass = dayEvents[i];
    }
  }
  
  return nextClass;
};
