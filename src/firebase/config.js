import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDg5edKzn2ENZNiWkxHhJz_Akh6ACb5fw0",
  authDomain: "journeyjoy-7cca4.firebaseapp.com",
  projectId: "journeyjoy-7cca4",
  storageBucket: "journeyjoy-7cca4.appspot.com",
  messagingSenderId: "477651921094",
  appId: "1:477651921094:web:fd84519b4c12ea06040fc7"
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