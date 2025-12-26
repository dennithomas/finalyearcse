import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Les Adjectifs (Adjectives)",
    explanation:
      "Les adjectifs sont des mots qui décrivent un nom ou un pronom.",
    examples: [
      { french: "Le chat est noir.", english: "The cat is black.", pronunciation: "Luh shah eh nwahr." },
      { french: "La pomme est rouge.", english: "The apple is red.", pronunciation: "Lah pohm eh roozh." },
    ],
  },
  {
    rule: "L'Accord des Adjectifs",
    explanation:
      "Les adjectifs s'accordent en genre et en nombre avec le nom qu'ils qualifient.",
    examples: [
      { french: "Les chiens sont blancs.", english: "The dogs are white.", pronunciation: "Lay shyan sohn blahn." },
      { french: "Les fleurs sont belles.", english: "The flowers are beautiful.", pronunciation: "Lay flur sohn bel." },
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

const FrenchGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="french-lesson-container">
      <h1 className="lesson-title">Grammaire: Les Adjectifs (Adjectives)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/frenchgrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default FrenchGrammarLesson4;

