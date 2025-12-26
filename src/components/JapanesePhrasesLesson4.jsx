import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const daysOfTheWeek = [
  {
    japanese: "月曜日",
    english: "Monday",
    pronunciation: "Getsuyoubi",
  },
  {
    japanese: "火曜日",
    english: "Tuesday",
    pronunciation: "Kayoubi",
  },
  {
    japanese: "水曜日",
    english: "Wednesday",
    pronunciation: "Suiyoubi",
  },
  {
    japanese: "木曜日",
    english: "Thursday",
    pronunciation: "Mokuyoubi",
  },
  {
    japanese: "金曜日",
    english: "Friday",
    pronunciation: "Kinyoubi",
  },
  {
    japanese: "土曜日",
    english: "Saturday",
    pronunciation: "Doyoubi",
  },
  {
    japanese: "日曜日",
    english: "Sunday",
    pronunciation: "Nichiyoubi",
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

const JapaneseLesson4 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">日本語レッスン 4: 曜日 (Days of the Week)</h1>
      <div className="sentence-list">
        {daysOfTheWeek.map((day, index) => (
          <div key={index} className="sentence-card">
            <p className="japanese-text">{day.japanese}</p>
            <p className="pronunciation">({day.pronunciation})</p>
            <p className="english-text">{day.english}</p>
            <button className="play-button" onClick={() => speak(day.japanese)}>
              <FaVolumeUp /> Play
            </button>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-3")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-5")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseLesson4;
