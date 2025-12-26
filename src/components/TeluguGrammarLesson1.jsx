import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "పేరు (Nouns)",
    explanation:
      "పేరు ఒక వ్యక్తి, స్థలం, వస్తువు లేదా భావాన్ని సూచించే పదం.",
    examples: [
      { telugu: "రవి పాఠశాలకు వెళ్ళాడు.", english: "Ravi went to school.", pronunciation: "Ravi paathashaala ku velladu." },
      { telugu: "పుస్తకం మెజపై ఉంది.", english: "The book is on the table.", pronunciation: "Pustakam mejapai undi." },
    ],
  },
  {
    rule: "పేరు యొక్క రకాలు",
    explanation:
      "పేరు నాలుగు రకాలుగా ఉంటుంది: స్వతంత్ర పేరు, సాధారణ పేరు, సంఖ్యా పేరు, సమూహం పేరు.",
    examples: [
      { telugu: "హైదరాబాద్ ఒక నగరం.", english: "Hyderabad is a city.", pronunciation: "Hyderabad oka nagaram." },
      { telugu: "ప్రేమ అనర్థకమైనది.", english: "Love is priceless.", pronunciation: "Prema anarthakaminadi." },
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

const TeluguGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="telugu-lesson-container">
      <h1 className="lesson-title">వ్యాకరణం: పేరు (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TeluguGrammarLesson1;
