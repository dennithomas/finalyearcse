import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";


const phrases = [
  {
    japanese: "お名前は何ですか？",
    english: "What is your name?",
    pronunciation: "Onamae wa nan desu ka?",
  },
  {
    japanese: "私は[名前]です。",
    english: "I am [name].",
    pronunciation: "Watashi wa [name] desu.",
  },
  {
    japanese: "どこから来ましたか？",
    english: "Where are you from?",
    pronunciation: "Doko kara kimashita ka?",
  },
  {
    japanese: "私は[国]から来ました。",
    english: "I am from [country].",
    pronunciation: "Watashi wa [kuni] kara kimashita.",
  },
  {
    japanese: "あなたはどうですか？",
    english: "How about you?",
    pronunciation: "Anata wa dou desu ka?",
  },
  {
    japanese: "元気です、ありがとう。",
    english: "I am fine, thank you.",
    pronunciation: "Genki desu, arigatou.",
  },
  {
    japanese: "初めまして。",
    english: "Nice to meet you.",
    pronunciation: "Hajimemashite.",
  },
  {
    japanese: "よろしくお願いします。",
    english: "Please take care of me (used when meeting someone).",
    pronunciation: "Yoroshiku onegaishimasu.",
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

const JapaneseLesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">日本語レッスン 2: 自己紹介 (Self Introduction)</h1>
      <div className="sentence-list">
        {phrases.map((phrase, index) => (
          <div key={index} className="sentence-card">
            <p className="japanese-text">{phrase.japanese}</p>
            <p className="pronunciation">({phrase.pronunciation})</p>
            <p className="english-text">{phrase.english}</p>
            <button className="play-button" onClick={() => speak(phrase.japanese)}>
              <FaVolumeUp /> Play
            </button>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-1")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-3")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseLesson2;
