import { useState, useEffect } from "react";
import { put, get } from "../../service/APIService";
import { useParams, useNavigate } from "react-router-dom";

function CreateCourse() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: `${params.id}`,
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `https://localhost:7182/api/Course/GetCourse?id=${params.id}`
      );
      setFormData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(
        `https://localhost:7182/api/Course/UpdateCourse/${params.id}`,
        formData
      );
      navigate(`/courses/${params.id}`);
      console.log("put request successful:", response);
    } catch (error) {
      console.error("Error making put request:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1 className="create-course-header">Update Course</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Course Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <br />
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateCourse;
