import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "సర్వనామాలు (Pronouns)",
    explanation:
      "సర్వనామం అనేది పేరుకు బదులుగా ఉపయోగించబడే పదం.",
    examples: [
      { telugu: "అవను నా స్నేహితుడు.", english: "He is my friend.", pronunciation: "Avanu naa snehitudu." },
      { telugu: "నేను దాన్ని చూశాను.", english: "I saw it.", pronunciation: "Nenu daanni choosanu." },
    ],
  },
  {
    rule: "సర్వనామాల రకాలు",
    explanation:
      "సర్వనామాలు నాలుగు రకాలుగా ఉంటాయి: వ్యక్తిగత సర్వనామాలు, గుణ సర్వనామాలు, ప్రతిస్పందన సర్వనామాలు.",
    examples: [
      { telugu: "ఇది నా పుస్తకం.", english: "This is my book.", pronunciation: "Idi naa pustakam." },
      { telugu: "అతను తన వద్ద ఉన్నది.", english: "He has it.", pronunciation: "Atanu tana vadda unnadi." },
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

const TeluguGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="telugu-lesson-container">
      <h1 className="lesson-title">వ్యాకరణం: సర్వనామాలు (Pronouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/telugu-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TeluguGrammarLesson2;
