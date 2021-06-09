import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";


const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  // apiKey: "AIzaSyBwctzYnCN64LAkL7v8oKS_oQGlPp4QVMc",
  // authDomain: "offer-down.firebaseapp.com",
  // projectId: "offer-down",
  // storageBucket: "offer-down.appspot.com",
  // messagingSenderId: "759992736433",
  // appId: "1:759992736433:web:6253dc5a0f4b028a87e090",
  // measurementId: "G-VF5LEXSEZG"

  apiKey: "AIzaSyBVWmWhFd6rIDf5vdUIdaLCHXoCdiwLlfk",
  authDomain: "offerdown-9edf7.firebaseapp.com",
  projectId: "offerdown-9edf7",
  storageBucket: "offerdown-9edf7.appspot.com",
  messagingSenderId: "412128504861",
  appId: "1:412128504861:web:714ab83ea2893ad2762af4"
};

// if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig);
// }
  
export default firebase;