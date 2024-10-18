import Parse from 'parse';

export let Buildings = {};
Buildings.collection = [];

// READ operation - get all events in Parse class Building
export const getAllBuildings = () => {
  const Building = Parse.Object.extend('Building');
  const query = new Parse.Query(Building);

  return query
    .find()
    .then((results) => {

      // returns array of Lesson objects
      return results;
    })
    .catch((error) => {
      console.log("error: ", error);
    });
};