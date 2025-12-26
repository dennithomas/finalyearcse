import React from "react";
import { useNavigate } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player"; // Importing Player from Lottie
import animationData from "../animation/translation.json"; // Assuming you have a Lottie animation file (translation.json)

const OnboardScreen3 = () => {
  const navigate = useNavigate();
  const totalSteps = 3; // ✅ 3 dots total
  const currentStep = 2; // ✅ Second dot should be active

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 text-center"
      style={{ backgroundColor: "#CEBAF9" }}
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
      <h1 className="fw-bold text-dark">POLYVERSE</h1>

      {/* ✅ Subtitle */}
      <p className="text-dark fs-4 px-4 mt-2">
        Polyverse is a multilingual <br />
        universe where languages <br />
        connect seamlessly.
      </p>

      {/* ✅ Button and Pagination */}
      <div className="d-flex flex-column align-items-center mt-4">
        {/* ✅ NEXT Button */}
        <button
          className="btn btn-dark fw-bold px-4 py-2"
          onClick={() => navigate("/onboarding4")}
        >
          NEXT
        </button>

        {/* ✅ Pagination Dots */}
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

export default OnboardScreen3;
