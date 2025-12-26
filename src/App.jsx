import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";  // Import the ErrorBoundary
import OnboardingScreen2 from "./components/OnboardingScreen2";
import OnboardScreen3 from "./components/OnboardScreen3";
import OnboardScreen4 from "./components/OnboardScreen4";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import HindiBasicsLesson from "./components/HindiBasicsLesson";
import BasicsLanguageSelect from "./components/BasicsLanguageSelect";
import HindiBasicsLesson2 from "./components/HindiBasicsLesson2";
import HindiBasicsLesson3 from "./components/HindiBasicsLesson3";
import HindiBasicsLesson4 from "./components/HindiBasicsLesson4";
import HindiBasicsLesson5 from "./components/HindiBasicsLesson5";
import HindiFinalQuiz from './components/HindiFinalQuiz';
import Courses from "./components/Courses";
import GrammarLanguageSelect from "./components/GrammarLanguageSelect";
import PhrasesLanguageSelect from "./components/PhrasesLanguageSelect";
import HindiPhrasesLesson from "./components/HindiPhrasesLesson";
import HindiPhrasesLesson2 from "./components/HindiPhrasesLesson2";
import HindiPhrasesLesson3 from "./components/HindiPhrasesLesson3";
import HindiPhrasesLesson4 from "./components/HindiPhrasesLesson4";
import HindiPhrasesLesson5 from "./components/HindiPhrasesLesson5";
import PhrasesFinalQuiz from "./components/PhrasesFinalQuiz";
import Profile from "./components/Profile";
import HindiGrammarLesson1 from "./components/HindiGrammarLesson1";
import HindiGrammarLesson2 from "./components/HindiGrammarLesson2";
import HindiGrammarLesson3 from "./components/HindiGrammarLesson3";
import HindiGrammarLesson4 from "./components/HindiGrammarLesson4";
import HindiGrammarLesson5 from "./components/HindiGrammarLesson5";
import HindiGrammarFinalQuiz from "./components/HindigrammarFinalQuiz"; 
import EnglishBasicsLesson from "./components/EnglishBasicsLesson";
import EnglishLesson2 from "./components/EnglishLesson2";
import EnglishLesson3 from "./components/EnglishLesson3";
import EnglishLesson4 from "./components/EnglishLesson4";
import EnglishFinalQuiz from "./components/EnglishFinalQuiz";
import TamilBasicsLesson from "./components/TamilBasicLesson";
import TamilBasicsLesson2 from "./components/TamilBasicLesson2";
import TamilBasicsLesson3 from "./components/TamilBasicLesson3";
import TamilBasicsLesson4 from "./components/TamilBasicLesson4";
import TamilBasicsLesson5 from "./components/TamilBasicLesson5";
import TamilFinalQuiz from "./components/TamilFinalQuiz";
import TamilPhrasesLesson from "./components/TamilPhrasesLesson";
import TamilPhrasesLesson2 from "./components/TamilPhrasesLesson2";
import TamilPhrasesLesson3 from "./components/TamilPhrasesLesson3";
import TamilPhrasesLesson4 from "./components/TamilPhrasesLesson4";
import TamilPhrasesLesson5 from "./components/TamilPhrasesLesson5";
import SpanishBasicsLesson from "./components/SpanishBasicsLesson";
import SpanishBasicsLesson2 from './components/SpanishBasicsLesson2';
import SpanishBasicsLesson3 from './components/SpanishBasicsLesson3';
import SpanishFinalQuiz from "./components/SpanishFinalQuiz";
import FrenchBasicsLesson from "./components/FrenchBasicsLesson";
import FrenchBasicsLesson2 from "./components/FrenchBasicsLesson2";
import FrenchBasicsLesson3 from "./components/FrenchBasicsLesson3";
import FrenchFinalQuiz from "./components/FrenchFinalQuiz";
import GermanBasicsLesson from "./components/GermanBasicsLesson";
import GermanBasicsLesson2 from "./components/GermanBasicsLesson2";
import GermanBasicsLesson3 from "./components/GermanBasicsLesson3";
import GermanFinalQuiz from "./components/GermanFinalQuiz";
import JapaneseBasicsLesson from "./components/JapaneseBasicsLesson";
import JapaneseBasicsLesson2 from "./components/JapaneseBasicsLesson2";
import JapaneseBasicsLesson3 from "./components/JapaneseBasicsLesson3";
import JapaneseFinalQuiz from "./components/JapaneseFinalQuiz";
import TeluguBasicsLesson from "./components/TeluguBasicsLanguage";
import TeluguBasicsLesson2 from "./components/TeluguBasicsLanguage2";
import TeluguBasicsLesson3 from "./components/TeluguBasicsLanguage3";
import TeluguFinalQuiz from "./components/TeluguFinalQuiz";
import MalayalamBasicsLesson from "./components/MalayalamBasicsLanguage";
import MalayalamBasicsLesson2 from "./components/MalayalamBasicsLanguage2";
import MalayalamBasicsLesson3 from "./components/MalayalamBasicsLanguage3";
import MalayalamFinalQuiz from "./components/MalayalamFinalQuiz";
import KannadaBasicsLesson from "./components/KanadaBasicsLanguage";
import KannadaBasicsLesson2 from "./components/KanadaBasicsLanguage2";
import KannadaBasicsLesson3 from "./components/KanadaBasicsLanguage3";
import KannadaFinalQuiz from "./components/KanadaFinalQuiz";
import LetterLanguageSelect from "./components/LetterLanguageSelect";
import HindiAlphabetLesson from "./components/HindiAlphabetLesson";
import TamilAlphabetLesson from "./components/TamilAlphabetLesson";
import EnglishAlphabetLesson from "./components/EnglishAlphabetLesson";
import TeluguAlphabetLesson from "./components/TeluguAlphabetLesson";
import MalayalamAlphabetLesson from './components/MalayalamAlphabetLesson';
import KannadaAlphabetLesson from "./components/KannadaAlphabetLesson";
import FrenchAlphabetLesson from "./components/FrenchAlphabetLesson";
import SpanishAlphabetLesson from "./components/SpanishAlphabetLesson";
import GermanAlphabetLesson from "./components/GermanAlphabetLesson";
import TamilGrammarLesson1 from "./components/TamilGrammarLesson1";
import TamilGrammarLesson2 from "./components/TamilGrammarLesson2";
import MalayalamGrammarLesson1 from "./components/MalayalamGrammarLesson1";
import MalayalamGrammarLesson2 from "./components/MalayalamGrammarLesson2";
import MalayalamGrammarLesson3 from "./components/MalayalamGrammarLesson3";
import MalayalamGrammarLesson4 from "./components/MalayalamGrammarLesson4";
import MalayalamGrammarLesson5 from "./components/MalayalamGrammarLesson5";
import EnglishGrammarLesson1 from "./components/EnglishGrammarLesson1";
import EnglishGrammarLesson2 from "./components/EnglishGrammarLesson2";
import EnglishGrammarLesson3 from "./components/EnglishGrammarLesson3";
import EnglishGrammarLesson4 from "./components/EnglishGrammarLesson4";
import EnglishGrammarLesson5 from "./components/EnglishGrammarLesson5";
import FrenchGrammarLesson1 from "./components/FrenchGrammarLesson1";
import FrenchGrammarLesson2 from "./components/FrenchGrammarLesson2";
import FrenchGrammarLesson3 from "./components/FrenchGrammarLesson3";
import FrenchGrammarLesson4 from "./components/FrenchGrammarLesson4";
import FrenchGrammarLesson5 from "./components/FrenchGrammarLesson5";
import JapaneseGrammarLesson1 from "./components/JapaneseGrammarLesson1";
import JapaneseGrammarLesson2 from "./components/JapaneseGrammarLesson2";
import JapaneseGrammarLesson3 from "./components/JapaneseGrammarLesson3";
import JapaneseGrammarLesson4 from "./components/JapaneseGrammarLesson4";
import JapaneseGrammarLesson5 from "./components/JapaneseGrammarLesson5";
import KannadaGrammarLesson1 from "./components/KannadaGrammarLesson1";
import KannadaGrammarLesson2 from "./components/KannadaGrammarLesson2";
import KannadaGrammarLesson3 from "./components/KannadaGrammarLesson3";
import KannadaGrammarLesson4 from "./components/KannadaGrammarLesson4";
import KannadaGrammarLesson5 from "./components/KannadaGrammarLesson5";
import SpanishGrammarLesson1 from "./components/SpanishGrammarLesson1";
import SpanishGrammarLesson2 from "./components/SpanishGrammarLesson2";
import SpanishGrammarLesson3 from "./components/SpanishGrammarLesson3";
import SpanishGrammarLesson4 from "./components/SpanishGrammarLesson4";
import SpanishGrammarLesson5 from "./components/SpanishGrammarLesson5";
import GermanGrammarLesson1 from "./components/GermanGrammarLesson1";
import GermanGrammarLesson2 from "./components/GermanGrammarLesson2";
import GermanGrammarLesson3 from "./components/GermanGrammarLesson3";
import GermanGrammarLesson4 from "./components/GermanGrammarLesson4";
import GermanGrammarLesson5 from "./components/GermanGrammarLesson5";
import TeluguGrammarLesson1 from "./components/TeluguGrammarLesson1";
import TeluguGrammarLesson2 from "./components/TeluguGrammarLesson2";
import TeluguGrammarLesson3 from "./components/TeluguGrammarLesson3";
import TeluguGrammarLesson4 from "./components/TeluguGrammarLesson4";
import TeluguGrammarLesson5 from "./components/TeluguGrammarLesson5";
import EnglishLesson1 from "./components/EnglishLesson1";
import EnglishLesson21 from "./components/EnglishPhrasesLesson2";
import EnglishLesson31 from "./components/EnglishPhrasesLesson3";
import EnglishLesson41 from "./components/EnglishPhrasesLesson4";
import EnglishLesson51 from "./components/EnglishPhrasesLesson5";
import FrenchPhraseLesson1 from "./components/FrenchPhrasesLesson1";
import FrenchPhraseLesson2 from "./components/FrenchPhrasesLesson2";
import FrenchPhraseLesson4 from "./components/FrenchPhrasesLesson4";
import FrenchPhraseLesson3 from "./components/FrenchPhrasesLesson3";
import FrenchPhraseLesson5 from "./components/FrenchPhrasesLesson5";
import GermanLesson1 from "./components/GermanPhrasesLesson1";
import GermanPhraseLesson2 from "./components/GermanPhrasesLesson2";
import GermanPhraseLesson3 from "./components/GermanPhrasesLesson3";
import GermanPhraseLesson4 from "./components/GermanPhrasesLesson4";
import GermanPhraseLesson5 from "./components/GermanPhrasesLesson5";
import MalayalamLesson1 from "./components/MalayalamPhrasesLesson1";
import MalayalamLesson2 from "./components/MalayalamPhrasesLesson2";
import MalayalamLesson3 from "./components/MalayalamPhrasesLesson3";
import MalayalamLesson4 from "./components/MalayalamPhrasesLesson4";
import MalayalamLesson5 from "./components/MalayalamPhrasesLesson5";
import SpanishLesson1 from "./components/SpanishPhrasesLesson1";
import SpanishLesson2 from "./components/SpanishPhrasesLesson2";
import SpanishLesson3 from "./components/SpanishPhrasesLesson3";
import SpanishLesson4 from "./components/SpanishPhrasesLesson4";
import SpanishLesson5 from "./components/SpanishPhrasesLesson5";
import KannadaPhrasesLesson from "./components/KanadaPhrasesLesson1";
import KannadaPhrasesLesson2 from "./components/KanadaPhrasesLesson2";
import KannadaPhrasesLesson3 from "./components/KanadaPhrasesLesson3";
import KannadaPhrasesLesson4 from "./components/KanadaPhrasesLesson4";
import JapaneseLesson1 from "./components/JapanesePhrasesLesson1";
import JapaneseLesson2 from "./components/JapanesePhrasesLesson2";
import JapaneseLesson3 from "./components/JapanesePhrasesLesson3";
import JapaneseLesson4 from "./components/JapanesePhrasesLesson4";
import JapaneseLesson5 from "./components/JapanesePhrasesLesson5";
import TeluguLesson1 from "./components/TeluguPhrasesLesson1";
import TeluguLesson2 from "./components/TeluguPhrasesLesson2";
import TeluguLesson3 from "./components/TeluguPhrasesLesson3";
import TeluguLesson4 from "./components/TeluguPhrasesLesson4";
import TeluguLesson5 from "./components/TeluguPhrasesLesson5";
import JapaneseAlphabetLesson from './components/JapaneseAlphabetLesson';

