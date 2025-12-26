import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, getDoc, increment, arrayUnion } from "firebase/firestore";
import Lottie from "lottie-react";
import celebrationAnimation from "../animation/celebration.json"; // make sure you have this or update path
import "./Spanishpage.css";

// Vocabulary
const vocabulary = [
  { hindi: "चलना", english: "To walk", pronunciation: "chalnaa" },
  { hindi: "भागना", english: "To run", pronunciation: "bhaagnaa" },
  { hindi: "सोना", english: "To sleep", pronunciation: "sonaa" },
  { hindi: "जागना", english: "To wake up", pronunciation: "jaagnaa" },
  { hindi: "पढ़ना", english: "To study", pronunciation: "padhnaa" },
  { hindi: "लिखना", english: "To write", pronunciation: "likhnaa" },
];

// Example Sentences
const sentences = [
  {
    hindi: "मैं स्कूल जाता हूँ।",
    english: "I go to school.",
    pronunciation: "main school jaataa hoon",
  },
  {
    hindi: "वह दौड़ रही है।",
    english: "She is running.",
    pronunciation: "vah daud rahi hai",
  },
  {
    hindi: "बच्चा सो रहा है।",
    english: "The child is sleeping.",
    pronunciation: "bachchaa so rahaa hai",
  },
  {
    hindi: "मैं किताब पढ़ रहा हूँ।",
    english: "I am reading a book.",
    pronunciation: "main kitaab padh rahaa hoon",
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
  }
};

const HindiBasicsLesson4 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setXp(data.xp || 0);
        setStreak(data.streak || 0);
        if (data.completedLessons?.includes("basics-4")) {
          setQuizCompleted(true);
        }
      }
    };
    fetchUserData();
  }, []);

  const handleAnswer = async (correct, index) => {
    setSelected(index);
    setIsCorrect(correct);

    if (correct && !quizCompleted) {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        xp: increment(20),
        quizScores: arrayUnion({ lessonId: "basics-4", score: 1 }),
        completedLessons: arrayUnion("basics-4"),
      });

      setXp((prev) => prev + 20);
      setQuizCompleted(true);
      setShowPopup(true);

      // Hide popup after 4 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4000);
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics 4: Hindi (क्रियाएँ - Verbs)</h1>

      {/* Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <Lottie animationData={celebrationAnimation} loop={false} className="popup-animation" />
            <h2>🎉 Lesson Completed!</h2>
            <p>You've earned +20 XP</p>
          </div>
        </div>
      )}

      {/* Grammar Tip */}
      <section className="section grammar-tip">
        <h2 className="section-title">📘 Grammar Tip: Verb Agreement</h2>
        <p>
          Verbs in Hindi agree with the gender and number of the subject:
          <br />
          ➤ <strong>मैं सो रहा हूँ।</strong> (I am sleeping – <em>male</em>) <br />
          ➤ <strong>मैं सो रही हूँ।</strong> (I am sleeping – <em>female</em>) <br />
          ➤ <strong>वह पढ़ रहा है।</strong> (He is reading) <br />
          ➤ <strong>वह पढ़ रही है।</strong> (She is reading)
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

      {/* Sentences */}
      <section className="section">
        <h2 className="section-title">📖 Example Sentences</h2>
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
          <p className="quiz-question">Q: What does "मैं पढ़ रहा हूँ।" mean?</p>
          <div className="quiz-options">
            {[{ text: "A) I am running", isCorrect: false },
              { text: "B) I am reading", isCorrect: true },
              { text: "C) I am walking", isCorrect: false },
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
                {isCorrect ? "✅ Great job!" : "❌ Oops! Try again next time."}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* XP & Streak */}
      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> {streak}-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {xp}
        </div>
      </div>

      {/* Navigation */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/lesson/basics-3")}>
          ⬅ Previous Lesson
        </button>
        <button className="nav-btn next" onClick={() => navigate("/lesson/basics-5")}>
          Next Lesson ➡
        </button>
      </div>
    </div>
  );
};

export default HindiBasicsLesson4;
