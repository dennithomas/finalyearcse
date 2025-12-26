import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { Player } from "@lottiefiles/react-lottie-player";  // ✅ Lottie Import
import loaderAnimation from "../assets/lesson-loader.json"; // ✅ JSON Loader file


const phrases = [
  { english: "My name is John", pronunciation: "mai neɪm ɪz dʒɑn" },
  { english: "I am a student", pronunciation: "ai æm ə ˈstjuːdənt" },
  { english: "I live in New York", pronunciation: "ai lɪv ɪn nuː jɔːrk" },
  { english: "Nice to meet you", pronunciation: "naɪs tuː miːt juː" },
  { english: "I'm learning English", pronunciation: "aim ˈlɜrnɪŋ ˈɪŋɡlɪʃ" },
];

const EnglishLesson21 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);

  const [loading, setLoading] = useState(true);

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
            completedLessons: correct ? arrayUnion("English - Lesson 1") : [],
            quizScores: arrayUnion({
              lesson: "English - Lesson 1",
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
      <h1 className="lesson-title">Lesson 2: Introducing Yourself</h1>
      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to introduce yourself and talk about where you're from.</p>
      </section>
      <section className="section">
        <h2 className="section-title">💬 Introductions</h2>
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
          <p className="quiz-question">Q: How do you say you are learning a language?</p>
          <div className="quiz-options">
            {[
              { text: "A) I am cooking food", isCorrect: false },
              { text: "B) I'm learning English", isCorrect: true },
              { text: "C) I like music", isCorrect: false },
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
              <p className="feedback-text">❌ Try again.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Well done!</p>
            )}
          </div>
        </div>
      </section>
      <div className="xp-streak">
        <div className="streak"><FaFire className="icon" /> 6-day Streak</div>
        <div className="xp"><FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}</div>
      </div>
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/english-phrases-1")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/english-phrases-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default EnglishLesson21;
