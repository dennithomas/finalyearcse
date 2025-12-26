// GermanPhraseLesson2.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";
import "./EnglishLesson.css";

const phraseContent = [
  {
    category: "Grundlegende Konversation (Basic Conversation)",
    phrases: [
      { german: "Wie geht es dir?", explanation: "How are you?", pronunciation: "Wie geht es dir?" },
      { german: "Mir geht es gut, danke.", explanation: "I’m fine, thank you.", pronunciation: "Mir geht es gut, danke." },
      { german: "Wie heißt du?", explanation: "What’s your name?", pronunciation: "Wie heißt du?" },
      { german: "Ich heiße Anna.", explanation: "My name is Anna.", pronunciation: "Ich heiße Anna." },
    ],
  },
  {
    category: "Häufige Ausdrücke (Common Expressions)",
    phrases: [
      { german: "Wie spät ist es?", explanation: "What time is it?", pronunciation: "Wie spät ist es?" },
      { german: "Ich verstehe nicht.", explanation: "I don’t understand.", pronunciation: "Ich verstehe nicht." },
      { german: "Kannst du mir helfen?", explanation: "Can you help me?", pronunciation: "Kannst du mir helfen?" },
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

const GermanPhraseLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="german-lesson-container">
      <h1 className="lesson-title">Phrasen: Grundlegende Konversation</h1>
      {phraseContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">💬 {section.category}</h2>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-1")}>⬅ Zurück</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/german-phrases-3")}>Weiter ➡</button>
      </div>
    </div>
  );
};

export default GermanPhraseLesson2;
