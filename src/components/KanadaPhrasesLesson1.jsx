import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";


const phrases = [
  { kannada: "ನಮಸ್ಕಾರ", english: "Hello", pronunciation: "namaskāra" },
  { kannada: "ಧನ್ಯವಾದ", english: "Thank you", pronunciation: "dhanyavāda" },
  { kannada: "ನೀವು ಹೇಗಿದ್ದೀರಾ?", english: "How are you?", pronunciation: "nīvu hēgiddīrā?" },
  { kannada: "ಕ್ಷಮಿಸಿ", english: "Excuse me / Sorry", pronunciation: "kṣamisi" },
  { kannada: "ಸ್ವಾಗತ", english: "You're welcome", pronunciation: "swāgata" },
  { kannada: "ಮತ್ತೆ ಭೇಟಿಯಾಗೋಣ", english: "See you again", pronunciation: "matte bhēṭiyāgōṇa" },
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

const KannadaPhrasesLesson = () => {
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
            completedLessons: correct ? arrayUnion("Kannada - Phrases") : [],
            quizScores: arrayUnion({
              lesson: "Kannada - Phrases",
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
    <div className="kannada-lesson-container">
      <h1 className="lesson-title">Phrases: Kannada (ವಾಕ್ಯಗಳು)</h1>

      <section className="section about-kannada">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>In this lesson, you will learn basic Kannada phrases used in everyday conversation.</p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Common Phrases</h2>
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
          <p className="quiz-question">Q: What does "ಧನ್ಯವಾದ" mean?</p>
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
        <button onClick={() => navigate("/lesson/kannada-phrases-2")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default KannadaPhrasesLesson;
