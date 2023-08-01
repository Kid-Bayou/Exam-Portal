import { createContext, useState } from 'react';

const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [module, setModule] = useState([]);
  const [question, setQuestion] = useState([]);

  return (
    <ExamContext.Provider value={{ course, setCourse, module, setModule, question, setQuestion }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
