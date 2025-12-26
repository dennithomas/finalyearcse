// FrenchPhraseLesson4.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Expressions de politesse (Polite Expressions)",
    phrases: [
      { french: "S'il vous plaît.", explanation: "Please (formal).", pronunciation: "S'il vous plaît." },
      { french: "S'il te plaît.", explanation: "Please (informal).", pronunciation: "S'il te plaît." },
      { french: "Merci beaucoup.", explanation: "Thank you very much.", pronunciation: "Merci beaucoup." },
      { french: "De rien.", explanation: "You're welcome.", pronunciation: "De rien." },
    ],
  },
  {
    category: "Interactions courantes (Common Interactions)",
    phrases: [
      { french: "Excusez-moi.", explanation: "Excuse me (formal).", pronunciation: "Excusez-moi." },
      { french: "Pardon.", explanation: "Sorry / Excuse me.", pronunciation: "Pardon." },
      { french: "Oui.", explanation: "Yes.", pronunciation: "Oui." },
      { french: "Non.", explanation: "No.", pronunciation: "Non." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find((voice) => voice.lang.includes("fr"));
    if (frenchVoice) utterance.voice = frenchVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const FrenchPhraseLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Phrases: Politesse et Interactions</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">🗣️ {section.category}</h2>
          <div className="sentence-list">
            {section.phrases.map((ph, i) => (
              <div key={i} className="sentence-card">
                <p className="french-text">{ph.french}</p>
                <p className="explanation">({ph.explanation})</p>
                <p className="pronunciation">({ph.pronunciation})</p>
                <button
                  className="play-button"
                  onClick={() => speak(ph.french)}
                  aria-label={`Play pronunciation for ${ph.french}`}
                >
                  <FaVolumeUp /> Écouter
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-3")}>⬅ Retour</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-5")}>Suivant ➡</button>
      </div>
    </div>
  );
};

export default FrenchPhraseLesson4;
