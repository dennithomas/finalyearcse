import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "క్రియావిశేషణాలు (Adverbs)",
    explanation:
      "క్రియావిశేషణం అనేది ఒక క్రియను, ఒక విశేషణాన్ని లేదా మరో క్రియావిశేషణాన్ని వివరించే పదం.",
    examples: [
      { telugu: "అవును వేగంగా పరుగెత్తాడు.", english: "He ran quickly.", pronunciation: "Avunu veganga parugethadu." },
      { telugu: "ఆమె శాంతంగా నిద్రపోతుంది.", english: "She is sleeping peacefully.", pronunciation: "Aame shaantanga nidrapothundi." },
    ],
  },
  {
    rule: "క్రియావిశేషణాల రకాలు",
    explanation:
      "క్రియావిశేషణాలు ప్రధానంగా మూడు రకాలు ఉంటాయి: సమయక్రియావిశేషణాలు, స్థలక్రియావిశేషణాలు, మార్పు లేదా ప్రవర్తన క్రియావిశేషణాలు.",
    examples: [
      { telugu: "అతను నిద్రపోయాడు.", english: "He slept soundly.", pronunciation: "Atanu nidrapoyadu." },
      { telugu: "ఆమె తరచుగా చదువుతుంది.", english: "She studies regularly.", pronunciation: "Aame tarachuga chaduthundi." },
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

const TeluguGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="telugu-lesson-container">
      <h1 className="lesson-title">వ్యాకరణం: క్రియావిశేషణాలు (Adverbs)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default TeluguGrammarLesson5;
