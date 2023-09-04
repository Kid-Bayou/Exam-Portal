import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

function Result() {

    const [result, setResult] = useState(null);
    const [tResult, setTResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await get(
          `${API_BASE_URL}/api/Course/GetCourse?id=`
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
          `${API_BASE_URL}/api/Course/GetCourse?id=`
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
        </>
    )
}

export default Result