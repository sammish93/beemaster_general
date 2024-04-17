// Used to check if an hive in the database has the sensor registered to it.
export const isSensorAlreadyRegistered = (): boolean => {

    // TODO: Implement logic.

    return false;
};

// Adds a new sensor to the specific hive if it is not already registered.
export const registerNewSensor = (): string => {

    if (!isSensorAlreadyRegistered) {
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