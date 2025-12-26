import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BasicsLanguageSelect.css"; // reuse your existing CSS

const LetterLanguageSelect = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const languages = [
    { name: "Hindi", route: "/letter/hindi" },
    { name: "Tamil", route: "/letter/tamil" },
    { name: "Telugu", route: "/letter/telugu" },
    { name: "Malayalam", route: "/letter/malayalam" },
    { name: "Kannada", route: "/letter/kannada" },
    { name: "English", route: "/letter/english" },
    { name: "Spanish", route: "/letter/spanish" },
    { name: "French", route: "/letter/french" },
    { name: "German", route: "/letter/german" },
    { name: "Japanese", route: "/letter/japanese" },
  ];

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="basics-container">
      <h2>Select a Language for Letter</h2>

      <input
        type="text"
        placeholder="Search languages..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="language-grid">
        {filteredLanguages.map((lang, index) => (
          <div
            key={index}
            className="language-card"
            onClick={() => navigate(lang.route)}
          >
            <h3>{lang.name}</h3>
            <p>View letter in {lang.name}</p>
          </div>
        ))}
      </div>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default LetterLanguageSelect;
