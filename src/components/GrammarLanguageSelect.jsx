import React from "react";
import { useNavigate } from "react-router-dom";
import "./BasicsLanguageSelect.css"; // reuse same styles

const GrammarLanguageSelect = () => {
  const navigate = useNavigate();

  const languages = [
    { name: "Hindi", route: "/lesson/hindi-grammar" },
    { name: "Spanish", route: "/lesson/spanish-grammar" },
    { name: "French", route: "/lesson/french-grammar" },
    { name: "German", route: "/lesson/german-grammar" },
    { name: "Japanese", route: "/lesson/japanese-grammar" },
    { name: "Tamil", route: "/lesson/tamil-grammar1" },
    { name: "Telugu", route: "/lesson/telugu-grammar" },
    { name: "Malayalam", route: "/lesson/malayalam-grammar" },
    { name: "Kannada", route: "/lesson/kannada-grammar" },
    { name: "English", route: "/lesson/english-grammar" }, // ✅ Added English
  ];

  return (
    <div className="basics-container">
      <h2>Select a Language to Learn Grammar</h2>

      <div className="language-grid">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="language-card"
            onClick={() => navigate(lang.route)}
          >
            <h3>{lang.name}</h3>
            <p>Start Grammar in {lang.name}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default GrammarLanguageSelect;
