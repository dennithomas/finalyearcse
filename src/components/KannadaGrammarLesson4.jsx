import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "ಕ್ರಿಯಾಪದವಿಭಾಗಗಳು (Adverbs)",
    explanation:
      "ಕ್ರಿಯಾಪದವಿಭಾಗಗಳು ಕ್ರಿಯೆಗಳನ್ನು, ಗುಣಗಳನ್ನು ಅಥವಾ ಇನ್ನಷ್ಟು ಕ್ರಿಯಾಪದವಿಭಾಗಗಳನ್ನು ವಿವರಿಸುತ್ತವೆ.",
    examples: [
      { kannada: "ಅವನು ಶೀಘ್ರ ಓಡುತ್ತಾನೆ.", english: "He runs fast.", pronunciation: "Avanu sheeghra oduttane." },
      { kannada: "ಅವಳು ಬಹಳ ಚೆನ್ನಾಗಿ ಹಾಡುತ್ತಾಳೆ.", english: "She sings very well.", pronunciation: "Avalu bahala chennagi haaduttale." },
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

const KannadaGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">ಕ್ರಿಯಾಪದವಿಭಾಗಗಳು (Adverbs)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/kannadagrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default KannadaGrammarLesson4;
