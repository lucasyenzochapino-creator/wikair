import { readFile } from "node:fs/promises";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const required = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID"
];

for (const key of required) {
  if (!process.env[key]) {
    console.error(`Falta la variable ${key}. Copia .env.example a .env.local y complétala.`);
    process.exit(1);
  }
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const raw = await readFile(new URL("../data/aircraft.seed.json", import.meta.url), "utf8");
const aircraft = JSON.parse(raw);

for (const item of aircraft) {
  await setDoc(doc(db, "aircraft", item.id), item, { merge: true });
  console.log(`✓ ${item.name}`);
}

console.log(`Seed completado: ${aircraft.length} aviones en la colección aircraft.`);
