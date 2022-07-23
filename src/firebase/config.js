// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyAmHENaRtYRfPkpV-MUHdmWAcMkHbfgl5A',
   authDomain: 'journal-appv2.firebaseapp.com',
   projectId: 'journal-appv2',
   storageBucket: 'journal-appv2.appspot.com',
   messagingSenderId: '890664199324',
   appId: '1:890664199324:web:bfbb2958758a05dc9bf959'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);