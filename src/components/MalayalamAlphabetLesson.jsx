import React, { useEffect, useState } from 'react';

const malayalamVowels = [
  { letter: 'അ', transliteration: 'a' },
  { letter: 'ആ', transliteration: 'aa' },
  { letter: 'ഇ', transliteration: 'i' },
  { letter: 'ഈ', transliteration: 'ii' },
  { letter: 'ഉ', transliteration: 'u' },
  { letter: 'ഊ', transliteration: 'uu' },
  { letter: 'എ', transliteration: 'e' },
  { letter: 'ഏ', transliteration: 'ee' },
  { letter: 'ഐ', transliteration: 'ai' },
  { letter: 'ഒ', transliteration: 'o' },
  { letter: 'ഓ', transliteration: 'oo' },
  { letter: 'ഔ', transliteration: 'au' },
  { letter: 'അം', transliteration: 'am' },
  { letter: 'അഃ', transliteration: 'ah' },
];

const malayalamConsonants = [
  { letter: 'ക', transliteration: 'ka' },
  { letter: 'ഖ', transliteration: 'kha' },
  { letter: 'ഗ', transliteration: 'ga' },
  { letter: 'ഘ', transliteration: 'gha' },
  { letter: 'ങ', transliteration: 'nga' },
  { letter: 'ച', transliteration: 'cha' },
  { letter: 'ഛ', transliteration: 'chha' },
  { letter: 'ജ', transliteration: 'ja' },
  { letter: 'ഝ', transliteration: 'jha' },
  { letter: 'ഞ', transliteration: 'nya' },
  { letter: 'ട', transliteration: 'ṭa' },
  { letter: 'ഠ', transliteration: 'ṭha' },
  { letter: 'ഡ', transliteration: 'ḍa' },
  { letter: 'ഢ', transliteration: 'ḍha' },
  { letter: 'ണ', transliteration: 'ṇa' },
  { letter: 'ത', transliteration: 'ta' },
  { letter: 'ഥ', transliteration: 'tha' },
  { letter: 'ദ', transliteration: 'da' },
  { letter: 'ധ', transliteration: 'dha' },
  { letter: 'ന', transliteration: 'na' },
  { letter: 'പ', transliteration: 'pa' },
  { letter: 'ഫ', transliteration: 'pha' },
  { letter: 'ബ', transliteration: 'ba' },
  { letter: 'ഭ', transliteration: 'bha' },
  { letter: 'മ', transliteration: 'ma' },
  { letter: 'യ', transliteration: 'ya' },
  { letter: 'ര', transliteration: 'ra' },
  { letter: 'ല', transliteration: 'la' },
  { letter: 'വ', transliteration: 'va' },
  { letter: 'ശ', transliteration: 'sha' },
  { letter: 'ഷ', transliteration: 'ṣa' },
  { letter: 'സ', transliteration: 'sa' },
  { letter: 'ഹ', transliteration: 'ha' },
  { letter: 'ള', transliteration: 'ḷa' },
  { letter: 'ഴ', transliteration: 'zha' },
  { letter: 'റ', transliteration: 'ṟa' },
];

const MalayalamAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      const malayalamVoice = voices.find(v =>
        v.lang.toLowerCase().includes('ml') || v.name.toLowerCase().includes('malayalam')
      );
      setVoice(malayalamVoice || voices.find(v => v.lang === 'en-IN'));
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

      <h1 className="title">📘 Malayalam Alphabet Lesson</h1>

      <h2 className="section-title">🅰️ Vowels (സ്വരാക്ഷരങ്ങൾ)</h2>
      <div className="grid">
        {malayalamVowels.map((v, idx) => (
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

      <h2 className="section-title">🔤 Consonants (വ്യഞ്ജനാക്ഷരങ്ങൾ)</h2>
      <div className="grid">
        {malayalamConsonants.map((c, idx) => (
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

export default MalayalamAlphabetLesson;
