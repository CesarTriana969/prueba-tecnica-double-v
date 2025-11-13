import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB48DRsAIgtNHvpiwqcie40ag6dVkDahJM",
  authDomain: "prueba-tecnica-double-v.firebaseapp.com",
  projectId: "prueba-tecnica-double-v",
  storageBucket: "prueba-tecnica-double-v.firebasestorage.app",
  messagingSenderId: "855104606312",
  appId: "1:855104606312:web:e8e5e68965fd89bd892bdd",
  measurementId: "G-RR0VZ23JB6"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore()
const storage = getStorage(app)

export { app, auth, db, storage }