import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;

        // Save user details in Firestore
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });

        window.location.href = "/home"; // Redirect to home page after signup
    } catch (error) {
        toast.error("Signup Error:", error.code, error.message);

        if (error.code === "auth/email-already-in-use") {
            toast.error("This email is already registered. Please log in instead.");
            window.location.href = "/login"; // Redirect to login page
        } else {
            toast.error("Signup failed. Please try again.");
        }
    }
};

const login = async (email, password) => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password);
        const user = res.user;

        toast.success(`Welcome back, ${user.email}! Redirecting...`, { toastId: "login-success" });
        window.location.href = "/home"; // Redirect to home page after login
    } catch (error) {
        toast.error("Error Code:", error.code); // Debugging: Log the error code
        console.log("Error Message:", error.message); // Debugging: Log the error message

        if (error.code === "auth/user-not-found") {
            toast.error("No user found with this email. Please sign up.", { toastId: "user-not-found" });
        } else if (error.code === "auth/wrong-password") {
            toast.error("Incorrect password. Please try again.", { toastId: "wrong-password" });
        } else {
            toast.error(`Login failed: ${error.message}`, { toastId: "login-error" });
        }
    }
};


const logout = async () => {
    try {
        await signOut(auth);
        toast.success("Logout successful! Redirecting to login...");
        window.location.href = "/login"; // Redirect to login page after logout
    } catch (error) {
        console.error("Logout Error:", error.message);
        toast.error("Error logging out. Please try again.");
    }
};

export { auth, db, login, signup, logout,};
