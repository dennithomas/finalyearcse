import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Adjectives",
    explanation:
      "An adjective is a word that describes or modifies a noun or pronoun.",
    examples: [
      { english: "She is a beautiful singer.", explanation: "Beautiful describes the noun singer.", pronunciation: "She is a beautiful singer." },
      { english: "The large house is on the hill.", explanation: "Large describes the noun house.", pronunciation: "The large house is on the hill." },
    ],
  },
  {
    rule: "Types of Adjectives",
    explanation:
      "Adjectives can be classified into various types: Descriptive, Quantitative, Demonstrative, Possessive.",
    examples: [
      { english: "This is my car.", explanation: "My is a possessive adjective.", pronunciation: "This is my car." },
      { english: "There are three books on the table.", explanation: "Three is a quantitative adjective.", pronunciation: "There are three books on the table." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((voice) => voice.lang.includes("en"));
    if (englishVoice) utterance.voice = englishVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const EnglishGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Grammar: Adjectives</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="english-text">{ex.english}</p>
                <p className="explanation">({ex.explanation})</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <button className="play-button" onClick={() => speak(ex.english)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default EnglishGrammarLesson3;
