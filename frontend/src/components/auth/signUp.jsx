import React, { useContext, useState } from "react";
import styles from "./signUp.module.css";
import { Context } from "../../context/context";
import { notify } from "../../utils";
import { ToastContainer } from "react-toastify";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const SignUpPage = () => {
  const { setNewUser, loading, setLoading } = useContext(Context);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      notify("Creating your Account", "warning");
      const response = await fetch(`${BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      if (response.ok) {
        // If the signup is successful, switch to the SignIn page or perform any action
        notify("Account created Successfully", "success");
        setNewUser(false);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.heading}>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label htmlFor="name">Name:</label>
            <input
              onChange={(e) => {
                setSignUpData({
                  name: e.target.value,
                  email: signUpData.email,
                  password: signUpData.password,
                });
              }}
              type="text"
              id="name"
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="email">Email:</label>
            <input
              onChange={(e) => {
                setSignUpData({
                  name: signUpData.name,
                  email: e.target.value,
                  password: signUpData.password,
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
                setSignUpData({
                  name: signUpData.name,
                  email: signUpData.email,
                  password: e.target.value,
                });
              }}
              type="password"
              id="password"
              className={styles.input}
            />
          </div>
          <div className={styles.btndiv}>
            <button type="submit" className={styles.button} disabled={loading}>
              {loading ? "..." : "Signup"}
            </button>
          </div>
           
          <div className={styles.signInNote}>
            Already have an Account?
            <p
              onClick={() => setNewUser((prev) => !prev)}
              className={styles.anchor}
            >
              SignIn here
            </p>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
};

export default SignUpPage;
