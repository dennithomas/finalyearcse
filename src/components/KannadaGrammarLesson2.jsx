import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "ವಿಶೇಷಣಗಳು (Adjectives)",
    explanation:
      "ವಿಶೇಷಣಗಳು ಯಾವುದೇ ವ್ಯಕ್ತಿಯ, ವಸ್ತುವಿನ ಅಥವಾ ಸ್ಥಳದ ಗುಣವನ್ನು ವಿವರಿಸುವ ಪದಗಳು.",
    examples: [
      { kannada: "ಅದು ದೊಡ್ಡ ಮನೆ.", english: "That is a big house.", pronunciation: "Adu dodda mane." },
      { kannada: "ಅವನು ಹೊತ್ತ ಕಡಿಮೆ.", english: "He is wearing a red shirt.", pronunciation: "Avanu hotta kadime." },
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

const KannadaGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">ವಿಶೇಷಣಗಳು: (Adjectives)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/kannada-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default KannadaGrammarLesson2;
