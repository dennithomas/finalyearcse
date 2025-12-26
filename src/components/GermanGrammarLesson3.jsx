// GermanGrammarLesson3.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "Verben",
    explanation: "Ein Verb beschreibt eine Handlung, einen Zustand oder ein Ereignis.",
    examples: [
      { german: "Ich lerne Deutsch.", explanation: "‘Lerne’ ist das Verb.", pronunciation: "Ich lerne Deutsch." },
      { german: "Er schläft tief.", explanation: "‘Schläft’ beschreibt die Handlung.", pronunciation: "Er schläft tief." },
    ],
  },
  {
    rule: "Konjugation im Präsens",
    explanation: "Verben verändern sich je nach Person (ich, du, er/sie/es, etc.).",
    examples: [
      { german: "Du gehst zur Schule.", explanation: "‘Gehst’ ist die 2. Person Singular.", pronunciation: "Du gehst zur Schule." },
      { german: "Wir spielen Fußball.", explanation: "‘Spielen’ ist die 1. Person Plural.", pronunciation: "Wir spielen Fußball." },
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

const GermanGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Grammatik: Verben</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-2")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-4")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanGrammarLesson3;
