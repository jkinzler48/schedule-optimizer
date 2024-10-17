import Parse from 'parse';

export const createClass = async (code, name, instructor, building, room, time, days) => {
  const Class = Parse.Object.extend('Event'); // Change 'Class' to your class name in Back4App
  const newClass = new Class();

  const Building = Parse.Object.extend('Building'); // Change 'Building' to your building class name
  const query = new Parse.Query(Building);
  
  // Assuming buildingName is the name of the building you want to set as a pointer
  query.equalTo('name', building); // Change 'name' to the field you are querying by
  
  try {
    const buildingObject = await query.first(); // Fetch the building object

    if (!buildingObject) {
      throw new Error(`Building "${building}" not found.`);
    }


  newClass.set('code', code);
  newClass.set('name', name);
  newClass.set('instructor', instructor);
  newClass.set('building', buildingObject);
  newClass.set('room', room);
  newClass.set('time', time);
  newClass.set('days', days);

	console.log(newClass);
    const savedClass = newClass.save();
	return savedClass
  } catch (error) {
    throw new Error(`Failed to create class: ${error.message}`);
  }
};

export default createClass;