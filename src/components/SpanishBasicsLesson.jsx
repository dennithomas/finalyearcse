import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // You can rename this to something like SpanishBasicsLesson.css if needed

const vocabulary = [
  { spanish: "Niño", english: "Boy", pronunciation: "neen-yo" },
  { spanish: "Niña", english: "Girl", pronunciation: "neen-ya" },
  { spanish: "Manzana", english: "Apple", pronunciation: "man-sa-na" },
  { spanish: "Agua", english: "Water", pronunciation: "ah-gwa" },
  { spanish: "Casa", english: "House", pronunciation: "ka-sa" },
  { spanish: "Comida", english: "Food", pronunciation: "ko-mee-da" },
];

const sentences = [
  { spanish: "Él es un niño.", english: "He is a boy.", pronunciation: "el es oon neen-yo" },
  { spanish: "Esto es una manzana.", english: "This is an apple.", pronunciation: "es-to es oo-na man-sa-na" },
  { spanish: "La niña bebe agua.", english: "The girl is drinking water.", pronunciation: "la neen-ya be-be ah-gwa" },
  { spanish: "Estoy comiendo comida.", english: "I am eating food.", pronunciation: "es-toy ko-mee-en-do ko-mee-da" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    const voices = window.speechSynthesis.getVoices();
    const spanishVoice = voices.find((voice) => voice.lang.includes("es"));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const SpanishBasicsLesson = () => {
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

          const score = correct ? 1 : 0;

          await updateDoc(userRef, {
            xp: correct ? increment(10) : increment(0),
            completedLessons: correct ? arrayUnion("Spanish - Basics 1") : [],
            quizScores: arrayUnion({
              lesson: "Spanish - Basics 1",
              score: score,
              attempts: 1,
            }),
          });

          setXpGained(true);
        }
      } catch (error) {
        console.error("Error updating XP/quiz score:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Basics Lesson-1: Spanish (Español)</h1>

      {/* About Spanish */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Spanish</h2>
        <p>
          Spanish (Español) is one of the most widely spoken languages in the world...
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.spanish}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.spanish)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sentences */}
      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.spanish}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.spanish)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "Esto es agua." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) This is a man", isCorrect: false },
              { text: "B) This is water", isCorrect: true },
              { text: "C) This is a girl", isCorrect: false },
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
              <p className="feedback-text">❌ Oops! That's not correct.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Correct!</p>
            )}
          </div>
        </div>
      </section>

      {/* XP and Streak */}
      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 4-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/spanishlesson/basics-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default SpanishBasicsLesson;
