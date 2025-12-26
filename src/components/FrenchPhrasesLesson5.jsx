// FrenchPhraseLesson5.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Faire des achats (Shopping)",
    phrases: [
      { french: "Combien ça coûte ?", explanation: "How much does it cost?", pronunciation: "Combien ça coûte ?" },
      { french: "C'est trop cher.", explanation: "It's too expensive.", pronunciation: "C'est trop cher." },
      { french: "Avez-vous une taille plus grande ?", explanation: "Do you have a larger size?", pronunciation: "Avez-vous une taille plus grande ?" },
      { french: "Je voudrais acheter ceci.", explanation: "I would like to buy this.", pronunciation: "Je voudrais acheter ceci." },
    ],
  },
  {
    category: "Au restaurant (At the Restaurant)",
    phrases: [
      { french: "La carte, s'il vous plaît.", explanation: "The menu, please.", pronunciation: "La carte, s'il vous plaît." },
      { french: "Je voudrais un café.", explanation: "I would like a coffee.", pronunciation: "Je voudrais un café." },
      { french: "L'addition, s'il vous plaît.", explanation: "The bill, please.", pronunciation: "L'addition, s'il vous plaît." },
      { french: "C'était délicieux.", explanation: "It was delicious.", pronunciation: "C'était délicieux." },
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

const FrenchPhraseLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Phrases: Faire des achats et au restaurant</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-4")}>⬅ Retour</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default FrenchPhraseLesson5;
