import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "வினையச்சொல் (Verbs)",
    explanation:
      "வினையச்சொல் என்பது ஒரு செயல், நிகழ்வு அல்லது நிலையை குறிக்கும் சொல்.",
    examples: [
      { tamil: "அவள் பாடுகிறாள்.", english: "She is singing.", pronunciation: "Avaḷ pādugiRāḷ." },
      { tamil: "நான் சாப்பிட்டேன்.", english: "I ate.", pronunciation: "Nāṉ sāppiṭṭēṉ." },
    ],
  },
  {
    rule: "வினைச்சொல்களின் வகைகள்",
    explanation:
      "வினைச்சொல் மூன்று வகைப்படும்: பரிமாண வினை, செயல்வினை, நிலை வினை.",
    examples: [
      { tamil: "அவன் ஓடுகிறான்.", english: "He is running.", pronunciation: "Avaṉ ōdugiRāṉ." },
      { tamil: "மழை பெய்கிறது.", english: "It is raining.", pronunciation: "Mazhai peykiRathu." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN";
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang.includes("ta"));
    if (tamilVoice) utterance.voice = tamilVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const TamilGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="tamil-lesson-container">
      <h1 className="lesson-title">இலக்கணம்: வினையச்சொல் (Verbs)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="tamil-text">{ex.tamil}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.tamil)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/tamil-grammar1")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/tamilgrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TamilGrammarLesson2;
