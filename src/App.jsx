import React from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";// ✅ Import ErrorBoundary
import OnboardingScreen from "./components/OnboardingScreen";
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

const App = () => {
  return (
    <ErrorBoundary> {/* ✅ Wrap all routes in ErrorBoundary */}
      <Routes>
        <Route path="/" element={<OnboardingScreen />} />
        <Route path="/onboarding2" element={<OnboardingScreen2 />} />
        <Route path="/onboarding3" element={<OnboardScreen3 />} />
        <Route path="/onboarding4" element={<OnboardScreen4 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/lesson/basics" element={<BasicsLanguageSelect />} />
        <Route path="/lesson/Hindi-basics" element={<HindiBasicsLesson />} />
        <Route path="/lesson/basics-2" element={<HindiBasicsLesson2 />} />
        <Route path="/lesson/basics-3" element={<HindiBasicsLesson3 />} />
        <Route path="/lesson/basics-4" element={<HindiBasicsLesson4 />} />
        <Route path="/lesson/basics-5" element={<HindiBasicsLesson5 />} />
        <Route path="/lesson/final-quiz" element={<HindiFinalQuiz />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </ErrorBoundary>
  );
};

export default App;
