// GermanGrammarLesson2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "Bestimmte Artikel",
    explanation: "Bestimmte Artikel beziehen sich auf spezifische Dinge: der, die, das.",
    examples: [
      { german: "Der Mann liest ein Buch.", explanation: "‘Der’ ist der bestimmte Artikel für maskuline Nomen.", pronunciation: "Der Mann liest ein Buch." },
      { german: "Die Frau trinkt Wasser.", explanation: "‘Die’ ist für feminine Nomen.", pronunciation: "Die Frau trinkt Wasser." },
    ],
  },
  {
    rule: "Unbestimmte Artikel",
    explanation: "Unbestimmte Artikel beziehen sich auf nicht-spezifische Dinge: ein, eine.",
    examples: [
      { german: "Ein Hund bellt laut.", explanation: "‘Ein’ ist der unbestimmte Artikel für maskuline/neutral Nomen.", pronunciation: "Ein Hund bellt laut." },
      { german: "Eine Katze schläft.", explanation: "‘Eine’ ist für feminine Nomen.", pronunciation: "Eine Katze schläft." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find((voice) => voice.lang.includes("de"));
    if (germanVoice) utterance.voice = germanVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const GermanGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Grammatik: Artikel</h1>
      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="german-text">{ex.german}</p>
                <p className="explanation">({ex.explanation})</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <button className="play-button" onClick={() => speak(ex.german)}>
                  <FaVolumeUp /> Abspielen
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/german-grammar")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-3")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanGrammarLesson2;
