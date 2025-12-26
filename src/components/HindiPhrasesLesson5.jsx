import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const phrases = [
  { hindi: "मेनू दीजिए", english: "Please give the menu", pronunciation: "menu dijiye" },
  { hindi: "मैं शाकाहारी हूँ", english: "I am vegetarian", pronunciation: "main shaakahari hoon" },
  { hindi: "मुझे पानी चाहिए", english: "I need water", pronunciation: "mujhe paani chahiye" },
  { hindi: "खाना बहुत स्वादिष्ट है", english: "The food is very tasty", pronunciation: "khaana bahut swaadisht hai" },
  { hindi: "बिल लाओ", english: "Bring the bill", pronunciation: "bill lao" },
  { hindi: "चाय चाहिए", english: "I want tea", pronunciation: "chaay chahiye" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "hi-IN";
    const voices = window.speechSynthesis.getVoices();
    const hindiVoice = voices.find((voice) => voice.lang.includes("hi"));
    if (hindiVoice) utterance.voice = hindiVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const HindiPhrasesLesson5 = () => {
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
            completedLessons: correct ? arrayUnion("Hindi - Phrases 5") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Phrases 5",
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
    navigate("/lesson/phrases-4");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Phrases 5: Food & Restaurant (भोजन और रेस्टोरेंट)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">🍛 Food Conversations</h2>
        <p>
          Dining out? Impress with phrases to order food, express taste, or ask for tea!
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🍽️ Common Restaurant Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.hindi}</h3>
              <p>{phrase.english} ({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.hindi)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "खाना बहुत स्वादिष्ट है" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) The food is very tasty", isCorrect: true },
              { text: "B) Bring the bill", isCorrect: false },
              { text: "C) I am vegetarian", isCorrect: false },
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
              <p className="feedback-text">❌ Try again next time!</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Great job!</p>
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
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/phrases-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default HindiPhrasesLesson5;
