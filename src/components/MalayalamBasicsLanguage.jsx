import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { malayalam: "മകൻ", english: "Son", pronunciation: "makan" },
  { malayalam: "മകൾ", english: "Daughter", pronunciation: "makal" },
  { malayalam: "ആപ്പിൾ", english: "Apple", pronunciation: "aappil" },
  { malayalam: "വെള്ളം", english: "Water", pronunciation: "vellam" },
  { malayalam: "വീട്", english: "House", pronunciation: "veedu" },
  { malayalam: "ഭക്ഷണം", english: "Food", pronunciation: "bhakshanam" },
];

const sentences = [
  { malayalam: "അവൻ മകനാണ്.", english: "He is a son.", pronunciation: "avan makanaanu" },
  { malayalam: "ഇത് ആപ്പിൾ ആണ്.", english: "This is an apple.", pronunciation: "ithu aappil aanu" },
  { malayalam: "മകൾ വെള്ളം കുടിക്കുന്നു.", english: "The daughter is drinking water.", pronunciation: "makal vellam kudikkunnu" },
  { malayalam: "ഞാൻ ഭക്ഷണം കഴിക്കുന്നു.", english: "I am eating food.", pronunciation: "njaan bhakshanam kazhikkunnu" },
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

const MalayalamBasicsLesson = () => {
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
            completedLessons: correct ? arrayUnion("Malayalam - Basics 1") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Basics 1",
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
      <h1 className="lesson-title">Basics Lesson-1: Malayalam (മലയാളം)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About Malayalam</h2>
        <p>
          Malayalam (മലയാളം) is a Dravidian language spoken predominantly in the Indian state of Kerala. Let's start with some basic words and sentences.
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
          <p className="quiz-question">Q: What does "ഇത് വെള്ളമാണ്." mean?</p>
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

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 4-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/malayalam-basics-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamBasicsLesson;
