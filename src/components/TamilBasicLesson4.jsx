import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Reuse same CSS

const vocabulary = [
  { tamil: "யார்", english: "Who", pronunciation: "yaar" },
  { tamil: "என்ன", english: "What", pronunciation: "enna" },
  { tamil: "எங்கே", english: "Where", pronunciation: "enge" },
  { tamil: "எப்படி", english: "How", pronunciation: "eppadi" },
  { tamil: "ஏன்", english: "Why", pronunciation: "yEn" },
  { tamil: "பெயர்", english: "Name", pronunciation: "peyar" },
];

const sentences = [
  { tamil: "உன்னுடைய பெயர் என்ன?", english: "What is your name?", pronunciation: "unnudaiya peyar enna" },
  { tamil: "நீ எங்கே போகிறாய்?", english: "Where are you going?", pronunciation: "nee enge pogirai" },
  { tamil: "அவன் யார்?", english: "Who is he?", pronunciation: "avan yaar" },
  { tamil: "நீ எப்படி இருக்கிறாய்?", english: "How are you?", pronunciation: "nee eppadi irukkirai" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN";
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang.includes("ta"));
    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TamilBasicsLesson4 = () => {
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
            completedLessons: correct ? arrayUnion("Tamil - Basics 4") : [],
            quizScores: arrayUnion({
              lesson: "Tamil - Basics 4",
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

  const handleBack = () => {
    navigate("/lesson/tamil-basics-3");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics: Tamil (தமிழ்) - Lesson 4</h1>

      {/* About Tamil */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Tamil</h2>
        <p>
          Tamil questions often start with a simple word like "Who" (யார்) or "Where" (எங்கே). Let's learn how to ask questions!
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.tamil}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.tamil)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sentences */}
      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.tamil}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.tamil)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "உன்னுடைய பெயர் என்ன?" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) What is your name?", isCorrect: true },
              { text: "B) Where are you going?", isCorrect: false },
              { text: "C) How are you?", isCorrect: false },
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

      {/* XP and Streak */}
      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 8-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Previous Lesson</button>
        <button onClick={() => navigate("/lesson/tamil-basics-5")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TamilBasicsLesson4;
