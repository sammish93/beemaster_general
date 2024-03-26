import { auth, db } from '@/firebaseConfig';
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
