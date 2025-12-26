import React from "react";
import "./PerformanceGrid.css";
import { FaCheckCircle, FaChartBar, FaMedal, FaBookOpen } from "react-icons/fa";
import { AlignCenter } from "lucide-react";

const PerformanceGrid = ({ xp, streak, completedLessons, quizScores }) => {
  return (
    <div className="performance-grid">
      <div className="grid-item">
        <FaChartBar className="grid-icon" />
        <h4><center>{xp}</center></h4>
        <p>Total XP</p>
      </div>
      <div className="grid-item">
        <FaMedal className="grid-icon" />
        <h4>{streak}</h4>
        <p>Streak</p>
      </div>
      <div className="grid-item">
        <FaCheckCircle className="grid-icon" />
        <h4>{completedLessons?.length}</h4>
        <p>Lessons Completed</p>
      </div>
      <div className="grid-item">
        <FaBookOpen className="grid-icon" />
        <h4>{quizScores?.length}</h4>
        <p>Quizzes Taken</p>
      </div>
    </div>
  );
};

export default PerformanceGrid;
