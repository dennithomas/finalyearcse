import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { kannada: "ಮೇಜು", english: "Table", pronunciation: "mēju" },
  { kannada: "ಕುರ್ಚಿ", english: "Chair", pronunciation: "kurci" },
  { kannada: "ಕಿಟಕಿ", english: "Window", pronunciation: "kiṭaki" },
  { kannada: "ಕಟಕಿ", english: "Door", pronunciation: "kaṭaki" },
  { kannada: "ನಾಯಿ", english: "Dog", pronunciation: "nāyi" },
  { kannada: "ಪುಸ್ತಕ", english: "Book", pronunciation: "pustaka" },
];

const sentences = [
  { kannada: "ಪುಸ್ತಕ ಮೇಜಿನ ಮೇಲೆ ಇದೆ.", english: "The book is on the table.", pronunciation: "pustaka mējina mēle ide" },
  { kannada: "ಕುರ್ಚಿ ಕಿಟಕಿಯ ಪಕ್ಕದಲ್ಲಿ ಇದೆ.", english: "The chair is next to the window.", pronunciation: "kurci kiṭakiya pakkadalli ide" },
  { kannada: "ನಾಯಿ ಬಾಗಿಲು ಹತ್ತಿರ ಇದೆ.", english: "The dog is at the door.", pronunciation: "nāyi bāgilu hattira ide" },
  { kannada: "ನಾನು ಒಂದು ಪುಸ್ತಕ ಹೊಂದಿದ್ದೇನೆ.", english: "I have a book.", pronunciation: "nānu ondu pustaka hondiddēne" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "kn-IN";
    const voices = window.speechSynthesis.getVoices();
    const kannadaVoice = voices.find((voice) => voice.lang.includes("kn"));
    if (kannadaVoice) {
      utterance.voice = kannadaVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const KannadaBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Kannada - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "Kannada - Basics 3",
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
      <h1 className="lesson-title">Basics: Kannada (ಕನ್ನಡ) - Lesson-3</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About Kannada</h2>
        <p>
          Kannada (ಕನ್ನಡ) is a rich Dravidian language spoken widely in Karnataka. In this lesson, you’ll learn common nouns and how to use them in simple sentences.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.kannada}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.kannada)}>
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
              <p className="hindi-text">{s.kannada}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.kannada)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: What does "ನಾಯಿ ಬಾಗಿಲು ಹತ್ತಿರ ಇದೆ." mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) The dog is at the door", isCorrect: true },
              { text: "B) The dog is in the window", isCorrect: false },
              { text: "C) The dog is on the table", isCorrect: false },
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
                {selected !== null && option.isCorrect && <FaCheckCircle className="correct-icon" />}
              </button>
            ))}
            {selected !== null && isCorrect === false && <p className="feedback-text">❌ Oops! That's not correct.</p>}
            {selected !== null && isCorrect === true && <p className="feedback-text">✅ Correct!</p>}
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
        <button className="nav-btn" onClick={() => navigate("/lesson/kannada-basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/kannada-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default KannadaBasicsLesson3;
