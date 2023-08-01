import { useState } from "react";
import { put } from "../../service/APIService";
import { useParams, useNavigate } from "react-router-dom";

function CreateModule() {
  const params = useParams();
  const [formData, setFormData] = useState({
    id:`${params.id}`,
    title: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await put(
        `https://localhost:7182/api/Module/UpdateModule/${params.id}`,
        formData
      );
      navigate(`/modules/${params.id}`);
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
      <h1 className="create-module-header">Update Module</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Module Title:
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

export default CreateModule;
