import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      alert("Account Created Successfully!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google User:", result.user);
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-heading">CREATE YOUR ACCOUNT</h1>

      {error && <p className="error-message">{error}</p>}

      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="input-container">
          <label>Name:</label>
          <div className="input-box">
            <FaUser className="input-icon" />
            <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
        </div>

        <div className="input-container">
          <label>Email:</label>
          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
              <FaEyeSlash className="toggle-password" onClick={() => setShowPassword(false)} />
            ) : (
              <FaEye className="toggle-password" onClick={() => setShowPassword(true)} />
            )}
          </div>
        </div>

        <div className="input-container">
          <label>Confirm Password:</label>
          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="signup-btn">Sign Up!</button>
      </form>

      <div className="social-icons">
        <FaGoogle className="social-icon google" onClick={handleGoogleSignUp} />
      </div>

      <div className="signup-footer">
        <span className="login-option" onClick={() => navigate("/login")}>Log In</span>
      </div>
    </div>
  );
};

export default SignupPage;
