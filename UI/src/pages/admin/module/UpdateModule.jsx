import { useState, useEffect } from "react";
import { API_BASE_URL, put, get } from "../../../service/APIService";
import { useParams, useNavigate } from "react-router-dom";

import "../Admin.css"


function CreateModule() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id: `${params.id}`,
    title: "",
    duration: "",
    passingMark: "",
    courseID: `{cId}`,
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/Module/GetModule?id=${params.id}`
      );
      setFormData(responseData);
      const cId = formData.courseID;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(
        `${API_BASE_URL}/api/Module/UpdateModule/${params.id}`,
        formData
      );
      navigate(`/admindashboard/modules/moduledetail/${params.id}`);
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
      <h1 className="form-header">Update Module</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-box">
          <p className="form-label"> Module Title:</p>
          <input
            className="form-input"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Duration:</p>
          <input
            className="form-input"
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </label>
        <label className="form-box">
          <p className="form-label">Passing Mark:</p>
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
