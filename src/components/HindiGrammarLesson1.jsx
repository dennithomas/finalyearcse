import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const grammarContent = [
  {
    rule: "संज्ञा (Nouns)",
    explanation:
      "संज्ञा वे शब्द होते हैं जो किसी व्यक्ति, स्थान, वस्तु या भाव का नाम बताते हैं।",
    examples: [
      { hindi: "राम स्कूल गया।", english: "Ram went to school.", pronunciation: "Raam school gaya." },
      { hindi: "किताब मेज़ पर है।", english: "The book is on the table.", pronunciation: "Kitaab mez par hai." },
    ],
  },
  {
    rule: "संज्ञा के प्रकार",
    explanation:
      "संज्ञा के चार मुख्य प्रकार होते हैं: व्यक्तिवाचक, जातिवाचक, भाववाचक और सामूहिक संज्ञा।",
    examples: [
      { hindi: "दिल्ली एक शहर है।", english: "Delhi is a city.", pronunciation: "Dilli ek shahar hai." },
      { hindi: "ज्ञान अमूल्य है।", english: "Knowledge is priceless.", pronunciation: "Gyaan amoolya hai." },
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

const HindiGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Grammar: Nouns (संज्ञा)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default HindiGrammarLesson1;
