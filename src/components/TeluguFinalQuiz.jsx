import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./SpanishFinal.css";

const questions = [
  {
    question: "'కుక్క' అనగా ఏమిటి?",
    options: [
      { text: "Dog", isCorrect: true },
      { text: "Cat", isCorrect: false },
      { text: "Cow", isCorrect: false },
    ],
  },
  {
    question: "'ఆమె ఒక మహిళ' ను అనువదించండి.",
    options: [
      { text: "She is a woman", isCorrect: true },
      { text: "He is a man", isCorrect: false },
      { text: "She is a teacher", isCorrect: false },
    ],
  },
  {
    question: "'పుస్తకం' అర్థం ఏమిటి?",
    options: [
      { text: "Book", isCorrect: true },
      { text: "Pen", isCorrect: false },
      { text: "Table", isCorrect: false },
    ],
  },
  {
    question: "'నేను తింటున్నాను' అంటే ఏమిటి?",
    options: [
      { text: "I am eating", isCorrect: true },
      { text: "I am sleeping", isCorrect: false },
      { text: "I am writing", isCorrect: false },
    ],
  },
  {
    question: "'మీరు పాఠాన్ని చదుస్తున్నారు.' అనువాదం ఏమిటి?",
    options: [
      { text: "You are studying the lesson", isCorrect: true },
      { text: "You are eating food", isCorrect: false },
      { text: "You are playing", isCorrect: false },
    ],
  },
];

const TeluguFinalQuiz = () => {
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
          completedLessons: arrayUnion("Telugu - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Telugu - Final Quiz",
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
      <h1 className="quiz-title">తెలుగు తుది క్విజ్</h1>

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
              {isCorrect[idx] === "correct" ? "✅ సరైన సమాధానం!" : "❌ తప్పు సమాధానం!"}
            </p>
          )}
        </div>
      ))}

      {quizCompleted && (
        <div className="quiz-completion">
          <h2>🎉 అభినందనలు! మీరు తెలుగు తుది క్విజ్ పూర్తి చేశారు!</h2>
          <p>మీ స్కోరు: {score} / {questions.length}</p>
        </div>
      )}

      {!quizCompleted && isAllAnswered && (
        <button className="submit-btn" onClick={handleSubmit}>క్విజ్ సమర్పించండి</button>
      )}

      <div className="navigation-buttons">
        {!quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/lesson/telugu-basics-3")}>⬅ మునుపటి పాఠం</button>
        )}
        {quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>డాష్‌బోర్డ్‌కి వెళ్లండి</button>
        )}
      </div>
    </div>
  );
};

export default TeluguFinalQuiz;
