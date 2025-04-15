import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import {
  FaSearch,
  FaUser,
  FaGraduationCap,
  FaComments,
  FaGamepad,
  FaFire,
  FaStar,
  FaTrophy,
  FaCheckCircle,
  FaBars,
  FaSignOutAlt,  // Added sign out icon
} from "react-icons/fa";
import "./Dashboard.css"; // Ensure the updated CSS is here
import { createUserPerformance } from "../utils/userPerformance";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import helloAnimation from "../animation/hello.json";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false); // Show popup only after check

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await createUserPerformance(currentUser.uid);

        const userRef = doc(db, "users", currentUser.uid);
        onSnapshot(userRef, (docSnap) => {
          const data = docSnap.data();
          if (data) {
            setXp(data.xp || 0);
            setStreak(data.streak || 0);
            setCompletedLessons(data.completedLessons || []);
            setQuizScores(data.quizScores || []);
          }
        });

        // Show welcome popup only if not shown before during session
        const hasShownKey = `hasShownWelcome_${currentUser.uid}`;
        const hasShownWelcome = sessionStorage.getItem(hasShownKey);

        if (!hasShownWelcome) {
          setShowWelcome(true);
          sessionStorage.setItem(hasShownKey, "true");

          // Automatically close after a timeout
          setTimeout(() => {
            setShowWelcome(false);
          }, 4000); // 4 seconds
        }
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const closeSidebar = () => {
    const sidebar = document.getElementById("sideMenu");
    const offcanvas = window.bootstrap?.Offcanvas.getInstance(sidebar);
    if (offcanvas) offcanvas.hide();
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeSidebar();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <AnimatePresence>
        {showWelcome && user?.displayName && (
          <motion.div
            className="welcome-popup"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="popup-content">
              <span className="close-btn" onClick={() => setShowWelcome(false)}>×</span>
              <Lottie
                animationData={helloAnimation}
                loop={true}
                className="lottie-hello"
                style={{ height: 120 }}
              />
              <h4>🎉 Welcome back, {user.displayName}!</h4>
              <p>Let’s continue your language journey today 🚀</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="dashboard-header d-flex align-items-center px-3 py-2">
        <div className="profile-container d-flex align-items-center">
          <FaUser className="profile-icon me-2" />
          <span className="user-name text-truncate">
            {user?.displayName || "User"}
          </span>
        </div>

        <div className="search-bar d-flex align-items-center mx-3 flex-grow-1">
          <FaSearch className="search-icon me-2" />
          <input
            type="text"
            className="form-control border-0 bg-transparent p-0"
            placeholder="Search..."
          />
        </div>

        <button
          className="btn btn-outline-primary ms-auto"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#sideMenu"
          aria-controls="sideMenu"
        >
          <FaBars />
        </button>
      </div>

      {/* XP & Streak */}
      <div className="lesson-card stats-card">
        <div className="stat-item">
          <FaFire className="stat-icon fire" />
          <span>{streak}-day Streak</span>
        </div>
        <div className="stat-item">
          <FaStar className="stat-icon xp" />
          <span>XP: {xp}</span>
        </div>
      </div>

      {/* Performance Toggle */}
      <div
        className="lesson-card performance-card-toggle"
        onClick={() => setShowPerformance(!showPerformance)}
      >
        <h3>
          <FaTrophy /> Performance Summary
        </h3>
        <p>Tap to {showPerformance ? "hide" : "view"} your performance</p>
      </div>

      {/* Animated Performance Content */}
      <AnimatePresence>
        {showPerformance && (
          <motion.div
            className="performance-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <FaCheckCircle /> Lessons Completed: {completedLessons.length}
            </p>
            {completedLessons.length > 0 ? (
              <ul>
                {completedLessons.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ul>
            ) : (
              <p>No lessons completed yet.</p>
            )}

            <p>Quiz Scores:</p>
            {quizScores.length > 0 ? (
              <ul>
                {quizScores.map((quiz, i) => (
                  <li key={i}>
                    {quiz.lesson}: {quiz.score}%
                  </li>
                ))}
              </ul>
            ) : (
              <p>No quiz attempts yet.</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate("/home")}>
          <FaUser className="nav-icon" />
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate("/courses")}>
          <FaGraduationCap className="nav-icon" />
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate("/chatbot")}>
          <FaComments className="nav-icon" />
        </motion.div>
        <motion.div whileTap={{ scale: 0.9 }} onClick={() => navigate("/games")}>
          <FaGamepad className="nav-icon" />
        </motion.div>
      </div>

      {/* Sidebar Offcanvas */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="sideMenu"
        aria-labelledby="sideMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="sideMenuLabel">Navigation</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <button
            className="btn btn-outline-dark w-100 mb-2"
            onClick={() => handleNavigate("/home")}
          >
            <FaUser className="me-2" /> Profile
          </button>
          <button
            className="btn btn-outline-dark w-100 mb-2"
            onClick={() => handleNavigate("/courses")}
          >
            <FaGraduationCap className="me-2" /> Courses
          </button>
          <button
            className="btn btn-outline-dark w-100 mb-2"
            onClick={() => handleNavigate("/chatbot")}
          >
            <FaComments className="me-2" /> Language Chatbot
          </button>
          <button
            className="btn btn-outline-dark w-100 mb-2"
            onClick={() => handleNavigate("/games")}
          >
            <FaGamepad className="me-2" /> Games
          </button>

          {/* Logout Button */}
          <button
            className="btn btn-outline-danger w-100 mt-3"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="me-2" /> Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
