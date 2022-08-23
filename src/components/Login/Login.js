import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "./Login.css";

const API = "http://localhost:8000";

function Login() {
  const [loginDetails, setLoginDetails] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({ userName: "", email: "", password: "" });
  const navigate = useNavigate("");

  const updateLoginDetails = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [name]: value }));
  };

  const storeLoginDetails = async (e) => {
    e.preventDefault();
    const { userName, email, password } = loginDetails;

    const res = await fetch(`${API}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName, email, password }),
    });
    const respData = await res.json();
    const decodeToken = jwt_decode(respData.token);
    console.log(decodeToken);
    Cookies.set("JWT_Token", respData.token);
    setLoginDetails({ userName: "", email: "", password: "" });
    // if (respData.token) {
    //   navigate("/");
    // }
  };

  return (
    <div className="loginContainer">
      <form onSubmit={(e) => storeLoginDetails(e)}>
        <div className="login">
          <input
            placeholder="Enter UserName"
            name="userName"
            value={loginDetails.userName}
            onChange={updateLoginDetails}
          />
          {error.userName && <p className="error">{error.userName}</p>}
          <input
            placeholder="Enter Your Email"
            name="email"
            value={loginDetails.email}
            onChange={updateLoginDetails}
          />
          {error.email && <p className="error">{error.email}</p>}
          <input
            placeholder="Enter your Password"
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={updateLoginDetails}
          />
          {error.password && <p className="error">{error.password}</p>}
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
