import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { FirebaseAuth } from './services/firebase_auth';

const firebaseConfig = () => {
  console.log("Firebase Config: ", process.env.REACT_APP_FIREBASE_API_KEY, process.env.REACT_APP_FIREBASE_AUTH_DOMAIN, process.env.REACT_APP_FIREBASE_PROJECT_ID, process.env.REACT_APP_FIREBASE_STORAGE_BUCKET, process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID, process.env.REACT_APP_FIREBASE_APP_ID);
  return {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID}
};

// Initialize Firebase
const app = initializeApp(firebaseConfig());
const authLocal = getAuth(app);

export const auth = new FirebaseAuth(authLocal);
export const db = getFirestore(app);

export default app;
