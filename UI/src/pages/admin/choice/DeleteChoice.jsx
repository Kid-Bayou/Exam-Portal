import { useState } from "react";
import { API_BASE_URL, del } from "../../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

function DeleteChoice() {
    const params = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const url =`${API_BASE_URL}/api/Choice/DeleteChoice/${params.id}`;
            await del(url);
            navigate(-1)
        } catch (error) {
            console.error("Error Deleteing Choice:", error);
        }
    }

    const exitDelete = async () => {
        navigate(`/admindashboard/choices/${params.id}`)
    }

  return (
    <>
      <p className="delete-confirmation">Are you sure you want to delete this Choice?</p>
      <div className="delete-buttons">
        <button className="button" onClick={handleDelete}>Yes</button>
        <button className="button" onClick={exitDelete}>No</button>
      </div>
    </>
  );
}

export default DeleteChoice;
