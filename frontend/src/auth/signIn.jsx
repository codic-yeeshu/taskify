import React, { useContext, useState } from "react";
import styles from "./signIn.module.css";
import { Context } from "../context/context";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignInPage = () => {
  const { setNewUser, setLoggedIn } = useContext(Context);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // Assuming you want to store the token in local storage
        localStorage.setItem("token", token);

        // Set logged in state to true
        setLoggedIn(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Failed to log in.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.heading}>SignIn</h2>
        <form onSubmit={handleSignIn}>
          <div className={styles.inputField}>
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => {
                setSignInData({
                  email: e.target.value,
                  password: signInData.password,
                });
              }}
              type="email"
              id="email"
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="password">Password:</label>
            <input
              onChange={(e) => {
                setSignInData({
                  email: signInData.email,
                  password: e.target.value,
                });
              }}
              type="password"
              id="password"
              className={styles.input}
            />
          </div>
          <div className={styles.btndiv}>
            <button type="submit" className={styles.button}>
              SignIn
            </button>
          </div>
           
          <div className={styles.signInNote}>
            New User?{" "}
            <a
              onClick={() => setNewUser((prev) => !prev)}
              className={styles.anchor}
            >
              SignUp here
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
