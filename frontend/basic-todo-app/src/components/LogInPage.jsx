import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogInPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const reqBody = JSON.stringify({
        user: {
          name,
          email,
          password,
        },
      });
      if (!reqBody) {
        return;
      }
      let res = await fetch("http://localhost:5050/api/users", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: reqBody,
      });

      const formattedResponse = await res.json();
      console.log(formattedResponse);

      if (res.status === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        alert("Registration is succesfull, now login for access to main page.");
      } else {
        alert(formattedResponse);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className="lgn">
      <div className="loginpage">
        <input type="checkbox" id="check" aria-hidden="true"></input>
        <div className="registration">
          <form onSubmit={handleSubmit}>
            <label htmlFor="check" aria-hidden="true">
              Registration
            </label>
            <p className="lgnPgP">- don't have a profile -</p>
            <input
              type="text"
              id="nameR"
              name="name"
              value={name}
              placeholder="Enter your name"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
            <input
              type="email"
              id="emailR"
              name="email"
              value={email}
              placeholder="Enter your email"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              type="password"
              id="passR"
              name="password"
              value={password}
              placeholder="Enter your password"
              required
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <input
              type="password"
              id="passRCnfrm"
              name="passwordCnfrm"
              value={passwordConfirm}
              placeholder="Confirm your password"
              required
              onChange={(e) => setPasswordConfirm(e.target.value)}
            ></input>
            {password !== passwordConfirm && (
              <label
                style={{
                  color: "#ff5659",
                  fontSize: "0.9rem",
                  fontFamily: "sans-serif",
                  fontWeight: "normal",
                  marginLeft: "15px",
                  marginTop: "0rem",
                }}
              >
                Passwords are not equal!
              </label>
            )}
            <button
              type="submit"
              className="btn"
              disabled={password !== passwordConfirm}
            >
              Registration
            </button>
          </form>
        </div>
        <div className="login">
          <form>
            <label htmlFor="check" aria-hidden="true">
              Login
            </label>
            <p
              className="lgnPgP"
              style={{ color: "#573b8a", marginTop: "0.5px" }}
            >
              - have a profile -
            </p>
            <input
              type="email"
              id="emailL"
              name="email"
              placeholder="Enter your email"
              required
            ></input>
            <input
              type="password"
              id="passL"
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
