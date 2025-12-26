import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, storage } from "../firebaseConfig";
import { FaSignOutAlt } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6"; // optional better back icon
import "./Profile.css";
import ImageUpload from "./ImageUpload";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = doc(db, "users", currentUser.uid);
        const unsubscribeSnapshot = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        });
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  if (!user) return null;

  const photoSrc = userData.photoURL || user.photoURL;

  return (
    <div className="profile-page container py-4">
      <h2 className="mb-4 text-center text-3xl font-semibold">Your Profile</h2>

      <div className="card p-6 bg-white rounded-lg shadow-md mb-4">
        <div className="flex justify-center mb-3">
          {photoSrc ? (
            <img
              src={photoSrc}
              alt="Profile"
              className="profile-photo rounded-full"
              width="150"
              height="150"
            />
          ) : (
            <div className="text-gray-500">No profile image uploaded</div>
          )}
        </div>

        <ImageUpload setUser={setUser} user={user} />

        <p className="text-lg text-gray-700 mt-2">
          <strong>Name:</strong> {user.displayName || "No name set"}
        </p>
        <p className="text-lg text-gray-700">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-lg text-gray-700">
          <strong>UID:</strong> {user.uid}
        </p>
        {userData.xp !== undefined && (
          <p className="text-lg text-gray-700">
            <strong>XP:</strong> {userData.xp}
          </p>
        )}
        {userData.streak !== undefined && (
          <p className="text-lg text-gray-700">
            <strong>Streak:</strong> {userData.streak} days
          </p>
        )}
      </div>

      {/* Buttons row */}
      <div className="flex justify-between gap-4 mt-4">
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg flex items-center justify-center w-full"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>

        <button
          className="btn btn-danger bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center w-full"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
