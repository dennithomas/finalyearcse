import React, { useEffect, useState } from 'react';

const germanLetters = [
  { letter: 'A', transliteration: 'ah' },
  { letter: 'B', transliteration: 'beh' },
  { letter: 'C', transliteration: 'tseh' },
  { letter: 'D', transliteration: 'deh' },
  { letter: 'E', transliteration: 'eh' },
  { letter: 'F', transliteration: 'eff' },
  { letter: 'G', transliteration: 'geh' },
  { letter: 'H', transliteration: 'hah' },
  { letter: 'I', transliteration: 'ee' },
  { letter: 'J', transliteration: 'yot' },
  { letter: 'K', transliteration: 'kah' },
  { letter: 'L', transliteration: 'ell' },
  { letter: 'M', transliteration: 'emm' },
  { letter: 'N', transliteration: 'enn' },
  { letter: 'O', transliteration: 'oh' },
  { letter: 'P', transliteration: 'peh' },
  { letter: 'Q', transliteration: 'koo' },
  { letter: 'R', transliteration: 'err' },
  { letter: 'S', transliteration: 'ess' },
  { letter: 'T', transliteration: 'teh' },
  { letter: 'U', transliteration: 'oo' },
  { letter: 'V', transliteration: 'fau' },
  { letter: 'W', transliteration: 'veh' },
  { letter: 'X', transliteration: 'iks' },
  { letter: 'Y', transliteration: 'üpsilon' },
  { letter: 'Z', transliteration: 'tsett' },
  { letter: 'Ä', transliteration: 'eh-umlaut' },
  { letter: 'Ö', transliteration: 'uh-umlaut' },
  { letter: 'Ü', transliteration: 'oo-umlaut' },
  { letter: 'ß', transliteration: 'ess-tsett (sharp S)' },
];

const GermanAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const voices = synth.getVoices();
      const germanVoice = voices.find(v => v.lang.toLowerCase().includes('de'));
      setVoice(germanVoice || voices.find(v => v.lang === 'en-US'));
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
          background-color: #f9f9f9;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 12px;
          text-align: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .card:hover {
          background-color: #e0f7fa;
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

      <h1 className="title">🇩🇪 German Alphabet Lesson</h1>
      <div className="grid">
        {germanLetters.map((item, idx) => (
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

export default GermanAlphabetLesson;
