import React, { useEffect, useState } from 'react';

const spanishLetters = [
  { letter: 'A', transliteration: 'ah' },
  { letter: 'B', transliteration: 'beh' },
  { letter: 'C', transliteration: 'seh' },
  { letter: 'D', transliteration: 'deh' },
  { letter: 'E', transliteration: 'eh' },
  { letter: 'F', transliteration: 'eh-feh' },
  { letter: 'G', transliteration: 'heh' },
  { letter: 'H', transliteration: 'ah-cheh' },
  { letter: 'I', transliteration: 'ee' },
  { letter: 'J', transliteration: 'ho-tah' },
  { letter: 'K', transliteration: 'kah' },
  { letter: 'L', transliteration: 'eh-leh' },
  { letter: 'M', transliteration: 'eh-meh' },
  { letter: 'N', transliteration: 'eh-neh' },
  { letter: 'Ñ', transliteration: 'eh-nyeh' },
  { letter: 'O', transliteration: 'oh' },
  { letter: 'P', transliteration: 'peh' },
  { letter: 'Q', transliteration: 'koo' },
  { letter: 'R', transliteration: 'eh-reh' },
  { letter: 'S', transliteration: 'eh-seh' },
  { letter: 'T', transliteration: 'teh' },
  { letter: 'U', transliteration: 'oo' },
  { letter: 'V', transliteration: 'oo-beh' },
  { letter: 'W', transliteration: 'doh-bleh oo' },
  { letter: 'X', transliteration: 'eh-kees' },
  { letter: 'Y', transliteration: 'ee grieh-gah' },
  { letter: 'Z', transliteration: 'seh-tah' },
];

const SpanishAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      const spanishVoice = voices.find(v => v.lang.toLowerCase().includes('es'));
      setVoice(spanishVoice || voices.find(v => v.lang === 'en-US'));
    };

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
    loadVoices();
  }, []);

  const speak = (text) => {
    if (!voice) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voice;
    utterance.lang = voice.lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <style>{`
        .title {
          text-align: center;
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
          gap: 15px;
        }
        .card {
          background-color: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 12px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .card:hover {
          background-color: #fff3cd;
        }
        .letter {
          font-size: 28px;
          font-weight: bold;
        }
        .transliteration {
          font-size: 14px;
          color: #555;
        }
      `}</style>

      <h1 className="title">📘 Spanish Alphabet Lesson</h1>
      <div className="grid">
        {spanishLetters.map((item, idx) => (
          <div
            key={idx}
            className="card"
            onClick={() => speak(item.letter)}
          >
            <div className="letter">{item.letter}</div>
            <div className="transliteration">{item.transliteration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpanishAlphabetLesson;
