import { createContext, useState } from 'react';

const ExamContext = createContext();

const ExamProvider = ({ children }) => {
  const [timer, setTimer] = useState(0);

  return (
    <ExamContext.Provider value={{ timer, setTimer }}>
      {children}
    </ExamContext.Provider>
  );
};

export { ExamContext, ExamProvider };
