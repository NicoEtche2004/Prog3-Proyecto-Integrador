import app from 'firebase'
import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyATcoyLm9Tc5_7XaVhiDv5A-00I3vwGww4",
    authDomain: "mi-primera-firebase-39b68.firebaseapp.com",
    projectId: "mi-primera-firebase-39b68",
    storageBucket: "mi-primera-firebase-39b68.firebasestorage.app",
    messagingSenderId: "863292116218",
    appId: "1:863292116218:web:822b6b778d773c21a28d43",
    measurementId: "G-YZBE4DXV28"
  };

app.initalizrApp(firebaseConfig)

export const auth = firebase.auth()
export const storage = app.storage() 
export const db = app.firestore()