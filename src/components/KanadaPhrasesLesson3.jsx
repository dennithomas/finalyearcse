import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";


const phrases = [
  { kannada: "ಓಕೆ", english: "Okay", pronunciation: "ōke" },
  { kannada: "ಇದು ಎಷ್ಟು?", english: "How much is this?", pronunciation: "idu eṣṭu?" },
  { kannada: "ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತಿದ್ದೇನೆ", english: "I am learning Kannada", pronunciation: "nānu kannaḍa kaliyuttiddēne" },
  { kannada: "ನೀವು ಸಹಾಯ ಮಾಡುತ್ತೀರಾ?", english: "Can you help me?", pronunciation: "nīvu sahāya māḍuttīrā?" },
  { kannada: "ಚಿಂತಿಸಬೇಡಿ", english: "Don’t worry", pronunciation: "cintisabēḍi" },
  { kannada: "ಬಿಡಿ", english: "Leave it", pronunciation: "biḍi" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((voice) => voice.lang.includes("kn"));
    if (kannadaVoice) utterance.voice = kannadaVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const KannadaPhrasesLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Kannada - Phrases 3") : [],
            quizScores: arrayUnion({
              lesson: "Kannada - Phrases 3",
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
    navigate("/lesson/kannada-phrases-2");
  };

  return (
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">Phrases: Kannada (ವಾಕ್ಯಗಳು) - Lesson 3</h1>

      <section className="section about-kannada">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>Learn more Kannada expressions for casual and helpful conversation.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Conversational Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.kannada}</h3>
              <p>{phrase.english} ({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.kannada)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "ಚಿಂತಿಸಬೇಡಿ" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) Don’t worry", isCorrect: true },
              { text: "B) Thank you", isCorrect: false },
              { text: "C) Sorry", isCorrect: false },
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
        <button onClick={() => navigate("/lesson/kannada-phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default KannadaPhrasesLesson3;
