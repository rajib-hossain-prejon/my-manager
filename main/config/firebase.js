// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';


import { getStorage } from 'firebase/storage';





const firebaseConfig = {
  apiKey: "AIzaSyDFp55OjKMytwvYs7YeC23oKIUIn3wMSCM",
  authDomain: "rajibhossainprejon-de7fb.firebaseapp.com",
  projectId: "rajibhossainprejon-de7fb",
  storageBucket: "rajibhossainprejon-de7fb.appspot.com",
  messagingSenderId: "760179299111",
  appId: "1:760179299111:web:b32b8293afbd3788824f02",
  
};
let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
// export const auth = getAuth(app);
export const db = initializeFirestore(app, {
experimentalForceLongPolling: true
});

export const storage = getStorage(app);
export const auth = getAuth(app);

// export const messaging = getMessaging(app);

// export const db = getFirestore(app);
// export const db = initializeFirestore(app, {
//     experimentalAutoDetectLongPolling: true,
//     experimentalForceLongPolling: true
// });