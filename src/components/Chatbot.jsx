import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane, FaUpload, FaMicrophone } from "react-icons/fa";
import "./Chatbot.css";

const API_KEY = "AIzaSyBgpFffvh3aFdGu7RCCEjPtqlhfLhhsIpA" ;// Replace with your actual API key

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = "Hello! How can I assist you today?";
    if (hour < 12) greeting = "Good Morning! How can I assist you today?";
    else if (hour < 18) greeting = "Good Afternoon! How can I assist you today?";
    else greeting = "Good Evening! How can I assist you today?";

    const botMessage = { sender: "bot", text: greeting };
    setMessages([botMessage]);
    speakMessage(greeting, "en-IN");
  }, []);

  const detectLanguageCode = (text) => {
    const langSamples = {
      hi: ["है", "आप", "मैं", "क्या", "नमस्ते"],
      ta: ["வணக்கம்", "நான்", "என்ன", "உங்கள்", "இது"],
      ml: ["എനിക്ക്", "നമസ്കാരം", "നിനക്ക്", "ഇത്", "അവൻ"],
      kn: ["ನಾನು", "ನಮಸ್ಕಾರ", "ಇದು", "ನಿಮ್ಮ", "ಅವನು"],
      te: ["నేను", "నమస్కారం", "ఇది", "మీ", "అతను"],
    };
    for (const [lang, words] of Object.entries(langSamples)) {
      if (words.some((word) => text.includes(word))) {
        return { hi: "hi-IN", ta: "ta-IN", ml: "ml-IN", kn: "kn-IN", te: "te-IN" }[lang];
      }
    }
    return "en-IN";
  };

  const speakMessage = (text, langCode = "en-IN") => {
    const waitForVoices = () =>
      new Promise((resolve) => {
        const voices = speechSynthesis.getVoices();
        if (voices.length) resolve(voices);
        else speechSynthesis.onvoiceschanged = () => resolve(speechSynthesis.getVoices());
      });

    waitForVoices().then((voices) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      const selectedVoice =
        voices.find((v) => v.lang === langCode || v.lang.toLowerCase().startsWith(langCode.toLowerCase())) ||
        voices.find((v) => v.lang.startsWith("en")) ||
        voices[0];
      utterance.voice = selectedVoice;
      speechSynthesis.cancel();
      setTimeout(() => speechSynthesis.speak(utterance), 200);
    });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        { contents: [{ role: "user", parts: [{ text: input }] }] },
        { headers: { "Content-Type": "application/json" } }
      );
      const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
      const botMessage = { sender: "bot", text: aiText };
      setMessages((prev) => [...prev, botMessage]);
      const langCode = detectLanguageCode(aiText);
      speakMessage(aiText, langCode);
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = "Error processing request.";
      setMessages((prev) => [...prev, { sender: "bot", text: errorMsg }]);
      speakMessage(errorMsg, "en-IN");
    }

    setInput("");
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = async (event) => {
      const speechInput = event.results[0][0].transcript;
      const userMessage = { sender: "user", text: speechInput };
      setMessages((prev) => [...prev, userMessage]);

      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          { contents: [{ role: "user", parts: [{ text: speechInput }] }] },
          { headers: { "Content-Type": "application/json" } }
        );
        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't process that.";
        const botMessage = { sender: "bot", text: aiText };
        setMessages((prev) => [...prev, botMessage]);
        const langCode = detectLanguageCode(aiText);
        speakMessage(aiText, langCode);
      } catch (error) {
        console.error("Voice error:", error);
        setMessages((prev) => [...prev, { sender: "bot", text: "Voice assistant error." }]);
        speakMessage("Voice assistant error", "en-IN");
      }
    };
    recognition.start();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => identifyObjectOrText(reader.result);
    reader.readAsDataURL(file);
  };

  const identifyObjectOrText = async (imageData) => {
    try {
      const base64Image = imageData.split(",")[1];

      // ✅ Step 1: OCR Text Detection
      const textResponse = await axios.post(
        `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
        {
          requests: [
            {
              image: { content: base64Image },
              features: [{ type: "TEXT_DETECTION" }],
            },
          ],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const detectedText = textResponse.data.responses?.[0]?.fullTextAnnotation?.text;

      if (detectedText) {
        const userLangCode = detectLanguageCode(input || ""); // Detect from user input
        const translateLang = userLangCode.startsWith("en") ? "en" : userLangCode.split("-")[0];

        // ✅ Step 2: Translate text using Gemini
        const translationResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
          {
            contents: [
              {
                role: "user",
                parts: [{ text: `Translate this to ${translateLang}: ${detectedText}` }],
              },
            ],
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const translatedText =
          translationResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Could not translate text.";

        const botMessage = { sender: "bot", text: translatedText };
        setMessages((prev) => [...prev, botMessage]);
        speakMessage(translatedText, userLangCode || "en-IN");
      } else {
        // ✅ Step 3: Normal Object Detection
        const objectResponse = await axios.post(
          `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
          {
            requests: [
              {
                image: { content: base64Image },
                features: [{ type: "LABEL_DETECTION", maxResults: 3 }],
              },
            ],
          },
          { headers: { "Content-Type": "application/json" } }
        );

        const labels = objectResponse.data.responses?.[0]?.labelAnnotations?.map(
          (label) => label.description
        ) || [];

        const resultMsg = labels.length
          ? `Identified objects: ${labels.join(", ")}`
          : "No objects identified.";

        setMessages((prev) => [...prev, { sender: "bot", text: resultMsg }]);
        speakMessage(resultMsg, "en-IN");
      }
    } catch (error) {
      console.error("Image processing error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Failed to process image." }]);
      speakMessage("Failed to process image.", "en-IN");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i} className={msg.sender === "user" ? "user-message" : "bot-message"}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask me anything..."
        />
        <button onClick={sendMessage}>
          <FaPaperPlane />
        </button>
        <button onClick={startListening}>
          <FaMicrophone />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
