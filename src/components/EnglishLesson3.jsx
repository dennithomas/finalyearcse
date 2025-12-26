import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Spanishpage.css";

// Vocabulary and sentences for Lesson 3
const vocabulary = [
  {
    english: "Boy",
    translation: {
      hi: "लड़का",
      ta: "ஆண்",
      te: "పిల్లవాడు",
      ml: "പ chł",
      bn: "ছেলে",
      gu: "લડકો",
      kn: "ಹುಡುಗ",
      mr: "लहान मुलगा",
      pa: "ਲੜਕਾ",
      or: "ପୁଅ"
    },
    pronunciation: "boy"
  },
  {
    english: "Book",
    translation: {
      hi: "किताब",
      ta: "புத்தகம்",
      te: "పుస్తకం",
      ml: "പുസ്തകം",
      bn: "বই",
      gu: "કિતાબ",
      kn: "ಪುಸ್ತಕ",
      mr: "पुस्तक",
      pa: "ਕਿਤਾਬ",
      or: "ପୁସ୍ତକ"
    },
    pronunciation: "book"
  },
  {
    english: "Car",
    translation: {
      hi: "गाड़ी",
      ta: "கார்",
      te: "కారు",
      ml: "കാർ",
      bn: "গাড়ি",
      gu: "ગાડી",
      kn: "ಕಾರು",
      mr: "कार",
      pa: "ਕਾਰ",
      or: "କାର"
    },
    pronunciation: "car"
  }
];

const sentences = [
  {
    english: "He is a boy.",
    translation: {
      hi: "वह लड़का है।",
      ta: "அவன் ஒரு ஆண்.",
      te: "అతను ఒక పిల్లవాడు.",
      ml: "അവന് ഒരു പ chł",
      bn: "সে একটি ছেলে।",
      gu: "તે લડકો છે।",
      kn: "ಅವನು ಒಂದು ಹುಡುಗ.",
      mr: "तो मुलगा आहे.",
      pa: "ਉਹ ਇੱਕ ਲੜਕਾ ਹੈ।",
      or: "ସେ ଏକ ପୁଅ ଅଟ।"
    },
    pronunciation: "He is a boy"
  },
  {
    english: "I have a book.",
    translation: {
      hi: "मेरे पास एक किताब है।",
      ta: "என்னிடம் ஒரு புத்தகம் உள்ளது.",
      te: "నాకు ఒక పుస్తకం ఉంది.",
      ml: "എന്റെ പക്കൽ ഒരു പുസ്തകം ഉണ്ട്.",
      bn: "আমার কাছে একটি বই আছে।",
      gu: "મારે પાસે એક કિતાબ છે।",
      kn: "ನನ್ನ ಬಳಿ ಒಂದು ಪುಸ್ತಕ ಇದೆ.",
      mr: "माझ्याकडे एक पुस्तक आहे.",
      pa: "ਮੇਰੇ ਕੋਲ ਇੱਕ ਕਿਤਾਬ ਹੈ।",
      or: "ମୋ ପାଖରେ ଏକ ପୁସ୍ତକ ଅଛି।"
    },
    pronunciation: "I have a book"
  }
];

