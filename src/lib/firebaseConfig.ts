import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDgt_tFU4Ys5X1j5X9RVnSLS_K-XOuODk",
  authDomain: "video-streaming-platform-cb347.firebaseapp.com",
  projectId: "video-streaming-platform-cb347",
  storageBucket: "video-streaming-platform-cb347.firebasestorage.app",
  messagingSenderId: "149141620331",
  appId: "1:149141620331:web:2e4a21f5c7dbf0edad532e",
  measurementId: "G-ZRSCHV6436"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
