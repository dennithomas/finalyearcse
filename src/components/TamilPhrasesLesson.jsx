import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // You can create a TamilBasicsLesson.css if needed

const phrases = [
  { tamil: "வணக்கம்", english: "Hello", pronunciation: "vaṇakkam" },
  { tamil: "நன்றி", english: "Thank you", pronunciation: "nandri" },
  { tamil: "எப்படி இருக்கிறீர்கள்?", english: "How are you?", pronunciation: "eppadi irukkireergal?" },
  { tamil: "மன்னிக்கவும்", english: "Excuse me / Sorry", pronunciation: "mannikkavum" },
  { tamil: "உங்களை வரவேற்கிறேன்", english: "You're welcome", pronunciation: "ungalai varaverkiren" },
  { tamil: "பின்னர் சந்திப்போம்", english: "See you again", pronunciation: "pinnar sandippom" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN"; // Tamil language
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang.includes("ta"));
    if (tamilVoice) utterance.voice = tamilVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TamilPhrasesLesson = () => {
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
            completedLessons: correct ? arrayUnion("Tamil - Phrases") : [],
            quizScores: arrayUnion({
              lesson: "Tamil - Phrases",
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
      <h1 className="lesson-title">Phrases: Tamil (வாக்கியங்கள்)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you will learn basic Tamil phrases used in daily conversations.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.tamil}</h3>
              <p>{phrase.english} ({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.tamil)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "நன்றி" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) Sorry", isCorrect: false },
              { text: "B) Thank you", isCorrect: true },
              { text: "C) Welcome", isCorrect: false },
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
          <FaFire className="icon" /> 5-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/tamil-phrases-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TamilPhrasesLesson;
