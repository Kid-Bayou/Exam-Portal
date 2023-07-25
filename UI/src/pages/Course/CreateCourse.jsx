import { useState } from "react";
import { post } from "../../service/APIService";

function CreateCourse() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        "https://localhost:7182/api/Course/CreateCourse",
        formData
      );
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
      <h1>Create Course</h1>
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
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CreateCourse;
