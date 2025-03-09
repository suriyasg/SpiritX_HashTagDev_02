// for firebase client init
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// for firebase database init
import { getDatabase } from "firebase/database";

// Firebase Client SDK Configs
const firebaseConfig = {
  apiKey: process.env.CLIENT_SDK_API_KEY!,
  authDomain: process.env.CLIENT_SDK_AUTH_DOMAIN!,
  databaseURL: process.env.CLIENT_SDK_DATABASE_URL!,
  projectId: process.env.CLIENT_SDK_PROJECT_ID!,
  storageBucket: process.env.CLIENT_SDK_STORAGE_BUCKET!,
  messagingSenderId: process.env.CLIENT_SDK_MESSAGING_SENDER_ID!,
  appId: process.env.CLIENT_SDK_APP_ID!,
};

// Initialize Firebase Client SDK
const appInstance = initializeApp(firebaseConfig);
export const authInstance = getAuth(appInstance);

// initialize Realtime Database
let db;
try {
  db = getDatabase(
    appInstance,
    process.env.NEXT_PUBLIC_CLIENT_SDK_DATABASE_URL
  );
} catch (error) {
  console.error("Error initializing the database:", error);
}
export { db };
