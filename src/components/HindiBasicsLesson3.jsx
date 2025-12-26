import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Lottie from 'lottie-react';  // Import Lottie component
import celebrationAnimation from '../animation/celebration.json';  // Import Lottie JSON animation file
import "./Spanishpage.css";

// Vocabulary and Sentences data
const vocabulary = [
  { hindi: "घर", english: "House", pronunciation: "ghar" },
  { hindi: "बाग़", english: "Garden", pronunciation: "baagh" },
  { hindi: "पानी", english: "Water", pronunciation: "paani" },
  { hindi: "आदमी", english: "Man", pronunciation: "aadmi" },
  { hindi: "महिला", english: "Woman", pronunciation: "mahila" },
];

const sentences = [
  { hindi: "यह घर सुंदर है।", english: "This house is beautiful.", pronunciation: "yah ghar sundar hai" },
  { hindi: "वह बाग़ में पानी दे रहा है।", english: "He is watering the garden.", pronunciation: "vah baagh mein paani de raha hai" },
  { hindi: "महिला घर में है।", english: "The woman is in the house.", pronunciation: "mahila ghar mein hai" },
  { hindi: "आदमी पानी पी रहा है।", english: "The man is drinking water.", pronunciation: "aadmi paani pee raha hai" },
];

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const HindiBasicsLesson3 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);  // Popup state

  const handleAnswer = async (correct, index) => {
    setSelected(index);
    setIsCorrect(correct);

    if (!xpGained && correct) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userRef = doc(db, "users", user.uid);
          await updateDoc(userRef, {
            xp: increment(10),
            completedLessons: arrayUnion("Hindi - Basics 3"),
            quizScores: arrayUnion({
              lesson: "Hindi - Basics 3",
              score: 1,
              attempts: 1,
            }),
          });
          setXpGained(true);
          setShowCompletionPopup(true);  // Show the completion popup when XP is gained
        }
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics 3: Hindi (बुनियादी)</h1>

      {/* Vocabulary Section */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, i) => (
            <div key={i} className="vocab-card">
              <h3>{word.hindi}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.hindi)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sentence Section */}
      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.hindi}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.hindi)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz Section */}
      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "आदमी पानी पी रहा है।" mean?</p>
          <div className="quiz-options">
            {[{ text: "A) The man is drinking water", isCorrect: true },
            { text: "B) The woman is eating food", isCorrect: false },
            { text: "C) The child is playing outside", isCorrect: false }].map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selected !== null
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

      {/* XP & Streak */}
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
        <button className="nav-btn" onClick={() => navigate("/lesson/basics-2")}>
          ⬅ Previous Lesson
        </button>
        <button className="nav-btn next" onClick={() => navigate("/lesson/basics-4")}>
          Next Lesson ➡
        </button>
      </div>

      {/* Popup for Lesson Completion */}
      {showCompletionPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="lottie-container">
              <Lottie
                animationData={celebrationAnimation}
                loop={false}
                autoplay
                style={{ height: "200px", width: "200px" }} // Adjust size as needed
              />
            </div>
            <h2>🎉 Lesson Completed!</h2>
            <p>You’ve earned 10 XP for this lesson.</p>
            <button onClick={() => setShowCompletionPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HindiBasicsLesson3;
