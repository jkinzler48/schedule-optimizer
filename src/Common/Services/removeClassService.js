import Parse from 'parse';
// import * as Env from "../../environments";


const removeClass = async (classCode) => {
	try {
	  const query = new Parse.Query('Event'); // Adjust 'Class' to your Parse class name.
	  query.equalTo('objectId', classCode); // Search for the class by its code.

	  const classObject = await query.first(); // Get the first matching class.
  
	  if (!classObject) {
		throw new Error('Class not found.');
	  }
  
	  console.log(classObject)
	  await classObject.destroy(); // Remove the class from the database.
	  return `Class with code ${classCode} removed successfully.`;

	  
	} catch (error) {
	  console.error('Error while removing class:', error);
	  return `Failed to remove class: ${error.message}`;
	}
  };
  
  export default removeClass;