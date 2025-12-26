// FrenchPhraseLesson2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Se présenter (Introducing Yourself)",
    phrases: [
      { french: "Je m'appelle Sophie.", explanation: "My name is Sophie.", pronunciation: "Je m'appelle Sophie." },
      { french: "Comment vous appelez-vous ?", explanation: "What is your name? (formal)", pronunciation: "Comment vous appelez-vous ?" },
      { french: "Comment tu t'appelles ?", explanation: "What is your name? (informal)", pronunciation: "Comment tu t'appelles ?" },
      { french: "Enchanté(e)", explanation: "Nice to meet you.", pronunciation: "Enchanté" },
    ],
  },
  {
    category: "Informations personnelles (Personal Information)",
    phrases: [
      { french: "Je suis étudiant.", explanation: "I am a student.", pronunciation: "Je suis étudiant." },
      { french: "J'ai 20 ans.", explanation: "I am 20 years old.", pronunciation: "J'ai vingt ans." },
      { french: "Je viens d'Inde.", explanation: "I come from India.", pronunciation: "Je viens d'Inde." },
      { french: "J'habite à Lyon.", explanation: "I live in Lyon.", pronunciation: "J'habite à Lyon." },
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

const FrenchPhraseLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Phrases: Se présenter</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-1")}>⬅ Retour</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-3")}>Suivant ➡</button>
      </div>
    </div>
  );
};

export default FrenchPhraseLesson2;
