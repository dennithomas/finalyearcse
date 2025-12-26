// File: TeluguLesson5.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./EnglishLesson.css";

const phrases = [
  { english: "I wake up", telugu: "నేను లేస్తాను", pronunciation: "nēnu lēstānu" },
  { english: "I brush my teeth", telugu: "నేను పళ్ళు తోముతాను", pronunciation: "nēnu paḷḷu tōmutānu" },
  { english: "I take a bath", telugu: "నేను స్నానం చేస్తాను", pronunciation: "nēnu snānaṁ cēstānu" },
  { english: "I go to work", telugu: "నేను పనికి వెళ్తాను", pronunciation: "nēnu paniki veḷtānu" },
  { english: "I eat lunch", telugu: "నేను మధ్యాహ్న భోజనం చేస్తాను", pronunciation: "nēnu madhyāhna bhōjanaṁ cēstānu" },
  { english: "I go to sleep", telugu: "నేను నిద్రపోతాను", pronunciation: "nēnu nidrapōtānu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = voices.find((voice) => voice.lang.includes("te") || voice.lang.includes("hi"));
    if (teluguVoice) utterance.voice = teluguVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Speech synthesis not supported.");
  }
};

const TeluguLesson5 = () => {
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
            completedLessons: correct ? arrayUnion("Telugu - Lesson 5") : [],
            quizScores: arrayUnion({
              lesson: "Telugu - Lesson 5",
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
      <h1 className="lesson-title">Telugu Lesson 5: Daily Activities</h1>

      <section className="section">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn how to talk about your daily routine in Telugu.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Daily Routine Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.english}</h3>
              <p>{phrase.telugu}</p>
              <p>({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.telugu)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What is the Telugu phrase for "I go to sleep"?</p>
          <div className="quiz-options">
            {[
              { text: "A) నేను నిద్రపోతాను", isCorrect: true },
              { text: "B) నేను స్నానం చేస్తాను", isCorrect: false },
              { text: "C) నేను లేస్తాను", isCorrect: false },
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
          <FaFire className="icon" /> 9-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/telugu-phrases-4")}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default TeluguLesson5;
