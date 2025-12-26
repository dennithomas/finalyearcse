import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./HindiFinalQuiz.css"; // You can reuse same styles

const grammarQuestions = [
  {
    question: "Which is the correct usage of present indefinite tense?",
    options: [
      { text: "मैं स्कूल जाता हूँ।", isCorrect: true },
      { text: "मैं स्कूल गया था।", isCorrect: false },
      { text: "मैं स्कूल जाऊँगा।", isCorrect: false },
    ],
  },
  {
    question: "What is the gender of the word 'किताब'?",
    options: [
      { text: "Masculine", isCorrect: false },
      { text: "Feminine", isCorrect: true },
      { text: "Neutral", isCorrect: false },
    ],
  },
  {
    question: "Choose the correct postposition for 'table': 'किताब ___ टेबल पर है।'",
    options: [
      { text: "का", isCorrect: false },
      { text: "से", isCorrect: false },
      { text: "के", isCorrect: false },
      { text: "पर", isCorrect: true },
    ],
  },
  {
    question: "Which sentence is in future tense?",
    options: [
      { text: "मैं पढ़ रहा हूँ।", isCorrect: false },
      { text: "मैं पढ़ता हूँ।", isCorrect: false },
      { text: "मैं पढ़ूँगा।", isCorrect: true },
    ],
  },
  {
    question: "Which suffix denotes a feminine gender in Hindi nouns?",
    options: [
      { text: "ा", isCorrect: false },
      { text: "ी", isCorrect: true },
      { text: "े", isCorrect: false },
    ],
  },
];

const HindiGrammarFinalQuiz = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(Array(grammarQuestions.length).fill(null));
  const [isCorrect, setIsCorrect] = useState(Array(grammarQuestions.length).fill(null));
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
          xp: increment(50),
          completedLessons: arrayUnion("Hindi - Grammar Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Hindi - Grammar Final Quiz",
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

  const isAllAnswered = selected.every((answer) => answer !== null);

  return (
    <div className="final-quiz-container">
      <h1 className="quiz-title">Hindi Grammar Final Quiz</h1>

      {grammarQuestions.map((q, idx) => (
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

      {quizCompleted && (
        <div className="quiz-completion">
          <h2>Well done! You've completed the grammar quiz.</h2>
          <p>Your score: {score} / {grammarQuestions.length}</p>
        </div>
      )}

      {!quizCompleted && isAllAnswered && (
        <button className="submit-btn" onClick={handleSubmit}>
          Submit Quiz
        </button>
      )}

      <div className="navigation-buttons">
        {!quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/lesson/grammar-5")}>
            ⬅ Previous Lesson
          </button>
        )}
        {quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default HindiGrammarFinalQuiz;
