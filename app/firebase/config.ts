// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"
import { getFunctions, } from "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyCJi2T0KbfEDsAUtXb4-FI-uLGc6EFOjmw",
  authDomain: "mukhtardev-4c2f2.firebaseapp.com",
  projectId: "mukhtardev-4c2f2",
  storageBucket: "mukhtardev-4c2f2.appspot.com",
  messagingSenderId: "773885078350",
  appId: "1:773885078350:web:eea0a46701de56aed6cc1f",
  measurementId: "G-C3F2DJ4EVD",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Get a reference to the auth service
export const auth = getAuth(app)

// Get a reference to the Firestore service
export const db = getFirestore(app)

// Get a reference to the Functions service export
export const functions = getFunctions(app);

// Create a user document in Firestore
export const createUserDocument = async (user) => {
  try {
    // Get a reference to the user document
    const userRef = doc(db, "users", user.uid)
    // Set the user data
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      mobileNumber: user.mobileNumber,
      // Add any other fields you want to store
    })
  } catch (error) {
    console.error("Error creating user document", error)
  }
}

// Get a user document from Firestore
export const getUserDocument = async (uid) => {
  try {
    // Get a reference to the user document
    const userRef = doc(db, "users", uid)
    // Get the user data
    const userSnap = await getDoc(userRef)
    // Return the user data if it exists
    if (userSnap.exists()) {
      return userSnap.data()
    } else {
      console.error("User document not found")
      return null
    }
  } catch (error) {
    console.error("Error getting user document", error)
    return null
  }
}

// Register a new user with email and password
export const register = async (email, password) => {
  try {
    // Create a new user with email and password
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    // Create a user document in Firestore
    await createUserDocument(user)
    // Return the user object
    return user
  } catch (error) {
    console.error("Error registering user", error)
    throw error
  }
}

// Sign in an existing user with email and password
export const login = async (email, password) => {
  try {
    // Sign in the user with email and password
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    // Return the user object
    return user
  } catch (error) {
    console.error("Error logging in user", error)
    throw error
  }
}

// Sign out the current user
export const logout = async () => {
  try {
    // Sign out the current user
    await signOut(auth)
  } catch (error) {
    console.error("Error logging out user", error)
    throw error
  }
}

// Get the current user object
export const getCurrentUser = () => {
  return auth.currentUser
}

// Get the current user document from Firestore
export const getCurrentUserDocument = async () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    return await getUserDocument(currentUser.uid)
  } else {
    return null
  }
}


// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// const db = getFirestore(app)

// Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
