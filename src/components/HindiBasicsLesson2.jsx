import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./HindiBasicsLesson.css";

const vocabulary = [
  { hindi: "किताब", english: "Book", pronunciation: "kitaab" },
  { hindi: "कुर्सी", english: "Chair", pronunciation: "kursi" },
  { hindi: "खिड़की", english: "Window", pronunciation: "khidki" },
  { hindi: "सड़क", english: "Road", pronunciation: "sadak" },
  { hindi: "बिल्ली", english: "Cat", pronunciation: "billi" },
  { hindi: "कुत्ता", english: "Dog", pronunciation: "kuttaa" },
];

const sentences = [
  { hindi: "यह किताब है।", english: "This is a book.", pronunciation: "yah kitaab hai" },
  { hindi: "कुर्सी नीली है।", english: "The chair is blue.", pronunciation: "kursi neeli hai" },
  { hindi: "बिल्ली खिड़की पर है।", english: "The cat is on the window.", pronunciation: "billi khidki par hai" },
  { hindi: "कुत्ता सड़क पर दौड़ रहा है।", english: "The dog is running on the road.", pronunciation: "kuttaa sadak par daud rahaa hai" },
];

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "hi-IN";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
};

const HindiBasicsLesson2 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);

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
            completedLessons: arrayUnion("Hindi - Basics 2"),
            quizScores: arrayUnion({
              lesson: "Hindi - Basics 2",
              score: 1,
              attempts: 1,
            }),
          });
          setXpGained(true);
        }
      } catch (error) {
        console.error("Error updating Firestore:", error);
      }
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics 2: Hindi (बुनियादी)</h1>

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
          <p className="quiz-question">Q: What does "कुत्ता सड़क पर है।" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) The dog is on the road", isCorrect: true },
              { text: "B) The book is on the chair", isCorrect: false },
              { text: "C) The cat is under the table", isCorrect: false },
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
        <button className="nav-btn" onClick={() => navigate("/lesson/Hindi-basics")}>
          ⬅ Previous Lesson
        </button>
        <button className="nav-btn next" onClick={() => navigate("/lesson/basics-3")}>
          Next Lesson ➡
        </button>
      </div>
    </div>
  );
};

export default HindiBasicsLesson2;
