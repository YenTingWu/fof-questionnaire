import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// init app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// Auth
const provider = new GoogleAuthProvider();

provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const auth = getAuth();

export const signInWithGoogle = () => {
  try {
    signInWithRedirect(auth, provider);
  } catch (err) {
    console.log(err);
  }
};

export const getSignInResult = async () => {
  const result = await getRedirectResult(auth);

  if (result == null) return;

  const credential = GoogleAuthProvider.credentialFromResult(result);

  return result.user;
};
