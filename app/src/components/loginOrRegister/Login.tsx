import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import supabase from "../supabaseClient";
import { SyntheticEvent, useState } from "react";

interface LoginProps {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Login({ setIsSignedIn }: LoginProps) {
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    const { email, password } = data;

    const { data: loginData, error: formError } =
      await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
      });

    if (formError) {
      console.error("Error signing in:", formError);
      setFormError(formError.message as string);
    } else {
      console.log(loginData);
      setIsSignedIn(true);
      navigate("/");
    }
  };
  return (
    <div id="loginFormPage">
      <h1 className="veryBigText ">Log in now</h1>
      <p className="lowerLineHeight">{formError}</p>
      <form onSubmit={handleLogin} id="loginForm">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button className="loginButton">Sign in</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to={"/register"} className="linkUnderline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
