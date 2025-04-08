import React, { useState } from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const success = (prop) => toast(prop);
  const failure = (prop) => toast(prop);

  const signup = async (name, password, username) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/job-tracker/auth/signup",
        {
          name,
          username,
          password,
        }
      );
      if (response.status === 200) {
        success("User registered successfully");
        navigate("/signin");
      }
    } catch (error) {
      failure("Something went wrong");
      console.error(error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(name, password, username);
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card shadow-lg p-4" style={{ width: "400px" }}>
          <h3 className="text-center mb-4">
            <BsFillPersonPlusFill className="me-2" /> Create Account
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="text"
                className="form-control"
                placeholder="Create a username"
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
              Sign up
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <a href="/" className="text-primary">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Signup;
