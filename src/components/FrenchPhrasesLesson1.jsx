// FrenchPhraseLesson1.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Salutations (Greetings)",
    phrases: [
      { french: "Bonjour", explanation: "Hello / Good morning", pronunciation: "Bonjour" },
      { french: "Bonsoir", explanation: "Good evening", pronunciation: "Bonsoir" },
      { french: "Salut", explanation: "Hi (informal)", pronunciation: "Salut" },
      { french: "Au revoir", explanation: "Goodbye", pronunciation: "Au revoir" },
    ],
  },
  {
    category: "Phrases de base (Basic Phrases)",
    phrases: [
      { french: "Merci", explanation: "Thank you", pronunciation: "Merci" },
      { french: "S'il vous plaît", explanation: "Please (formal)", pronunciation: "S'il vous plaît" },
      { french: "De rien", explanation: "You're welcome", pronunciation: "De rien" },
      { french: "Oui / Non", explanation: "Yes / No", pronunciation: "Oui / Non" },
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

const FrenchPhraseLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Phrases: Débutant</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">🗣️ {section.category}</h2>
          <div className="sentence-list">
            {section.phrases.map((ph, i) => (
              <div key={i} className="sentence-card">
                <p className="french-text">{ph.french}</p>
                <p className="explanation">({ph.explanation})</p>
                <p className="pronunciation">({ph.pronunciation})</p>
                <button className="play-button" onClick={() => speak(ph.french)}>
                  <FaVolumeUp /> Écouter
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/")}>⬅ Accueil</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-2")}>Suivant ➡</button>
      </div>
    </div>
  );
};

export default FrenchPhraseLesson1;
