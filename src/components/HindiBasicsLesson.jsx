import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db,auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const vocabulary = [
  { hindi: "लड़का", english: "Boy", pronunciation: "ladkaa" },
  { hindi: "लड़की", english: "Girl", pronunciation: "ladki" },
  { hindi: "सेब", english: "Apple", pronunciation: "seb" },
  { hindi: "पानी", english: "Water", pronunciation: "pani" },
  { hindi: "घर", english: "House", pronunciation: "ghar" },
  { hindi: "खाना", english: "Food", pronunciation: "khaana" },
];

const sentences = [
  { hindi: "वह लड़का है।", english: "He is a boy.", pronunciation: "vah ladkaa hai" },
  { hindi: "यह सेब है।", english: "This is an apple.", pronunciation: "yah seb hai" },
  { hindi: "लड़की पानी पी रही है।", english: "The girl is drinking water.", pronunciation: "ladki paani pee rahi hai" },
  { hindi: "मैं खाना खा रहा हूँ।", english: "I am eating food.", pronunciation: "main khaana kha rahaa hoon" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((voice) => voice.lang.includes("hi"));
    if (hindiVoice) {
      utterance.voice = hindiVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const HindiBasicsLesson = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false); // To avoid double XP/score update

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
            completedLessons: correct ? arrayUnion("Hindi - Basics 1") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Basics 1",
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
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics: Hindi (बुनियादी)</h1>

      {/* About Hindi */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Hindi</h2>
        <p>
          Hindi (हिंदी) is one of the most spoken languages in the world...
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.hindi}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.hindi)}>
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

      {/* Quiz */}
      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "यह पानी है।" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) This is a man", isCorrect: false },
              { text: "B) This is water", isCorrect: true },
              { text: "C) This is a girl", isCorrect: false },
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
        <button onClick={() => navigate("/lesson/basics-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default HindiBasicsLesson;
