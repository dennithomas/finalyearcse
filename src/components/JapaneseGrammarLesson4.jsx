import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "形容詞 (Adjectives)",
    explanation:
      "形容詞は物や人の特徴を表す言葉です。",
    examples: [
      { japanese: "この本は面白いです。", english: "This book is interesting.", pronunciation: "Kono hon wa omoshiroi desu." },
      { japanese: "彼女は美しいです。", english: "She is beautiful.", pronunciation: "Kanojo wa utsukushii desu." },
    ],
  },
  {
    rule: "形容詞の種類",
    explanation:
      "形容詞はいくつかの種類に分かれます。例えば、肯定的な形容詞や否定的な形容詞などです。",
    examples: [
      { japanese: "この映画は面白くないです。", english: "This movie is not interesting.", pronunciation: "Kono eiga wa omoshiroku nai desu." },
      { japanese: "この花はきれいです。", english: "This flower is beautiful.", pronunciation: "Kono hana wa kirei desu." },
    ],
  },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find((voice) => voice.lang.includes("ja"));
    if (japaneseVoice) utterance.voice = japaneseVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }
};

const JapaneseGrammarLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">文法: 形容詞 (Adjectives)</h1>

      {grammarContent.map((section, idx) => (
        <section key={idx} className="section">
          <h2 className="section-title">📘 {section.rule}</h2>
          <p>{section.explanation}</p>
          <div className="sentence-list">
            {section.examples.map((ex, i) => (
              <div key={i} className="sentence-card">
                <p className="japanese-text">{ex.japanese}</p>
                <p className="pronunciation">({ex.pronunciation})</p>
                <p className="english-text">{ex.english}</p>
                <button className="play-button" onClick={() => speak(ex.japanese)}>
                  <FaVolumeUp /> Play
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}

      <div className="navigation-buttons">
      <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-3")}>Next ➡</button>
      <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseGrammarLesson4;
