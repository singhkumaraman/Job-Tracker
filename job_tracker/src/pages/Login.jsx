import React, { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { BsFillPersonCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const success = (message) => toast.success(message);
  const failure = (message) => toast.error(message);

  const login = async (username, password) => {
    const response = await fetch(
      "http://localhost:8080/job-tracker/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();

    if (response.status === 200) {
      const token = data.token;
      localStorage.setItem("authToken", JSON.stringify(token));
      success("Login successful!");
      // navigate("/");
    } else {
      failure(data.message || "Login failed. Please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">
            <BsFillPersonCheckFill className="me-2" /> Sign in
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
            <p className="text-center mt-3">
              Don’t have an account yet?{" "}
              <a href="/signup" className="text-primary">
                Sign up
              </a>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
