import { User } from "@/models/user";

/**
 * 'notificationHandlers' define a collection of handling functions for sending
 *  different types of notifications to users.
 * 
 *  Each key in the object represents a notification type (e.g. mobile, email, sms),
 *  and each corresponding value is a function that takes in a 'User' object and executes
 *  the logic to send the notification.
 * 
 * @param {User} user - User object that contains information about the recepient.
 */
export const notificationHandlers = {
    mobile: (user: User) => {
        console.log(`Sending mobile notification to ${user.email}`);

        // TODO: Implement logic for retrieving hives.
    },
    email: (user: User) => {
        console.log(`Sending email notification to ${user.email}`);
    },
    sms: (user: User) => {
        console.log(`Sending sms notification to ${user.email}`);
    }
}