import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCA4aigvrzmveZkC5mFzUxdboubvkwZOKA",
  authDomain: "quizgame-1935d.firebaseapp.com",
  databaseURL: "https://quizgame-1935d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quizgame-1935d",
  storageBucket: "quizgame-1935d.appspot.com",
  messagingSenderId: "161080157981",
  appId: "1:161080157981:web:bcf86b323b4c5e30f763f4",
  measurementId: "G-YFHC4N6B2L"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
