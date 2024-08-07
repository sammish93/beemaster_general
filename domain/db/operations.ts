import { db } from "@/firebaseConfig"
import {
  collection,
  doc, 
  getDocs,
  orderBy,
  query,
  limit,
  getDoc,
} from "firebase/firestore"

/**
 * Retrieves all users from 'users' collection in Firestore.
 *
 * @returns {Promise<Object | null>} A list of user objects.
 */
export const getUser = async (userId: string): Promise<object | null> => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return { id: userDoc.id, ...userDoc.data() };
  } else {
    return null;
  }
}

/**
 * Retrieves all hives for a specific user from Firestore.
 *
 * @param {User} userId - The user object containing the user's ID.
 * @returns {Promise<Array<object>>} A list of hive objects.
 */
export const getUserHives = async (userId: string): Promise<Array<object>> => {
  const hivesRef = collection(db, `users/${userId}/hives`)
  const hives = await getDocs(hivesRef)
  return hives.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().hiveName,
    preferences: doc.data().notificationTypePreference,
    ...doc.data()
  }))
}

interface WeightData {
  date: Date
  weight: number
}

/**
 * Retrieves the last seven weight readings from a specific hive.
 */
export const getSevenLastWeightReadings = async (
  userId: string,
  hiveId: string
): Promise<number[]> => {
  const weightRef = collection(
    db,
    `users/${userId}/hives/${hiveId}/weightReadings`
  )
  const weightQuery = query(weightRef, orderBy("date", "desc"), limit(7))
  const weights = await getDocs(weightQuery)

  if (weights.empty) {
    console.log(`No weight readings found for hive: ${hiveId}`);
    return []
  }

  const lastSevenReadings = weights.docs.map(
    (doc) => doc.data().weight
  ) as number[]
  return lastSevenReadings
}
