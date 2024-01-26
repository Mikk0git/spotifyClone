import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import supabase from "../supabaseClient";
import { SyntheticEvent } from "react";

interface LoginProps {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({ setIsSignedIn }: LoginProps) {
  const navigate = useNavigate();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    const { email, password } = data;

    const { data: dormData, error: formError } =
      await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
      });

    if (formError) {
      console.error("Error signing in:", formError);
    } else {
      console.log(dormData);
      setIsSignedIn(true);
      navigate("/");
    }

    (e.target as HTMLFormElement).reset();
  };
  return (
    <div id="loginFormPage">
      <h1 className="veryBigText">Log in now</h1>
      <form onSubmit={handleLogin} id="loginForm">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className="loginButton">Sign in</button>
      </form>
      <p>
        Don't have an account? <Link to={"/register"}>Sign up</Link>
      </p>
    </div>
  );
}
