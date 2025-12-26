import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Reuse existing CSS or create a French-specific one if needed

const vocabulary = [
  { french: "Livre", english: "Book", pronunciation: "leevr" },
  { french: "Table", english: "Table", pronunciation: "tab-luh" },
  { french: "Chaise", english: "Chair", pronunciation: "shez" },
  { french: "Fenêtre", english: "Window", pronunciation: "fuh-netr" },
  { french: "Porte", english: "Door", pronunciation: "port" },
  { french: "Chien", english: "Dog", pronunciation: "shyen" },
];

const sentences = [
  { french: "Le livre est sur la table.", english: "The book is on the table.", pronunciation: "luh leevr eh sur la tab-luh" },
  { french: "La chaise est à côté de la fenêtre.", english: "The chair is next to the window.", pronunciation: "la shez eh a ko-tay duh la fuh-netr" },
  { french: "Le chien est à la porte.", english: "The dog is at the door.", pronunciation: "luh shyen eh a la port" },
  { french: "J'ai un livre.", english: "I have a book.", pronunciation: "zhay uh leevr" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "fr-FR";
    const voices = window.speechSynthesis.getVoices();
    const frenchVoice = voices.find((voice) => voice.lang.includes("fr"));
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const FrenchBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("French - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "French - Basics 3",
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
      <h1 className="lesson-title">Basics: French (Français) - Lesson-3</h1>

      {/* About French */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About French</h2>
        <p>
          French (Français) is a beautiful and widely spoken language around the world. Let's keep learning with more vocabulary and simple sentences!
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.french}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.french)}>
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
              <p className="hindi-text">{s.french}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.french)}>
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
          <p className="quiz-question">Q: What does "Le chien est à la porte." mean?</p>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/french-basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/french-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default FrenchBasicsLesson3;
