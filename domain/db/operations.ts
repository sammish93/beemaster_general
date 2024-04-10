import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Retrieves all users from 'users' collection in Firestore.
 * 
 * @returns {Promise<Array<Object>>} A list of user objects.
 */
export const getAllUsers = async (): Promise<Array<object>> => {
    const usersRef = collection(db, 'users');
    const users = await getDocs(usersRef);
    return users.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

/**
 * Retrieves all hives for a specific user from Firestore.
 * 
 * @param {User} userId - The user object containing the user's ID.
 * @returns {Promise<Array<object>>} A list of hive objects.
 */
export const getUserHives = async (userId: string): Promise<Array<object>> => {
    const hivesRef = collection(db, `users/${userId}/hives`);
    const hives = await getDocs(hivesRef);
    return hives.docs.map(doc => ({ id: doc.id, ...doc.data()}));
}