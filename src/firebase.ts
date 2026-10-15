// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';

// // const config = {
// //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
// //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
// //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
// //   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
// //   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
// //   appId: import.meta.env.VITE_FIREBASE_APP_ID,
// // };
// const config = {
//   apiKey: "AIzaSyAMxpI3PdG3ogYVxLnS10vp45Pxb9r29D8",
//   authDomain: "shreera-ddd0f.firebaseapp.com",
//   projectId: "shreera-ddd0f",
//   storageBucket: "shreera-ddd0f.firebasestorage.app",
//   messagingSenderId: "1032424622456",
//   appId: "1:1032424622456:web:919bbcda47104fb59e208d"
// };
// export const firebaseConfigured = Boolean(config.apiKey && config.projectId && config.appId);
// const app = firebaseConfigured ? (getApps()[0] ?? initializeApp(config)) : null;
// export const auth = app ? getAuth(app) : null;
// export const db = app ? getFirestore(app) : null;
// export const storage = app ? getStorage(app) : null;
// export const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',').map((s: string) => s.trim().toLowerCase()).filter(Boolean);
// const config = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID, 
// };

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