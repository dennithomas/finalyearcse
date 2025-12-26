import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Adverbs",
    explanation:
      "An adverb is a word that modifies a verb, an adjective, or another adverb. It tells us how, when, where, or to what extent something is done.",
    examples: [
      { english: "She runs quickly.", explanation: "Quickly modifies the verb runs.", pronunciation: "She runs quickly." },
      { english: "He speaks very loudly.", explanation: "Very modifies the adverb loudly.", pronunciation: "He speaks very loudly." },
    ],
  },
  {
    rule: "Types of Adverbs",
    explanation:
      "Adverbs can describe manner, time, frequency, place, and degree.",
    examples: [
      { english: "He arrived early.", explanation: "Early is an adverb of time.", pronunciation: "He arrived early." },
      { english: "She is extremely happy.", explanation: "Extremely is an adverb of degree.", pronunciation: "She is extremely happy." },
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

const EnglishGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Grammar: Adverbs</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default EnglishGrammarLesson4;
