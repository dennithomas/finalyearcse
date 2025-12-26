import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../animation/game1 (2).json"; // Lottie animation file for screen 4

const OnboardScreen4 = () => {
  const navigate = useNavigate();
  const totalSteps = 3; // ✅ Only 3 dots
  const currentStep = 3; // ✅ Highlight the last (3rd) dot

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{ backgroundColor: "#FCCB89" }}
    >
      {/* ✅ Lottie Animation */}
      <Player
        autoplay
        loop
        src={animationData}
        style={{ width: "300px", height: "200px" }}
        className="mb-4"
      />

      {/* ✅ Title */}
      <h1 className="fw-bold text-dark">LANGQUEST</h1>

      {/* ✅ Subtitle */}
      <p className="text-dark fs-4 px-4 mt-2">
        Embark on an adventurous <br />
        language-learning journey.
      </p>

      {/* ✅ Button and Pagination */}
      <div className="d-flex flex-column align-items-center mt-4">
        {/* ✅ NEXT Button */}
        <button
          className="btn btn-dark fw-bold px-4 py-2"
          onClick={() => navigate("/login")}
        >
          NEXT
        </button>

        {/* ✅ Pagination Dots */}
        <div className="d-flex mt-3">
          {[...Array(totalSteps)].map((_, index) => (
            <span
              key={index}
              className={`mx-1 rounded-circle ${
                index + 1 === currentStep ? "bg-dark" : "bg-secondary"
              }`}
              style={{ width: "10px", height: "10px" }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnboardScreen4;
