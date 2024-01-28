import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import supabase from "../supabaseClient";

interface RegisterProps {
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Register({ setIsSignedIn }: RegisterProps) {
  const [formError, setFormError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: SyntheticEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    console.log(data);
    const { email, password } = data;

    const { data: registerData, error: formError } = await supabase.auth.signUp(
      {
        email: email as string,
        password: password as string,
      }
    );

    if (formError) {
      console.error("Error signing up:", formError);
      setFormError(formError.message as string);
    } else {
      console.log(registerData);
      navigate("/");

      setIsSignedIn(true);
    }
  };

  return (
    <div id="loginFormPage">
      <h1 className="veryBigText ">
        Sign up to start <br />
        listening
      </h1>
      <p className="lowerLineHeight">{formError}</p>

      <form onSubmit={handleRegister} id="loginForm">
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input type="text" name="name" id="" placeholder="Name" />
        <button className="loginButton">Sign up</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to={"/login"} className="linkUnderline styledLink">
          Login
        </Link>
      </p>
    </div>
  );
}
