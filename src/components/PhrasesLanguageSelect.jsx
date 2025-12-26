import React from "react";
import { useNavigate } from "react-router-dom";
import "./BasicsLanguageSelect.css"; // reuse same styles

const PhrasesLanguageSelect = () => {
  const navigate = useNavigate();

  const languages = [
    { name: "Hindi", route: "/lesson/hindi-phrases" },
    { name: "Spanish", route: "/lesson/spanish-phrases-1" },
    { name: "French", route: "/lesson/french-phrases-1" },
    { name: "German", route: "/lesson/german-phrases-1" },
    { name: "Japanese", route: "/lesson/j-prases-1" },
    { name: "Tamil", route: "/lesson/tamil-phrases" },
    { name: "Telugu", route: "/lesson/telugu-phrases-1" },
    { name: "Malayalam", route: "/lesson/malayalam-phrases-1" },
    { name: "Kannada", route: "/lesson/kannada-phrases-1" },
    { name: "English", route: "/lesson/english-phrases-1" }, // ✅ Added English
  ];

  return (
    <div className="basics-container">
      <h2>Select a Language to Learn Phrases</h2>

      <div className="language-grid">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="language-card"
            onClick={() => navigate(lang.route)}
          >
            <h3>{lang.name}</h3>
            <p>Start Phrases in {lang.name}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default PhrasesLanguageSelect;
