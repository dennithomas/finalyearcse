import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Using same styles

const phrases = [
  { tamil: "உங்களை சந்திப்பதில் மகிழ்ச்சி", english: "Nice to meet you", pronunciation: "ungalai sandhippathil magilchi" },
  { tamil: "நீங்கள் தமிழில் பேசுகிறீர்களா?", english: "Do you speak Tamil?", pronunciation: "neengal tamilil pesugireergala?" },
  { tamil: "சரி", english: "Okay", pronunciation: "sari" },
  { tamil: "நன்றி", english: "Thank you", pronunciation: "nandri" },
  { tamil: "என்னிடம் தமிழ் சிறிது மட்டுமே தெரியும்", english: "I know only a little Tamil", pronunciation: "ennidam tamil siridhu mattume theriyum" },
  { tamil: "மீண்டும் சந்திப்போம்", english: "See you again", pronunciation: "meendum sandippom" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN";
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang.includes("ta"));
    if (tamilVoice) utterance.voice = tamilVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TamilPhrasesLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Tamil - Phrases 3") : [],
            quizScores: arrayUnion({
              lesson: "Tamil - Phrases 3",
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
      <h1 className="lesson-title">Phrases 3: Tamil (வாக்கியங்கள் 3)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you will learn conversational Tamil phrases for greetings and common situations.
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
          <p className="quiz-question">Q: How do you say "Nice to meet you" in Tamil?</p>
          <div className="quiz-options">
            {[
              { text: "A) உங்களை சந்திப்பதில் மகிழ்ச்சி", isCorrect: true },
              { text: "B) மீண்டும் சந்திப்போம்", isCorrect: false },
              { text: "C) சரி", isCorrect: false },
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
        <button onClick={() => navigate("/lesson/tamil-phrases-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TamilPhrasesLesson3;
