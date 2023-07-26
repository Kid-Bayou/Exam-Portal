import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {get} from "../../service/APIService"

function CourseList() {
  const [course, setCourse] = useState([]);

 const courseElements = course.map((course) => (
   <div key={course.id} className="course-tile">

     <Link to={`/courses/${course.id}`}>
       <div className="course-info">
         <h3>{course.title}</h3>
       </div>
     </Link>
     
   </div>
  ));

  useEffect(() => {
    const fetchData = async() => {
      try {
        const responseData = await get("https://localhost:7182/api/Course/GetCourses");
        setCourse(responseData);
      } catch(error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <>
      <div className="course-list-container">

        <div className="course-list">
          {courseElements}
        </div>
      </div>
      <div className="create-course-container">
        <Link to="/courses/createcourse">
          Create Course
        </Link>
      </div>
    </>
  );
}

export default CourseList;
