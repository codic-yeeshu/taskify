import { useContext } from "react";
import "./App.css";
import TaskManager from "./TaskManager";
import SignInPage from "./auth/signIn";
import SignUpPage from "./auth/signUp";
import ContextProvider, { Context } from "./context/context";

function App() {
  return (
    <ContextProvider>
      <Content />
    </ContextProvider>
  );
}

function Content() {
  const { isLoggedIn, isNewUser } = useContext(Context);

  return (
    <>
      {isLoggedIn ? (
        <TaskManager />
      ) : isNewUser ? (
        <SignUpPage />
      ) : (
        <SignInPage />
      )}
    </>
  );
}

export default App;
