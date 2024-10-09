import axios from 'axios';

const APP_ID = '8zNslYsXGEbTSYz55lVFZy43rh5J1gAcblczxFJy';
const REST_API_KEY = '320VBitxSReVG5PhVaMvJ4nc0gXk8EHztw3mBi7h';

export const addClass = async (
  code,
  name,
  instructor,
  time,
  days,
  building,
  coords,
  room
) => {
  try {
    const response = await axios.post('https://parseapi.back4app.com/Classes/test', {
      code,
      name,
      instructor,
      time,
      days,
      building,
      coords,
      room,
    }, {
      headers: {
        "Content-Type": "application/json",
        "X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": REST_API_KEY,
      },
    });
    console.log("POST response: ", response);
    return response.data; // Return the response data if needed
  } catch (err) {
    console.error("POST error: ", err);
    throw err; // Rethrow the error for handling in the component
  }
};

// Custom service
export const getSchedule = async () => {
	try {
		const response = await axios.get('https://parseapi.back4app.com/Classes/test', {
		  headers: {
			"X-Parse-Application-Id": APP_ID,
			"X-Parse-REST-API-Key": REST_API_KEY,
		  },
		});
		return response.data.results;  // Back4App stores results in a "results" array
	  } catch (err) {
		console.error("GET Error: ", err);
		throw err;
	  }
	};




//   try {
//     const response = await axios.get("./Services/data.json");
//     return response.data; // Return the schedule data
//   } catch (err) {
//     console.error("GET Error: ", err);
//     throw err; // Rethrow the error for handling in the component
//   }
// };

export const getNextClass = (classes) => {
  // Callback function that gets the start time based on a time in HH:MM-HH:MM format
  const getStartTime = (time) =>
    parseInt(time.split("-")[0].replace(":", ""), 10);

  return new Promise((resolve, reject) => {
    const currentDate = new Date();
    const currentDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
    const currentTime = currentDate.toTimeString().slice(0, 5);

    // Gets classes for the current day in sorted order
    let dayEvents = classes
      .filter((c) => c.days.includes(currentDay.substring(0, 2)))
      .sort((a, b) => getStartTime(a.time) - getStartTime(b.time));

    let nextClass;

    // If there are no events today
    if (dayEvents.length === 0 || dayEvents[dayEvents.length - 1].time.substring(6, 11) < currentTime) {
      let dayInc = 1;
      do {
        currentDate.setDate(currentDate.getDate() + 1);
        const nextDay = currentDate.toLocaleString("en-US", { weekday: "long" }).slice(0, 2);
        dayEvents = classes
          .filter((c) => c.days.includes(nextDay))
          .sort((a, b) => getStartTime(a.time) - getStartTime(b.time));
        dayInc += 1;
      } while (dayEvents.length === 0 && dayInc <= 7);

      // Set nextClass equal to the first class on the first day with an event
      if (dayEvents.length > 0) {
        nextClass = dayEvents[0];
      }
    } else {
      // Iterate over classes today to find the next class
      let i = dayEvents.length - 1;
      nextClass = dayEvents[i];
      while (i > 0 && dayEvents[i - 1].time.substring(6, 11) > currentTime) {
        i -= 1;
        nextClass = dayEvents[i];
      }
    }

    resolve(nextClass);
  });
};
