import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "క్రియ (Verbs)",
    explanation:
      "క్రియ అనేది ఒక పనిని లేదా చర్యను సూచించే పదం.",
    examples: [
      { telugu: "ఆమె చదువుతుంది.", english: "She is reading.", pronunciation: "Aame chaduthundi." },
      { telugu: "వారు నడుస్తున్నారు.", english: "They are walking.", pronunciation: "Vaaru nadustunnaru." },
    ],
  },
  {
    rule: "క్రియ యొక్క రకాలు",
    explanation:
      "క్రియలు కొన్ని రకాలను కలిగి ఉంటాయి: కార్యాచరణ క్రియ, సహాయ క్రియ.",
    examples: [
      { telugu: "నేను పుస్తకం చదువుతున్నాను.", english: "I am reading a book.", pronunciation: "Nenu pustakam chaduthunnanu." },
      { telugu: "వారు వెళ్లిపోతున్నారు.", english: "They are leaving.", pronunciation: "Vaaru vellikpoetunnaru." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = voices.find((voice) => voice.lang.includes("te"));
    if (teluguVoice) utterance.voice = teluguVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const TeluguGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="telugu-lesson-container">
      <h1 className="lesson-title">వ్యాకరణం: క్రియ (Verbs)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="telugu-text">{ex.telugu}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.telugu)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TeluguGrammarLesson3;
