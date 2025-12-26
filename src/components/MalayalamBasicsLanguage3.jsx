import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { malayalam: "മേശ", english: "Table", pronunciation: "mesa" },
  { malayalam: "കസേര", english: "Chair", pronunciation: "kasera" },
  { malayalam: "ജാലകം", english: "Window", pronunciation: "jaalakam" },
  { malayalam: "വാതിൽ", english: "Door", pronunciation: "vaathil" },
  { malayalam: "നായ", english: "Dog", pronunciation: "naaya" },
  { malayalam: "പുസ്തകം", english: "Book", pronunciation: "pustakam" },
];

const sentences = [
  { malayalam: "പുസ്തകം മേശയുടെ മേൽ ആണു.", english: "The book is on the table.", pronunciation: "pustakam mesayude mel aanu" },
  { malayalam: "കസേര ജാലകത്തിന് സമീപമാണ്.", english: "The chair is next to the window.", pronunciation: "kasera jaalakathin samipamanu" },
  { malayalam: "നായ വാതിലിന് സമീപം ആണു.", english: "The dog is at the door.", pronunciation: "naaya vaathilinte samipam aanu" },
  { malayalam: "ഞാന് ഒരു പുസ്തകം വെച്ചിട്ടുണ്ട്.", english: "I have a book.", pronunciation: "njyaan oru pustakam vechittundu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN";
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml"));
    if (malayalamVoice) {
      utterance.voice = malayalamVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const MalayalamBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Malayalam - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Basics 3",
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
      <h1 className="lesson-title">Basics: Malayalam (മലയാളം) - Lesson-3</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About Malayalam</h2>
        <p>
          Malayalam (മലയാളം) is a beautiful Dravidian language spoken in the Indian state of Kerala. In this lesson, you’ll learn common nouns and how to use them in simple sentences.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.malayalam}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.malayalam)}>
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
              <p className="hindi-text">{s.malayalam}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "നായ വാതിലിന് സമീപം ആണു." mean?</p>
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

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/malayalam-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamBasicsLesson3;
