import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";


// Used to check if an hive in the database has the sensor registered to it.
export const checkSensorIdUsage = async (sensorId: string): Promise<boolean> => {
    const hivesQuery = query(collection(db, `users/*/hives`), where(`sensorId`,`==`, sensorId )); 
    const queryResult = await getDocs(hivesQuery);

    return !queryResult.empty;
};

// Adds a new sensor to the specific hive if it is not already registered.
export const registerNewSensor = (): string => {

    if (!checkSensorIdUsage) {
        // TODO: Add new sensor to the specific hive in the database.

        return `Sensor was successfully registered to hive: ${"name"}`;
    } 
    else {
        return "Sensor registration failed. The sensor is already registered.";
    }
};

// Deregister a sensor from a specific hive. 
export const deregisterSensor = () => {

}