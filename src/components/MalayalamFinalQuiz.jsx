import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./SpanishFinal.css";

const questions = [
  {
    question: "'നായ്' എന്ന് അർത്ഥമാകുന്നത് ഏതാണ്?",
    options: [
      { text: "Dog", isCorrect: true },
      { text: "Cat", isCorrect: false },
      { text: "Cow", isCorrect: false },
    ],
  },
  {
    question: "'അവൾ ഒരു സ്ത്രീയാണ്' എന്നത് ഇംഗ്ലീഷിലേക്ക് വിവർത്തനം ചെയ്യുക.",
    options: [
      { text: "She is a woman", isCorrect: true },
      { text: "He is a man", isCorrect: false },
      { text: "She is a teacher", isCorrect: false },
    ],
  },
  {
    question: "'പുസ്തകം' എന്നതിന് അർത്ഥം?",
    options: [
      { text: "Book", isCorrect: true },
      { text: "Pen", isCorrect: false },
      { text: "Table", isCorrect: false },
    ],
  },
  {
    question: "'ഞാൻ ഭക്ഷണം കഴിക്കുന്നു' എന്നത് എന്താണ്?",
    options: [
      { text: "I am eating", isCorrect: true },
      { text: "I am sleeping", isCorrect: false },
      { text: "I am writing", isCorrect: false },
    ],
  },
  {
    question: "'നിങ്ങൾ പാഠം പഠിക്കുന്നു.' എന്നതിന് വിവർത്തനം?",
    options: [
      { text: "You are studying the lesson", isCorrect: true },
      { text: "You are eating food", isCorrect: false },
      { text: "You are playing", isCorrect: false },
    ],
  },
];

const MalayalamFinalQuiz = () => {
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
          completedLessons: arrayUnion("Malayalam - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "Malayalam - Final Quiz",
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
      <h1 className="quiz-title">മലയാളം അന്തിമ ക്വിസ്</h1>

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
              {isCorrect[idx] === "correct" ? "✅ ശരിയായ ഉത്തരമാണ്!" : "❌ തെറ്റായ ഉത്തരമാണ്!"}
            </p>
          )}
        </div>
      ))}

      {quizCompleted && (
        <div className="quiz-completion">
          <h2>🎉 അഭിനന്ദനങ്ങൾ! നിങ്ങൾ മലയാളം അന്തിമ ക്വിസ് പൂർത്തിയാക്കി!</h2>
          <p>നിങ്ങളുടെ സ്കോർ: {score} / {questions.length}</p>
        </div>
      )}

      {!quizCompleted && isAllAnswered && (
        <button className="submit-btn" onClick={handleSubmit}>ക്വിസ് സമർപ്പിക്കുക</button>
      )}

      <div className="navigation-buttons">
        {!quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/lesson/malayalam-basics-3")}>⬅ കഴിഞ്ഞ പാഠം</button>
        )}
        {quizCompleted && (
          <button className="nav-btn" onClick={() => navigate("/dashboard")}>ഡാഷ്ബോർഡിലേക്ക് പോകുക</button>
        )}
      </div>
    </div>
  );
};

export default MalayalamFinalQuiz;
