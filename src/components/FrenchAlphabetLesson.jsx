import React, { useEffect, useState } from 'react';

const frenchVowels = [
  { letter: 'A', transliteration: 'ah' },
  { letter: 'E', transliteration: 'eh' },
  { letter: 'I', transliteration: 'ee' },
  { letter: 'O', transliteration: 'oh' },
  { letter: 'U', transliteration: 'oo' },
  { letter: 'Y', transliteration: 'ee' },
];

const frenchConsonants = [
  { letter: 'B', transliteration: 'beh' },
  { letter: 'C', transliteration: 'seh' },
  { letter: 'D', transliteration: 'deh' },
  { letter: 'F', transliteration: 'eff' },
  { letter: 'G', transliteration: 'zheh' },
  { letter: 'H', transliteration: 'ahsh' },
  { letter: 'J', transliteration: 'zhee' },
  { letter: 'K', transliteration: 'kah' },
  { letter: 'L', transliteration: 'ell' },
  { letter: 'M', transliteration: 'emm' },
  { letter: 'N', transliteration: 'enn' },
  { letter: 'P', transliteration: 'peh' },
  { letter: 'Q', transliteration: 'koo' },
  { letter: 'R', transliteration: 'err' },
  { letter: 'S', transliteration: 'ess' },
  { letter: 'T', transliteration: 'teh' },
  { letter: 'V', transliteration: 'veh' },
  { letter: 'W', transliteration: 'doob-leh-veh' },
  { letter: 'X', transliteration: 'eeks' },
  { letter: 'Z', transliteration: 'zed' },
];

const FrenchAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      const frenchVoice = voices.find(v =>
        v.lang.toLowerCase().includes('fr') || v.name.toLowerCase().includes('french')
      );
      setVoice(frenchVoice || voices.find(v => v.lang === 'en-GB'));
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
        .section-title {
          font-size: 20px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 10px;
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
          background-color: #e0f7fa;
        }
        .card-consonant:hover {
          background-color: #d0f0c0;
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

      <h1 className="title">📘 French Alphabet Lesson</h1>

      <h2 className="section-title">🅰️ Vowels (Voyelles)</h2>
      <div className="grid">
        {frenchVowels.map((v, idx) => (
          <div
            key={idx}
            className="card"
            onClick={() => speak(v.letter)}
          >
            <div className="letter">{v.letter}</div>
            <div className="transliteration">{v.transliteration}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">🔤 Consonants (Consonnes)</h2>
      <div className="grid">
        {frenchConsonants.map((c, idx) => (
          <div
            key={idx}
            className="card card-consonant"
            onClick={() => speak(c.letter)}
          >
            <div className="letter">{c.letter}</div>
            <div className="transliteration">{c.transliteration}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrenchAlphabetLesson;
