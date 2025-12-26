import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const phrases = [
  { hindi: "आप कैसे हैं?", english: "How are you?", pronunciation: "aap kaise hain?" },
  { hindi: "मैं ठीक हूँ", english: "I am fine", pronunciation: "main theek hoon" },
  { hindi: "आपका नाम क्या है?", english: "What is your name?", pronunciation: "aapka naam kya hai?" },
  { hindi: "मेरा नाम ... है", english: "My name is ...", pronunciation: "mera naam ... hai" },
  { hindi: "आप कहाँ से हैं?", english: "Where are you from?", pronunciation: "aap kahaan se hain?" },
  { hindi: "मुझे हिंदी पसंद है", english: "I like Hindi", pronunciation: "mujhe Hindi pasand hai" },
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

const HindiPhrasesLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Hindi - Phrases 3") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Phrases 3",
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
    navigate("/lesson/phrases-2");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Phrases 3: Conversations (संवाद)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">🗣️ Conversation Starters</h2>
        <p>
          In this lesson, you'll learn basic phrases to introduce yourself and start conversations.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🗨️ Common Conversations</h2>
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
          <p className="quiz-question">Q: How do you say "What is your name?" in Hindi?</p>
          <div className="quiz-options">
            {[
              { text: "A) आप कहाँ से हैं?", isCorrect: false },
              { text: "B) आपका नाम क्या है?", isCorrect: true },
              { text: "C) मुझे हिंदी पसंद है", isCorrect: false },
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
          <FaFire className="icon" /> 7-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default HindiPhrasesLesson3;
