import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "代名詞 (Pronouns)",
    explanation:
      "代名詞は名詞の代わりに使う言葉です。",
    examples: [
      { japanese: "これは私のペンです。", english: "This is my pen.", pronunciation: "Kore wa watashi no pen desu." },
      { japanese: "彼は学生です。", english: "He is a student.", pronunciation: "Kare wa gakusei desu." },
    ],
  },
  {
    rule: "代名詞の種類",
    explanation:
      "代名詞には人称代名詞、指示代名詞などがあります。",
    examples: [
      { japanese: "あなたはどうですか？", english: "How about you?", pronunciation: "Anata wa dō desu ka?" },
      { japanese: "それは良いですね。", english: "That is good.", pronunciation: "Sore wa ii desu ne." },
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

const JapaneseGrammarLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">文法: 代名詞 (Pronouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/lesson/japanese-grammar")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseGrammarLesson2;
