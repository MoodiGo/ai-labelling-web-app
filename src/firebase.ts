import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAuth } from './services/firebase_auth';

// Your Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyA3fzYIgLPkf1Aslvr0-Mg4PvY6yos-1I4",
  authDomain: "moodigo-ai.firebaseapp.com",
  projectId: "moodigo-ai",
  storageBucket: "moodigo-ai.firebasestorage.app",
  messagingSenderId: "404719394807",
  appId: "1:404719394807:web:c12c7eeda84a1f19b618f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authLocal = getAuth(app);

export const auth = new FirebaseAuth(authLocal);
export const db = getFirestore(app);

export default app;