const App = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }
        setDeferredPrompt(null);
        setShowInstall(false);
      });
    }
  };

  return (
    <ErrorBoundary> {/* Wrap the main part of your app */}
      <div>
        {/* Optional Install button */}
        {showInstall && (
          <div style={{ position: "fixed", top: 10, right: 10 }}>
            <button onClick={handleInstallClick} className="btn btn-primary">
              Install Hindi App
            </button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Navigate to="/onboarding2" />} />
          <Route path="/onboarding2" element={<OnboardingScreen2 />} />
          <Route path="/onboarding3" element={<OnboardScreen3 />} />
          <Route path="/onboarding4" element={<OnboardScreen4 />} />

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Main App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/courses" element={<Courses />} />

          {/* Lessons */}
          <Route path="/lesson/basics" element={<BasicsLanguageSelect />} />
          <Route path="/lesson/Hindi-basics" element={<HindiBasicsLesson />} />
          <Route path="/lesson/basics-2" element={<HindiBasicsLesson2 />} />
          <Route path="/lesson/basics-3" element={<HindiBasicsLesson3 />} />
          <Route path="/lesson/basics-4" element={<HindiBasicsLesson4 />} />
          <Route path="/lesson/basics-5" element={<HindiBasicsLesson5 />} />
          <Route path="/lesson/final-quiz" element={<HindiFinalQuiz />} />
          <Route path="/lesson/phrases-language-select" element={<PhrasesLanguageSelect />} />
          <Route path="/lesson/grammar-language-select" element={<GrammarLanguageSelect />} />
          <Route path="/lesson/hindi-phrases" element={<HindiPhrasesLesson />} />
          <Route path="/lesson/phrases-2" element={<HindiPhrasesLesson2 />} />
          <Route path="/lesson/phrases-3" element={<HindiPhrasesLesson3 />} />
          <Route path="/lesson/phrases-4" element={<HindiPhrasesLesson4 />} />
          <Route path="/lesson/phrases-final-quiz" element={<PhrasesFinalQuiz />} />
          <Route path="/lesson/phrases-5" element={<HindiPhrasesLesson5 />} />
          <Route path="/home"   element={<Profile />} />
          {/* Lessons */}
          <Route path="/lesson/hindi-grammar" element={<HindiGrammarLesson1 />} />
          <Route path="/lesson/grammar-2" element={<HindiGrammarLesson2 />} />
          <Route path="/lesson/grammar-3" element={<HindiGrammarLesson3 />} />
          <Route path="/lesson/grammar-4" element={<HindiGrammarLesson4 />} />
          <Route path="/lesson/grammar-5" element={<HindiGrammarLesson5 />} />
          <Route path="/lesson/grammar-final-quiz" element={<HindiGrammarFinalQuiz />} />
          <Route path="/lesson/english-basics" element={<EnglishBasicsLesson />} />
          <Route path="/lesson/english-2" element={<EnglishLesson2 />} />
          <Route path="/lesson/english-3" element={<EnglishLesson3 />} />
          <Route path="/lesson/english-4" element={<EnglishLesson4 />} />
          <Route path="/lesson/english-finalquiz" element={<EnglishFinalQuiz />} />
          <Route path="/lesson/tamil-basics-1" element={<TamilBasicsLesson />} />
          <Route path="/lesson/tamil-basics-2" element={<TamilBasicsLesson2 />} />
          <Route path="/lesson/tamil-basics-3" element={<TamilBasicsLesson3 />} />
          <Route path="/lesson/tamil-basics-4" element={<TamilBasicsLesson4 />} />
          <Route path="/lesson/tamil-basics-5" element={<TamilBasicsLesson5 />} />
          <Route path="/lesson/tamil-finalquiz" element={<TamilFinalQuiz />} />
          <Route path="/lesson/tamil-phrases" element={<TamilPhrasesLesson />} />
          <Route path="/lesson/tamil-phrases-2" element={<TamilPhrasesLesson2 />} />
          <Route path="/lesson/tamil-phrases-3" element={<TamilPhrasesLesson3 />} />
          <Route path="/lesson/tamil-phrases-4" element={<TamilPhrasesLesson4 />} />
          <Route path="/lesson/tamil-phrases-final-quiz" element={<PhrasesFinalQuiz />} />
          <Route path="/lesson/tamil-phrases-5" element={<TamilPhrasesLesson5 />} />
          <Route path="/lesson/spanish-basics" element={<SpanishBasicsLesson />} />
        <Route path="/spanishlesson/basics-2" element={<SpanishBasicsLesson2 />} />
        <Route path="/spanishlesson/basics-3" element={<SpanishBasicsLesson3 />} />
        <Route path="/spanishlesson/basics-final" element={<SpanishFinalQuiz />} />
        <Route path="/lesson/french-basics" element={<FrenchBasicsLesson />} />
        <Route path="/lesson/french-basics-2" element={<FrenchBasicsLesson2 />} />
        <Route path="/lesson/french-basics-3" element={<FrenchBasicsLesson3 />} />
        <Route path="/lesson/french-final-quiz" element={<FrenchFinalQuiz />} />
        <Route path="/lesson/german-basics" element={<GermanBasicsLesson />} />
        <Route path="/lesson/german-basics-2" element={<GermanBasicsLesson2 />} />
        <Route path="/lesson/german-basics-3" element={<GermanBasicsLesson3 />} />
        <Route path="/lesson/german-final-quiz" element={<GermanFinalQuiz />} />
        <Route path="/lesson/japanese-basics" element={<JapaneseBasicsLesson />} />
        <Route path="/lesson/japanese-basics-2" element={<JapaneseBasicsLesson2 />} />
        <Route path="/lesson/japanese-basics-3" element={<JapaneseBasicsLesson3 />} />
        <Route path="/lesson/japanese-final-quiz" element={<JapaneseFinalQuiz />} />
        <Route path="/lesson/telugu-basics" element={<TeluguBasicsLesson />} />
        <Route path="/lesson/telugu-basics-2" element={<TeluguBasicsLesson2 />} />
        <Route path="/lesson/telugu-basics-3" element={<TeluguBasicsLesson3 />} />
        <Route path="/lesson/telugu-final-quiz" element={<TeluguFinalQuiz />} />
        <Route path="/lesson/malayalam-basics" element={<MalayalamBasicsLesson />} />
        <Route path="/lesson/malayalam-basics-2" element={<MalayalamBasicsLesson2 />} />
        <Route path="/lesson/malayalam-basics-3" element={<MalayalamBasicsLesson3 />} />
        <Route path="/lesson/malayalam-final-quiz" element={<MalayalamFinalQuiz />} />
        <Route path="/lesson/kannada-basics" element={<KannadaBasicsLesson />} />
        <Route path="/lesson/kannada-basics-2" element={<KannadaBasicsLesson2 />} />
        <Route path="/lesson/kannada-basics-3" element={<KannadaBasicsLesson3 />} />
        <Route path="/lesson/kannada-final-quiz" element={<KannadaFinalQuiz />} />
        <Route path="/letters" element={<LetterLanguageSelect />} />
        <Route path="/letter/hindi" element={<HindiAlphabetLesson />} />
        <Route path="/letter/tamil" element={<TamilAlphabetLesson />} />
        <Route path="/letter/english" element={<EnglishAlphabetLesson />} />
        <Route path="/letter/telugu" element={<TeluguAlphabetLesson />} />
        <Route path="/letter/malayalam" element={<MalayalamAlphabetLesson />} />
        <Route path="/letter/kannada" element={<KannadaAlphabetLesson />} />
        <Route path="/letter/french" element={<FrenchAlphabetLesson />} />
        <Route path="/letter/spanish" element={<SpanishAlphabetLesson />} />
        <Route path="/letter/german" element={<GermanAlphabetLesson />} />
        <Route path="/lesson/tamil-grammar1" element={<TamilGrammarLesson1 />} />
        <Route path="/lesson/tamilgrammar-2" element={<TamilGrammarLesson2 />} />
        <Route path="/lesson/malayalam-grammar" element={<MalayalamGrammarLesson1 />} />
        <Route path="/lesson/malayalamgrammar-2" element={<MalayalamGrammarLesson2 />} />
        <Route path="/lesson/malayalamgrammar-3" element={<MalayalamGrammarLesson3 />} />
        <Route path="/lesson/malayalamgrammar-4" element={<MalayalamGrammarLesson4 />} />
        <Route path="/lesson/malayalamgrammar-5" element={<MalayalamGrammarLesson5 />} />
        <Route path="/lesson/english-grammar" element={<EnglishGrammarLesson1 />} />
        <Route path="/lesson/englishgrammar-2" element={<EnglishGrammarLesson2 />} />
        <Route path="/lesson/englishgrammar-3" element={<EnglishGrammarLesson3 />} />
        <Route path="/lesson/englishgrammar-4" element={<EnglishGrammarLesson4 />} />
        <Route path="/lesson/englishgrammar-5" element={<EnglishGrammarLesson5 />} />
        <Route path="/lesson/french-grammar" element={<FrenchGrammarLesson1 />} />
        <Route path="/lesson/frenchgrammar-2" element={<FrenchGrammarLesson2 />} />
        <Route path="/lesson/frenchgrammar-3" element={<FrenchGrammarLesson3 />} />
        <Route path="/lesson/frenchgrammar-4" element={<FrenchGrammarLesson4 />} />
        <Route path="/lesson/frenchgrammar-5" element={<FrenchGrammarLesson5 />} />
        <Route path="/lesson/japanese-grammar" element={<JapaneseGrammarLesson1 />} />
        <Route path="/lesson/japanesegrammar-2" element={<JapaneseGrammarLesson2 />} />
        <Route path="/lesson/japanesegrammar-3" element={<JapaneseGrammarLesson3 />} />
        <Route path="/lesson/japanesegrammar-4" element={<JapaneseGrammarLesson4 />} />
        <Route path="/lesson/japanesegrammar-5" element={<JapaneseGrammarLesson5 />} />
        <Route path="/lesson/kannada-grammar" element={<KannadaGrammarLesson1 />} />
        <Route path="/lesson/kannadagrammar-2" element={<KannadaGrammarLesson2 />} />
        <Route path="/lesson/kannadagrammar-3" element={<KannadaGrammarLesson3 />} />
        <Route path="/lesson/kannadagrammar-4" element={<KannadaGrammarLesson4 />} />
        <Route path="/lesson/kannadagrammar-5" element={<KannadaGrammarLesson5 />} />
        <Route path="/lesson/spanish-grammar" element={<SpanishGrammarLesson1 />} />
        <Route path="/lesson/spanishgrammar-2" element={<SpanishGrammarLesson2 />} />
        <Route path="/lesson/spanishgrammar-3" element={<SpanishGrammarLesson3 />} />
        <Route path="/lesson/spanishgrammar-4" element={<SpanishGrammarLesson4 />} />
        <Route path="/lesson/spanishgrammar-5" element={<SpanishGrammarLesson5 />} />
          <Route path="/lesson/german-grammar" element={<GermanGrammarLesson1 />} />
         <Route path="/lesson/germangrammar-2" element={<GermanGrammarLesson2 />} />
          <Route path="/lesson/germangrammar-3" element={<GermanGrammarLesson3 />} />
           <Route path="/lesson/germangrammar-4" element={<GermanGrammarLesson4 />} />
             <Route path="/lesson/germangrammar-5" element={<GermanGrammarLesson5 />} />
             <Route path="/lesson/telugu-grammar" element={<TeluguGrammarLesson1 />} />
             <Route path="/lesson/telugugrammar-2" element={<TeluguGrammarLesson2 />} /> 
             <Route path="/lesson/telugugrammar-3" element={<TeluguGrammarLesson3 />} /> 
             <Route path="/lesson/telugugrammar-4" element={<TeluguGrammarLesson4 />} /> 
             <Route path="/lesson/telugugrammar-5" element={<TeluguGrammarLesson5 />} /> 
              <Route path="/lesson/english-phrases-1" element={<EnglishLesson1 />} />
              <Route path="/lesson/english-phrases-2" element={<EnglishLesson21 />} />
              <Route path="/lesson/english-phrases-3" element={<EnglishLesson31 />} />
              <Route path="/lesson/english-phrases-4" element={<EnglishLesson41 />} />
              <Route path="/lesson/english-phrases-5" element={<EnglishLesson51 />} />
             <Route path="/lesson/french-phrases-1" element={<FrenchPhraseLesson1 />} />
              <Route path="/lesson/french-phrases-2" element={<FrenchPhraseLesson2 />} />
              <Route path="/lesson/french-phrases-3" element={<FrenchPhraseLesson3 />} />
              <Route path="/lesson/french-phrases-4" element={<FrenchPhraseLesson4 />} />
              <Route path="/lesson/french-phrases-5" element={<FrenchPhraseLesson5/>} />
              <Route path="/lesson/german-phrases-1" element={<GermanLesson1 />} />
              <Route path="/lesson/german-phrases-2" element={<GermanPhraseLesson2 />} />
              <Route path="/lesson/german-phrases-3" element={<GermanPhraseLesson3/>} />
              <Route path="/lesson/german-phrases-4" element={<GermanPhraseLesson4/>} />
              <Route path="/lesson/german-phrases-5" element={<GermanPhraseLesson5/>} />
             <Route path="/lesson/malayalam-phrases-1" element={<MalayalamLesson1 />} />
              <Route path="/lesson/malayalam-phrases-2" element={<MalayalamLesson2/>} />
              <Route path="/lesson/malayalam-phrases-3" element={<MalayalamLesson3 />} />
              <Route path="/lesson/malayalam-phrases-4" element={<MalayalamLesson4/>} />
              <Route path="/lesson/malayalam-phrases-5" element={<MalayalamLesson5 />} />
              <Route path="/lesson/spanish-phrases-1" element={<SpanishLesson1/>} />
              <Route path="/lesson/spanish-phrases-2" element={<SpanishLesson2/>} />
              <Route path="/lesson/spanish-phrases-3" element={<SpanishLesson3 />} />
              <Route path="/lesson/spanish-phrases-4" element={<SpanishLesson4/>} />
              <Route path="/lesson/spanish-phrases-5" element={<SpanishLesson5 />} />
               <Route path="/lesson/kannada-phrases-1" element={<KannadaPhrasesLesson/>} />
              <Route path="/lesson/kannada-phrases-2" element={<KannadaPhrasesLesson2 />} />
              <Route path="/lesson/kannada-phrases-3" element={<KannadaPhrasesLesson3/>} />
              <Route path="/lesson/kannada-phrases-4" element={<KannadaPhrasesLesson4/>} />  
              <Route path="/lesson/j-prases-1" element={<JapaneseLesson1/>} />
              <Route path="/lesson/j-prases-2" element={<JapaneseLesson2/>} />
              <Route path="/lesson/j-prases-3" element={<JapaneseLesson3 />} />
              <Route path="/lesson/j-prases-4" element={<JapaneseLesson4/>} />
              <Route path="/lesson/j-prases-5" element={<JapaneseLesson5/>} />
              <Route path="/lesson/telugu-phrases-1" element={<TeluguLesson1/>} />
              <Route path="/lesson/telugu-phrases-2" element={<TeluguLesson2/>} />
              <Route path="/lesson/telugu-phrases-3" element={<TeluguLesson3 />} />
              <Route path="/lesson/telugu-phrases-4" element={<TeluguLesson4/>} />
              <Route path="/lesson/telugu-phrases-5" element={<TeluguLesson5/>} />
              <Route path="/letter/japanese" element={<JapaneseAlphabetLesson />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;