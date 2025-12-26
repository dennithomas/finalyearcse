import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const grammarContent = [
  {
    rule: "सर्वनाम (Pronouns)",
    explanation:
      "सर्वनाम वे शब्द होते हैं जो संज्ञा के स्थान पर प्रयोग किए जाते हैं, जैसे कि वह, यह, मैं, तुम आदि।",
    examples: [
      { hindi: "मैं स्कूल जाता हूँ।", english: "I go to school.", pronunciation: "Main school jaata hoon." },
      { hindi: "वह खेल रहा है।", english: "He is playing.", pronunciation: "Vah khel rahaa hai." },
    ],
  },
  {
    rule: "सर्वनाम के प्रकार",
    explanation:
      "सर्वनाम के मुख्य प्रकार हैं: पुरुषवाचक (Personal), प्रश्नवाचक (Interrogative), संकेतवाचक (Demonstrative), संबंधवाचक (Relative), अनिश्चयवाचक (Indefinite)।",
    examples: [
      { hindi: "यह मेरा घर है।", english: "This is my house.", pronunciation: "Yeh mera ghar hai." },
      { hindi: "कौन आया है?", english: "Who has come?", pronunciation: "Kaun aaya hai?" },
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

const HindiGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Grammar: Pronouns (सर्वनाम)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/hindi-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default HindiGrammarLesson2;
