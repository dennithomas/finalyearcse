import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { kannada: "ನರಿ", english: "Fox", pronunciation: "nari" },
  { kannada: "ಹಸು", english: "Cow", pronunciation: "hasu" },
  { kannada: "ಹಾಲು", english: "Milk", pronunciation: "haalu" },
  { kannada: "ರೊಟ್ಟಿ", english: "Bread", pronunciation: "roṭṭi" },
  { kannada: "ಪುಸ್ತಕ", english: "Book", pronunciation: "pustaka" },
  { kannada: "ಶಾಲೆ", english: "School", pronunciation: "shaale" },
];

const sentences = [
  { kannada: "ಅವಳು ನರಿ.", english: "She is a fox.", pronunciation: "avaḷu nari" },
  { kannada: "ಹಸು ಹಾಲು ಕುಡಿಯುತ್ತದೆ.", english: "The cow drinks milk.", pronunciation: "hasu haalu kuḍiyuttade" },
  { kannada: "ನಾನು ರೊಟ್ಟಿ ತಿನ್ನುತ್ತೇನೆ.", english: "I eat bread.", pronunciation: "naanu roṭṭi tinnuttēne" },
  { kannada: "ನೀನು ಪುಸ್ತಕ ಓದುತ್ತಿರುವೆ.", english: "You read a book.", pronunciation: "neenu pustaka oduuttiruve" },
  { kannada: "ನಾವು ಶಾಲೆಗೆ ಹೋಗುತ್ತಿದ್ದೇವೆ.", english: "We go to school.", pronunciation: "naavu shaalige hoguttiddeve" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((voice) => voice.lang.includes("kn"));
    if (kannadaVoice) {
      utterance.voice = kannadaVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const KannadaBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Kannada - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "Kannada - Basics Lesson-2",
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
      <h1 className="lesson-title">Basics Lesson-2: Kannada (ಕನ್ನಡ)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you'll learn more Kannada nouns and verbs, and how to form simple sentences using them.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.kannada}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.kannada)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.kannada}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.kannada)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "ನೀನು ಪುಸ್ತಕ ಓದುತ್ತಿರುವೆ." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) You read a book", isCorrect: true },
              { text: "B) I drink milk", isCorrect: false },
              { text: "C) She eats bread", isCorrect: false },
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

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/kannada-basics")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/kannada-basics-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default KannadaBasicsLesson2;
