import { useState } from "react";
import { API_BASE_URL, del } from "../../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

import "../../../styles/Admin.css";

function DeleteQuestion() {
  const params = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const url = `${API_BASE_URL}/api/Question/DeleteQuestion/${params.id}`;
      await del(url);
      navigate(-1);
    } catch (error) {
      console.error("Error Deleteing Questionn:", error);
    }
  };

  const exitDelete = async () => {
    navigate(`/questions/${params.id}`);
  };

  return (
    <>
      <p className="delete-confirmation">
        Are you sure you want to delete this question?
      </p>
      <div className="delete-buttons">
        <button className="button" onClick={handleDelete}>
          Yes
        </button>
        <button className="button" onClick={exitDelete}>
          No
        </button>
      </div>
    </>
  );
}

export default DeleteQuestion;
