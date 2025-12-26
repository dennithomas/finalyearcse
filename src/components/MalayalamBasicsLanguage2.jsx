import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { malayalam: "നരി", english: "Fox", pronunciation: "nari" },
  { malayalam: "പശു", english: "Cow", pronunciation: "pashu" },
  { malayalam: "പാല്", english: "Milk", pronunciation: "paal" },
  { malayalam: "റൊട്ടി", english: "Bread", pronunciation: "rotti" },
  { malayalam: "പുസ്തകം", english: "Book", pronunciation: "pustakam" },
  { malayalam: "പാഠശാല", english: "School", pronunciation: "paathashaala" },
];

const sentences = [
  { malayalam: "അവള് ഒരു നരിയാണ്.", english: "She is a fox.", pronunciation: "aval oru nariyaanu" },
  { malayalam: "പശു പാല് കുടിക്കുന്നു.", english: "The cow drinks milk.", pronunciation: "pashu paal kudikkunnu" },
  { malayalam: "ഞാന് റൊട്ടി കഴിക്കുന്നു.", english: "I eat bread.", pronunciation: "njyaan rotti kazhikkunnu" },
  { malayalam: "നീ പുസ്തകം വായിക്കുന്നു.", english: "You read a book.", pronunciation: "nee pustakam vaayikkunnu" },
  { malayalam: "നാം പാഠശാലയില് പോകുന്നു.", english: "We go to school.", pronunciation: "naam paathashaayil pokunnu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ml-IN";
    const voices = window.speechSynthesis.getVoices();
    const malayalamVoice = voices.find((voice) => voice.lang.includes("ml"));
    if (malayalamVoice) {
      utterance.voice = malayalamVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const MalayalamBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Malayalam - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "Malayalam - Basics Lesson-2",
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

  return (
    <div className="spanish-lesson-container">
      <h1 className="lesson-title">Basics Lesson-2: Malayalam (മലയാളം)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you'll learn more Malayalam nouns and verbs, and how to form simple sentences using them.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.malayalam}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.malayalam}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.malayalam)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "നീ പുസ്തകം വായിക്കുന്നു." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) You read a book", isCorrect: true },
              { text: "B) I drink milk", isCorrect: false },
              { text: "C) She eats bread", isCorrect: false },
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
        <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-basics")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/malayalam-basics-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default MalayalamBasicsLesson2;
