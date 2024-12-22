import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGFs5XUPGi1IN2ho5yQaxmQk44_5B8Srg",
  authDomain: "netflix-clone-7fd55.firebaseapp.com",
  projectId: "netflix-clone-7fd55",
  storageBucket: "netflix-clone-7fd55.firebasestorage.app",
  messagingSenderId: "189571993593",
  appId: "1:189571993593:web:34e8af42f5ef9eed917728"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // user details in Firestore
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        window.location.href = "/home" // Redirect to home page after signup
    } catch (error) {
        console.error("Signup Error:", error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
            alert("This email is already registered. Please log in instead.");
            window.location.href = "/login"; // Redirect to login page
        } else {
            alert("Signup failed. Please try again.");
        }
    }
};

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        window.location.href = "/home"; // Redirect to home page after login
        alert(`Welcome back, ${user.email}`)
    } catch (error) {
        console.error("Login Error:", error.code, error.message);

        if (error.code === "auth/user-not-found") {
            alert("No user found with this email. Please sign up.");
            window.location.href = "/signup"; // Redirect to signup page
        } else if (error.code === "auth/wrong-password") {
            alert("Incorrect password. Please try again.");
        } else {
            alert("Login failed. Please try again.");
        }
    }
};

const logout = async () => {
    try {
        await signOut(auth);
        window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
        console.error("Logout Error:", error.message);
        alert("Error logging out. Please try again.");
    }
};


export {auth, db, login, signup, logout}