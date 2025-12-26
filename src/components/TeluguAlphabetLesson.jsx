import React from 'react';

const TeluguAlphabetLesson = [
  {
    title: "అచ్చులు (Vowels)",
    letters: [
      { letter: "అ", sound: "a", example: "ago" },
      { letter: "ఆ", sound: "aa", example: "father" },
      { letter: "ఇ", sound: "i", example: "ink" },
      { letter: "ఈ", sound: "ee", example: "eel" },
      { letter: "ఉ", sound: "u", example: "put" },
      { letter: "ఊ", sound: "oo", example: "school" },
      { letter: "ఋ", sound: "ru", example: "-" },
      { letter: "ౠ", sound: "rru", example: "-" },
      { letter: "ఎ", sound: "e", example: "pet" },
      { letter: "ఏ", sound: "ae", example: "face" },
      { letter: "ఐ", sound: "ai", example: "ice" },
      { letter: "ఒ", sound: "o", example: "over" },
      { letter: "ఓ", sound: "oo", example: "oval" },
      { letter: "ఔ", sound: "au", example: "out" },
      { letter: "అం", sound: "am", example: "some" },
      { letter: "అః", sound: "aha", example: "visarga" },
    ],
  },
  {
    title: "హల్లులు (Consonants)",
    letters: [
      { letter: "క", sound: "ka", example: "kite" },
      { letter: "ఖ", sound: "kha", example: "khaki" },
      { letter: "గ", sound: "ga", example: "gun" },
      { letter: "ఘ", sound: "gha", example: "Ghana" },
      { letter: "ఙ", sound: "nga", example: "sing" },
      { letter: "చ", sound: "cha", example: "chat" },
      { letter: "ఛ", sound: "chha", example: "church + h" },
      { letter: "జ", sound: "ja", example: "jam" },
      { letter: "ఝ", sound: "jha", example: "genre + h" },
      { letter: "ఞ", sound: "nya", example: "canyon" },
      { letter: "ట", sound: "ṭa", example: "Tamil ṭa" },
      { letter: "ఠ", sound: "ṭha", example: "ṭa + h" },
      { letter: "డ", sound: "ḍa", example: "dog" },
      { letter: "ఢ", sound: "ḍha", example: "hard + h" },
      { letter: "ణ", sound: "ṇa", example: "tunnel" },
      { letter: "త", sound: "ta", example: "thin" },
      { letter: "థ", sound: "tha", example: "thought" },
      { letter: "ద", sound: "da", example: "do" },
      { letter: "ధ", sound: "dha", example: "there + h" },
      { letter: "న", sound: "na", example: "no" },
      { letter: "ప", sound: "pa", example: "pen" },
      { letter: "ఫ", sound: "pha", example: "phone" },
      { letter: "బ", sound: "ba", example: "bat" },
      { letter: "భ", sound: "bha", example: "bhajan" },
      { letter: "మ", sound: "ma", example: "man" },
      { letter: "య", sound: "ya", example: "yes" },
      { letter: "ర", sound: "ra", example: "run" },
      { letter: "ల", sound: "la", example: "lamp" },
      { letter: "వ", sound: "va", example: "van" },
      { letter: "శ", sound: "sha", example: "ship" },
      { letter: "ష", sound: "ṣa", example: "shhh" },
      { letter: "స", sound: "sa", example: "sun" },
      { letter: "హ", sound: "ha", example: "hat" },
      { letter: "ళ", sound: "ḷa", example: "retroflex l" },
      { letter: "క్ష", sound: "kṣa", example: "k + sha" },
      { letter: "ఱ", sound: "ṟa", example: "retroflex r" },
    ],
  },
];

const speakTelugu = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  // Try to find a Telugu voice or fallback to default
  const teluguVoice = voices.find(v => v.lang.includes("te") || v.name.toLowerCase().includes("telugu"));

  // If no Telugu voice is found, fallback to a default English voice or any other available voice
  if (teluguVoice) {
    utterance.voice = teluguVoice;
  } else {
    utterance.voice = voices[0]; // Fallback to the first available voice (could be English)
  }

  utterance.lang = 'te-IN';  // Set language to Telugu
  window.speechSynthesis.speak(utterance);
};

const TeluguAlphabets = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Telugu Alphabets with English Comparison</h1>
      {TeluguAlphabetLesson.map((section, idx) => (
        <div key={idx}>
          <h2 style={styles.sectionTitle}>{section.title}</h2>
          <div style={styles.grid}>
            {section.letters.map((item, i) => (
              <div key={i} style={styles.card}>
                <div style={styles.letter}>{item.letter}</div>
                <div><strong>Sound:</strong> {item.sound}</div>
                <div><strong>Example:</strong> {item.example}</div>
                <button onClick={() => speakTelugu(item.letter)} style={styles.button}>🔊 Speak</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#f4f8ff",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#3b3b99",
  },
  sectionTitle: {
    marginTop: "30px",
    fontSize: "1.5rem",
    color: "#2a2a7d",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "15px",
    marginTop: "10px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  },
  letter: {
    fontSize: "2.2rem",
    color: "#e63946",
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
    backgroundColor: "#3b3b99",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default TeluguAlphabets;
