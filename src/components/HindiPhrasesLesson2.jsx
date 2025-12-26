import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./HindiBasicsLesson.css";

const phrases = [
  { hindi: "मुझे नहीं पता", english: "I don't know", pronunciation: "mujhe nahi pata" },
  { hindi: "कोई बात नहीं", english: "No problem", pronunciation: "koi baat nahi" },
  { hindi: "क्या समय हुआ है?", english: "What time is it?", pronunciation: "kya samay hua hai?" },
  { hindi: "मुझे मदद चाहिए", english: "I need help", pronunciation: "mujhe madad chahiye" },
  { hindi: "कृपया धीरे बोलिए", english: "Please speak slowly", pronunciation: "kripya dheere boliye" },
  { hindi: "मैं समझ नहीं पाया", english: "I didn't understand", pronunciation: "main samajh nahi paaya" },
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

const HindiPhrasesLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Hindi - Phrases 2") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Phrases 2",
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
    navigate("/lesson/phrases-1");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Phrases 2: Hindi (वाक्यांश २)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          Continue learning helpful phrases in Hindi to build your everyday conversation skills.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 More Common Phrases</h2>
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
          <p className="quiz-question">Q: What does "मुझे मदद चाहिए" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) I need help", isCorrect: true },
              { text: "B) I don't know", isCorrect: false },
              { text: "C) No problem", isCorrect: false },
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
          <FaFire className="icon" /> 6-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/phrases-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default HindiPhrasesLesson2;
