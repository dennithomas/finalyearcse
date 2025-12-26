import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { japanese: "男の人", english: "Man", pronunciation: "otoko no hito" },
  { japanese: "女の人", english: "Woman", pronunciation: "onna no hito" },
  { japanese: "牛乳", english: "Milk", pronunciation: "gyuu-nyuu" },
  { japanese: "パン", english: "Bread", pronunciation: "pan" },
  { japanese: "本", english: "Book", pronunciation: "hon" },
  { japanese: "学校", english: "School", pronunciation: "gakkou" },
];

const sentences = [
  { japanese: "彼女は女の人です。", english: "She is a woman.", pronunciation: "kanojo wa onna no hito desu" },
  { japanese: "男の人は牛乳を飲みます。", english: "The man is drinking milk.", pronunciation: "otoko no hito wa gyuu-nyuu o nomimasu" },
  { japanese: "私はパンを食べます。", english: "I eat bread.", pronunciation: "watashi wa pan o tabemasu" },
  { japanese: "あなたは本を読みます。", english: "You read a book.", pronunciation: "anata wa hon o yomimasu" },
  { japanese: "私たちは学校へ行きます。", english: "We go to school.", pronunciation: "watashitachi wa gakkou e ikimasu" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ja-JP";
    const voices = window.speechSynthesis.getVoices();
    const japaneseVoice = voices.find((voice) => voice.lang.includes("ja"));
    if (japaneseVoice) {
      utterance.voice = japaneseVoice;
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const JapaneseBasicsLesson2 = () => {
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
            completedLessons: correct ? arrayUnion("Japanese - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "Japanese - Basics Lesson-2",
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
      <h1 className="lesson-title">Basic Lesson-2: Japanese (日本語)</h1>

      {/* About */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you'll learn more basic Japanese nouns and verbs, and how to form simple sentences using them.
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.japanese}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.japanese)}>
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
              <p className="hindi-text">{s.japanese}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.japanese)}>
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
          <p className="quiz-question">Q: What does "あなたは本を読みます。" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) You read a book", isCorrect: true },
              { text: "B) He eats bread", isCorrect: false },
              { text: "C) She goes to school", isCorrect: false },
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
        <button className="nav-btn" onClick={() => navigate("/lesson/japanese-basics")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/japanese-basics-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default JapaneseBasicsLesson2;
