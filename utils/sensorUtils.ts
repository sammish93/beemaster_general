import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


// Check if a sensor is already assigned and return assignment details.
export const getSensorAssignment = async (userId: string, sensorId: string) => {
    const reference = doc(db, `users/${userId}/sensorAssignments`, sensorId);
    const document = await getDoc(reference);

    if (document.exists()) {
        return { id: document.id, data: document.data()};
    }

    return null;
};

// Register a new sensor to a hive.
export const registerSensor = async (userId: string, hiveId: string, sensorId: string) => {
    const sensorAssignment = await getSensorAssignment(userId, sensorId);
    const assignmentRef = doc(db, `users/${userId}/sensorAssignments`, sensorId);

    if (sensorAssignment) {

        // Check if sensor is already registered to the same hive.
        if (sensorAssignment.data.hiveId === hiveId) {
            return { success: false, message: "Sensor is already registered to this hive." };
        }
        
        // Check if sensor is registered to another hive.
        if (sensorAssignment.data.hiveId && sensorAssignment.data.hiveId !== hiveId) {
            return {
                success: false,
                message: `Sensor is already assigned to another hive (Hive ID: ${sensorAssignment.data.hiveId})`
            };
        }

        // Update existing document with new information.
        await updateDoc(assignmentRef, { hiveId, sensorTypes: {isWeightSensor: true} });
        return { success: true, message: "Sensor assignment updated successfully." };
    }
    else {
        // Create a new document since it does not exists from before.
        await setDoc(assignmentRef, { hiveId, sensorTypes: {isWeightSensor: true} });
        return { success: true, message: `Sensor assigned successfully to hive (Hive ID: ${hiveId})` };
    }
};

export const deregisterSensor = async (userId: string, hiveId: string, sensorId: string) => {
    const sensorAssignment = await getSensorAssignment(userId, sensorId);
    const sensorRef = doc(db, `users/${userId}/sensorAssignments`, sensorId);

    if (sensorAssignment) {
        await updateDoc(sensorRef, { hiveId: null, sensorTypes: {isWeightSensor: null}});
        return { success: true, message: `Sensor deregistered from hive (Hive ID: ${hiveId})`};
    }
    else {
        return { success: false, message: `Deregistration failed, no sensor assigned to the hive.`};
    }
};