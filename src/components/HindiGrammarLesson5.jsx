import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const grammarContent = [
  {
    rule: "क्रिया विशेषण (Adverbs)",
    explanation:
      "क्रिया विशेषण वे शब्द होते हैं जो क्रिया की विशेषता बताते हैं। जैसे: धीरे, तेज़ी से, हमेशा, कभी।",
    examples: [
      { hindi: "वह धीरे-धीरे चलता है।", english: "He walks slowly.", pronunciation: "Vah dheere-dheere chalta hai." },
      { hindi: "मैं रोज़ स्कूल जाता हूँ।", english: "I go to school every day.", pronunciation: "Main roz school jaata hoon." },
    ],
  },
  {
    rule: "प्रकार",
    explanation:
      "क्रिया विशेषणों के प्रकार हैं: विधि, समय, स्थान, कारण आदि के अनुसार।",
    examples: [
      { hindi: "बच्चा बाहर खेल रहा है।", english: "The child is playing outside.", pronunciation: "Bachcha baahar khel raha hai." },
      { hindi: "उसने जल्दी जवाब दिया।", english: "He answered quickly.", pronunciation: "Usne jaldi jawaab diya." },
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

const HindiGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Grammar: Adverbs (क्रिया विशेषण)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-final-quiz")}>Next ➡</button>
      </div>
    </div>
  );
};

export default HindiGrammarLesson5;
