import React, { useEffect, useState } from 'react';
import { addClass, getSchedule, getNextClass } from './apiService';

const ScheduleComponent = () => {
  const [classes, setClasses] = useState([]);
  const [nextClass, setNextClass] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        setClasses(data);
        const nextClass = await getNextClass(data);
        setNextClass(nextClass);
      } catch (error) {
        console.error("Error fetching schedule or next class:", error);
      }
    };
    fetchSchedule();
  }, []);

//   const handleAddClass = async (newClass) => {
//     try {
//       await addClass(newClass.code, newClass.name, newClass.instructor, newClass.time, newClass.days, newClass.building, newClass.coords, newClass.room);
//       // Optionally, refresh the schedule after adding a class
//       const updatedClasses = await getSchedule();
//       setClasses(updatedClasses);
//     } catch (error) {
//       console.error("Error adding class:", error);
//     }
//   };

  return (
    <div>
      <h1>Schedule</h1>
      {nextClass && <h2>Next Class: {nextClass.name}</h2>}
      {/* Additional code for rendering the class schedule and add class form */}
    </div>
  );
};

export default ScheduleComponent;
