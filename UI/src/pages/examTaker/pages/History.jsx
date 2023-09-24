import { useState, useEffect } from "react";
import { API_BASE_URL, get } from "../../../service/APIService";

function History() {
  const [examination, setExamination] = useState([]);
  console.log(examination)
  
  const person = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await get(`${API_BASE_URL}/api/Examination/GetUserExams?uId=${person.id}`);
      setExamination(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Michael Johnson", age: 35 },
  ];

  return (
    <>
      <div className="history-container">
        <h1>History</h1>

        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Module</th>
              <th>Date Time</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {examination.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.moduleID}</td>
                <td>{item.startDateTime}</td>
                <td>{item.moduleID}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default History;
