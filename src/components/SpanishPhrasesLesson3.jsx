// File: SpanishLesson3.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css"; // Reuse existing CSS

const phrases = [
  { english: "Please", spanish: "Por favor", pronunciation: "por fah-bor" },
  { english: "Thank you", spanish: "Gracias", pronunciation: "gra-syahs" },
  { english: "You're welcome", spanish: "De nada", pronunciation: "deh nah-dah" },
  { english: "Excuse me", spanish: "Perdón / Disculpe", pronunciation: "pehr-don / dees-kool-peh" },
  { english: "I'm sorry", spanish: "Lo siento", pronunciation: "loh syen-toh" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((voice) => voice.lang.includes("es"));
    if (spanishVoice) utterance.voice = spanishVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const SpanishLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Spanish - Lesson 3") : [],
            quizScores: arrayUnion({
              lesson: "Spanish - Lesson 3",
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
      <h1 className="lesson-title">Spanish Lesson 3: Polite Expressions</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Master polite phrases that are essential for everyday interactions in Spanish.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Polite Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>{phrase.spanish}</p>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.spanish)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: How do you say "Thank you" in Spanish?</p>
          <div className="quiz-options">
            {[
              { text: "A) Gracias", isCorrect: true },
              { text: "B) Por favor", isCorrect: false },
              { text: "C) De nada", isCorrect: false },
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
              <p className="feedback-text">❌ Not quite. Try again.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Perfect!</p>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/spanish-phrases-2")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/spanish-phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default SpanishLesson3;
