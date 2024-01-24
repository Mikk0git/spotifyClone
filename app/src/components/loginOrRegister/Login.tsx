import { Link } from "react-router-dom";
import "./LoginForm.css";

export function Login() {
  return (
    <div id="loginFormPage">
      <h1 className="veryBigText">Log in now</h1>
      <form action="" id="loginForm">
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
