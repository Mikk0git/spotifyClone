import { Link } from "react-router-dom";
import "./LoginForm.css";

export function Register() {
  return (
    <div id="loginFormPage">
      <h1 className="veryBigText">
        Sign up to start <br />
        listening
      </h1>
      <form action="" id="loginForm">
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
