import React, { createContext, useState, useContext } from 'react';

// Criação do contexto
const AppContext = createContext();

// Provedor do contexto
export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [userMediaList, setUserMediaList] = useState([]);

  return (
    <AppContext.Provider value={{ token, setToken, userMediaList, setUserMediaList}}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useAppContext = () => useContext(AppContext);
