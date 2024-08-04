import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB1SEoD4kmv1FJqT9DuMW-ag0pdkUWtfI8",
  authDomain: "bookapp-59581.firebaseapp.com",
  projectId: "bookapp-59581",
  storageBucket: "bookapp-59581.appspot.com",
  messagingSenderId: "1018457949590",
  appId: "1:1018457949590:web:649ee2ef57506efdf1c9b7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };