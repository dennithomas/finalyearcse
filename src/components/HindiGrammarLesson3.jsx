import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const grammarContent = [
  {
    rule: "क्रिया (Verbs)",
    explanation:
      "क्रिया वह शब्द होता है जो किसी कार्य के होने या होने की अवस्था को दर्शाता है। जैसे: खाना, पीना, जाना, सोना।",
    examples: [
      { hindi: "मैं खा रहा हूँ।", english: "I am eating.", pronunciation: "Main kha raha hoon." },
      { hindi: "वह सो रही है।", english: "She is sleeping.", pronunciation: "Vah so rahi hai." },
    ],
  },
  {
    rule: "क्रिया के प्रकार",
    explanation:
      "मुख्यतः क्रियाओं के दो प्रकार होते हैं: मुख्य क्रिया (Main Verb) और सहायक क्रिया (Helping Verb)।",
    examples: [
      { hindi: "मैं स्कूल जाता हूँ।", english: "I go to school.", pronunciation: "Main school jaata hoon." },
      { hindi: "वे आ चुके हैं।", english: "They have arrived.", pronunciation: "Ve aa chuke hain." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((voice) => voice.lang.includes("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const HindiGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Grammar: Verbs (क्रिया)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="hindi-text">{ex.hindi}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.hindi)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default HindiGrammarLesson3;
