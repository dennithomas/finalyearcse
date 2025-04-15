import React from "react";
import { useNavigate } from "react-router-dom";
import "./BasicsLanguageSelect.css";

const BasicsLanguageSelect = () => {
  const navigate = useNavigate();

  const languages = [
    { name: "Hindi", route: "/lesson/hindi-basics" },
    { name: "Spanish", route: "/lesson/spanish-basics" },
    { name: "French", route: "/lesson/french-basics" },
    { name: "German", route: "/lesson/german-basics" },
    { name: "Japanese", route: "/lesson/japanese-basics" },
    { name: "Tamil", route: "/lesson/tamil-basics" },
    { name: "Telugu", route: "/lesson/telugu-basics" },
    { name: "Malayalam", route: "/lesson/malayalam-basics" },
    { name: "Kannada", route: "/lesson/kannada-basics" },
    // Add more languages as needed
  ];

  return (
    <div className="basics-container">
      <h2>Select a Language to Start Learning Basics</h2>

      <div className="language-grid">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="language-card"
            onClick={() => navigate(lang.route)}
          >
            <h3>{lang.name}</h3>
            <p>Start Basics in {lang.name}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default BasicsLanguageSelect;
