// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "REACT_APP_FIREBASE_API_KEY",
	authDomain: "REACT_APP_FIREBASE_AUTH_DOMAIN",
	projectId: "REACT_APP_FIREBASE_PROJECT_ID",
	storageBucket: "REACT_APP_FIREBASE_STORAGE_BUCKET",
	messagingSenderId: "REACT_APP_FIREBASE_MESSAGING_SENDER_ID",
	appId: "REACT_APP_FIREBASE_APP_ID",
	REACT_APP_MEASUREMENT_ID: "G-ZBSWHXJWPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
