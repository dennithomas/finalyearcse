import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./HindiFinalQuiz.css";

const questions = [
  {
    question: "What does 'अध्यापक' mean?",
    options: [
      { text: "Teacher (male)", isCorrect: true },
      { text: "Teacher (female)", isCorrect: false },
      { text: "Child (boy)", isCorrect: false },
    ],
  },
  {
    question: "What is the structure for Present Continuous Tense in Hindi?",
    options: [
      { text: "Subject + Verb Stem + रहा/रही/रहे + है/हैं", isCorrect: true },
      { text: "Subject + Verb Stem + था/थी + है/हैं", isCorrect: false },
      { text: "Subject + Verb Stem + हैं", isCorrect: false },
    ],
  },
  {
    question: "What does 'बच्ची कलम से लिख रही है।' mean?",
    options: [
      { text: "The boy is reading", isCorrect: false },
      { text: "The girl is writing with a pen", isCorrect: true },
      { text: "The girl is going to school", isCorrect: false },
    ],
  },
  {
    question: "What is the pronunciation of 'अध्यापिका'?",
    options: [
      { text: "adhyapak", isCorrect: false },
      { text: "adhyaapika", isCorrect: true },
      { text: "bachchi", isCorrect: false },
    ],
  },
  {
    question: "What does 'पढ़ाई' mean?",
    options: [
      { text: "Pen", isCorrect: false },
      { text: "Studies", isCorrect: true },
      { text: "Teacher (female)", isCorrect: false },
    ],
  },
];

const HindiFinalQuiz = () => {
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
    // Update the user's progress after the quiz is completed
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: increment(50), // Awarding 50 XP for completing the final quiz
          completedLessons: arrayUnion("Hindi - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Hindi - Final Quiz",
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
      <h1 className="quiz-title">Hindi Final Quiz</h1>

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
          <h2>Congratulations! You've completed the quiz.</h2>
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
            onClick={() => navigate("/lesson/basics-5")}
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

export default HindiFinalQuiz;
