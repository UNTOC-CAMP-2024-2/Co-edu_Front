import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const AppProvider = ({ children }) => {
  const [token, setTokenState] = useState(() => localStorage.getItem("token"));
  const [username, setUsernameState] = useState(() => localStorage.getItem("username"));
  const [classCode, setClassCode] = useState(null);
  const [className, setClassName] = useState(null);

  const setToken = (value) => {
    setTokenState(value);
    if (value) {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
    }
  };

  const setUsername = (value) => {
    setUsernameState(value);
    if (value) {
      localStorage.setItem("username", value);
    } else {
      localStorage.removeItem("username");
    }
  };

  useEffect(() => {
    setTokenState(localStorage.getItem("token"));
    setUsernameState(localStorage.getItem("username"));
  }, []);

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
