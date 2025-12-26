// GermanPhraseLesson3.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Reisen (Travel)",
    phrases: [
      { german: "Wo ist der Bahnhof?", explanation: "Where is the train station?", pronunciation: "Wo ist der Bahnhof?" },
      { german: "Ich brauche ein Taxi.", explanation: "I need a taxi.", pronunciation: "Ich brauche ein Taxi." },
      { german: "Wie viel kostet das Ticket?", explanation: "How much does the ticket cost?", pronunciation: "Wie viel kostet das Ticket?" },
      { german: "Ich habe eine Reservierung.", explanation: "I have a reservation.", pronunciation: "Ich habe eine Reservierung." },
    ],
  },
  {
    category: "Im Hotel (At the Hotel)",
    phrases: [
      { german: "Haben Sie ein freies Zimmer?", explanation: "Do you have a free room?", pronunciation: "Haben Sie ein freies Zimmer?" },
      { german: "Wie viele Nächte?", explanation: "How many nights?", pronunciation: "Wie viele Nächte?" },
      { german: "Ich möchte auschecken.", explanation: "I would like to check out.", pronunciation: "Ich möchte auschecken." },
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

const GermanPhraseLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Phrasen: Reisen</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">🧳 {section.category}</h2>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-2")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-4")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanPhraseLesson3;
