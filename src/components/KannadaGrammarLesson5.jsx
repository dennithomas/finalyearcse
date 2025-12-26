import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "ಸರ್ವನಾಮಗಳು (Pronouns)",
    explanation:
      "ಸರ್ವನಾಮಗಳು ಹೆಸರುಗಳ ಬದಲಾಗಿ ಬಳಸುವ ಪದಗಳು.",
    examples: [
      { kannada: "ಅವನು ಚೆನ್ನಾಗಿದ್ದಾನೆ.", english: "He is good.", pronunciation: "Avanu chennagiddane." },
      { kannada: "ಅವಳು ನನಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ.", english: "She helps me.", pronunciation: "Avalu nanage sahaaya maaduttade." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((voice) => voice.lang.includes("kn"));
    if (kannadaVoice) utterance.voice = kannadaVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const KannadaGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">ಸರ್ವನಾಮಗಳು (Pronouns)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="kannada-text">{ex.kannada}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.kannada)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default KannadaGrammarLesson5;
