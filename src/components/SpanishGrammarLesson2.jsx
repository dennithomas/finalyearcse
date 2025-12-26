import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Adjetivos (Adjectives)",
    explanation:
      "Los adjetivos describen o califican a los sustantivos, proporcionando más detalles sobre ellos.",
    examples: [
      { spanish: "El libro es interesante.", english: "The book is interesting.", pronunciation: "El libro es interesante." },
      { spanish: "La casa es grande.", english: "The house is big.", pronunciation: "La casa es grande." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((voice) => voice.lang.includes("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const SpanishGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Gramática: Adjetivos</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="spanish-text">{ex.spanish}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.spanish)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/spanish-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/spanishgrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default SpanishGrammarLesson2;