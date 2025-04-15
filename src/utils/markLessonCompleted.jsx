// src/utils/markLessonCompleted.js
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const markLessonCompleted = async (userId, lessonName) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    completedLessons: arrayUnion(lessonName),
  });
};
