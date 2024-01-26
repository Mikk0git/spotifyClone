import { SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import supabase from "../supabaseClient";

interface RegisterProps {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Register({ setIsSignedIn }: RegisterProps) {
  const navigate = useNavigate();

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    const { email, password } = data;

    const { data: dormData, error: formError } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (formError) {
      console.error("Error signing up:", formError);
    } else {
      console.log(dormData);
    }

    (e.target as HTMLFormElement).reset();
    navigate("/");

    setIsSignedIn(true);
  };

  return (
    <div id="loginFormPage">
      <h1 className="veryBigText">
        Sign up to start <br />
        listening
      </h1>
      <form onSubmit={handleRegister} id="loginForm">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="name" id="" placeholder="Name" />
        <button className="loginButton">Sign up</button>
      </form>
      <p>
        Already have an account? <Link to={"/login"}>Login</Link>
      </p>
    </div>
  );
}
