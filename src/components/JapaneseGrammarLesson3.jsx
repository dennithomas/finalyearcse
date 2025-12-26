import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "動詞 (Verbs)",
    explanation:
      "動詞は行動、状態、または存在を表す言葉です。",
    examples: [
      { japanese: "私は食べます。", english: "I eat.", pronunciation: "Watashi wa tabemasu." },
      { japanese: "彼は走ります。", english: "He runs.", pronunciation: "Kare wa hashirimasu." },
    ],
  },
  {
    rule: "動詞の時制",
    explanation:
      "動詞は現在、過去、未来の時制に変化します。",
    examples: [
      { japanese: "私は今、食べています。", english: "I am eating right now.", pronunciation: "Watashi wa ima, tabeteimasu." },
      { japanese: "私は昨日、食べました。", english: "I ate yesterday.", pronunciation: "Watashi wa kinō, tabemashita." },
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

const JapaneseGrammarLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">文法: 動詞 (Verbs)</h1>

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
      <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-2")}>Next ➡</button>
      <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseGrammarLesson3;
