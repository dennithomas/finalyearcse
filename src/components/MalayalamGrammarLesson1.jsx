import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "നാമം (Nouns)",
    explanation:
      "നാമം എന്നത് ഒരു വ്യക്തിയെ, സ്ഥലത്തെ, വസ്തുവിനെ അല്ലെങ്കിൽ ആശയത്തെ സൂചിപ്പിക്കുന്ന പദമാണ്.",
    examples: [
      { malayalam: "റവി സ്കൂളിലേക്ക് പോയി.", english: "Ravi went to school.", pronunciation: "Ravi schoolilek poyi." },
      { malayalam: "പുസ്തകം മേശയ്ക്കു മുകളിലാണ്.", english: "The book is on the table.", pronunciation: "Pusthakam mesaykku mukalil aanu." },
    ],
  },
  {
    rule: "നാമത്തിന്റെ തരം",
    explanation:
      "നാമങ്ങൾ നാലു തരം: വ്യക്തിനാമം, പൊതുനാമം, സംഖ്യാനാമം, സമാഹാരനാമം.",
    examples: [
      { malayalam: "കൊച്ചി ഒരു നഗരം ആണ്.", english: "Kochi is a city.", pronunciation: "Kochi oru nagaram aanu." },
      { malayalam: "പ്രേമം വിലകണക്കാക്കാനാവില്ല.", english: "Love is priceless.", pronunciation: "Premam vilakanakkakkanavilla." },
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

const MalayalamGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="malayalam-lesson-container">
      <h1 className="lesson-title">വ്യാകരണം: നാമം (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalamgrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default MalayalamGrammarLesson1;
