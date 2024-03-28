import { db } from '@/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { Hive } from '@/models/hive'; 
import { fetchWeatherForecast } from '@/data/api/weatherApi';
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

export const fetchWeatherForHive = async (hive: Hive) => {
    return await fetchWeatherForecast(hive.latLng);
}

export const processUserHives = async (user: User) => {
    try {
        const hives = await getUserHives(user.id) as Hive[];
        console.log(`User: ${user.email} - hives: ${JSON.stringify(hives)}`);

        const weatherDataForHive = await Promise.all(hives.map(hive => fetchWeatherForHive(hive)));

        // TODO: Check which notificationTypePreference is turned on for both user and hive.

    } catch (error) {
        console.error(`Failed to fetch hives for user: ${user.email} - error: ${error}`);
    }
}