const EnglishLesson3 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);
  const [streak] = useState(6); // example streak
  const [userLang, setUserLang] = useState(navigator.language || "en-US");

  const langKey = userLang.split("-")[0];

  // Function to speak the text using SpeechSynthesis API
  const speakText = (text, lang = "en-US") => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  // Handle quiz answer selection
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
            completedLessons: correct ? arrayUnion("english - Basics 3") : [],
            quizScores: arrayUnion({
              lesson: "english - Basics 3",
              score: score,
              attempts: 1,
            }),
          });

          setXpGained(true);
          if (correct) setShowCompletionPopup(true);
        }
      } catch (error) {
        console.error("Error updating XP/quiz score:", error);
      }
    }
  };

  return (
    <div className="english-lesson-container">
      {/* About Section */}
      <h1 className="lesson-title">Lesson 3: English ({userLang})</h1>
      <section className="section about-english">
        <h2 className="section-title">📝 About English</h2>
        <p>English is a West Germanic language and one of the most spoken languages globally. It uses the Latin alphabet and follows SVO structure.</p>
      </section>

      {/* Grammar Tip */}
      <section className="section grammar-tip">
        <h2 className="section-title">📖 Grammar Tip</h2>
        <p><strong>Sentence Structure:</strong> Subject + Verb + Object. e.g., "He reads books."</p>
      </section>

      {/* Language Selector */}
      <div className="section">
        <label htmlFor="lang-select">Select your language:</label>
        <select id="lang-select" value={userLang} onChange={e => setUserLang(e.target.value)}>
          {/* Major Indian languages */}
          <option value="en-US">English (en-US)</option>
          <option value="hi-IN">Hindi (हिंदी)</option>
          <option value="ta-IN">Tamil (தமிழ்)</option>
          <option value="te-IN">Telugu (తెలుగు)</option>
          <option value="ml-IN">Malayalam (മലയാളം)</option>
          <option value="bn-IN">Bengali (বাংলা)</option>
          <option value="gu-IN">Gujarati (ગુજરાતી)</option>
          <option value="kn-IN">Kannada (ಕನ್ನಡ)</option>
          <option value="mr-IN">Marathi (मराठी)</option>
          <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="or-IN">Odia (ଓଡ଼ିଆ)</option>
          <option value="as-IN">Assamese (অসমীয়া)</option>
        </select>
      </div>

      {/* Vocabulary Section */}
      <section className="section">
        <h2 className="section-title">🌍 Vocabulary</h2>
        <div className="vocab-grid">
          {vocabulary.map((w, i) => (
            <div key={i} className="vocab-card">
              <h3>{w.english}</h3>
              <p>{w.translation[langKey] || "—"} ({w.pronunciation})</p>
              <button className="play-button" onClick={() => speakText(w.english, "en-US")}>Speak English</button>
              <button className="play-button" onClick={() => speakText(w.translation[langKey] || w.english, userLang)}>Speak Native</button>
            </div>
          ))}
        </div>
      </section>

      {/* Sentences Section */}
      <section className="section">
        <h2 className="section-title">📘 Example Sentences</h2>
        <div className="sentence-list">
          {sentences.map((s, i) => (
            <div key={i} className="sentence-card">
              <p className="english-text">{s.english}</p>
              <p className="pronunciation">({s.pronunciation})</p>
              <p className="native-text">{s.translation[langKey] || "—"}</p>
              <button onClick={() => speakText(s.english, "en-US")}>English</button>
              <button onClick={() => speakText(s.translation[langKey] || s.english, userLang)}>Native</button>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Quiz */}
      <section className="section">
        <h2 className="section-title">✅ Quick Quiz</h2>
        <div className="quiz-card">
          <p className="quiz-question">Translate "{vocabulary[0].translation[langKey] || vocabulary[0].english}" to English:</p>
          <div className="quiz-options">
            {[{
              text: "Boy", isCorrect: true
            }, {
              text: "Book", isCorrect: false
            }, {
              text: "Car", isCorrect: false
            }].map((opt, idx) => (
              <button
                key={idx}
                className={`option-btn ${selected !== null ? (opt.isCorrect ? "correct" : idx === selected ? "wrong" : "") : ""}`}
                onClick={() => handleAnswer(opt.isCorrect, idx)}
                disabled={selected !== null}
              >
                {opt.text}
                {selected !== null && opt.isCorrect && <FaCheckCircle className="correct-icon" />}
              </button>
            ))}
            {selected !== null && isCorrect === false && <p className="feedback-text">❌ Incorrect. Try again!</p>}
            {selected !== null && isCorrect === true && <p className="feedback-text">✅ Correct! You gained 10 XP!</p>}
          </div>
        </div>
      </section>

    {/* XP and Streak */}
      <div className="xp-streak">
        <div className="streak"><FaFire className="icon" /> {streak}-day Streak</div>
        <div className="xp"><FaStar className="icon" /> XP: {isCorrect ? "+10" : "+0"}</div>
      </div>
      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        <button className="nav-btn" onClick={() => navigate("/english-2")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/english-4")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default EnglishLesson3;
