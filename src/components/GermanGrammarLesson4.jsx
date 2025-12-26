// GermanGrammarLesson4.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Personalpronomen",
    explanation: "Personalpronomen ersetzen Nomen und zeigen, wer etwas tut.",
    examples: [
      { german: "Ich bin müde.", explanation: "‘Ich’ ersetzt den Sprecher.", pronunciation: "Ich bin müde." },
      { german: "Sie tanzt gern.", explanation: "‘Sie’ steht für eine weibliche Person.", pronunciation: "Sie tanzt gern." },
    ],
  },
  {
    rule: "Pronomen-Tabelle",
    explanation: "Ich, du, er/sie/es, wir, ihr, sie/Sie sind die gängigen Pronomen.",
    examples: [
      { german: "Wir lernen zusammen.", explanation: "‘Wir’ steht für eine Gruppe, die spricht.", pronunciation: "Wir lernen zusammen." },
      { german: "Ihr geht spazieren.", explanation: "‘Ihr’ ist die 2. Person Plural.", pronunciation: "Ihr geht spazieren." },
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

const GermanGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Grammatik: Personalpronomen</h1>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-3")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-5")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanGrammarLesson4;
