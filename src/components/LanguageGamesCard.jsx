// src/components/LanguageGamesCard.jsx

import React from "react";
import { FaGamepad, FaPlayCircle } from "react-icons/fa";

const LanguageGamesCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-bold flex items-center mb-2">
        <FaGamepad className="text-blue-500 mr-2" />
        Language Games
      </h2>
      <p className="text-gray-600 mb-4">Boost your skills while having fun!</p>

      {/* Game Links */}
      <ul className="space-y-4">
        <li className="flex items-center">
          <FaPlayCircle className="text-green-500 mr-2 text-xl" />
          <a
            href="https://wordwall.net/en-us/community/language-learning"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Wordwall Language Games
          </a>
        </li>

        <li className="flex items-center">
          <FaPlayCircle className="text-green-500 mr-2 text-xl" />
          <a
            href="https://www.baamboozle.com/game/1101473"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Vocabulary Quiz
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LanguageGamesCard;
