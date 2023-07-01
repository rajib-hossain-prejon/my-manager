// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { initializeFirestore } from 'firebase/firestore';



import { getStorage } from 'firebase/storage';


// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: Constants.manifest.extra.apiKey ,
//   authDomain: Constants.manifest.extra.authDomain,
//   projectId: Constants.manifest.extra.projectId ,
//   storageBucket: Constants.manifest.extra.storageBucket ,
//   messagingSenderId: Constants.manifest.extra.messagingSenderId ,
//   appId: Constants.manifest.extra.appId,
// };


// databaseURL: Constants.manifest.extra.databaseURL
// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyCzSHZMZqyKMXfO3KI3RZgjRRkqaKP-YHo",
  authDomain: "find-them-live-86bb8.firebaseapp.com",
  projectId: "find-them-live-86bb8",
  storageBucket: "find-them-live-86bb8.appspot.com",
  messagingSenderId: "236893153610",
  appId: "1:236893153610:web:6d16e8d66ece3a835679b3"
};

let app;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
experimentalForceLongPolling: true
});
export const storage = getStorage(app);


// export const messaging = getMessaging(app);

// export const db = getFirestore(app);
// export const db = initializeFirestore(app, {
//     experimentalAutoDetectLongPolling: true,
//     experimentalForceLongPolling: true
// });