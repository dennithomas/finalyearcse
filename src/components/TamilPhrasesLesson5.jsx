import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import "./Spanishpage.css"; // Same CSS for styling

const phrases = [
  { tamil: "நான் பேருந்தில் செல்வதற்குத் தேர்வு செய்தேன்.", english: "I chose to travel by bus.", pronunciation: "naan perundhil selvadharku therndhu seidhen." },
  { tamil: "எங்கு எடுத்து போக வேண்டும்?", english: "Where should I go?", pronunciation: "engu eduthu pogavenduma?" },
  { tamil: "நான் ஒரு கார் வாடகை எடுக்க விரும்புகிறேன்.", english: "I would like to rent a car.", pronunciation: "naan oru kaar vaadakai eduththa virumbugiren." },
  { tamil: "பயணத்திற்கு முன் டிக்கெட்டுகளை வாங்க வேண்டும்.", english: "I need to buy tickets before the trip.", pronunciation: "payanaththirku mun thikettugalai vaanga vendum." },
  { tamil: "அரசு பேருந்து நிலைய எங்கே உள்ளது?", english: "Where is the government bus station?", pronunciation: "arasu perundu nilaiya engge ulladhu?" },
  { tamil: "என் விமானம் எப்போது பறப்பது?", english: "When does my flight leave?", pronunciation: "en vimaanam eppodhu parappudhu?" },
];

const speak = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ta-IN";
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((voice) => voice.lang.includes("ta"));
    if (tamilVoice) utterance.voice = tamilVoice;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Sorry, your browser does not support speech synthesis.");
  }
};

const TamilPhrasesLesson5 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);

  const handleAnswer = async (correct, index) => {
    setSelected(index);
    setIsCorrect(correct);

    if (!xpGained) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "users", user.uid);

          const score = correct ? 1 : 0;

          await updateDoc(userRef, {
            xp: correct ? increment(10) : increment(0),
            completedLessons: correct ? arrayUnion("Tamil - Phrases 5") : [],
            quizScores: arrayUnion({
              lesson: "Tamil - Phrases 5",
              score: score,
              attempts: 1,
            }),
          });

          setXpGained(true);
        }
      } catch (error) {
        console.error("Error updating XP/quiz score:", error);
      }
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="hindi-lesson-container">
      <h1 className="lesson-title">Phrases 5: Tamil (பயணச் சொற்கள்)</h1>

      <section className="section about-hindi">
        <h2 className="section-title">📝 About This Lesson</h2>
        <p>
          In this lesson, you will learn common Tamil phrases related to traveling. These phrases will help you navigate your journey!
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">💬 Travel Phrases</h2>
        <div className="vocab-grid">
          {phrases.map((phrase, index) => (
            <div key={index} className="vocab-card">
              <h3>{phrase.tamil}</h3>
              <p>{phrase.english} ({phrase.pronunciation})</p>
              <button className="play-button" onClick={() => speak(phrase.tamil)}>
                <FaVolumeUp /> Play
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Q: How do you ask "Where should I go?" in Tamil?</p>
          <div className="quiz-options">
            {[
              { text: "A) நான் பேருந்தில் செல்வதற்குத் தேர்வு செய்தேன்.", isCorrect: false },
              { text: "B) எங்கு எடுத்து போக வேண்டும்?", isCorrect: true },
              { text: "C) நான் ஒரு கார் வாடகை எடுக்க விரும்புகிறேன்.", isCorrect: false },
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
            {selected !== null && isCorrect === false && (
              <p className="feedback-text">❌ Oops! That's not correct.</p>
            )}
            {selected !== null && isCorrect === true && (
              <p className="feedback-text">✅ Correct!</p>
            )}
          </div>
        </div>
      </section>

      <div className="xp-streak">
        <div className="streak">
          <FaFire className="icon" /> 15-day Streak
        </div>
        <div className="xp">
          <FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}
        </div>
      </div>

      <div className="navigation-buttons">
        <button className="nav-btn" onClick={handleBack}>⬅ Back</button>
        <button className="nav-btn" onClick={() => navigate("/dashboard")}>Finish</button>
      </div>
    </div>
  );
};

export default TamilPhrasesLesson5;
