import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Player } from "@lottiefiles/react-lottie-player";  // ✅ Lottie Import
import loaderAnimation from "../assets/lesson-loader.json"; // ✅ JSON Loader file


const phrases = [
  { english: "What is your name?", pronunciation: "wɒt ɪz jɔːr neɪm" },
  { english: "Where are you from?", pronunciation: "weər ɑː juː frɒm" },
  { english: "How old are you?", pronunciation: "haʊ oʊld ɑː juː" },
  { english: "Do you speak English?", pronunciation: "duː juː spiːk ˈɪŋɡlɪʃ" },
];

const EnglishLesson31 = () => {
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
      <h1 className="lesson-title">Lesson 3: Asking Questions</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to ask basic questions to get to know someone.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Questions</h2>
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
          <p className="quiz-question">Q: How do you ask someone their name?</p>
          <div className="quiz-options">
            {[
              { text: "A) What is your name?", isCorrect: true },
              { text: "B) My name is Tom", isCorrect: false },
              { text: "C) Where is your bag?", isCorrect: false },
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
        <div className="streak"><FaFire className="icon" /> 7-day Streak</div>
        <div className="xp"><FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}</div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/english-phrases-2")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/english-phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default EnglishLesson31;
