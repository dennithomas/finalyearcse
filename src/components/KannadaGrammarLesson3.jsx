import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "ಕ್ರೀಯಾಪದಗಳು (Verbs)",
    explanation:
      "ಕ್ರೀಯಾಪದಗಳು ಕ್ರಿಯೆಗಳನ್ನು ಅಥವಾ ಸ್ಥಿತಿಗಳನ್ನು ಸೂಚಿಸುವ ಪದಗಳು.",
    examples: [
      { kannada: "ಅವನಿಗೆ ಓದಲು ಇಷ್ಟವಿದೆ.", english: "He likes to read.", pronunciation: "Avanige odalu ishtavide." },
      { kannada: "ಅವರು ಓಡುತ್ತಾರೆ.", english: "They run.", pronunciation: "Avru oduttare." },
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

const KannadaGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">ಕ್ರೀಯಾಪದಗಳು (Verbs)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default KannadaGrammarLesson3;
