import { useState } from "react";
import { API_BASE_URL, post } from "../../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

import "../Admin.css"


function CreateModule() {
  const params = useParams();
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    passingMark: "",
    courseID: `${params.id}`,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await post(
        `${API_BASE_URL}/api/Module/CreateModule?cId=${params.id}`,
        formData
      );
      navigate(`/admindashboard/modules/${params.id}`);
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
      <h1 className="form-header">Create Module</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-box">
          <p className="form-label">Module Title: </p>
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Duration: </p>
          <input
            className="form-input"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Passing Mark: </p>
          <input
            className="form-input"
            type="number"
            name="passingMark"
            value={formData.passingMark}
            onChange={handleChange}
          />
        </label>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateModule;
