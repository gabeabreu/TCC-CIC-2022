// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDuCLxJaJZFNjG2TuET28D5oBBU4NzDbWE',
  authDomain: 'midas-dd47f.firebaseapp.com',
  projectId: 'midas-dd47f',
  storageBucket: 'midas-dd47f.appspot.com',
  messagingSenderId: '109483970786',
  appId: '1:109483970786:web:6e30fe88a729a164f4cebb',
  measurementId: 'G-B5W961EEWG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
