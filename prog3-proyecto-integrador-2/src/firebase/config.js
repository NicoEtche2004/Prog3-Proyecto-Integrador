import app from 'firebase/app'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB9Rekq-nCtcxjUJHjiUoC8YWB6nZEBKUY",
  authDomain: "proyecto-2cb03.firebaseapp.com",
  projectId: "proyecto-2cb03",
  storageBucket: "proyecto-2cb03.firebasestorage.app",
  messagingSenderId: "356097061448",
  appId: "1:356097061448:web:95e8ad7d76f123039cde7d"
};


app.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage() 
export const db = app.firestore()