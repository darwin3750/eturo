import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAqtLI2r2sevoC8Iu1fb1NpxpHKvSikV7o",
  authDomain: "eturo-f8bd0.firebaseapp.com",
  databaseURL: "https://eturo-f8bd0.firebaseio.com",
  projectId: "eturo-f8bd0",
  storageBucket: "eturo-f8bd0.appspot.com",
  messagingSenderId: "7280652527",
  appId: "1:7280652527:web:5e89c9d7e44bfc3923ab1a"
};

firebase.initializeApp(firebaseConfig);

// utility
const db = firebase.firestore()
const auth = firebase.auth()

// collection references
const userCollection = db.collection('users')

// utilities and references
export {
  db,
  auth,
  userCollection,
}
