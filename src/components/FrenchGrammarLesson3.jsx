import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Les Verbes (Verbs)",
    explanation:
      "Les verbes sont des mots qui désignent une action ou un état.",
    examples: [
      { french: "Je mange une pomme.", english: "I am eating an apple.", pronunciation: "Juh mahnzh oon pohm." },
      { french: "Elle parle français.", english: "She speaks French.", pronunciation: "El parl frahn-say." },
    ],
  },
  {
    rule: "Les Types de Verbes",
    explanation:
      "Les verbes peuvent être réguliers ou irréguliers.",
    examples: [
      { french: "Il joue au football.", english: "He plays football.", pronunciation: "Il zhoo oh foot-bahl." },
      { french: "Nous allons au marché.", english: "We are going to the market.", pronunciation: "Noo alon oh mar-shay." },
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

const FrenchGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Grammaire: Les Verbes (Verbs)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="french-text">{ex.french}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.french)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default FrenchGrammarLesson3;
