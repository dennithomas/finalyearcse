// GermanPhraseLesson5.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Im Restaurant (At the Restaurant)",
    phrases: [
      { german: "Ich hätte gern die Speisekarte.", explanation: "I would like the menu.", pronunciation: "Ich hätte gern die Speisekarte." },
      { german: "Was empfehlen Sie?", explanation: "What do you recommend?", pronunciation: "Was empfehlen Sie?" },
      { german: "Ich nehme das Schnitzel.", explanation: "I’ll have the schnitzel.", pronunciation: "Ich nehme das Schnitzel." },
      { german: "Ich bin Vegetarier.", explanation: "I am a vegetarian.", pronunciation: "Ich bin Vegetarier." },
    ],
  },
  {
    category: "Bezahlen im Restaurant (Paying at the Restaurant)",
    phrases: [
      { german: "Die Rechnung, bitte.", explanation: "The bill, please.", pronunciation: "Die Rechnung, bitte." },
      { german: "Stimmt so.", explanation: "Keep the change.", pronunciation: "Stimmt so." },
      { german: "Können wir getrennt zahlen?", explanation: "Can we pay separately?", pronunciation: "Können wir getrennt zahlen?" },
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

const GermanPhraseLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Phrasen: Im Restaurant</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">🍽️ {section.category}</h2>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-4")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default GermanPhraseLesson5;
