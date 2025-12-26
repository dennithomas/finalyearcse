// File: TeluguLesson2.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css"; // Reuse the same CSS

const phrases = [
  { english: "How are you?", telugu: "మీరు ఎలా ఉన్నారు?", pronunciation: "mīru ēlā unnāru?" },
  { english: "What is your name?", telugu: "మీ పేరు ఏమిటి?", pronunciation: "mī pēru ēmiṭi?" },
  { english: "Where are you from?", telugu: "మీరు ఎక్కడ నుండి వచ్చారు?", pronunciation: "mīru ekkaḍa nuṇḍi vaccāru?" },
  { english: "How old are you?", telugu: "మీ వయస్సెంత?", pronunciation: "mī vayassenta?" },
  { english: "Do you speak English?", telugu: "మీకు ఇంగ్లీష్ మాట్లాడవచ్చా?", pronunciation: "mīku iṅglīṣ māṭlāḍavaccā?" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = voices.find((voice) => voice.lang.includes("te") || voice.lang.includes("hi"));
    if (teluguVoice) utterance.voice = teluguVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const TeluguLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Telugu - Lesson 2") : [],
            quizScores: arrayUnion({
              lesson: "Telugu - Lesson 2",
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
      <h1 className="lesson-title">Telugu Lesson 2: Basic Questions</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to ask and answer basic questions in Telugu.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Questions</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>{phrase.telugu}</p>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.telugu)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Telugu word for "What is your name?"</p>
          <div className="quiz-options">
            {[
              { text: "A) మీ పేరు ఏమిటి?", isCorrect: true },
              { text: "B) మీరు ఎలా ఉన్నారు?", isCorrect: false },
              { text: "C) మీ వయస్సెంత?", isCorrect: false },
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
          <FaFire className="icon" /> 6-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/telugu-phrases-1")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/telugu-phrases-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TeluguLesson2;
