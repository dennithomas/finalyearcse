import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "பெயர்ச்சொல் (Nouns)",
    explanation:
      "பெயர்ச்சொல் என்பது ஒரு மனிதன், இடம், பொருள் அல்லது எண்ணத்தை குறிக்கும் சொல்.",
    examples: [
      { tamil: "ரவி பள்ளிக்குச் சென்றார்.", english: "Ravi went to school.", pronunciation: "Ravi pallikkuc sentraar." },
      { tamil: "புத்தகம் மேசையில் உள்ளது.", english: "The book is on the table.", pronunciation: "Puthagam mesaivil ullathu." },
    ],
  },
  {
    rule: "பெயர்ச்சொல்களின் வகைகள்",
    explanation:
      "பெயர்ச்சொல் நான்கு வகைப்படும்: தனிப்பெயர், பொதுப்பெயர், எண்ணப்பெயர், கூட்டுப் பெயர்.",
    examples: [
      { tamil: "சென்னை ஒரு நகரம்.", english: "Chennai is a city.", pronunciation: "Chennai oru nagaram." },
      { tamil: "அன்பு விலைமதிப்பற்றது.", english: "Love is priceless.", pronunciation: "Anbu vilaimadhipparrathu." },
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

const TamilGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="tamil-lesson-container">
      <h1 className="lesson-title">இலக்கணம்: பெயர்ச்சொல் (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/tamilgrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TamilGrammarLesson1;
