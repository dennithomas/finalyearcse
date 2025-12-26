import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "ಹಿರಿಯ ಹೆಸರೇನು (Nouns)",
    explanation:
      "ಹಿರಿಯ ಹೆಸರೇನು ಅಥವಾ ಸಬ್ದವು ಯಾವುದೇ ವ್ಯಕ್ತಿ, ಸ್ಥಳ, ವಸ್ತು ಅಥವಾ ಆಲೋಚನೆ ಸೂಚಿಸುವ ಪದವಾಗಿದೆ.",
    examples: [
      { kannada: "ರಾಮು ಶಾಲೆಗೆ ಹೋಗುತ್ತಾನೆ.", english: "Ramu is going to school.", pronunciation: "Raamu shaalege hoguttane." },
      { kannada: "ಪುಸ್ತಕ ಮೇಜಿನ ಮೇಲೆ ಇದೆ.", english: "The book is on the table.", pronunciation: "Pustaka mezina mele ide." },
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

const KannadaGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">ವಿಶೇಷಣ: ಹಿರಿಯ ಹೆಸರೇನು (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default KannadaGrammarLesson1;
