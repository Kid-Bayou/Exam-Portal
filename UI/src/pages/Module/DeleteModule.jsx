import { useState } from "react";
import { del } from "../../service/APIService";
import { useNavigate, useParams } from "react-router-dom";

function DeleteModule() {
    const params = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const url =`https://localhost:7182/api/Module/DeleteModule/${params.id}`;
            await del(url);
            navigate("/modules")
        } catch (error) {
            console.error("Error Deleteing Module:", error);
        }
    }

    const exitDelete = async () => {
        navigate(`/modules/${params.id}`)
    }

  return (
    <>
      <p className="delete-confirmation">Are you sure you want to delete this module?</p>
      <div className="delete-buttons">
        <button className="button" onClick={handleDelete}>Yes</button>
        <button className="button" onClick={exitDelete}>No</button>
      </div>
    </>
  );
}

export default DeleteModule;
