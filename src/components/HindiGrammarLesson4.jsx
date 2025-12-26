import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const grammarContent = [
  {
    rule: "विशेषण (Adjectives)",
    explanation:
      "विशेषण वे शब्द होते हैं जो संज्ञा या सर्वनाम की विशेषता बताते हैं। जैसे: सुंदर, बड़ा, नीला, मीठा।",
    examples: [
      { hindi: "वह सुंदर लड़की है।", english: "She is a beautiful girl.", pronunciation: "Vah sundar ladki hai." },
      { hindi: "यह बड़ा घर है।", english: "This is a big house.", pronunciation: "Yah bada ghar hai." },
    ],
  },
  {
    rule: "विशेषण के प्रकार",
    explanation:
      "विशेषणों के प्रकार हैं: गुणवाचक (Quality), परिमाणवाचक (Quantity), संख्यावाचक (Number) आदि।",
    examples: [
      { hindi: "मैं दो सेब खा रहा हूँ।", english: "I am eating two apples.", pronunciation: "Main do seb kha raha hoon." },
      { hindi: "उसने थोड़ा पानी पिया।", english: "He drank a little water.", pronunciation: "Usne thoda paani piya." },
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

const HindiGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Grammar: Adjectives (विशेषण)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default HindiGrammarLesson4;
