import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Les Noms (Nouns)",
    explanation:
      "Un nom est un mot qui désigne une personne, un lieu, une chose ou une idée.",
    examples: [
      { french: "Pierre est un étudiant.", english: "Pierre is a student.", pronunciation: "Pierre eh uh eh-tyoo-dyan." },
      { french: "Le livre est sur la table.", english: "The book is on the table.", pronunciation: "Lee vree eh soor lah tahbl." },
    ],
  },
  {
    rule: "Les Types de Noms",
    explanation:
      "Les noms peuvent être des noms propres ou des noms communs.",
    examples: [
      { french: "Paris est une grande ville.", english: "Paris is a big city.", pronunciation: "Pa-ree eh ewn grahnd veel." },
      { french: "Le chat est dans la maison.", english: "The cat is in the house.", pronunciation: "Luh shah eh dahn lah meh-zon." },
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

const FrenchGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Grammaire: Les Noms (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default FrenchGrammarLesson1;
