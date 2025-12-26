import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "Verbs",
    explanation:
      "A verb expresses action or being. It tells what the subject of the sentence does or is.",
    examples: [
      { english: "She runs every morning.", explanation: "Runs is the verb expressing action.", pronunciation: "She runs every morning." },
      { english: "They are happy.", explanation: "Are is the verb expressing being.", pronunciation: "They are happy." },
    ],
  },
  {
    rule: "Tenses of Verbs",
    explanation:
      "Verbs are used in different tenses to express actions at different times: Present, Past, Future.",
    examples: [
      { english: "He runs daily.", explanation: "Present tense.", pronunciation: "He runs daily." },
      { english: "He ran yesterday.", explanation: "Past tense.", pronunciation: "He ran yesterday." },
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

const EnglishGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Grammar: Verbs</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-1")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/englishgrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default EnglishGrammarLesson2;
