import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const numbers = [
  {
    japanese: "一",
    english: "One",
    pronunciation: "Ichi",
  },
  {
    japanese: "二",
    english: "Two",
    pronunciation: "Ni",
  },
  {
    japanese: "三",
    english: "Three",
    pronunciation: "San",
  },
  {
    japanese: "四",
    english: "Four",
    pronunciation: "Shi / Yon",
  },
  {
    japanese: "五",
    english: "Five",
    pronunciation: "Go",
  },
  {
    japanese: "六",
    english: "Six",
    pronunciation: "Roku",
  },
  {
    japanese: "七",
    english: "Seven",
    pronunciation: "Shichi / Nana",
  },
  {
    japanese: "八",
    english: "Eight",
    pronunciation: "Hachi",
  },
  {
    japanese: "九",
    english: "Nine",
    pronunciation: "Kyuu / Ku",
  },
  {
    japanese: "十",
    english: "Ten",
    pronunciation: "Juu",
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

const JapaneseLesson3 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">日本語レッスン 3: 数字 (Numbers 1-10)</h1>
      <div className="sentence-list">
        {numbers.map((number, index) => (
          <div key={index} className="sentence-card">
            <p className="japanese-text">{number.japanese}</p>
            <p className="pronunciation">({number.pronunciation})</p>
            <p className="english-text">{number.english}</p>
            <button className="play-button" onClick={() => speak(number.japanese)}>
              <FaVolumeUp /> Play
            </button>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-2")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-4")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseLesson3;
