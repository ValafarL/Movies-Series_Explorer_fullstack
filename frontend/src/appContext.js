import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [userMediaList, setUserMediaList] = useState([]);

  return (
    <AppContext.Provider value={{ token, setToken, userMediaList, setUserMediaList}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
