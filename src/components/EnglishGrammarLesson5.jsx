import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "Pronouns",
    explanation:
      "A pronoun is a word that takes the place of a noun. It helps avoid repetition of the same noun in a sentence.",
    examples: [
      { english: "He is my friend.", explanation: "He replaces the name of the person.", pronunciation: "He is my friend." },
      { english: "I saw them yesterday.", explanation: "Them replaces the noun people or friends.", pronunciation: "I saw them yesterday." },
    ],
  },
  {
    rule: "Types of Pronouns",
    explanation:
      "There are several types of pronouns: Personal Pronouns, Possessive Pronouns, Reflexive Pronouns, Demonstrative Pronouns, and Relative Pronouns.",
    examples: [
      { english: "This is my book.", explanation: "My is a possessive pronoun.", pronunciation: "This is my book." },
      { english: "She did it herself.", explanation: "Herself is a reflexive pronoun.", pronunciation: "She did it herself." },
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

const EnglishGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Grammar: Pronouns</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish ➡</button>
      </div>
    </div>
  );
};

export default EnglishGrammarLesson5;
