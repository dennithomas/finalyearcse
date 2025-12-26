import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "ക്രിയാവിശേഷണം (Adverbs)",
    explanation:
      "ക്രിയാവിശേഷണം എന്നത് ഒരു ക്രിയയെ, വിശേഷണത്തെ അല്ലെങ്കിൽ മറ്റൊരു ക്രിയാവിശേഷണത്തെ വിശദീകരിക്കുന്ന പദമാണ്. ഉദാഹരണത്തിന്: വേഗത്തിൽ, നന്നായി, ഇന്നലെ തുടങ്ങിയവ.",
    examples: [
      { malayalam: "അവന്‍ വേഗത്തില്‍ ഓടുന്നു.", english: "He runs quickly.", pronunciation: "Avan vegathil oodunnu." },
      { malayalam: "അവള്‍ നന്നായി പാടുന്നു.", english: "She sings well.", pronunciation: "Aval nannayi paadunnu." },
    ],
  },
  {
    rule: "ക്രിയാവിശേഷണങ്ങളുടെ സ്ഥാനമാറ്റം",
    explanation:
      "ക്രിയാവിശേഷണം സാധാരണയായി ക്രിയക്ക് മുമ്പോ ശേഷംവമോ വരുന്നു. അത് വാക്യത്തിന്റെ അര്‍ഥം വ്യത്യസ്തമാക്കും.",
    examples: [
      { malayalam: "അവന്‍ ഇന്നലെ വന്നിരുന്നു.", english: "He had come yesterday.", pronunciation: "Avan innale vannirunnu." },
      { malayalam: "അവള്‍ ഇടയ്ക്കിടെ പാടുന്നു.", english: "She sings occasionally.", pronunciation: "Aval idaykkide paadunnu." },
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

const MalayalamGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="malayalam-lesson-container">
      <h1 className="lesson-title">വ്യാകരണം: ക്രിയാവിശേഷണം (Adverbs)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default MalayalamGrammarLesson5;
