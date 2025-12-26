// GermanGrammarLesson5.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "Adjektive",
    explanation: "Adjektive beschreiben Eigenschaften von Nomen.",
    examples: [
      { german: "Das ist ein schönes Haus.", explanation: "‘Schönes’ beschreibt das Haus.", pronunciation: "Das ist ein schönes Haus." },
      { german: "Er trägt eine blaue Jacke.", explanation: "‘Blaue’ beschreibt die Jacke.", pronunciation: "Er trägt eine blaue Jacke." },
    ],
  },
  {
    rule: "Stellung im Satz",
    explanation: "Adjektive stehen meist vor dem Nomen oder nach dem Verb sein.",
    examples: [
      { german: "Die Blumen sind bunt.", explanation: "‘Bunt’ kommt nach dem Verb ‘sind’.", pronunciation: "Die Blumen sind bunt." },
      { german: "Ein kalter Wind weht.", explanation: "‘Kalter’ steht vor dem Nomen ‘Wind’.", pronunciation: "Ein kalter Wind weht." },
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

const GermanGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Grammatik: Adjektive</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-4")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Fertig 🏁</button>
      </div>
    </div>
  );
};

export default GermanGrammarLesson5;
