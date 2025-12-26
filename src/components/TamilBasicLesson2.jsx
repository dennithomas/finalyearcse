import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";// Reuse same CSS

const vocabulary = [
  { tamil: "மரம்", english: "Tree", pronunciation: "maram" },
  { tamil: "முகம்", english: "Face", pronunciation: "mugam" },
  { tamil: "நடை", english: "Walk", pronunciation: "nadai" },
  { tamil: "படம்", english: "Picture", pronunciation: "padam" },
  { tamil: "நண்பர்", english: "Friend", pronunciation: "nanbar" },
  { tamil: "படிக்க", english: "To study", pronunciation: "padikka" },
];

const sentences = [
  { tamil: "அவன் மரம் ஏறுகிறான்.", english: "He is climbing a tree.", pronunciation: "avan maram eerugiraan" },
  { tamil: "அவள் முகம் அழகாக உள்ளது.", english: "Her face is beautiful.", pronunciation: "aval mugam azhaga ullathu" },
  { tamil: "நாம் நடைப்பயிற்சி செய்கிறோம்.", english: "We are walking.", pronunciation: "naam nadai payirchi seygirOm" },
  { tamil: "அவர் படிக்க விரும்புகிறார்.", english: "He wants to study.", pronunciation: "avar padikka virumbugiraar" },
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

const TamilBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Tamil - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "Tamil - Basics 2",
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
    navigate("/lesson/tamil-basics-1");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics: Tamil (தமிழ்) - Lesson 2</h1>

      {/* About Tamil */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Tamil</h2>
        <p>
          Tamil (தமிழ்) is a Dravidian language spoken by millions around the world and is known for its ancient history and rich culture...
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
          <p className="quiz-question">Q: What does "அவள் முகம் அழகாக உள்ளது." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) Her house is big", isCorrect: false },
              { text: "B) Her face is beautiful", isCorrect: true },
              { text: "C) She is walking", isCorrect: false },
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
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Previous Lesson</button>
        <button onClick={() => navigate("/lesson/tamil-basics-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TamilBasicsLesson2;
