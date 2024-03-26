import { User } from "@/models/user";

export const notificationHandlers = {
    mobile: (user: User) => {
        console.log(`Sending mobile notification to ${user.email}`);
    },
    email: (user: User) => {
        console.log(`Sending email notification to ${user.email}`);
    },
    sms: (user: User) => {
        console.log(`Sending sms notification to ${user.email}`);
    }
}