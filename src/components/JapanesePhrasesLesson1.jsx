import React from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const phrases = [
  {
    japanese: "こんにちは",
    english: "Hello / Good afternoon",
    pronunciation: "Konnichiwa",
  },
  {
    japanese: "おはようございます",
    english: "Good morning",
    pronunciation: "Ohayou gozaimasu",
  },
  {
    japanese: "こんばんは",
    english: "Good evening",
    pronunciation: "Konbanwa",
  },
  {
    japanese: "ありがとうございます",
    english: "Thank you",
    pronunciation: "Arigatou gozaimasu",
  },
  {
    japanese: "すみません",
    english: "Excuse me / I'm sorry",
    pronunciation: "Sumimasen",
  },
  {
    japanese: "はい",
    english: "Yes",
    pronunciation: "Hai",
  },
  {
    japanese: "いいえ",
    english: "No",
    pronunciation: "Iie",
  },
  {
    japanese: "お元気ですか？",
    english: "How are you?",
    pronunciation: "Ogenki desu ka?",
  },
  {
    japanese: "元気です、ありがとう",
    english: "I'm fine, thank you.",
    pronunciation: "Genki desu, arigatou",
  },
  {
    japanese: "さようなら",
    english: "Goodbye",
    pronunciation: "Sayounara",
  },
  {
    japanese: "どういたしまして",
    english: "You're welcome",
    pronunciation: "Dou itashimashite",
  },
  {
    japanese: "お疲れ様です",
    english: "Thank you for your hard work",
    pronunciation: "Otsukaresama desu",
  },
  {
    japanese: "よろしくお願いします",
    english: "Please take care of it",
    pronunciation: "Yoroshiku onegaishimasu",
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

const JapaneseLesson1 = () => {
  const navigate = useNavigate();

  return (
    <div className="japanese-lesson-container">
      <h1 className="lesson-title">日本語レッスン 1: 基本の挨拶 (Basic Greetings)</h1>
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
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/lesson/j-prases-2")}>Next ➡</button>
      </div>
    </div>
  );
};

export default JapaneseLesson1;
