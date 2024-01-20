// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBytz-GI1iAFsAha7XWHMKBla2VWJft3-k",
  authDomain: "exerciser-daad3.firebaseapp.com",
  projectId: "exerciser-daad3",
  storageBucket: "exerciser-daad3.appspot.com",
  messagingSenderId: "47075794161",
  appId: "1:47075794161:web:b761931f45db88f6661d50",
  measurementId: "G-PENS5V208P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Auth init
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

//db init
export const db = getFirestore(app);