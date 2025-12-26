import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { telugu: "కుమారుడు", english: "Son", pronunciation: "kumaarudu" },
  { telugu: "కుమార్తె", english: "Daughter", pronunciation: "kumaarte" },
  { telugu: "ఆపిల్", english: "Apple", pronunciation: "aapil" },
  { telugu: "నీరు", english: "Water", pronunciation: "neeru" },
  { telugu: "ఇల్లు", english: "House", pronunciation: "illu" },
  { telugu: "ఆహారం", english: "Food", pronunciation: "aahaaram" },
];

const sentences = [
  { telugu: "అతను కుమారుడు.", english: "He is a son.", pronunciation: "atanu kumaarudu" },
  { telugu: "ఇది ఆపిల్.", english: "This is an apple.", pronunciation: "idi aapil" },
  { telugu: "కుమార్తె నీరు తాగుతోంది.", english: "The daughter is drinking water.", pronunciation: "kumaarte neeru thaagotondi" },
  { telugu: "నేను ఆహారాన్ని తింటున్నాను.", english: "I am eating food.", pronunciation: "nenu aahaaranni tintunnaanu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = voices.find((voice) => voice.lang.includes("te"));
    if (teluguVoice) {
      utterance.voice = teluguVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TeluguBasicsLesson = () => {
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
            completedLessons: correct ? arrayUnion("Telugu - Basics 1") : [],
            quizScores: arrayUnion({
              lesson: "Telugu - Basics 1",
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
    navigate("/dashboard");
  };

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Basics Lesson-1: Telugu (తెలుగు)</h1>

      {/* About Telugu */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Telugu</h2>
        <p>
          Telugu (తెలుగు) is one of the classical languages of India, spoken widely in Andhra Pradesh and Telangana. Let's begin with some basic words and sentences.
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.telugu}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.telugu)}>
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
              <p className="hindi-text">{s.telugu}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.telugu)}>
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
          <p className="quiz-question">Q: What does "ఇది నీరు." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) This is food", isCorrect: false },
              { text: "B) This is water", isCorrect: true },
              { text: "C) This is a boy", isCorrect: false },
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
          <FaFire className="icon" /> 4-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/telugu-basics-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TeluguBasicsLesson;
