import React from "react";
import "./TamilAlphabetLesson.css";

const vowels = [
  { tamil: "அ", english: "a", example: "America" },
  { tamil: "ஆ", english: "aa", example: "Father" },
  { tamil: "இ", english: "i", example: "Pin" },
  { tamil: "ஈ", english: "ee", example: "See" },
  { tamil: "உ", english: "u", example: "Pull" },
  { tamil: "ஊ", english: "oo", example: "Pool" },
  { tamil: "எ", english: "e", example: "Bed" },
  { tamil: "ஏ", english: "ee", example: "Cake" },
  { tamil: "ஐ", english: "ai", example: "High" },
  { tamil: "ஒ", english: "o", example: "Go" },
  { tamil: "ஓ", english: "oo", example: "Cold" },
  { tamil: "ஔ", english: "au", example: "How" },
  { tamil: "அம்", english: "am", example: "Calm" },
  { tamil: "அः", english: "ah", example: "Ahhh" },
];

const consonants = [
  { tamil: "க", english: "ka", example: "Kite" },
  { tamil: "ங", english: "nga", example: "Song" },
  { tamil: "ச", english: "cha", example: "Chair" },
  { tamil: "ஞ", english: "nya", example: "Canyon" },
  { tamil: "ட", english: "ṭa", example: "Stop (retroflex)" },
  { tamil: "ண", english: "ṇa", example: "Na (retroflex)" },
  { tamil: "த", english: "tha", example: "Thumb" },
  { tamil: "ந", english: "na", example: "Nap" },
  { tamil: "ப", english: "pa", example: "Pan" },
  { tamil: "ம", english: "ma", example: "Man" },
  { tamil: "ய", english: "ya", example: "Yam" },
  { tamil: "ர", english: "ra", example: "Run" },
  { tamil: "ல", english: "la", example: "Lap" },
  { tamil: "வ", english: "va", example: "Van" },
  { tamil: "ழ", english: "ḻa", example: "Unique Tamil sound" },
  { tamil: "ள", english: "ḷa", example: "L (retroflex)" },
  { tamil: "ற", english: "ṟa", example: "Ra (rolled)" },
  { tamil: "ன", english: "ṉa", example: "Na (soft)" },
  { tamil: "ஷ", english: "sha", example: "Shut" },
  { tamil: "ஸ", english: "sa", example: "Sun" },
  { tamil: "ஹ", english: "ha", example: "Hat" },
  { tamil: "ஜ", english: "ja", example: "Jam" },
];

const combinations = [
  { consonant: "க", vowel: "அ", combination: "க", english: "ka" },
  { consonant: "க", vowel: "ஆ", combination: "கா", english: "kaa" },
  { consonant: "க", vowel: "இ", combination: "கி", english: "ki" },
  { consonant: "க", vowel: "ஈ", combination: "கீ", english: "kee" },
  { consonant: "க", vowel: "உ", combination: "கு", english: "ku" },
  { consonant: "க", vowel: "ஊ", combination: "கூ", english: "koo" },
  { consonant: "க", vowel: "எ", combination: "கெ", english: "ke" },
  { consonant: "க", vowel: "ஏ", combination: "கே", english: "kay" },
  { consonant: "க", vowel: "ஐ", combination: "கை", english: "kai" },
  { consonant: "க", vowel: "ஒ", combination: "கொ", english: "ko" },
  { consonant: "க", vowel: "ஓ", combination: "கோ", english: "koh" },
  { consonant: "க", vowel: "ஔ", combination: "கௌ", english: "kau" },
];

const TamilAlphabetLesson = () => {
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "ta-IN";
    speechSynthesis.speak(utter);
  };

  return (
    <div>
      <h1>Tamil Alphabet Lesson</h1>

      <h2>Vowels (உயிரெழுத்து)</h2>
      <div className="letter-grid">
        {vowels.map((vowel, index) => (
          <div key={index} className="letter-card" onClick={() => speak(vowel.tamil)}>
            <h3>{vowel.tamil}</h3>
            <p><strong>Roman:</strong> {vowel.english}</p>
            <p><strong>Like in:</strong> {vowel.example}</p>
          </div>
        ))}
      </div>

      <h2>Consonants (மெய்யெழுத்து)</h2>
      <div className="letter-grid">
        {consonants.map((consonant, index) => (
          <div key={index} className="letter-card" onClick={() => speak(consonant.tamil)}>
            <h3>{consonant.tamil}</h3>
            <p><strong>Roman:</strong> {consonant.english}</p>
            <p><strong>Like in:</strong> {consonant.example}</p>
          </div>
        ))}
      </div>

      <h2>Combinations (உயிர் மெய்யெழுத்து)</h2>
      <div className="letter-grid">
        {combinations.map((combo, index) => (
          <div key={index} className="letter-card">
            <h3>{combo.combination}</h3>
            <p><strong>{combo.consonant} + {combo.vowel}</strong></p>
            <p><strong>Roman:</strong> {combo.english}</p>
            <button onClick={() => speak(combo.combination)}>🔊</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TamilAlphabetLesson;
