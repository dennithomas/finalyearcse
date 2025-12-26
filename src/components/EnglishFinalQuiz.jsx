import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaStar, FaFire } from "react-icons/fa";
import "./HindiBasicsLesson.css"; // Use the same styles
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Final quiz questions covering Lessons 1-4 (all on one page)
const questions = [
  {
    id: 1,
    question: "What is the English word for 'पानी'?",
    options: ["Boy", "Water", "Food"],
    correctIndex: 1
  },
  {
    id: 2,
    question: "Form the question: '___ you drink water?'",
    options: ["Do", "Does", "Did"],
    correctIndex: 0
  },
  {
    id: 3,
    question: "Choose the correct past form: 'I __ to school.'",
    options: ["went", "goes", "gone"],
    correctIndex: 0
  },
  {
    id: 4,
    question: "Choose the correct modal: 'He ___ finish his work.'",
    options: ["can", "must", "should"],
    correctIndex: 1
  },
  {
    id: 5,
    question: "Translate to English: 'मैं अच्छा हूँ'",
    options: ["I am good", "I am bad", "I am tall"],
    correctIndex: 0
  },
  {
    id: 6,
    question: "Choose the correct question form: 'Where ___ you live?'",
    options: ["do", "does", "did"],
    correctIndex: 0
  },
  {
    id: 7,
    question: "What is the past tense of 'eat'?",
    options: ["ate", "eated", "eats"],
    correctIndex: 0
  },
  {
    id: 8,
    question: "Choose the correct sentence: 'She ___ to the market.'",
    options: ["goes", "going", "went"],
    correctIndex: 2
  }
];

const EnglishFinalQuiz = () => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qid, idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = async () => {
    // Calculate score
    let count = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctIndex) count++;
    });
    setScore(count);
    setSubmitted(true);

    // Update Firebase with user's progress
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          xp: increment(50), // Awarding 50 XP for completing the final quiz
          completedLessons: arrayUnion("english - Final Quiz"),
          quizScores: arrayUnion({
            lesson: "english - Final Quiz",
            score: score,
            attempts: 1,
          }),
        });
      } catch (error) {
        console.error("Error updating quiz/XP:", error);
      }
    }
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Final Quiz: All Questions</h1>

      {!submitted && (
        <div className="section">
          {questions.map(q => (
            <div key={q.id} className="quiz-card" style={{ marginBottom: 24 }}>
              <p className="quiz-question"><strong>{q.id}. {q.question}</strong></p>
              <div className="quiz-options">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`option-btn ${
                      answers[q.id] != null
                        ? idx === q.correctIndex
                          ? "correct"
                          : idx === answers[q.id]
                          ? "wrong"
                          : ""
                        : ""
                    }`}
                    onClick={() => handleSelect(q.id, idx)}
                    disabled={submitted}
                  >
                    {opt}
                    {submitted && idx === q.correctIndex && <FaCheckCircle className="correct-icon" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {submitted && (
        <div className="xp-streak" style={{ margin: "24px 0" }}>
          <div className="streak"><FaFire className="icon" /> Quiz Completed</div>
          <div className="xp"><FaStar className="icon" /> Score: {score}/{questions.length}</div>
        </div>
      )}

      <div className="navigation-buttons">
        {!submitted ? (
          <button
            className="nav-btn"
            onClick={handleSubmit}
            disabled={questions.some(q => answers[q.id] == null)}
          >
            Submit All →
          </button>
        ) : (
          <>
            <button className="nav-btn" onClick={() => setSubmitted(false)}>Retake</button>
            <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
          </>
        )}
      </div>
    </div>
  );
};

export default EnglishFinalQuiz;
