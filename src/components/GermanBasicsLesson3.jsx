import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Reuse or rename if needed

const vocabulary = [
  { german: "Buch", english: "Book", pronunciation: "booKH" },
  { german: "Tisch", english: "Table", pronunciation: "tish" },
  { german: "Stuhl", english: "Chair", pronunciation: "shtool" },
  { german: "Fenster", english: "Window", pronunciation: "fen-ster" },
  { german: "Tür", english: "Door", pronunciation: "toor" },
  { german: "Hund", english: "Dog", pronunciation: "hoont" },
];

const sentences = [
  { german: "Das Buch liegt auf dem Tisch.", english: "The book is on the table.", pronunciation: "das booKH leekt owf dem tish" },
  { german: "Der Stuhl steht neben dem Fenster.", english: "The chair is next to the window.", pronunciation: "dare shtool shtayt nay-ben dem fen-ster" },
  { german: "Der Hund ist an der Tür.", english: "The dog is at the door.", pronunciation: "dare hoont ist an dare toor" },
  { german: "Ich habe ein Buch.", english: "I have a book.", pronunciation: "ikh hah-be ayn booKH" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "de-DE";
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find((voice) => voice.lang.includes("de"));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const GermanBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("German - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "German - Basics 3",
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
      <h1 className="lesson-title">Basics: German (Deutsch) - Lesson-3</h1>

      {/* About German */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About German</h2>
        <p>
          German (Deutsch) is one of the most widely spoken languages in Europe. It's structured and logical, making it fun to learn with the right approach.
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.german}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.german)}>
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
              <p className="hindi-text">{s.german}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.german)}>
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
          <p className="quiz-question">Q: What does "Der Hund ist an der Tür." mean?</p>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/german-basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/german-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default GermanBasicsLesson3;
