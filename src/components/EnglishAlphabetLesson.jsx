import React from 'react';
import './TamilAlphabetLesson.css';

const alphabetData = [
  { letter: 'A', word: 'Apple' },
  { letter: 'B', word: 'Ball' },
  { letter: 'C', word: 'Cat' },
  { letter: 'D', word: 'Dog' },
  { letter: 'E', word: 'Elephant' },
  { letter: 'F', word: 'Fish' },
  { letter: 'G', word: 'Goat' },
  { letter: 'H', word: 'Hat' },
  { letter: 'I', word: 'Ice cream' },
  { letter: 'J', word: 'Jug' },
  { letter: 'K', word: 'Kite' },
  { letter: 'L', word: 'Lion' },
  { letter: 'M', word: 'Monkey' },
  { letter: 'N', word: 'Nest' },
  { letter: 'O', word: 'Orange' },
  { letter: 'P', word: 'Parrot' },
  { letter: 'Q', word: 'Queen' },
  { letter: 'R', word: 'Rabbit' },
  { letter: 'S', word: 'Sun' },
  { letter: 'T', word: 'Tiger' },
  { letter: 'U', word: 'Umbrella' },
  { letter: 'V', word: 'Van' },
  { letter: 'W', word: 'Watch' },
  { letter: 'X', word: 'Xylophone' },
  { letter: 'Y', word: 'Yak' },
  { letter: 'Z', word: 'Zebra' }
];

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-IN'; // 🇮🇳 Indian English — change to en-US or en-GB if needed
  speechSynthesis.speak(utterance);
};

const EnglishAlphabetLesson = () => {
  return (
    <div className="alphabet-lesson-container">
      <h1>English Alphabet with Voice</h1>
      <div className="letter-grid">
        {alphabetData.map(({ letter, word }, index) => (
          <div key={index} className="letter-card">
            <h3>{letter}</h3>
            <p>{word}</p>
            <button
              className="voice-button"
              onClick={() => speak(`${letter} for ${word}`)}
            >
              🔊 Speak
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnglishAlphabetLesson;
