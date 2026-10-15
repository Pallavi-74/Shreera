import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAMxpI3PdG3ogYVxLnS10vp45Pxb9r29D8",
  authDomain: "shreera-ddd0f.firebaseapp.com",
  projectId: "shreera-ddd0f",
  storageBucket: "shreera-ddd0f.firebasestorage.app",
  messagingSenderId: "1032424622456",
  appId: "1:1032424622456:web:919bbcda47104fb59e208d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig); 

export const firebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);

const app = firebaseConfigured ? (getApps()[0] ?? initializeApp(firebaseConfig)) : null;

export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;
export const storage = app ? getStorage(app) : null;
export const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((s: string) => s.trim().toLowerCase())
  .filter(Boolean);