import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// Create user performance document only if it doesn't exist
export const createUserPerformance = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        xp: 0,
        streak: 1,
        completedLessons: [],
        quizScores: [],
      });
      console.log("✅ User performance created in Firestore");
    } else {
      console.log("ℹ️ User performance already exists");
    }
  } catch (err) {
    console.error("❌ Error creating user performance document:", err);
  }
};
