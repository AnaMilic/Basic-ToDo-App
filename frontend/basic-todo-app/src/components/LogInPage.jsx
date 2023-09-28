import React from "react";
import { useNavigate } from "react-router-dom";

function LogInPage() {
  const navigate = useNavigate();
  return (
    <div className="lgn">
      <div className="loginpage">
        <input type="checkbox" id="check" aria-hidden="true"></input>
        <div className="registration">
          <form>
            <label for="check" aria-hidden="true">
              Registration
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
            ></input>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            ></input>
            <button className="btn">Registration</button>
          </form>
        </div>
        <div className="login">
          <form>
            <label htmlFor="check" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
            ></input>
            <button
              className="btn"
              onClick={() => {
                navigate("/mainPage");
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
