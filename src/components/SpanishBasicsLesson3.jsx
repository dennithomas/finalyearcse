import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Make sure to create a separate CSS file for this lesson if needed

const vocabulary = [
  { spanish: "Libro", english: "Book", pronunciation: "lee-broh" },
  { spanish: "Mesa", english: "Table", pronunciation: "me-sa" },
  { spanish: "Silla", english: "Chair", pronunciation: "see-ya" },
  { spanish: "Ventana", english: "Window", pronunciation: "ven-ta-na" },
  { spanish: "Puerta", english: "Door", pronunciation: "pwerta" },
  { spanish: "Perro", english: "Dog", pronunciation: "pe-rro" },
];

const sentences = [
  { spanish: "El libro está sobre la mesa.", english: "The book is on the table.", pronunciation: "el lee-broh es-ta so-breh la me-sa" },
  { spanish: "La silla está junto a la ventana.", english: "The chair is next to the window.", pronunciation: "la see-ya es-ta hun-to a la ven-ta-na" },
  { spanish: "El perro está en la puerta.", english: "The dog is at the door.", pronunciation: "el pe-rro es-ta en la pwerta" },
  { spanish: "Tengo un libro.", english: "I have a book.", pronunciation: "ten-go oon lee-broh" },
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

const SpanishBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Spanish - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "Spanish - Basics 3",
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

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Basics: Spanish (Español) - Leason-3</h1>

      {/* About Spanish */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Spanish</h2>
        <p>
          Spanish (Español) is one of the most widely spoken languages in the world. It's fun and easy to learn if you start with the basics.
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
          <p className="quiz-question">Q: What does "El perro está en la puerta." mean?</p>
          <div className="quiz-options">
            {[ 
              { text: "A) The dog is at the door", isCorrect: true },
              { text: "B) The dog is in the window", isCorrect: false },
              { text: "C) The dog is on the table", isCorrect: false },
            ].map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selected !== null ? option.isCorrect ? "correct" : index === selected ? "wrong" : "" : ""}`}
                onClick={() => handleAnswer(option.isCorrect, index)}
                disabled={selected !== null}
              >
                {option.text}
                {selected !== null && option.isCorrect && <FaCheckCircle className="correct-icon" />}
              </button>
            ))}
            {selected !== null && isCorrect === false && <p className="feedback-text">❌ Oops! That's not correct.</p>}
            {selected !== null && isCorrect === true && <p className="feedback-text">✅ Correct!</p>}
          </div>
        </div>
      </section>

      {/* XP and Streak */}
      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/spanishlesson/basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/spanishlesson/basics-final")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default SpanishBasicsLesson2;
