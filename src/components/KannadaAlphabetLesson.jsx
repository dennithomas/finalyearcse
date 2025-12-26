import React, { useEffect, useState } from 'react';

const kannadaVowels = [
  { letter: 'ಅ', transliteration: 'a' },
  { letter: 'ಆ', transliteration: 'aa' },
  { letter: 'ಇ', transliteration: 'i' },
  { letter: 'ಈ', transliteration: 'ii' },
  { letter: 'ಉ', transliteration: 'u' },
  { letter: 'ಊ', transliteration: 'uu' },
  { letter: 'ಋ', transliteration: 'ru' },
  { letter: 'ಎ', transliteration: 'e' },
  { letter: 'ಏ', transliteration: 'ee' },
  { letter: 'ಐ', transliteration: 'ai' },
  { letter: 'ಒ', transliteration: 'o' },
  { letter: 'ಓ', transliteration: 'oo' },
  { letter: 'ಔ', transliteration: 'au' },
  { letter: 'ಅಂ', transliteration: 'am' },
  { letter: 'ಅಃ', transliteration: 'ah' },
];

const kannadaConsonants = [
  { letter: 'ಕ', transliteration: 'ka' },
  { letter: 'ಖ', transliteration: 'kha' },
  { letter: 'ಗ', transliteration: 'ga' },
  { letter: 'ಘ', transliteration: 'gha' },
  { letter: 'ಙ', transliteration: 'nga' },
  { letter: 'ಚ', transliteration: 'cha' },
  { letter: 'ಛ', transliteration: 'chha' },
  { letter: 'ಜ', transliteration: 'ja' },
  { letter: 'ಝ', transliteration: 'jha' },
  { letter: 'ಞ', transliteration: 'nya' },
  { letter: 'ಟ', transliteration: 'ṭa' },
  { letter: 'ಠ', transliteration: 'ṭha' },
  { letter: 'ಡ', transliteration: 'ḍa' },
  { letter: 'ಢ', transliteration: 'ḍha' },
  { letter: 'ಣ', transliteration: 'ṇa' },
  { letter: 'ತ', transliteration: 'ta' },
  { letter: 'ಥ', transliteration: 'tha' },
  { letter: 'ದ', transliteration: 'da' },
  { letter: 'ಧ', transliteration: 'dha' },
  { letter: 'ನ', transliteration: 'na' },
  { letter: 'ಪ', transliteration: 'pa' },
  { letter: 'ಫ', transliteration: 'pha' },
  { letter: 'ಬ', transliteration: 'ba' },
  { letter: 'ಭ', transliteration: 'bha' },
  { letter: 'ಮ', transliteration: 'ma' },
  { letter: 'ಯ', transliteration: 'ya' },
  { letter: 'ರ', transliteration: 'ra' },
  { letter: 'ಲ', transliteration: 'la' },
  { letter: 'ವ', transliteration: 'va' },
  { letter: 'ಶ', transliteration: 'sha' },
  { letter: 'ಷ', transliteration: 'ṣa' },
  { letter: 'ಸ', transliteration: 'sa' },
  { letter: 'ಹ', transliteration: 'ha' },
  { letter: 'ಳ', transliteration: 'ḷa' },
  { letter: 'ಕ್ಷ', transliteration: 'kṣa' },
  { letter: 'ಜ್ಞ', transliteration: 'jña' },
];

const KannadaAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      const kannadaVoice = voices.find(v =>
        v.lang.toLowerCase().includes('kn') || v.name.toLowerCase().includes('kannada')
      );
      setVoice(kannadaVoice || voices.find(v => v.lang === 'en-IN'));
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
          background-color: #f0f8ff;
        }
        .card-consonant:hover {
          background-color: #e0ffe0;
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

      <h1 className="title">📘 Kannada Alphabet Lesson</h1>

      <h2 className="section-title">🅰️ Vowels (ಸ್ವರಗಳು)</h2>
      <div className="grid">
        {kannadaVowels.map((v, idx) => (
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

      <h2 className="section-title">🔤 Consonants (ವ್ಯಂಜನಗಳು)</h2>
      <div className="grid">
        {kannadaConsonants.map((c, idx) => (
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

export default KannadaAlphabetLesson;
