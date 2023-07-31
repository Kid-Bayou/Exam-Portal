import { useState } from "react";
import { post } from "../../service/APIService";
import { useNavigate } from "react-router-dom";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        "https://localhost:7182/api/Course/CreateCourse",
        formData
      );
      navigate("/courses");
      console.log("post request successful:", response);
    } catch (error) {
      console.error("Error making post request:", error);
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
      <h1 className="create-course-header">Create Course</h1>
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
        <button className="button" type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateCourse;
