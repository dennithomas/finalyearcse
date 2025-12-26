import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Les Articles (Articles)",
    explanation:
      "Les articles sont utilisés pour désigner un nom et peuvent être définis ou indéfinis.",
    examples: [
      { french: "Le chat est sur le canapé.", english: "The cat is on the sofa.", pronunciation: "Luh shah eh soor luh kah-nah-pay." },
      { french: "Une pomme est rouge.", english: "An apple is red.", pronunciation: "Oon pohm eh roozh." },
    ],
  },
  {
    rule: "Les Types d'Articles",
    explanation:
      "Les articles définis sont 'le', 'la', 'les' et les articles indéfinis sont 'un', 'une', 'des'.",
    examples: [
      { french: "Le livre est sur la table.", english: "The book is on the table.", pronunciation: "Luh leevr eh soor lah tahbl." },
      { french: "Des enfants jouent dans le parc.", english: "Some children are playing in the park.", pronunciation: "Dayz ahn-fahnt zhoo dahn luh parck." },
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

const FrenchGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Grammaire: Les Articles (Articles)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/french-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default FrenchGrammarLesson2;
