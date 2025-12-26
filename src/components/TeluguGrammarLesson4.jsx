import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "విశేషణాలు (Adjectives)",
    explanation:
      "విశేషణం అనేది ఒక పేరును లేదా సర్వనామాన్ని వివరించే పదం.",
    examples: [
      { telugu: "ఆమె అందమైన అమ్మాయి.", english: "She is a beautiful girl.", pronunciation: "Aame andamaina ammayi." },
      { telugu: "తనదైన తెలివిగల వ్యక్తి.", english: "He is an intelligent person.", pronunciation: "Tandaina telivigala vyakti." },
    ],
  },
  {
    rule: "విశేషణాల రకాలు",
    explanation:
      "విశేషణాలు ప్రధానంగా రెండు రకాలుగా ఉంటాయి: పరిమాణ విశేషణాలు, లక్షణ విశేషణాలు.",
    examples: [
      { telugu: "పెద్ద ఇంటి ముందు ఉన్నాను.", english: "I am in front of the big house.", pronunciation: "Peddha inti mundu unnanu." },
      { telugu: "పచ్చని మైదానం చూస్తున్నాను.", english: "I am looking at the green field.", pronunciation: "Pachchani maidanam choostunnanu." },
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

const TeluguGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="telugu-lesson-container">
      <h1 className="lesson-title">వ్యాకరణం: విశేషణాలు (Adjectives)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/telugugrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default TeluguGrammarLesson4;
