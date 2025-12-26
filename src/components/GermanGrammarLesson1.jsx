import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "Nomen",
    explanation:
      "Ein Nomen ist ein Wort, das eine Person, einen Ort, eine Sache oder eine Idee bezeichnet.",
    examples: [
      { german: "Anna geht zum Supermarkt.", explanation: "Anna ist die Person, Supermarkt ist der Ort.", pronunciation: "Anna geht zum Supermarkt." },
      { german: "Der Hund spielt im Garten.", explanation: "Hund ist das Tier, Garten ist der Ort.", pronunciation: "Der Hund spielt im Garten." },
    ],
  },
  {
    rule: "Arten von Nomen",
    explanation:
      "Es gibt vier Arten von Nomen: Eigennamen, Gattungsnamen, abstrakte Nomen und Kollektivnomen.",
    examples: [
      { german: "Berlin ist eine Stadt.", explanation: "Berlin ist ein Eigenname.", pronunciation: "Berlin ist eine Stadt." },
      { german: "Freiheit ist wichtig.", explanation: "Freiheit ist ein abstraktes Nomen.", pronunciation: "Freiheit ist wichtig." },
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

const GermanGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Grammatik: Nomen</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/germangrammar-2")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanGrammarLesson1;
