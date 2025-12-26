import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Verbos (Verbs)",
    explanation:
      "Los verbos son palabras que expresan acciones o estados.",
    examples: [
      { spanish: "Yo hablo español.", english: "I speak Spanish.", pronunciation: "Yo hablo español." },
      { spanish: "Ellos comen pizza.", english: "They eat pizza.", pronunciation: "Ellos comen pizza." },
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

const SpanishGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Gramática: Verbos</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/spanishgrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/spanishgrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default SpanishGrammarLesson3;
