import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotImage from "../assets/password.png"; 
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import "./ForgotPasswordPage.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("A password reset link has been sent to your email!");
    } catch (error) {
      setMessage("Error: Please check your email and try again.");
    }
  };

  return (
    <div className="forgot-container">
      <h1 className="forgot-heading">FORGOT PASSWORD</h1>
      <img src={forgotImage} alt="Forgot Password" className="forgot-image" />

      <form className="forgot-form" onSubmit={handleResetPassword}>
        <label className="forgot-label">Enter your email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="forgot-input"
        />
        <button type="submit" className="forgot-btn">
          Reset Password
        </button>
      </form>

      {message && <div className="message">{message}</div>}

      <div className="forgot-footer">
        <span className="back-to-login" onClick={() => navigate("/login")}>
          Back to Login
        </span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
