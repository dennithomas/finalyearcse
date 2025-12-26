// File: MalayalamLesson4.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css";

const days = [
  { english: "Monday", malayalam: "തിങ്കളാഴ്‌ച", pronunciation: "tiṅkaḷāḻcha" },
  { english: "Tuesday", malayalam: "ചൊവ്വാഴ്ച", pronunciation: "chovvāḻcha" },
  { english: "Wednesday", malayalam: "ബുധനാഴ്‌ച", pronunciation: "budhanāḻcha" },
  { english: "Thursday", malayalam: "വ്യാഴാഴ്ച", pronunciation: "vyāḻāḻcha" },
  { english: "Friday", malayalam: "വെള്ളിയാഴ്‌ച", pronunciation: "veḷḷiyāḻcha" },
  { english: "Saturday", malayalam: "ശനിയാഴ്‌ച", pronunciation: "shaniyāḻcha" },
  { english: "Sunday", malayalam: "ഞായറാഴ്‌ച", pronunciation: "ñāyaṟāḻcha" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN";
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml") || voice.lang.includes("hi"));
    if (malayalamVoice) utterance.voice = malayalamVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const MalayalamLesson4 = () => {
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
          await updateDoc(userRef, {
            xp: correct ? increment(10) : increment(0),
            completedLessons: correct ? arrayUnion("Malayalam - Lesson 4") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Lesson 4",
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

  return (
    <div className="english-lesson-container">
      <h1 className="lesson-title">Malayalam Lesson 4: Days of the Week</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to say the days of the week in Malayalam with pronunciation and usage.</p>
      </section>

      <section className="section">
        <h2 className="section-title">📅 Days of the Week</h2>
        <div className="vocab-grid">
          {days.map((day, index) => (
            <div key={index} className="vocab-card">
              <h3>{day.english}</h3>
              <p>{day.malayalam}</p>
              <p>({day.pronunciation})</p>
              <button className="play-button" onClick={() => speak(day.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Malayalam word for "Friday"?</p>
          <div className="quiz-options">
            {[
              { text: "A) വെള്ളിയാഴ്‌ച", isCorrect: true },
              { text: "B) വ്യാഴാഴ്ച", isCorrect: false },
              { text: "C) ഞായറാഴ്‌ച", isCorrect: false },
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
              <p className="feedback-text">❌ Try again.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Well done!</p>
            )}
          </div>
        </div>
      </section>

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 8-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-phrases-3")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/malayalam-phrases-5")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamLesson4;
