import React from "react";
import "./HindiAlphabetLesson.css";

const vowels = [
  { hindi: "अ", english: "a", pronunciation: "uh (ago)" },
  { hindi: "आ", english: "aa", pronunciation: "aa (car)" },
  { hindi: "इ", english: "i", pronunciation: "i (pin)" },
  { hindi: "ई", english: "ee", pronunciation: "ee (see)" },
  { hindi: "उ", english: "u", pronunciation: "u (put)" },
  { hindi: "ऊ", english: "oo", pronunciation: "oo (boot)" },
  { hindi: "ऋ", english: "ri", pronunciation: "ri (like 'rishi')" },
  { hindi: "ए", english: "e", pronunciation: "e (bed)" },
  { hindi: "ऐ", english: "ai", pronunciation: "ai (air)" },
  { hindi: "ओ", english: "o", pronunciation: "o (go)" },
  { hindi: "औ", english: "au", pronunciation: "au (cow)" },
  { hindi: "अं", english: "am", pronunciation: "um (song)" },
  { hindi: "अः", english: "ah", pronunciation: "aha (surprise)" },
];

const consonants = [
  { hindi: "क", english: "ka" }, { hindi: "ख", english: "kha" }, { hindi: "ग", english: "ga" }, { hindi: "घ", english: "gha" }, { hindi: "ङ", english: "ṅa" },
  { hindi: "च", english: "cha" }, { hindi: "छ", english: "chha" }, { hindi: "ज", english: "ja" }, { hindi: "झ", english: "jha" }, { hindi: "ञ", english: "ña" },
  { hindi: "ट", english: "ṭa" }, { hindi: "ठ", english: "ṭha" }, { hindi: "ड", english: "ḍa" }, { hindi: "ढ", english: "ḍha" }, { hindi: "ण", english: "ṇa" },
  { hindi: "त", english: "ta" }, { hindi: "थ", english: "tha" }, { hindi: "द", english: "da" }, { hindi: "ध", english: "dha" }, { hindi: "न", english: "na" },
  { hindi: "प", english: "pa" }, { hindi: "फ", english: "pha" }, { hindi: "ब", english: "ba" }, { hindi: "भ", english: "bha" }, { hindi: "म", english: "ma" },
  { hindi: "य", english: "ya" }, { hindi: "र", english: "ra" }, { hindi: "ल", english: "la" }, { hindi: "व", english: "va" },
  { hindi: "श", english: "sha" }, { hindi: "ष", english: "ṣa" }, { hindi: "स", english: "sa" }, { hindi: "ह", english: "ha" },
  { hindi: "ळ", english: "la (retroflex)" }, { hindi: "क्ष", english: "kṣa" }, { hindi: "त्र", english: "tra" }, { hindi: "ज्ञ", english: "gya" }
];

// Hindi Alphabet Combinations (स्वर और व्यंजन का मिलान)
const combinations = [
    { consonant: "क", vowel: "अ", combination: "क" },
    { consonant: "क", vowel: "आ", combination: "का" },
    { consonant: "क", vowel: "इ", combination: "कि" }, // Corrected
    { consonant: "क", vowel: "ई", combination: "की" }, // Corrected
    { consonant: "क", vowel: "उ", combination: "कु" },
    { consonant: "क", vowel: "ऊ", combination: "कू" },
    { consonant: "क", vowel: "ए", combination: "के" },
    { consonant: "क", vowel: "ओ", combination: "को" },
    { consonant: "क", vowel: "औ", combination: "कौ" },
    { consonant: "क", vowel: "अं", combination: "कं" },
    { consonant: "क", vowel: "अः", combination: "कः" },
    // Add more combinations for other consonants
  ];
  

const speak = (text) => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "hi-IN";
  speechSynthesis.speak(utter);
};

const HindiAlphabetLesson = () => {
  return (
    <div className="alphabet-container">
      <h2>Hindi Alphabet: Vowels (स्वर)</h2>
      <div className="letter-grid">
        {vowels.map((letter, index) => (
          <div
            key={index}
            className="letter-card"
            onClick={() => speak(letter.hindi)}
          >
            <h3>{letter.hindi}</h3>
            <p>English: {letter.english}</p>
            <p>{letter.pronunciation}</p>
            <button>🔊</button>
          </div>
        ))}
      </div>

      <h2>Hindi Alphabet: Consonants (व्यंजन)</h2>
      <div className="letter-grid">
        {consonants.map((letter, index) => (
          <div
            key={index}
            className="letter-card"
            onClick={() => speak(letter.hindi)}
          >
            <h3>{letter.hindi}</h3>
            <p>English: {letter.english}</p>
            <button>🔊</button>
          </div>
        ))}
      </div>

      <h2>Hindi Alphabet: Vowel-Consonant Combinations (स्वर और व्यंजन का मिलान)</h2>
      <div className="letter-grid">
        {combinations.map((comb, index) => (
          <div
            key={index}
            className="letter-card"
            onClick={() => speak(comb.combination)} // Directly speaking the result
          >
            <h3>{comb.combination}</h3>
            <p>Pronounced: {comb.combination}</p>
            <button>🔊</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HindiAlphabetLesson;
