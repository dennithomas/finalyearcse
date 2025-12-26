import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./HindiFinalQuiz.css"; // Reusing the same CSS

const questions = [
  {
    question: "What does 'कैसे हो?' mean?",
    options: [
      { text: "Where are you?", isCorrect: false },
      { text: "How are you?", isCorrect: true },
      { text: "Who are you?", isCorrect: false },
    ],
  },
  {
    question: "Translate 'मुझे भूख लगी है।'",
    options: [
      { text: "I am hungry.", isCorrect: true },
      { text: "I am sleepy.", isCorrect: false },
      { text: "I am tired.", isCorrect: false },
    ],
  },
  {
    question: "What does 'धन्यवाद' mean?",
    options: [
      { text: "Goodbye", isCorrect: false },
      { text: "Sorry", isCorrect: false },
      { text: "Thank you", isCorrect: true },
    ],
  },
  {
    question: "Translate 'शुभ रात्रि।'",
    options: [
      { text: "Good night.", isCorrect: true },
      { text: "Good morning.", isCorrect: false },
      { text: "Good evening.", isCorrect: false },
    ],
  },
  {
    question: "What does 'क्या समय हुआ है?' mean?",
    options: [
      { text: "What is the time?", isCorrect: true },
      { text: "Where are we?", isCorrect: false },
      { text: "Who are you?", isCorrect: false },
    ],
  },
];

const PhrasesFinalQuiz = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Array(questions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswer = (correct, index) => {
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
          xp: increment(50),
          completedLessons: arrayUnion("Phrases - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Phrases - Final Quiz",
            score: score,
            attempts: 1,
          }),
        });
        setQuizCompleted(true);
      } catch (error) {
        console.error("Error updating user progress:", error);
      }
    }
  };

  const isAllAnswered = selected.every(answer => answer !== null);

  return (
    <div className="final-quiz-container">
      <h1 className="quiz-title">Phrases Final Quiz</h1>

      {questions.map((q, idx) => (
        <div key={idx} className="quiz-question-card">
          <p className="quiz-question">{q.question}</p>
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
            <p className={`feedback-text ${isCorrect[idx]}`}>
              {isCorrect[idx] === "correct" ? "✅ Correct!" : "❌ Incorrect!"}
            </p>
          )}
        </div>
      ))}

      {quizCompleted && (
        <div className="quiz-completion">
          <h2>Well done! You've completed the quiz.</h2>
          <p>Your score: {score} / {questions.length}</p>
        </div>
      )}

      {!quizCompleted && isAllAnswered && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}

      <div className="navigation-buttons">
        {!quizCompleted && (
          <button
            className="nav-btn"
            onClick={() => navigate("/lesson/phrases-5")}
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

export default PhrasesFinalQuiz;
