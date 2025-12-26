import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { db, auth } from "../firebaseConfig";
import { doc, updateDoc, getDoc, increment, arrayUnion } from "firebase/firestore";
import "./Spanishpage.css";

// Vocabulary
const vocabulary = [
  { hindi: "खाना", english: "To eat", pronunciation: "khaanaa" },
  { hindi: "पीना", english: "To drink", pronunciation: "peenaa" },
  { hindi: "देखना", english: "To watch/see", pronunciation: "dekhnaa" },
  { hindi: "लेना", english: "To take", pronunciation: "lenaa" },
  { hindi: "देना", english: "To give", pronunciation: "denaa" },
  { hindi: "करना", english: "To do", pronunciation: "karnaa" },
];

// Example Sentences
const sentences = [
  {
    hindi: "मैं खाना खा रहा हूँ।",
    english: "I am eating food.",
    pronunciation: "main khaanaa khaa rahaa hoon",
  },
  {
    hindi: "वह पानी पी रही है।",
    english: "She is drinking water.",
    pronunciation: "vah paani pee rahee hai",
  },
  {
    hindi: "हम टीवी देख रहे हैं।",
    english: "We are watching TV.",
    pronunciation: "ham TV dekh rahe hain",
  },
  {
    hindi: "मैं तुम्हें किताब देता हूँ।",
    english: "I give you a book.",
    pronunciation: "main tumhein kitaab deta hoon",
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

const HindiBasicsLesson5 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
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
        if (data.completedLessons?.includes("basics-5")) {
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
        quizScores: arrayUnion({ lessonId: "basics-5", score: 1 }),
        completedLessons: arrayUnion("basics-5"),
      });
      setXp((prev) => prev + 20);
      setQuizCompleted(true);
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Basics 5: Hindi (क्रियाएँ - Verbs Continued)</h1>

      {/* Grammar Tip */}
      <section className="section grammar-tip">
        <h2 className="section-title">📘 Grammar Tip: Present Continuous Tense</h2>
        <p>
          Hindi uses "रहा/रही/रहे + हूँ/है/हैं" for present continuous tense:
          <br />
          ➤ <strong>मैं खा रहा हूँ।</strong> (I am eating – <em>male</em>) <br />
          ➤ <strong>मैं खा रही हूँ।</strong> (I am eating – <em>female</em>) <br />
          ➤ <strong>वे खेल रहे हैं।</strong> (They are playing)
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
          <p className="quiz-question">Q: What does "वह पानी पी रही है।" mean?</p>
          <div className="quiz-options">
            {[
              { text: "A) She is drinking water", isCorrect: true },
              { text: "B) She is reading a book", isCorrect: false },
              { text: "C) She is eating food", isCorrect: false },
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
        <button className="nav-btn" onClick={() => navigate("/lesson/basics-4")}>
          ⬅ Previous Lesson
        </button>
        <button onClick={() => navigate("/lesson/final-quiz")}>Take Final Quiz</button>
      </div>
    </div>
  );
};

export default HindiBasicsLesson5;
