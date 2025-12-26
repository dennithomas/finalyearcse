// File: MalayalamLesson3.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css";

const numbers = [
  { english: "One", malayalam: "ഒന്ന്", pronunciation: "onnu" },
  { english: "Two", malayalam: "രണ്ട്", pronunciation: "raṇṭu" },
  { english: "Three", malayalam: "മൂന്ന്", pronunciation: "mūnnu" },
  { english: "Four", malayalam: "നാല്", pronunciation: "nālu" },
  { english: "Five", malayalam: "അഞ്ച്", pronunciation: "añcu" },
  { english: "Six", malayalam: "ആറ്", pronunciation: "āṟu" },
  { english: "Seven", malayalam: "ഏഴ്", pronunciation: "ēḻu" },
  { english: "Eight", malayalam: "എട്ട്", pronunciation: "eṭṭu" },
  { english: "Nine", malayalam: "ഒമ്പത്", pronunciation: "ombathu" },
  { english: "Ten", malayalam: "പത്ത്", pronunciation: "paththu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN";
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml") || voice.lang.includes("hi"));
    if (malayalamVoice) utterance.voice = malayalamVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const MalayalamLesson3 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);

  const handleAnswer = async (correct, index) => {
    setSelected(index);
    setIsCorrect(correct);

    if (!xpGained) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            xp: correct ? increment(10) : increment(0),
            completedLessons: correct ? arrayUnion("Malayalam - Lesson 3") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Lesson 3",
              score: correct ? 1 : 0,
              attempts: 1,
            }),
          });
          setXpGained(true);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Malayalam Lesson 3: Numbers 1–10</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to count from 1 to 10 in Malayalam with pronunciation.</p>
      </section>

      <section className="section">
        <h2 className="section-title">🔢 Malayalam Numbers</h2>
        <div className="vocab-grid">
          {numbers.map((item, index) => (
            <div key={index} className="vocab-card">
              <h3>{item.english}</h3>
              <p>{item.malayalam}</p>
              <p>({item.pronunciation})</p>
              <button className="play-button" onClick={() => speak(item.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Malayalam word for "Five"?</p>
          <div className="quiz-options">
            {[
              { text: "A) അഞ്ച്", isCorrect: true },
              { text: "B) പത്ത്", isCorrect: false },
              { text: "C) രണ്ട്", isCorrect: false },
            ].map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selected !== null
                    ? option.isCorrect
                      ? "correct"
                      : index === selected
                      ? "wrong"
                      : ""
                    : ""
                }`}
                onClick={() => handleAnswer(option.isCorrect, index)}
                disabled={selected !== null}
              >
                {option.text}
                {selected !== null && option.isCorrect && (
                  <FaCheckCircle className="correct-icon" />
                )}
              </button>
            ))}
            {selected !== null && isCorrect === false && (
              <p className="feedback-text">❌ Try again.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Well done!</p>
            )}
          </div>
        </div>
      </section>

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 7-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-phrases-2")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/malayalam-phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamLesson3;
