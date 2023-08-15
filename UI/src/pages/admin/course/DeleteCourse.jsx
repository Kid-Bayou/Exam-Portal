import { useState } from "react";
import { API_BASE_URL, del } from "../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

function DeleteCourse() {
    const params = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const url =`${API_BASE_URL}/api/Course/DeleteCourse/${params.id}`;
            await del(url);
            navigate("/courses")
        } catch (error) {
            console.error("Error Deleteing Course:", error);
        }
    }

    const exitDelete = async () => {
        navigate(`/courses/${params.id}`)
    }

  return (
    <>
      <p className="delete-confirmation">Are you sure you want to delete this course?</p>
      <div className="delete-buttons">
        <button className="button" onClick={handleDelete}>Yes</button>
        <button className="button" onClick={exitDelete}>No</button>
      </div>
    </>
  );
}

export default DeleteCourse;
