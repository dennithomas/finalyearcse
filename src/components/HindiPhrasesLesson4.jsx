import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const phrases = [
  { hindi: "रेलवे स्टेशन कहाँ है?", english: "Where is the railway station?", pronunciation: "railway station kahaan hai?" },
  { hindi: "टैक्सी चाहिए", english: "I need a taxi", pronunciation: "taxi chahiye" },
  { hindi: "कितना किराया है?", english: "How much is the fare?", pronunciation: "kitna kiraya hai?" },
  { hindi: "हवाई अड्डा कितनी दूर है?", english: "How far is the airport?", pronunciation: "hawaai adda kitni door hai?" },
  { hindi: "मुझे होटल चाहिए", english: "I need a hotel", pronunciation: "mujhe hotel chahiye" },
  { hindi: "पासपोर्ट यहाँ है", english: "Here is my passport", pronunciation: "passport yahaan hai" },
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

const HindiPhrasesLesson4 = () => {
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
            completedLessons: correct ? arrayUnion("Hindi - Phrases 4") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Phrases 4",
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
    navigate("/lesson/phrases-3");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Phrases 4: Travel Hindi (यात्रा हिन्दी)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">🧳 Travel Essentials</h2>
        <p>
          Going places? Learn how to ask for help, navigate transport, and find essentials in Hindi!
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">📍 Useful Travel Phrases</h2>
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
          <p className="quiz-question">Q: What does "मुझे होटल चाहिए" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) I need a taxi", isCorrect: false },
              { text: "B) I need a hotel", isCorrect: true },
              { text: "C) Where is the airport?", isCorrect: false },
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
          <FaFire className="icon" /> 8-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/phrases-5")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default HindiPhrasesLesson4;
