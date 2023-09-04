import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL, get } from "../../../service/APIService";

function Result() {
  const params = useParams();
  const [result, setResult] = useState(null);
  const [tResult, setTResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/ExamAnswer/GetTotalCorrectAnswersCount/TotalCorrectAnswersCount/${params.id}`
        );
        setResult(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/ExamAnswer/GetTotalAnswersCount/TotalAnswersCount/${params.id}`
        );
        setTResult(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h1>You're Done Already?</h1>
      <p>{result} / {tResult}</p>
    </>
  );
}

export default Result;
