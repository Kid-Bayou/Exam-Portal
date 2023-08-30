import { createContext, useState } from "react";

const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);
  const [exam, setExam] = useState({});

  return (
    <ExamContext.Provider value={{ timer, setTimer, exam, setExam }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
