import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./HindiFinalQuiz.css"; // Reuse same CSS

const questions = [
  {
    question: "What does 'அப்பா' mean?",
    options: [
      { text: "Father", isCorrect: true },
      { text: "Mother", isCorrect: false },
      { text: "Brother", isCorrect: false },
    ],
  },
  {
    question: "What is the Tamil word for 'Sister'?",
    options: [
      { text: "சகோதரி", isCorrect: true },
      { text: "சகோதரர்", isCorrect: false },
      { text: "மகள்", isCorrect: false },
    ],
  },
  {
    question: "What does 'அவன் பள்ளிக்குச் செல்கிறான்.' mean?",
    options: [
      { text: "He is going to school.", isCorrect: true },
      { text: "She is cooking food.", isCorrect: false },
      { text: "He is writing a letter.", isCorrect: false },
    ],
  },
  {
    question: "What is the pronunciation of 'அம்மா'?",
    options: [
      { text: "amma", isCorrect: true },
      { text: "appa", isCorrect: false },
      { text: "magan", isCorrect: false },
    ],
  },
  {
    question: "What does 'மகள்' mean?",
    options: [
      { text: "Son", isCorrect: false },
      { text: "Daughter", isCorrect: true },
      { text: "Mother", isCorrect: false },
    ],
  },
];

const TamilFinalQuiz = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = async (correct, index) => {
    const updatedSelected = [...selected];
    const updatedIsCorrect = [...isCorrect];
    
    updatedSelected[index] = correct;
    updatedIsCorrect[index] = correct ? "correct" : "wrong";

    setSelected(updatedSelected);
    setIsCorrect(updatedIsCorrect);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: increment(50), // 50 XP for Tamil Final Quiz
          completedLessons: arrayUnion("Tamil - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Tamil - Final Quiz",
            score: score,
            attempts: 1,
          }),
        });
        setQuizCompleted(true);
      } catch (error) {
        console.error("Error updating quiz/XP:", error);
      }
    }
  };

  const isAllAnswered = selected.every(answer => answer !== null);

  return (
    <div className="final-quiz-container">
      <h1 className="quiz-title">Tamil Final Quiz</h1>

      {/* Quiz Questions */}
      {questions.map((q, idx) => (
        <div key={idx} className="quiz-question-card">
          <p>{q.question}</p>
          <div className="quiz-options">
            {q.options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selected[idx] !== null
                    ? option.isCorrect
                      ? "correct"
                      : index === selected[idx]
                      ? "wrong"
                      : ""
                    : ""
                }`}
                onClick={() => handleAnswer(option.isCorrect, idx)}
                disabled={selected[idx] !== null}
              >
                {option.text}
                {selected[idx] !== null && option.isCorrect && (
                  <FaCheckCircle className="correct-icon" />
                )}
                {selected[idx] !== null && !option.isCorrect && (
                  <FaTimesCircle className="wrong-icon" />
                )}
              </button>
            ))}
          </div>
          {selected[idx] !== null && (
            <p className="feedback-text">
              {isCorrect[idx] === "correct" ? "✅ Correct!" : "❌ Incorrect!"}
            </p>
          )}
        </div>
      ))}

      {/* Final Score */}
      {quizCompleted && (
        <div className="quiz-completion">
          <h2>Congratulations! You've completed the Tamil quiz!</h2>
          <p>Your score: {score} / {questions.length}</p>
        </div>
      )}

      {/* Submit Button */}
      {!quizCompleted && isAllAnswered && (
        <button
          className="submit-btn"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      )}

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        {!quizCompleted && (
          <button
            className="nav-btn"
            onClick={() => navigate("/lesson/tamil-basics-5")}
          >
            ⬅ Previous Lesson
          </button>
        )}
        {quizCompleted && (
          <button
            className="nav-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default TamilFinalQuiz;
