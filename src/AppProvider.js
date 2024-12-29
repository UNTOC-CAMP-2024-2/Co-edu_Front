import React, { createContext, useState } from "react";

export const Context = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <Context.Provider value={{ token, setToken }}>{children}</Context.Provider>
  );
};

export default AppProvider;
