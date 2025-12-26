import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVolumeUp, FaCheckCircle, FaFire, FaStar } from "react-icons/fa";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, increment, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "./Spanishpage.css";

// Vocabulary and sentences for Lesson 2
const vocabulary = [
  {
    english: "Girl",
    translation: {
      hi: "लड़की",
      ta: "ப kız",
      te: "పాప",
      ml: "പെൺകുട്ടി",
      bn: "মেয়ে",
      gu: "છોકરી",
      kn: "ಹೆಣ್ಣು",
      mr: "मुलगी",
      pa: "ਲੜਕੀ",
      or: "ପୁଅ",
      as: "ল'ৰা"
    },
    pronunciation: "girl"
  },
  {
    english: "Apple",
    translation: {
      hi: "सेब",
      ta: "ஆப்பிள்",
      te: "ఆపిల్",
      ml: "ആപ്പിൾ",
      bn: "আপেল",
      gu: "આપલ",
      kn: "ಆಪಲ್",
      mr: "सफरचंद",
      pa: "ਸੇਬ",
      or: "ଆପଲ"
    },
    pronunciation: "apple"
  },
  {
    english: "House",
    translation: {
      hi: "घर",
      ta: "வீடு",
      te: "ఇల్లు",
      ml: "വീട്",
      bn: "বাড়ি",
      gu: "ઘર",
      kn: "ಮನೆ",
      mr: "घर",
      pa: "ਘਰ",
      or: "ବଡି"
    },
    pronunciation: "house"
  }
];

const sentences = [
  {
    english: "She is a girl.",
    translation: {
      hi: "वह लड़की है।",
      ta: "அவள் ஒரு பெண்.",
      te: "ఆమె ఒక పాప.",
      ml: "അവള് ഒരു പെൺകുട്ടിയാണ്.",
      bn: "সে একটি মেয়ে।",
      gu: "તે છોકરી છે।",
      kn: "ಅವಳು ಒಂದು ಹುಡುಗಿ.",
      mr: "ती मुलगी आहे.",
      pa: "ਉਹ ਇੱਕ ਲੜਕੀ ਹੈ।",
      or: "ସେ ଏକ ଝିଅ ଅଟ।",
      as: "সি এজন মাইৰ।"
    },
    pronunciation: "She is a girl"
  },
  {
    english: "I have an apple.",
    translation: {
      hi: "मेरे पास एक सेब है।",
      ta: "என்னிடம் ஒரு ஆப்பிள் உள்ளது.",
      te: "నాకు ఒక ఆపిల్ ఉంది.",
      ml: "എന്റെ പക്കൽ ഒരു ആപ്പിൾ ഉണ്ട്.",
      bn: "আমার কাছে একটি আপেল আছে।",
      gu: "મારે પાસે એક આપલ છે।",
      kn: "ನನ್ನ ಬಳಿ ಒಂದು ಆಪಲ್ ಇದೆ.",
      mr: "माझ्याकडे एक सफरचंद आहे.",
      pa: "ਮੇਰੇ ਕੋਲ ਇੱਕ ਸੇਬ ਹੈ।",
      or: "ମୋ ପାଖରେ ଏକ ଆପଲ୍ ଅଛି।",
      as: "মোৰ ওচৰত এখন আপেল আছে।"
    },
    pronunciation: "I have an apple"
  }
];

const EnglishLesson2 = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [xpGained, setXpGained] = useState(false);
  const [streak] = useState(5); // example streak
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
            completedLessons: correct ? arrayUnion("English - Basics 2") : [],
            quizScores: arrayUnion({
              lesson: "English - Basics 2",
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
      <h1 className="lesson-title">Lesson 2: English ({userLang})</h1>
      <section className="section about-english">
        <h2 className="section-title">📝 About English</h2>
        <p>English is a West Germanic language and one of the most spoken languages globally. It uses the Latin alphabet and follows SVO structure.</p>
      </section>

      {/* Grammar Tip */}
      <section className="section grammar-tip">
        <h2 className="section-title">📖 Grammar Tip</h2>
        <p><strong>Sentence Structure:</strong> Subject + Verb + Object. e.g., "She eats apples."</p>
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
              text: "Girl", isCorrect: true
            }, {
              text: "Apple", isCorrect: false
            }, {
              text: "House", isCorrect: false
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
        <button className="nav-btn" onClick={() => navigate("/english-basics")}>⬅ Back</button>
        <button onClick={() => navigate("/lesson/english-3")}>Next Lesson ➡</button>
      </div>
    </div>
  );
};

export default EnglishLesson2;
