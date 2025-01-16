import React, { createContext, useState } from "react";

export const Context = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [classCode, setClassCode] = useState(null);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        classCode,
        setClassCode,
        username,
        setUsername,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppProvider;
