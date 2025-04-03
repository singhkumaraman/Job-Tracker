import React, { useState, useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { BsFillPersonCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const success = (prop) => toast({ prop });
  const failure = (prop) => toast({ prop });
  const loginSchema = z.object({
    email: z
      .string()
      .email("Invalid email format")
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, "Email must be a Gmail address"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  });
  const login = async (email, password) => {
    try {
      const result = loginSchema.safeParse({
        email: email,
        password: password,
      });
      if (!result.success) {
        console.log();
      }
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        const token = data.token;
        localStorage.setItem("authToken", JSON.stringify(token));
        localStorage.setItem("user", JSON.stringify(data.user.name));
        authContext.setUserId(data.user.id);
        authContext.setAuthToken(token);
        authContext.setUser(data.user.username);
        success("login successfull");
        navigate("/");
      }
    } catch (err) {
      failure("login failed");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
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
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
