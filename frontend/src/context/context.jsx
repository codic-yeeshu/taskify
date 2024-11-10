import React, { useEffect } from "react";
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

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const { exp } = JSON.parse(atob(token.split(".")[1]));
        if (Date.now() >= exp * 1000) {
          localStorage.removeItem("token");
          setLoggedIn(false);
          return;
        }

        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/verify-token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            }
          );

          const data = await response.json();
          if (data.valid) {
            setLoggedIn(true);
          } else {
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.error("Error verifying token:", error);
        }
      }
    };
    checkToken();
  }, []);

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
