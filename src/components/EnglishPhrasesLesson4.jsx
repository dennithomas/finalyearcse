import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Player } from "@lottiefiles/react-lottie-player";  // ✅ Lottie Import
import loaderAnimation from "../assets/lesson-loader.json"; // ✅ JSON Loader file


const phrases = [
  { english: "What time is it?", pronunciation: "wɒt taɪm ɪz ɪt" },
  { english: "I wake up at 7 AM", pronunciation: "ai weɪk ʌp æt ˈsevən eɪ ɛm" },
  { english: "I go to school at 8", pronunciation: "ai ɡoʊ tuː skuːl æt eɪt" },
  { english: "I have lunch at noon", pronunciation: "ai hæv lʌntʃ æt nuːn" },
  { english: "I sleep at 10 PM", pronunciation: "ai sliːp æt ten piː ɛm" },
];

const EnglishLesson41 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ Loader state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

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
            completedLessons: correct ? arrayUnion("English - Lesson 4") : [],
            quizScores: arrayUnion({
              lesson: "English - Lesson 4",
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

  // ✅ Loader Screen
  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      }}>
        <Player
          autoplay
          loop
          src={loaderAnimation}
          style={{ height: "300px", width: "300px" }}
        />
      </div>
    );
  }

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Lesson 4: Talking About Time</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn to talk about time and your daily routine using simple sentences.</p>
      </section>

      <section className="section">
        <h2 className="section-title">🕒 Time & Routine Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.english)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What do you say when you want to know the time?</p>
          <div className="quiz-options">
            {[
              { text: "A) What time is it?", isCorrect: true },
              { text: "B) I go to sleep", isCorrect: false },
              { text: "C) Good morning", isCorrect: false },
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
                {selected !== null && option.isCorrect && <FaCheckCircle className="correct-icon" />}
              </button>
            ))}
            {selected !== null && isCorrect === false && (
              <p className="feedback-text">❌ Not quite. Try again!</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Great job!</p>
            )}
          </div>
        </div>
      </section>

      <div className="xp-streak">
        <div className="streak"><FaFire className="icon" /> 8-day Streak</div>
        <div className="xp"><FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}</div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/english-phrases-3")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/english-phrases-5")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default EnglishLesson41;
