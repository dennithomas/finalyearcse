import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "ക്രിയ (Verbs)",
    explanation:
      "ക്രിയ എന്നത് ഒരു പ്രവർത്തനത്തെ അല്ലെങ്കിൽ അവസ്ഥയെ സൂചിപ്പിക്കുന്ന പദമാണ്. ഉദാഹരണത്തിന്, പോകുക, എഴുതുക, വിളിക്കുക തുടങ്ങിയവ.",
    examples: [
      { malayalam: "അവന്‍ ഓടുന്നു.", english: "He is running.", pronunciation: "Avan oodunnu." },
      { malayalam: "അവള്‍ കത്തുന്നു.", english: "She is writing.", pronunciation: "Aval kathunnu." },
    ],
  },
  {
    rule: "ക്രിയയുടെ രൂപഭേദങ്ങള്‍",
    explanation:
      "ക്രിയയുടെ കാലഭേദം അനുസരിച്ച് രൂപം മാറുന്നു: വർത്തമാനകാലം (present), ഭവിഷ്യത്ത്കാലം (future), geçmişകാലം (past).",
    examples: [
      { malayalam: "ഞാന്‍ ഭക്ഷിക്കുന്നു.", english: "I am eating.", pronunciation: "Njan bhakshikkunnu." },
      { malayalam: "അവന്‍ വന്നിരുന്നു.", english: "He had come.", pronunciation: "Avan vannirunnu." },
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

const MalayalamGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="malayalam-lesson-container">
      <h1 className="lesson-title">വ്യാകരണം: ക്രിയ (Verbs)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default MalayalamGrammarLesson3;
