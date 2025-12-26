import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Les Prépositions (Prepositions)",
    explanation:
      "Les prépositions sont des mots qui indiquent une relation entre un nom ou un pronom et d'autres mots dans la phrase.",
    examples: [
      { french: "Le livre est sur la table.", english: "The book is on the table.", pronunciation: "Luh leevr eh soor lah tahbl." },
      { french: "La souris est sous le canapé.", english: "The mouse is under the sofa.", pronunciation: "Lah soo-ree eh soo luh kah-nah-pay." },
    ],
  },
  {
    rule: "Les Prépositions de Lieu",
    explanation:
      "Les prépositions de lieu sont utilisées pour décrire où se trouve quelque chose.",
    examples: [
      { french: "La maison est à côté du parc.", english: "The house is next to the park.", pronunciation: "Lah meh-zon eh ah koh-tay dyoo park." },
      { french: "Le chat est dans la boîte.", english: "The cat is in the box.", pronunciation: "Luh shah eh dahn lah bwat." },
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

const FrenchGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Grammaire: Les Prépositions (Prepositions)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default FrenchGrammarLesson5;
