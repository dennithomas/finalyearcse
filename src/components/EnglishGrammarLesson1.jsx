import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Nouns",
    explanation:
      "A noun is a word that represents a person, place, thing, or idea.",
    examples: [
      { english: "John went to the market.", explanation: "John is the person, market is the place.", pronunciation: "John went to the market." },
      { english: "The dog is playing in the yard.", explanation: "Dog is the animal, yard is the place.", pronunciation: "The dog is playing in the yard." },
    ],
  },
  {
    rule: "Types of Nouns",
    explanation:
      "There are four types of nouns: Proper Nouns, Common Nouns, Abstract Nouns, and Collective Nouns.",
    examples: [
      { english: "London is a city.", explanation: "London is a proper noun.", pronunciation: "London is a city." },
      { english: "I love freedom.", explanation: "Freedom is an abstract noun.", pronunciation: "I love freedom." },
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

const EnglishGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Grammar: Nouns</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default EnglishGrammarLesson1;
