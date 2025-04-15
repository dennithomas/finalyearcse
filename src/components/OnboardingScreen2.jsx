import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import micAnimation from "../animation/mic1.json"; // ✅ Make sure this file exists in the correct path

const OnboardingScreen2 = () => {
  const navigate = useNavigate();
  const totalSteps = 4;
  const currentStep = 2;

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center position-relative"
      style={{ backgroundColor: "#E8C0DF" }}
    >
      {/* ✅ Lottie Animation */}
      <Player
        autoplay
        loop
        src={micAnimation}
        style={{ width: "300px", height: "300px" }}
        className="mb-4"
      />

      {/* ✅ Title */}
      <h1 className="fw-bold text-dark">COMMBRIDGE</h1>

      {/* ✅ Subtitle */}
      <p className="text-dark fs-4 px-4 mt-2">
        CommBridge connects people seamlessly, <br />
        breaking language barriers <br />
        for effortless communication.
      </p>

      {/* ✅ NEXT Button + Pagination Dots aligned */}
      <div className="d-flex flex-column align-items-center mt-4">
        <button
          className="btn btn-dark fw-bold px-4 py-2"
          onClick={() => navigate("/onboarding3")}
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
  );
};

export default OnboardingScreen2;
