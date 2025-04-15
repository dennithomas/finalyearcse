import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player"; // Animation player
import animationData from "../animation/camera.json"; // Replace with your actual JSON animation

const OnboardingScreen = () => {
  const navigate = useNavigate();
  const totalSteps = 4;
  const currentStep = 1;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center position-relative"
      style={{ backgroundColor: "#C0DEE8" }}
    >
      {/* ✅ Skip Button */}
      <button
        className="btn btn-outline-dark position-absolute top-0 end-0 m-3"
        onClick={() => navigate("/login")}
      >
        Skip
      </button>

      <div className="text-center" style={{ maxWidth: "90%" }}>
        {/* ✅ Lottie Animation */}
        <Player
          autoplay
          loop
          src={animationData}
          style={{ width: "300px", height: "300px" }}
          className="mb-4"
        />

        {/* ✅ Title */}
        <h1 className="fw-bold text-dark">FINDOSCAN</h1>

        {/* ✅ Subtitle */}
        <p className="text-dark fs-4 px-4 mt-2">
          Instantly identifies objects <br />
          and images through scanning <br />
          or uploading.
        </p>

        {/* ✅ Next Button & Pagination Dots (Always Centered) */}
        <div className="d-flex flex-column align-items-center mt-4">
          <button
            className="btn btn-dark fw-bold px-4 py-2"
            onClick={() => navigate("/onboarding2")}
          >
            NEXT
          </button>

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
    </div>
  );
};

export default OnboardingScreen;
