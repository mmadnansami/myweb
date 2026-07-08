import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, orderBy, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB22mrRKbx9RgrIJeFFYLnyLS0Qj0Ax9Wg",
  authDomain: "vigilant-focus-p2t1j.firebaseapp.com",
  projectId: "vigilant-focus-p2t1j",
  storageBucket: "vigilant-focus-p2t1j.firebasestorage.app",
  messagingSenderId: "828011962650",
  appId: "1:828011962650:web:0fc232a10f5d7b37840ca3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-muttakiadnanport-66d7d7fd-7264-4b23-8f6f-883270f641da");

export const googleProvider = new GoogleAuthProvider();

// Sign In
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Google Sign In Error:", error);
    throw error;
  }
}

// Sign Out
export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    throw error;
  }
}

// Guestbook Message interface
export interface GuestbookMessage {
  id?: string;
  name: string;
  email: string;
  message: string;
  photoURL?: string;
  timestamp?: any;
}

// Add Guestbook Message
export async function addGuestbookMessage(name: string, email: string, message: string, photoURL?: string) {
  try {
    const docRef = await addDoc(collection(db, "guestbook"), {
      name,
      email,
      message,
      photoURL: photoURL || "",
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding guestbook message:", error);
    throw error;
  }
}

// Get Guestbook Messages
export async function getGuestbookMessages() {
  try {
    const q = query(collection(db, "guestbook"), orderBy("timestamp", "desc"), limit(50));
    const querySnapshot = await getDocs(q);
    const messages: GuestbookMessage[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      messages.push({
        id: doc.id,
        name: data.name,
        email: data.email,
        message: data.message,
        photoURL: data.photoURL,
        timestamp: data.timestamp
      });
    });
    return messages;
  } catch (error) {
    console.error("Error getting guestbook messages:", error);
    return [];
  }
}
