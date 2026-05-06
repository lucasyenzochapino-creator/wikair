import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { AircraftSpec } from "@/lib/types";

export async function getAircraftFromFirestore() {
  const q = query(collection(db, "aircraft"), orderBy("name"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as AircraftSpec[];
}
