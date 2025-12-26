import React, { useEffect, useState } from 'react';

const hiragana = [
  { letter: 'あ', romaji: 'a' }, { letter: 'い', romaji: 'i' }, { letter: 'う', romaji: 'u' },
  { letter: 'え', romaji: 'e' }, { letter: 'お', romaji: 'o' },
  { letter: 'か', romaji: 'ka' }, { letter: 'き', romaji: 'ki' }, { letter: 'く', romaji: 'ku' },
  { letter: 'け', romaji: 'ke' }, { letter: 'こ', romaji: 'ko' },
  { letter: 'さ', romaji: 'sa' }, { letter: 'し', romaji: 'shi' }, { letter: 'す', romaji: 'su' },
  { letter: 'せ', romaji: 'se' }, { letter: 'そ', romaji: 'so' },
  { letter: 'た', romaji: 'ta' }, { letter: 'ち', romaji: 'chi' }, { letter: 'つ', romaji: 'tsu' },
  { letter: 'て', romaji: 'te' }, { letter: 'と', romaji: 'to' },
  { letter: 'な', romaji: 'na' }, { letter: 'に', romaji: 'ni' }, { letter: 'ぬ', romaji: 'nu' },
  { letter: 'ね', romaji: 'ne' }, { letter: 'の', romaji: 'no' },
  { letter: 'は', romaji: 'ha' }, { letter: 'ひ', romaji: 'hi' }, { letter: 'ふ', romaji: 'fu' },
  { letter: 'へ', romaji: 'he' }, { letter: 'ほ', romaji: 'ho' },
  { letter: 'ま', romaji: 'ma' }, { letter: 'み', romaji: 'mi' }, { letter: 'む', romaji: 'mu' },
  { letter: 'め', romaji: 'me' }, { letter: 'も', romaji: 'mo' },
  { letter: 'や', romaji: 'ya' }, { letter: 'ゆ', romaji: 'yu' }, { letter: 'よ', romaji: 'yo' },
  { letter: 'ら', romaji: 'ra' }, { letter: 'り', romaji: 'ri' }, { letter: 'る', romaji: 'ru' },
  { letter: 'れ', romaji: 're' }, { letter: 'ろ', romaji: 'ro' },
  { letter: 'わ', romaji: 'wa' }, { letter: 'を', romaji: 'wo' }, { letter: 'ん', romaji: 'n' },
];

const katakana = [
  { letter: 'ア', romaji: 'a' }, { letter: 'イ', romaji: 'i' }, { letter: 'ウ', romaji: 'u' },
  { letter: 'エ', romaji: 'e' }, { letter: 'オ', romaji: 'o' },
  { letter: 'カ', romaji: 'ka' }, { letter: 'キ', romaji: 'ki' }, { letter: 'ク', romaji: 'ku' },
  { letter: 'ケ', romaji: 'ke' }, { letter: 'コ', romaji: 'ko' },
  { letter: 'サ', romaji: 'sa' }, { letter: 'シ', romaji: 'shi' }, { letter: 'ス', romaji: 'su' },
  { letter: 'セ', romaji: 'se' }, { letter: 'ソ', romaji: 'so' },
  { letter: 'タ', romaji: 'ta' }, { letter: 'チ', romaji: 'chi' }, { letter: 'ツ', romaji: 'tsu' },
  { letter: 'テ', romaji: 'te' }, { letter: 'ト', romaji: 'to' },
  { letter: 'ナ', romaji: 'na' }, { letter: 'ニ', romaji: 'ni' }, { letter: 'ヌ', romaji: 'nu' },
  { letter: 'ネ', romaji: 'ne' }, { letter: 'ノ', romaji: 'no' },
  { letter: 'ハ', romaji: 'ha' }, { letter: 'ヒ', romaji: 'hi' }, { letter: 'フ', romaji: 'fu' },
  { letter: 'ヘ', romaji: 'he' }, { letter: 'ホ', romaji: 'ho' },
  { letter: 'マ', romaji: 'ma' }, { letter: 'ミ', romaji: 'mi' }, { letter: 'ム', romaji: 'mu' },
  { letter: 'メ', romaji: 'me' }, { letter: 'モ', romaji: 'mo' },
  { letter: 'ヤ', romaji: 'ya' }, { letter: 'ユ', romaji: 'yu' }, { letter: 'ヨ', romaji: 'yo' },
  { letter: 'ラ', romaji: 'ra' }, { letter: 'リ', romaji: 'ri' }, { letter: 'ル', romaji: 'ru' },
  { letter: 'レ', romaji: 're' }, { letter: 'ロ', romaji: 'ro' },
  { letter: 'ワ', romaji: 'wa' }, { letter: 'ヲ', romaji: 'wo' }, { letter: 'ン', romaji: 'n' },
];

const JapaneseAlphabetLesson = () => {
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const loadVoices = () => {
      const voices = synth.getVoices();
      const japaneseVoice = voices.find(v =>
        v.lang.toLowerCase().includes('ja') || v.name.toLowerCase().includes('japanese')
      );
      setVoice(japaneseVoice || voices.find(v => v.lang === 'en-US'));
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
          background-color: #e3f2fd;
        }
        .card-katakana:hover {
          background-color: #fce4ec;
        }
        .letter {
          font-size: 28px;
          font-weight: bold;
        }
        .romaji {
          font-size: 14px;
          color: #555;
        }
      `}</style>

      <h1 className="title">🇯🇵 Japanese Alphabet Lesson</h1>

      <h2 className="section-title">🈁 Hiragana (ひらがな)</h2>
      <div className="grid">
        {hiragana.map((char, idx) => (
          <div key={idx} className="card" onClick={() => speak(char.letter)}>
            <div className="letter">{char.letter}</div>
            <div className="romaji">{char.romaji}</div>
          </div>
        ))}
      </div>

      <h2 className="section-title">🈂️ Katakana (カタカナ)</h2>
      <div className="grid">
        {katakana.map((char, idx) => (
          <div key={idx} className="card card-katakana" onClick={() => speak(char.letter)}>
            <div className="letter">{char.letter}</div>
            <div className="romaji">{char.romaji}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JapaneseAlphabetLesson;
