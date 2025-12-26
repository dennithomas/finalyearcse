import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const grammarContent = [
  {
    rule: "名詞 (Nouns)",
    explanation:
      "名詞は人、場所、物、または抽象的な概念を表す言葉です。",
    examples: [
      { japanese: "これは本です。", english: "This is a book.", pronunciation: "Kore wa hon desu." },
      { japanese: "私は日本人です。", english: "I am Japanese.", pronunciation: "Watashi wa Nihonjin desu." },
    ],
  },
  {
    rule: "名詞の種類",
    explanation:
      "名詞は固有名詞と普通名詞に分けられます。",
    examples: [
      { japanese: "東京は大きな都市です。", english: "Tokyo is a big city.", pronunciation: "Tōkyō wa ōkina toshi desu." },
      { japanese: "愛は大切です。", english: "Love is important.", pronunciation: "Ai wa taisetsu desu." },
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

const JapaneseGrammarLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">文法: 名詞 (Nouns)</h1>

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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/japanesegrammar-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseGrammarLesson1;
