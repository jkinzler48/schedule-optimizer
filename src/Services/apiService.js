import Parse from 'parse';

// Initialize Parse
Parse.initialize("8zNslYsXGEbTSYz55lVFZy43rh5J1gAcblczxFJy", "z65bQOfZOLeIblbRRXbXX9w7HYgwK1pLbSi87L3n");
Parse.serverURL = 'https://parseapi.back4app.com';

const CLASS_SCHEDULE = 'test';

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

export const getSchedule = async () => {
  const query = new Parse.Query(CLASS_SCHEDULE);

  try {
    const results = await query.find();
    return results.map(result => ({
      id: result.id,
      code: result.get('code'),
      name: result.get('name'),
      instructor: result.get('instructor'),
      time: result.get('time'),
      days: result.get('days'),
      building: result.get('building'),
      coords: result.get('coords'),
      room: result.get('room'),
    }));
  } catch (error) {
    console.error('Error while fetching schedule:', error.message || error);
    throw error;
  }
};

const parseTime = (time) => {
  const [start] = time.split("-");
  return parseInt(start.replace(":", ""), 10);
};

export const getNextClass = async (classes) => {
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
  const currentTime = currentDate.toTimeString().slice(0, 5);

  const dayEvents = classes
    .filter((c) => c.days.includes(currentDay.substring(0, 2)))
    .sort((a, b) => parseTime(a.time) - parseTime(b.time));

  let nextClass;

  if (dayEvents.length === 0 || (dayEvents.length > 0 && dayEvents[dayEvents.length - 1].time.substring(6, 11) < currentTime)) {
    let dayInc = 1;

    do {
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
      dayEvents.push(...classes
        .filter((c) => c.days.includes(nextDay))
        .sort((a, b) => parseTime(a.time) - parseTime(b.time)));
      dayInc++;
    } while (dayEvents.length === 0 && dayInc <= 7);

    if (dayEvents.length > 0) {
      nextClass = dayEvents[0];
    }
  } else {
    let i = dayEvents.length - 1;
    nextClass = dayEvents[i];
    while (i > 0 && dayEvents[i - 1].time.substring(6, 11) > currentTime) {
      i--;
      nextClass = dayEvents[i];
    }
  }

  return nextClass;
};


















// import axios from 'axios';
// import Parse from 'parse';

// Parse.initialize("8zNslYsXGEbTSYz55lVFZy43rh5J1gAcblczxFJy", "z65bQOfZOLeIblbRRXbXX9w7HYgwK1pLbSi87L3n");  // Replace with your App ID and JS Key
// Parse.serverURL = 'https://parseapi.back4app.com/';

// export const addClass = async (
//   code,
//   name,
//   instructor,
//   time,
//   days,
//   building,
//   coords,
//   room
// ) => {
// 	const ClassSchedule = new Parse.Object('test'); // Replace 'ClassSchedule' with your collection name

//   ClassSchedule.set('code', code);
//   ClassSchedule.set('name', name);
//   ClassSchedule.set('instructor', instructor);
//   ClassSchedule.set('time', time);
//   ClassSchedule.set('days', days);
//   ClassSchedule.set('building', building);
//   ClassSchedule.set('coords', coords);
//   ClassSchedule.set('room', room);









//   try {
// 	const savedClass = await ClassSchedule.save();
//     console.log('Class added successfully:', savedClass);
//     return savedClass;
// 	} catch (error) {
//     console.error('Error while adding class:', error);
//     throw error;
//   }
// };




// //     const response = await axios.post('https://parseapi.back4app.com/Classes/test', {
// //       code,
// //       name,
// //       instructor,
// //       time,
// //       days,
// //       building,
// //       coords,
// //       room,
// //     }, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         "X-Parse-Application-Id": APP_ID,
// //         "X-Parse-REST-API-Key": REST_API_KEY,
// //       },
// //     });
// //     console.log("POST response: ", response);
// //     return response.data; // Return the response data if needed
// //   } catch (err) {
// //     console.error("POST error: ", err);
// //     throw err; // Rethrow the error for handling in the component
// //   }
// // };

// // Custom service
// export const getSchedule = async () => {
// 	const ClassSchedule = Parse.Object.extend('ClassSchedule'); // Replace 'ClassSchedule' with your collection name
// 	const query = new Parse.Query(ClassSchedule);

// 	try {
// 		const results = await query.find();
// 		return results.map(result => ({
// 			id: result.id,
// 			code: result.get('code'),
// 			name: result.get('name'),
// 			instructor: result.get('instructor'),
// 			time: result.get('time'),
// 			days: result.get('days'),
// 			building: result.get('building'),
// 			coords: result.get('coords'),
// 			room: result.get('room'),
// 		}));
// 	} catch (error) {
// 		console.error('Error while fetching schedule:', error);
// 		throw error;
// 	}




// 	// try {
// 	// 	const response = await axios.get('https://parseapi.back4app.com/Classes/test', {
// 	// 	  headers: {
// 	// 		"X-Parse-Application-Id": "8zNslYsXGEbTSYz55lVFZy43rh5J1gAcblczxFJy",
// 	// 		"X-Parse-REST-API-Key": "z65bQOfZOLeIblbRRXbXX9w7HYgwK1pLbSi87L3n",
// 	// 	  },
// 	// 	});
// 	// 	return response.data.results;  // Back4App stores results in a "results" array
// 	//   } catch (err) {
// 	// 	console.error("GET Error: ", err);
// 	// 	throw err;
// 	//   }





// 	};




// //   try {
// //     const response = await axios.get("./Services/data.json");
// //     return response.data; // Return the schedule data
// //   } catch (err) {
// //     console.error("GET Error: ", err);
// //     throw err; // Rethrow the error for handling in the component
// //   }
// // };

// export const getNextClass = (classes) => {





	
//   // Callback function that gets the start time based on a time in HH:MM-HH:MM format
//   const getStartTime = (time) =>
//     parseInt(time.split("-")[0].replace(":", ""), 10);

//   return new Promise((resolve, reject) => {
//     const currentDate = new Date();
//     const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
//     const currentTime = currentDate.toTimeString().slice(0, 5);

//     // Gets classes for the current day in sorted order
//     let dayEvents = classes
//       .filter((c) => c.days.includes(currentDay.substring(0, 2)))
//       .sort((a, b) => getStartTime(a.time) - getStartTime(b.time));

//     let nextClass;

//     // If there are no events today
//     if (dayEvents.length === 0 || dayEvents[dayEvents.length - 1].time.substring(6, 11) < currentTime) {
//       let dayInc = 1;
//       do {
//         currentDate.setDate(currentDate.getDate() + 1);
//         const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
//         dayEvents = classes
//           .filter((c) => c.days.includes(nextDay))
//           .sort((a, b) => getStartTime(a.time) - getStartTime(b.time));
//         dayInc += 1;
//       } while (dayEvents.length === 0 && dayInc <= 7);

//       // Set nextClass equal to the first class on the first day with an event
//       if (dayEvents.length > 0) {
//         nextClass = dayEvents[0];
//       }
//     } else {
//       // Iterate over classes today to find the next class
//       let i = dayEvents.length - 1;
//       nextClass = dayEvents[i];
//       while (i > 0 && dayEvents[i - 1].time.substring(6, 11) > currentTime) {
//         i -= 1;
//         nextClass = dayEvents[i];
//       }
//     }

//     resolve(nextClass);
//   });
// };
