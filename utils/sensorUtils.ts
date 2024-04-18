import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";


// Check if a sensor is already assigned and return assignment details.
export const getSensorAssignment = async (sensorId: string) => {
    const referance = doc(db, "sensorAssignments", sensorId);
    const document = await getDoc(referance);

    if (document.exists()) {
        return document.data();
    }

    return null;
};

// Register a new sensor to a hive.
export const registerSensor = async (hiveId: string, hiveName: string, sensorId: string) => {

    const sensorAssignment = await getSensorAssignment(sensorId);
    const assignmentRef = doc(db, "sensorAssingments", sensorId);

    if (sensorAssignment) {
        
        // Check if sensor is registered to another hive.
        if (sensorAssignment.hiveId && sensorAssignment.hiveId !== hiveId) {
            return {
                success: false,
                message: `Sensor is already assigned to hive: ${hiveName}.`
            };
        }

        // Update existing document with new information.
        await updateDoc(assignmentRef, { hiveId, sensorTypes: {isWeightSensor: true} });
        return { success: true, message: "Sensor assignment updated successfully." };
    }
    else {
        // Create a new document since it does not exists from before.
        await setDoc(assignmentRef, { hiveId, sensorTypes: {isWeightSensor: true} });
        return { success: true, message: "Sensor assigned successfully." };
    }
};