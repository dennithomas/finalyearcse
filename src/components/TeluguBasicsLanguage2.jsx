import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { telugu: "నక్క", english: "Fox", pronunciation: "nakka" },
  { telugu: "ఆవు", english: "Cow", pronunciation: "aavu" },
  { telugu: "పాలు", english: "Milk", pronunciation: "paalu" },
  { telugu: "రొట్టె", english: "Bread", pronunciation: "rotte" },
  { telugu: "పుస్తకం", english: "Book", pronunciation: "pustakam" },
  { telugu: "పాఠశాల", english: "School", pronunciation: "paathaśaala" },
];

const sentences = [
  { telugu: "ఆమె ఒక నక్క.", english: "She is a fox.", pronunciation: "aame oka nakka" },
  { telugu: "ఆవు పాలను తాగుతుంది.", english: "The cow drinks milk.", pronunciation: "aavu paalanu thaagutundi" },
  { telugu: "నేను రొట్టె తింటున్నాను.", english: "I eat bread.", pronunciation: "nenu rotte tintunnaanu" },
  { telugu: "నీవు పుస్తకం చదువుతున్నావు.", english: "You read a book.", pronunciation: "neevu pustakam chadhuvutunnaavu" },
  { telugu: "మనం పాఠశాలకు వెళ్తున్నాం.", english: "We go to school.", pronunciation: "manam paathaśaalaku veltunnaam" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "te-IN";
    const voices = window.speechSynthesis.getVoices();
    const teluguVoice = voices.find((voice) => voice.lang.includes("te"));
    if (teluguVoice) {
      utterance.voice = teluguVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TeluguBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Telugu - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "Telugu - Basics Lesson-2",
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
      <h1 className="lesson-title">Basics Lesson-2: Telugu (తెలుగు)</h1>

      {/* About */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you'll learn more Telugu nouns and verbs, and how to form simple sentences using them.
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.telugu}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.telugu)}>
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
              <p className="hindi-text">{s.telugu}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.telugu)}>
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
          <p className="quiz-question">Q: What does "నీవు పుస్తకం చదువుతున్నావు." mean?</p>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/telugu-basics")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/telugu-basics-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default TeluguBasicsLesson2;
