import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "സര്‍വ്വനാമം (Pronouns)",
    explanation:
      "സര്‍വ്വനാമം എന്നത് നാമത്തിന് പകരം വരുന്ന പദമാണ്. ഉദാഹരണത്തിന്, അവന്‍, അവള്‍, ഞാന്‍, നീ തുടങ്ങിയവ.",
    examples: [
      { malayalam: "അവന്‍ പുസ്തകം വായിച്ചു.", english: "He read the book.", pronunciation: "Avan pusthakam vaayichu." },
      { malayalam: "ഞാന്‍ സ്‌കൂളില്‍ പോയി.", english: "I went to school.", pronunciation: "Njan schoolil poyi." },
    ],
  },
  {
    rule: "സര്‍വ്വനാമങ്ങളുടെ തരം",
    explanation:
      "സര്‍വ്വനാമങ്ങള്‍ പല തരത്തിലുള്ളവയാണ്: വ്യക്തിപരമായത്, ആസ്ഥാനപരമായത്, സംശയപ്രകടനപരമായത് തുടങ്ങിയവ.",
    examples: [
      { malayalam: "നിങ്ങള്‍ എവിടെയാണു പോകുന്നത്?", english: "Where are you going?", pronunciation: "Ningal evidayaanu pokunnathu?" },
      { malayalam: "ഇത് എന്റേത് ആണ്.", english: "This is mine.", pronunciation: "Ithu entethu aanu." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN";
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml"));
    if (malayalamVoice) utterance.voice = malayalamVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const MalayalamGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="malayalam-lesson-container">
      <h1 className="lesson-title">വ്യാകരണം: സര്‍വ്വനാമം (Pronouns)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="malayalam-text">{ex.malayalam}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.malayalam)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/grammar-1")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default MalayalamGrammarLesson2;
