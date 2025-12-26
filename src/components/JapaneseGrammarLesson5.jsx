import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const grammarContent = [
  {
    rule: "副詞 (Adverbs)",
    explanation:
      "副詞は動詞、形容詞、または他の副詞を修飾する言葉です。",
    examples: [
      { japanese: "私は速く走ります。", english: "I run fast.", pronunciation: "Watashi wa hayaku hashirimasu." },
      { japanese: "彼は上手に歌います。", english: "He sings well.", pronunciation: "Kare wa jōzu ni utaimasu." },
    ],
  },
  {
    rule: "副詞の種類",
    explanation:
      "副詞には時間、副詞、頻度、程度などの種類があります。",
    examples: [
      { japanese: "私は毎日勉強します。", english: "I study every day.", pronunciation: "Watashi wa mainichi benkyō shimasu." },
      { japanese: "彼はとても速く走ります。", english: "He runs very fast.", pronunciation: "Kare wa totemo hayaku hashirimasu." },
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

const JapaneseGrammarLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">文法: 副詞 (Adverbs)</h1>

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
      <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-4")}>Next ➡</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default JapaneseGrammarLesson5;
