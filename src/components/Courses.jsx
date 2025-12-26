// src/components/Courses.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const lessons = [
  {
    title: "Basics",
    description: "Choose a language to start basics",
    route: "/lesson/basics",
  },
  {
    title: "Phrases",
    description: "Choose a language for phrases",
    route: "/lesson/phrases-language-select",
  },
  {
    title: "Grammar",
    description: "Choose a language for grammar",
    route: "/lesson/grammar-language-select",
  },
];

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-4">
      <h2 className="mb-4">Your Courses</h2>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="col">
            <div
              className="card h-100 shadow-sm cursor-pointer"
              onClick={() => navigate(lesson.route)}
            >
              <div className="card-body">
                <h3 className="card-title">{lesson.title}</h3>
                <p className="card-text">{lesson.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
