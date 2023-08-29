import { createContext, useState } from 'react';

const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [course, setCourse] = useState([]);
  const [module, setModule] = useState([]);
  const [question, setQuestion] = useState([]);
  const [choice, setChoice] = useState([]);
  const [timer, setTimer] = useState(0);

  return (
    <ExamContext.Provider value={{ timer, setTimer,course, setCourse, module, setModule, question, setQuestion, choice, setChoice }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
