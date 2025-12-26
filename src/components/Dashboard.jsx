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
  FaTrophy,
  FaCheckCircle,
  FaBars,
  FaSignOutAlt,
  FaPlayCircle,
  FaFont,
  FaChartPie,
  FaChartLine,
  FaChartBar,
} from "react-icons/fa";
import "./Dashboard.css";
import { createUserPerformance } from "../utils/userPerformance";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import helloAnimation from "../animation/hello.json";
import PerformanceGrid from "../components/PerformanceGrid";
import { 
  LessonsPieChart, 
  QuizScoresBarChart, 
  StreakLineChart, 
  XpProgressChart 
} from "./ChartComponents";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [quizScores, setQuizScores] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [xpHistory, setXpHistory] = useState([]);
  const [showPerformance, setShowPerformance] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGames, setShowGames] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isRealTimeUpdating, setIsRealTimeUpdating] = useState(false);

  useEffect(() => {
    let unsubscribeSnapshot;
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPhotoURL(currentUser.photoURL || null);
        await createUserPerformance(currentUser.uid);        const userRef = doc(db, "users", currentUser.uid);
        unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          const data = docSnap.data() || {};
          setIsRealTimeUpdating(true);
          setXp(data.xp || 0);
          setStreak(data.streak || 0);
          setCompletedLessons(data.completedLessons || []);
          setQuizScores(data.quizScores || []);
          setActivityLog(data.activityLog || []);
          setXpHistory(data.xpHistory || []);
          if (data.photoURL) setPhotoURL(data.photoURL);
          setIsRealTimeUpdating(false);
        });
          // We'll generate the sample data directly in our chart components
        // instead of trying to save it to Firestore

        const hasShownKey = `hasShownWelcome_${currentUser.uid}`;
        if (!sessionStorage.getItem(hasShownKey)) {
          setShowWelcome(true);
          sessionStorage.setItem(hasShownKey, "true");
          setTimeout(() => setShowWelcome(false), 4000);
        }
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, [auth]);


  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const handleNavigate = (path) => navigate(path);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      {/* Always-visible mobile toggle */}
      <button
        className="sidebar-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        <FaBars />
      </button>

      {/* Modern Sidebar */}
      <div className={sidebarOpen ? "modern-sidebar open" : "modern-sidebar closed"}>
        {sidebarOpen && <div className="sidebar-backdrop" onClick={toggleSidebar}></div>}
        <div className="sidebar-header">
          <div className="sidebar-user-info">
            <h5 className="sidebar-username">{user.displayName || "User"}</h5>
            <div className="sidebar-userstats">
              <span className="sidebar-xp">{xp} XP</span>
              <span className="sidebar-dot">•</span>
              <span className="sidebar-streak">{streak} days</span>
            </div>
          </div>
          {/* keep for desktop, hidden on mobile */}
          <button className="sidebar-toggle-btn desktop-only" onClick={toggleSidebar}>
            <FaBars />
          </button>
        </div>
        
        <div className="sidebar-divider"></div>
        
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item" onClick={() => handleNavigate("/home")}>
              <div className="sidebar-icon-container">
                <FaUser className="sidebar-icon" />
              </div>
              <span className="sidebar-menu-text">Profile</span>
            </li>
            <li className="sidebar-menu-item" onClick={() => handleNavigate("/courses")}>
              <div className="sidebar-icon-container">
                <FaGraduationCap className="sidebar-icon" />
              </div>
              <span className="sidebar-menu-text">Courses</span>
            </li>
            <li className="sidebar-menu-item" onClick={() => handleNavigate("/chatbot")}>
              <div className="sidebar-icon-container">
                <FaComments className="sidebar-icon" />
              </div>
              <span className="sidebar-menu-text">Chatbot</span>
            </li>
            <li className="sidebar-menu-item" onClick={() => setShowGames(!showGames)}>
              <div className="sidebar-icon-container">
                <FaGamepad className="sidebar-icon" />
              </div>
              <span className="sidebar-menu-text">Games</span>
              {showGames && <span className="sidebar-active-indicator"></span>}
            </li>
            <li className="sidebar-menu-item" onClick={() => handleNavigate("/letters")}>
              <div className="sidebar-icon-container">
                <FaFont className="sidebar-icon" />
              </div>
              <span className="sidebar-menu-text">Letters</span>
            </li>
          </ul>
          
          <div className="sidebar-divider"></div>
          
          <div className="sidebar-footer">
            <button className="sidebar-logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="sidebar-logout-icon" />
              <span className="sidebar-menu-text">Logout</span>
            </button>
          </div>
        </nav>
      </div>{/* Main Content */}
      <motion.div
        className="main-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Popup */}
        <AnimatePresence>
          {showWelcome && user.displayName && (
            <motion.div
              className="welcome-popup"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="popup-content">
                <span
                  className="close-btn"
                  onClick={() => setShowWelcome(false)}
                >
                  ×
                </span>
                <Lottie
                  animationData={helloAnimation}
                  loop
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
            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="rounded-circle me-2"
                style={{ width: 40, height: 40, objectFit: "cover" }}
              />
            ) : (
              <FaUser className="profile-icon me-2" />
            )}
            <span className="user-name text-truncate">
              {user.displayName || "User"}
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
        </div>        {/* Stats Overview */}
        <div className="dashboard-card">
          <h4><FaChartPie /> Learning Dashboard</h4>
          <PerformanceGrid
            xp={xp}
            streak={streak}
            completedLessons={completedLessons}
            quizScores={quizScores}
          />          {/* Modern Charts Grid */}
          <div className="charts-grid">
            <XpProgressChart 
              xp={xp} 
              xpHistory={xpHistory}
              isUpdating={isRealTimeUpdating} 
            />
            <LessonsPieChart 
              completedLessons={completedLessons}
              isUpdating={isRealTimeUpdating}
            />
          </div>
          
          {isRealTimeUpdating && (
            <div className="text-center mt-2">
              <span className="badge bg-info">
                <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                Updating from Firestore...
              </span>
            </div>
          )}
        </div>

        {/* Performance Analytics */}
        <div className="dashboard-card">
          <h4>
            <FaChartLine /> Performance Analytics
          </h4>
          <p className="text-muted">Detailed visualization of your progress</p>
          
          <div className="charts-grid">
            <QuizScoresBarChart 
              quizScores={quizScores}
              isUpdating={isRealTimeUpdating}
            />
            <StreakLineChart 
              activityLog={activityLog}
              isUpdating={isRealTimeUpdating}
            />
          </div>
          
          {/* Performance Toggle */}
          <div
            className="performance-card-toggle mt-4"
            onClick={() => setShowPerformance(!showPerformance)}
          >
            <h5>
              <FaTrophy /> Detailed Performance Summary
            </h5>
            <p>Tap to {showPerformance ? "hide" : "view"} your performance details</p>
          </div>

          {/* Performance Details */}
          <AnimatePresence>
            {showPerformance && (
              <motion.div
                className="performance-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="card p-3 mt-3">
                      <h5 className="card-title">
                        <FaCheckCircle className="me-2 text-success" /> 
                        Lessons Completed: {completedLessons.length}
                      </h5>
                      {completedLessons.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {completedLessons.map((lesson, i) => (
                            <li className="list-group-item d-flex align-items-center" key={i}>
                              <span className="badge bg-success me-2">{i + 1}</span>
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="card-text text-muted">No lessons completed yet.</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="card p-3 mt-3">
                      <h5 className="card-title">
                        <FaChartBar className="me-2 text-primary" /> 
                        Quiz Performance
                      </h5>
                      {quizScores.length > 0 ? (
                        <ul className="list-group list-group-flush">
                          {quizScores.map((quiz, i) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={i}>
                              <span>{quiz.lesson}</span>
                              <span className={`badge ${quiz.score >= 70 ? 'bg-success' : 'bg-warning'}`}>
                                {quiz.score}%
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="card-text text-muted">No quiz attempts yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>        {/* Games Section */}
        {showGames && (
          <div className="dashboard-card game-section mt-3">
            <h4>
              <FaGamepad className="me-2 text-warning" /> Language Games
            </h4>
            <p className="text-muted">Boost your skills while having fun!</p>
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div className="card game-card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src="https://img.utdstc.com/icon/4a1/7f2/4a17f2d65d6be3a06af42a6879592210e0567603db026d291dfcf7b5fde53b9a:200"
                        alt="Wordwall Game"
                        className="game-image me-3"
                        style={{ width: "60px", height: "60px", borderRadius: "12px" }}
                      />
                      <div>
                        <h5 className="card-title mb-0">Wordwall Games</h5>
                        <span className="badge bg-info">Interactive</span>
                      </div>
                    </div>
                    <p className="card-text">Practice vocabulary, grammar, and more with interactive games.</p>
                    <a
                      href="https://wordwall.net/en-us/community/language-learning"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-100"
                    >
                      <FaPlayCircle className="me-2" />
                      Play Now
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card game-card h-100">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <img
                        src="https://images.g2crowd.com/uploads/product/image/social_landscape/social_landscape_abf8d0d894c471003ec15fc89d733bde/29f4c8a8-1c0d-41c0-b8fa-8d35510910aa.jpg"
                        alt="Baamboozle Game"
                        className="game-image me-3"
                        style={{ width: "60px", height: "60px", borderRadius: "12px" }}
                      />
                      <div>
                        <h5 className="card-title mb-0">Vocabulary Quiz</h5>
                        <span className="badge bg-warning">Challenge</span>
                      </div>
                    </div>
                    <p className="card-text">Test your vocabulary knowledge with this interactive quiz game.</p>
                    <a
                      href="https://www.baamboozle.com/game/1101473"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary w-100"
                    >
                      <FaPlayCircle className="me-2" />
                      Start Quiz
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
