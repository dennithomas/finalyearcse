// File: MalayalamLesson1.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css"; // Reuse existing CSS

const phrases = [
  { english: "Hello", malayalam: "നമസ്കാരം", pronunciation: "namaskāram" },
  { english: "Good morning", malayalam: "സുപ്രഭാതം", pronunciation: "suprabhātaṁ" },
  { english: "Good evening", malayalam: "സായാഹ്നം", pronunciation: "sāyāhnaṁ" },
  { english: "Good night", malayalam: "ശുഭ രാത്രി", pronunciation: "śubha rātri" },
  { english: "Nice to meet you", malayalam: "നിനയെ കാണാനായത് സന്തോഷം", pronunciation: "ninaye kāṇānāyathu santōṣaṁ" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN"; // Malayalam voice
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml") || voice.lang.includes("hi"));
    if (malayalamVoice) utterance.voice = malayalamVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const MalayalamLesson1 = () => {
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
            completedLessons: correct ? arrayUnion("Malayalam - Lesson 1") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Lesson 1",
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
      <h1 className="lesson-title">Malayalam Lesson 1: Greetings</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to greet people in Malayalam in different situations.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Greetings</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>{phrase.malayalam}</p>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Malayalam word for "Good morning"?</p>
          <div className="quiz-options">
            {[
              { text: "A) സുപ്രഭാതം", isCorrect: true },
              { text: "B) ശുഭ രാത്രി", isCorrect: false },
              { text: "C) നമസ്കാരം", isCorrect: false },
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
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/malayalam-phrases-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamLesson1;
