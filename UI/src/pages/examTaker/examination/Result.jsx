import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, get } from "../../../service/APIService";

function Result() {
  const params = useParams();
  const [result, setResult] = useState(0);
  const [tResult, setTResult] = useState(0);

  useEffect(() => {
    console.log("Fetching result data...");
    fetchResultData();
  }, [params.id]);

  const fetchResultData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/ExamAnswer/GetTotalCorrectAnswersCount/TotalCorrectAnswersCount/${params.id}`
      );
      setResult(responseData);
      console.log("Result data:", responseData);
    } catch (error) {
      console.error("Error fetching result data:", error);
    }
  };

  useEffect(() => {
    console.log("Fetching tResult data...");
    fetchTResultData();
  }, [params.id]);

  const fetchTResultData = async () => {
    try {
      const responseData = await get(
        `${API_BASE_URL}/api/ExamAnswer/GetTotalAnswersCount/TotalAnswersCount/${params.id}`
      );
      setTResult(responseData);
      console.log("TResult data:", responseData);
    } catch (error) {
      console.error("Error fetching tResult data:", error);
    }
  };

  return (
    <>
      <h1>You're Done Already?</h1>
      <p>{result} / {tResult}</p>
    </>
  );
}

export default Result;
