// FrenchPhraseLesson3.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Questions courantes (Common Questions)",
    phrases: [
      { french: "Où habitez-vous ?", explanation: "Where do you live? (formal)", pronunciation: "Où habitez-vous ?" },
      { french: "Tu habites où ?", explanation: "Where do you live? (informal)", pronunciation: "Tu habites où ?" },
      { french: "Quel âge avez-vous ?", explanation: "How old are you? (formal)", pronunciation: "Quel âge avez-vous ?" },
      { french: "Tu as quel âge ?", explanation: "How old are you? (informal)", pronunciation: "Tu as quel âge ?" },
    ],
  },
  {
    category: "Réponses courantes (Common Answers)",
    phrases: [
      { french: "J'habite à Paris.", explanation: "I live in Paris.", pronunciation: "J'habite à Paris." },
      { french: "J'ai 25 ans.", explanation: "I am 25 years old.", pronunciation: "J'ai vingt-cinq ans." },
      { french: "Je parle un peu français.", explanation: "I speak a little French.", pronunciation: "Je parle un peu français." },
      { french: "Je ne comprends pas.", explanation: "I don't understand.", pronunciation: "Je ne comprends pas." },
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

const FrenchPhraseLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Phrases: Questions et Réponses</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-2")}>⬅ Retour</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/french-phrases-4")}>Suivant ➡</button>
      </div>
    </div>
  );
};

export default FrenchPhraseLesson3;
