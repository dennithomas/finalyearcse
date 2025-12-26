// File: MalayalamLesson2.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css";

const phrases = [
  { english: "How are you?", malayalam: "സുഖമാണോ?", pronunciation: "sukhāmāṇō?" },
  { english: "I am fine", malayalam: "എനിക്ക് സുഖമാണ്", pronunciation: "enikku sukhamaṇu" },
  { english: "What is your name?", malayalam: "നിന്റെ പേര് എന്താണ്?", pronunciation: "ninṟe pēru entāṇu?" },
  { english: "My name is John", malayalam: "എന്റെ പേര് ജോൺ ആണ്", pronunciation: "ente pēru Jōn āṇu" },
  { english: "Thank you", malayalam: "നന്ദി", pronunciation: "nandi" },
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

const MalayalamLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Malayalam - Lesson 2") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Lesson 2",
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
      <h1 className="lesson-title">Malayalam Lesson 2: Basic Conversation</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn common phrases for basic conversations in Malayalam.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>{phrase.malayalam}</p>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Malayalam word for "Thank you"?</p>
          <div className="quiz-options">
            {[
              { text: "A) നന്ദി", isCorrect: true },
              { text: "B) സുഖമാണോ?", isCorrect: false },
              { text: "C) എന്റെ പേര് ജോൺ ആണ്", isCorrect: false },
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
          <FaFire className="icon" /> 6-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-phrases-1")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/malayalam-phrases-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamLesson2;
