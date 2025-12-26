// GermanPhraseLesson4.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Einkaufen (Shopping)",
    phrases: [
      { german: "Wie viel kostet das?", explanation: "How much does it cost?", pronunciation: "Wie viel kostet das?" },
      { german: "Ich möchte das kaufen.", explanation: "I would like to buy this.", pronunciation: "Ich möchte das kaufen." },
      { german: "Haben Sie das in einer anderen Größe?", explanation: "Do you have this in another size?", pronunciation: "Haben Sie das in einer anderen Größe?" },
      { german: "Wo ist die Umkleidekabine?", explanation: "Where is the fitting room?", pronunciation: "Wo ist die Umkleidekabine?" },
    ],
  },
  {
    category: "Bezahlen (Paying)",
    phrases: [
      { german: "Ich bezahle mit Karte.", explanation: "I’m paying by card.", pronunciation: "Ich bezahle mit Karte." },
      { german: "Kann ich bar bezahlen?", explanation: "Can I pay in cash?", pronunciation: "Kann ich bar bezahlen?" },
      { german: "Könnte ich bitte die Quittung bekommen?", explanation: "Could I get the receipt, please?", pronunciation: "Könnte ich bitte die Quittung bekommen?" },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find((voice) => voice.lang.includes("de"));
    if (germanVoice) utterance.voice = germanVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const GermanPhraseLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Phrasen: Einkaufen</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">🛍️ {section.category}</h2>
          <div className="sentence-list">
            {section.phrases.map((ph, i) => (
              <div key={i} className="sentence-card">
                <p className="german-text">{ph.german}</p>
                <p className="explanation">({ph.explanation})</p>
                <p className="pronunciation">({ph.pronunciation})</p>
                <button className="play-button" onClick={() => speak(ph.german)}>
                  <FaVolumeUp /> Abspielen
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-3")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-5")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanPhraseLesson4;
