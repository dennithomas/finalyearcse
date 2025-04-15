import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.png";
import {
  FaEnvelope,
  FaLock,
  FaGoogle,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 🔹 Firebase Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Invalid email or password! Please try again.");
    }
  };

  // 🔹 Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google User:", result.user);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Google Sign-In Failed! Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">LOG IN YOUR ACCOUNT</h2>
      <img
        src={loginImage}
        alt="Login Illustration"
        className="login-image"
      />

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email:</label>
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="input-container">
          <label>Password:</label>
          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {showPassword ? (
              <FaEyeSlash
                className="toggle-password"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <FaEye
                className="toggle-password"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
        </div>

        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}

        <button type="submit" className="login-btn">
          Log In
        </button>
      </form>

      <div className="social-icons">
        <FaGoogle
          className="social-icon google"
          onClick={handleGoogleSignIn}
        />
      </div>

      <div className="login-footer">
        <span
          className="forgot-password"
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password
        </span>
        <span className="sign-up" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
