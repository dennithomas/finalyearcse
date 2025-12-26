import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const verbs = [
  {
    japanese: "食べる",
    english: "To eat",
    pronunciation: "Taberu",
  },
  {
    japanese: "行く",
    english: "To go",
    pronunciation: "Iku",
  },
  {
    japanese: "見る",
    english: "To see/watch",
    pronunciation: "Miru",
  },
  {
    japanese: "聞く",
    english: "To ask/listen",
    pronunciation: "Kiku",
  },
  {
    japanese: "書く",
    english: "To write",
    pronunciation: "Kaku",
  },
  {
    japanese: "読む",
    english: "To read",
    pronunciation: "Yomu",
  },
  {
    japanese: "話す",
    english: "To speak/talk",
    pronunciation: "Hanasu",
  },
  {
    japanese: "買う",
    english: "To buy",
    pronunciation: "Kau",
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

const JapaneseLesson5 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">日本語レッスン 5: 動詞 (Basic Verbs)</h1>
      <div className="sentence-list">
        {verbs.map((verb, index) => (
          <div key={index} className="sentence-card">
            <p className="japanese-text">{verb.japanese}</p>
            <p className="pronunciation">({verb.pronunciation})</p>
            <p className="english-text">{verb.english}</p>
            <button className="play-button" onClick={() => speak(verb.japanese)}>
              <FaVolumeUp /> Play
            </button>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default JapaneseLesson5;
