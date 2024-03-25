// Helper function to retrieve all active users.
export const getAllUsers = async (admin: any, collectionName: string) => {
    const users = admin.firestore().collection(collectionName);
    return await users.get();
} 