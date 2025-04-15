import React from "react";
import { useNavigate } from "react-router-dom";
import cameraIcon from "../assets/home.png";

const OnboardScreen4 = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center" style={{ backgroundColor: "#FCCB89" }}>
      {/* Centered Image */}
      <img
        src={cameraIcon}
        alt="Camera Icon"
        className="mb-4"
        style={{
          width: "400px",  // ✅ Corrected width
          height: "300px",
          objectFit: "contain",
          display: "block",
          margin: "0 auto", // ✅ Centers the image
        }}
      />

      <h1 className="fw-bold text-dark">LANGQUEST</h1>

      <p className="text-dark fs-4 px-4 mt-2">
        Embark on an adventurous <br />
        language-learning journey.
      </p>

      {/* Next Button */}
      <button className="btn btn-dark fw-bold mt-4 px-4 py-2" onClick={() => navigate("/login")}>
        NEXT
      </button>

      {/* Pagination Dots */}
      <div className="d-flex mt-3">
        <span className="mx-1 bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></span>
        <span className="mx-1 bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></span>
        <span className="mx-1 bg-secondary rounded-circle" style={{ width: "10px", height: "10px" }}></span>
        <span className="mx-1 bg-dark rounded-circle" style={{ width: "10px", height: "10px" }}></span> {/* Active dot */}
      </div>
    </div>
  );
};

export default OnboardScreen4;
