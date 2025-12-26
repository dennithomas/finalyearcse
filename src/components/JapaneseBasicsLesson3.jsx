import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css";

const vocabulary = [
  { japanese: "本", english: "Book", pronunciation: "hon" },
  { japanese: "テーブル", english: "Table", pronunciation: "tee-bu-ru" },
  { japanese: "いす", english: "Chair", pronunciation: "i-su" },
  { japanese: "まど", english: "Window", pronunciation: "ma-do" },
  { japanese: "ドア", english: "Door", pronunciation: "do-a" },
  { japanese: "いぬ", english: "Dog", pronunciation: "i-nu" },
];

const sentences = [
  { japanese: "本はテーブルの上にあります。", english: "The book is on the table.", pronunciation: "hon wa tee-bu-ru no ue ni ari-masu" },
  { japanese: "いすはまどのそばにあります。", english: "The chair is next to the window.", pronunciation: "isu wa mado no soba ni ari-masu" },
  { japanese: "いぬはドアのところにいます。", english: "The dog is at the door.", pronunciation: "inu wa doa no tokoro ni i-masu" },
  { japanese: "私は本を持っています。", english: "I have a book.", pronunciation: "watashi wa hon o motte i-masu" },
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

const JapaneseBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Japanese - Lesson Basics-3") : [],
            quizScores: arrayUnion({
              lesson: "Japanese - Basics 3",
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
      <h1 className="lesson-title">Basics: Japanese (日本語) - Lesson-3</h1>

      {/* About Japanese */}
      <section className="section about-hindi">
        <h2 className="section-title">📝 About Japanese</h2>
        <p>
          Japanese (日本語) is a beautiful and expressive language. This lesson introduces more practical nouns and how to use them in daily expressions.
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
          <p className="quiz-question">Q: What does "いぬはドアのところにいます。" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) The dog is at the door", isCorrect: true },
              { text: "B) The dog is in the window", isCorrect: false },
              { text: "C) The dog is on the table", isCorrect: false },
            ].map((option, index) => (
              <button
                key={index}
                className={`option-btn ${selected !== null ? option.isCorrect ? "correct" : index === selected ? "wrong" : "" : ""}`}
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
        <button className="nav-btn" onClick={() => navigate("/lesson/japanese-basics-2")}>⬅ Previous</button>
        <button onClick={() => navigate("/lesson/japanese-final-quiz")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default JapaneseBasicsLesson3;