import { auth, db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { User } from '@/models/user';

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

interface NotificationPreference {
    email: boolean,
    mobile: boolean,
    sms: boolean
}

export const getActivatedPreferences = (preferences: NotificationPreference) => {
    const activated = Object.entries(preferences).filter(([key, value]) => value === true);
    return Object.fromEntries(activated);
}