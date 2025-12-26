import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./SpanishFinal.css"; // Reuse existing styling or customize as needed

const questions = [
  {
    question: "What does 'Homme' mean?",
    options: [
      { text: "Man", isCorrect: true },
      { text: "Woman", isCorrect: false },
      { text: "Book", isCorrect: false },
    ],
  },
  {
    question: "Translate: 'Elle est une femme.'",
    options: [
      { text: "She is a woman", isCorrect: true },
      { text: "He is a man", isCorrect: false },
      { text: "She is drinking milk", isCorrect: false },
    ],
  },
  {
    question: "What is the pronunciation of 'École'?",
    options: [
      { text: "ay-kol", isCorrect: true },
      { text: "eh-skool", isCorrect: false },
      { text: "es-ku-la", isCorrect: false },
    ],
  },
  {
    question: "What does 'Je mange du pain.' mean?",
    options: [
      { text: "I eat bread", isCorrect: true },
      { text: "I drink milk", isCorrect: false },
      { text: "You read a book", isCorrect: false },
    ],
  },
  {
    question: "Translate: 'Tu lis un livre.'",
    options: [
      { text: "You read a book", isCorrect: true },
      { text: "You eat bread", isCorrect: false },
      { text: "You drink milk", isCorrect: false },
    ],
  },
];

const FrenchFinalQuiz = () => {
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
      setScore((prev) => prev + 1);
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
          completedLessons: arrayUnion("French - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "French - Final Quiz",
            score: score,
            attempts: 1,
          }),
        });
        setQuizCompleted(true);
      } catch (err) {
        console.error("Error submitting quiz:", err);
      }
    }
  };

  const isAllAnswered = selected.every((answer) => answer !== null);

  return (
    <div className="final-quiz-container">
      <h1 className="quiz-title">French Final Quiz</h1>

      {questions.map((q, idx) => (
        <div key={idx} className="quiz-question-card">
          <p>{q.question}</p>
          <div className="quiz-options">
            {q.options.map((option, i) => (
              <button
                key={i}
                className={`option-btn ${
                  selected[idx] !== null
                    ? option.isCorrect
                      ? "correct"
                      : i === selected[idx]
                      ? "wrong"
                      : ""
                    : ""
                }`}
                onClick={() => handleAnswer(option.isCorrect, idx)}
                disabled={selected[idx] !== null}
              >
                {option.text}
                {selected[idx] !== null && option.isCorrect && <FaCheckCircle className="correct-icon" />}
                {selected[idx] !== null && !option.isCorrect && <FaTimesCircle className="wrong-icon" />}
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

      {quizCompleted && (
        <div className="quiz-completion">
          <h2>🎉 Félicitations ! Vous avez terminé le quiz final de français !</h2>
          <p>Your score: {score} / {questions.length}</p>
        </div>
      )}

      {!quizCompleted && isAllAnswered && (
        <button className="submit-btn" onClick={handleSubmit}>Submit Quiz</button>
      )}

      <div className="navigation-buttons">
        {!quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/lesson/french-basics-3")}>⬅ Previous Lesson</button>
        )}
        {quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        )}
      </div>
    </div>
  );
};

export default FrenchFinalQuiz;
