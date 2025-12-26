// components/GameSection.jsx

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "react-bootstrap";
import { FaGamepad } from "react-icons/fa";

const GameSection = ({ showGames }) => {
  return (
    <AnimatePresence>
      {showGames && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="mt-4 shadow-sm rounded-4 border-0">
            <Card.Body>
              <Card.Title className="mb-4 d-flex align-items-center">
                <FaGamepad className="me-2" />
                Hindi Learning Games
              </Card.Title>

              <div className="mb-4">
              <iframe
  src="https://quizlet.com/_abcdef" // Replace with your own Quizlet set
  title="Quizlet Game"
  width="100%"
  height="400"
  style={{ border: "none", borderRadius: "12px" }}
  allowFullScreen
></iframe>
              <div>
                <iframe
                  src="https://learningapps.org/watch?app=pftfb5tyn22"
                  title="Learning Apps Game"
                  width="100%"
                  height="400"
                  style={{ border: "none", borderRadius: "12px" }}
                  allowFullScreen
                ></iframe>
              </div>
            </Card.Body>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameSection;
