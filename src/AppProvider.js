import React, { createContext, useState } from "react";

export const Context = createContext();

const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [classCode, setClassCode] = useState(null);
  const [className, setClassName] = useState(null);

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        classCode,
        setClassCode,
        username,
        setUsername,
        className,
        setClassName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppProvider;
