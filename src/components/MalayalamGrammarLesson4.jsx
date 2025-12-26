import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "വിശേഷണം (Adjectives)",
    explanation:
      "വിശേഷണം എന്നത് ഒരു നാമത്തെ കൂടുതൽ വ്യക്തമായി വിവരിക്കുന്ന പദമാണ്. ഉദാഹരണത്തിന്: വലിയ, ചുവപ്പുള്ള, നല്ല തുടങ്ങിയവ.",
    examples: [
      { malayalam: "വലിയ വീടാണ് അവന്റെത്.", english: "His house is big.", pronunciation: "Valiya veedaanu avantedu." },
      { malayalam: "അവള്‍ നല്ല പെണ്‍കുട്ടിയാണ്.", english: "She is a good girl.", pronunciation: "Aval nalla penkutti aanu." },
    ],
  },
  {
    rule: "വിശേഷണങ്ങളുടെ ഉപയോഗം",
    explanation:
      "വിശേഷണങ്ങള്‍ സാധാരണയായി നാമത്തിന് മുമ്പോ പിന്നീട് വരാം, പ്രത്യേകിച്ച് ക്രമവിവരണം നല്‍കുമ്പോള്‍.",
    examples: [
      { malayalam: "ഇത് ഒരു ചുവന്ന കാർ ആണ്.", english: "This is a red car.", pronunciation: "Ithu oru chuvanna car aanu." },
      { malayalam: "അവന്‍ കഠിനമായ പരീക്ഷയെ സമീപിക്കുന്നു.", english: "He is facing a tough exam.", pronunciation: "Avan kathinamaya pareekshay samipikkunnu." },
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

const MalayalamGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="malayalam-lesson-container">
      <h1 className="lesson-title">വ്യാകരണം: വിശേഷണം (Adjectives)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default MalayalamGrammarLesson4;
