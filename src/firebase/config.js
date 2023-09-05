import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAu8vwTj33m7wpbC3Wk3MFGsOOJcJH3icQ",
    authDomain: "journeyjoy-e5fdb.firebaseapp.com",
    projectId: "journeyjoy-e5fdb",
    storageBucket: "journeyjoy-e5fdb.appspot.com",
    messagingSenderId: "941786593",
    appId: "1:941786593:web:9ab77020701b8ce2793ea0"
  };

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

// Initialize Firebase Auth
const auth = getAuth();

// Initialize Storage
const storage = getStorage();

// Firestore Timestamp
const timestamp = Timestamp;

export { db, auth, timestamp, storage }