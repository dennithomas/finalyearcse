import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player"; // Importing Player from Lottie
import micAnimation from "../animation/mic1.json"; // Assuming you have a Lottie animation file

const OnboardingScreen2 = () => {
  const navigate = useNavigate();
  const totalSteps = 3; // Total steps for onboarding (3 dots)
  const currentStep = 1; // First dot should be active

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center position-relative"
      style={{ backgroundColor: "#E8C0DF" }}
    >
      {/* Lottie Animation */}
      <Player
        autoplay
        loop
        src={micAnimation}
        style={{ width: "300px", height: "300px" }}
        className="mb-4"
      />

      {/* Title */}
      <h1 className="fw-bold text-dark">COMMBRIDGE</h1>

      {/* Subtitle */}
      <p className="text-dark fs-4 px-4 mt-2">
        CommBridge connects people seamlessly, <br />
        breaking language barriers <br />
        for effortless communication.
      </p>

      {/* Button and Pagination */}
      <div className="d-flex flex-column align-items-center mt-4">
        <button
          className="btn btn-dark fw-bold px-4 py-2"
          onClick={() => navigate("/onboarding3")}
        >
          NEXT
        </button>

        {/* Pagination Dots */}
        <div className="d-flex justify-content-center mt-3 w-100">
          {[...Array(totalSteps)].map((_, index) => (
            <span
              key={index}
              className={`mx-1 rounded-circle ${
                index === currentStep - 1 ? "bg-dark" : "bg-secondary"
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
