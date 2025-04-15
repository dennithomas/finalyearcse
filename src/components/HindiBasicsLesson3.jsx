import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db,auth } from "../firebaseConfig";
import "./HindiBasicsLesson.css";

const vocabulary = [
  { hindi: "स्कूल", english: "School", pronunciation: "school" },
  { hindi: "अध्यापक", english: "Teacher (male)", pronunciation: "adhyapak" },
  { hindi: "अध्यापिका", english: "Teacher (female)", pronunciation: "adhyaapika" },
  { hindi: "बच्चा", english: "Child (boy)", pronunciation: "bachchaa" },
  { hindi: "बच्ची", english: "Child (girl)", pronunciation: "bachchi" },
  { hindi: "कलम", english: "Pen", pronunciation: "kalam" },
  { hindi: "पढ़ाई", english: "Studies", pronunciation: "padhai" },
];

const sentences = [
  {
    hindi: "बच्चे स्कूल जा रहे हैं।",
    english: "The children are going to school.",
    pronunciation: "bachche school ja rahe hain",
  },
  {
    hindi: "अध्यापक कक्षा में हैं।",
    english: "The teacher is in the classroom.",
    pronunciation: "adhyapak kaksha mein hain",
  },
  {
    hindi: "मैं हिंदी पढ़ रहा हूँ।",
    english: "I am studying Hindi.",
    pronunciation: "main hindi padh rahaa hoon",
  },
  {
    hindi: "बच्ची कलम से लिख रही है।",
    english: "The girl is writing with a pen.",
    pronunciation: "bachchi kalam se likh rahi hai",
  },
  {
    hindi: "हम पढ़ाई कर रहे हैं।",
    english: "We are studying.",
    pronunciation: "hum padhai kar rahe hain",
  },
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

const HindiBasicsLesson3 = () => {
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
            completedLessons: correct ? arrayUnion("Hindi - Basics 3") : [],
            quizScores: arrayUnion({
              lesson: "Hindi - Basics 3",
              score: score,
              attempts: 1,
            }),
          });

          setXpGained(true);
        }
      } catch (error) {
        console.error("Error updating quiz/XP:", error);
      }
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics 3: Hindi (बुनियादी)</h1>

      {/* Grammar Tip */}
      <section className="section grammar-tip">
        <h2 className="section-title">📘 Grammar Tip: Present Continuous Tense</h2>
        <p>
          In Hindi, present continuous is used to describe actions happening <em>right now</em>.<br />
          <strong>Structure:</strong> Subject + Verb Stem + रहा/रही/रहे + है/हैं<br />
          <strong>Example:</strong> <em>मैं पढ़ रहा हूँ।</em> (I am studying.)
        </p>
      </section>

      {/* Vocabulary */}
      <section className="section">
        <h2 className="section-title">🧠 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((word, index) => (
            <div key={index} className="vocab-card">
              <h3>{word.hindi}</h3>
              <p>{word.english} ({word.pronunciation})</p>
              <button className="play-button" onClick={() => speak(word.hindi)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Example Sentences */}
      <section className="section">
        <h2 className="section-title">📝 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="hindi-text">{s.hindi}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="english-text">{s.english}</p>
              <button className="play-button" onClick={() => speak(s.hindi)}>
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
          <p className="quiz-question">Q: What does "बच्ची कलम से लिख रही है।" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) The boy is reading", isCorrect: false },
              { text: "B) The girl is writing with a pen", isCorrect: true },
              { text: "C) The girl is going to school", isCorrect: false },
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
            {selected !== null && (
              <p className="feedback-text">
                {isCorrect ? "✅ Great job!" : "❌ Try again!"}
              </p>
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
        <button className="nav-btn" onClick={() => navigate("/lesson/basics-2")}>
          ⬅ Previous Lesson
        </button>
        <button className="nav-btn next" onClick={() => navigate("/lesson/basics-4")}>
          Next Lesson ➡
        </button>
      </div>
    </div>
  );
};

export default HindiBasicsLesson3;
