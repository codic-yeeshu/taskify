import React from "react";
import { createContext, useState } from "react";
export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isNewUser, setNewUser] = useState(true);
  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token"); // Remove the token to log out the user
  };

  const contextValue = {
    loading,
    setLoading,
    isLoggedIn,
    setLoggedIn,
    isNewUser,
    setNewUser,
    logout,
  };
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
