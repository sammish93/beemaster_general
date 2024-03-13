import { NotificationType } from "@/constants/Notifications";
import getImageResourceFromNotificationType from "@/domain/notificationImageMapper";

// Mocking the require function for images
jest.mock('@/assets/images/notifications/considerFeeding.jpg', () => 'considerFeeding.jpg');
jest.mock('@/assets/images/notifications/considerExpanding.jpg', () => 'considerExpanding.jpg');
jest.mock('@/assets/images/notifications/honeyHarvest.jpg', () => 'honeyHarvest.jpg');
jest.mock('@/assets/images/notifications/maintenance.jpg', () => 'maintenance.jpg');
jest.mock('@/assets/images/notifications/weather.jpg', () => 'weather.jpg');
jest.mock('@/assets/images/notifications/checkHive.jpg', () => 'checkHive.jpg');
jest.mock('@/assets/images/notifications/possibleSwarm.jpg', () => 'possibleSwarm.jpg');
jest.mock('@/assets/images/notifications/customReminder.jpg', () => 'customReminder.jpg');

describe('getImageResourceFromNotificationType', () => {
    it('returns the correct image path for each notification type', () => {
        expect(getImageResourceFromNotificationType(NotificationType.ConsiderFeeding)).toEqual('considerFeeding.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.ConsiderExpanding)).toEqual('considerExpanding.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.HoneyHarvest)).toEqual('honeyHarvest.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.Maintenance)).toEqual('maintenance.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.Weather)).toEqual('weather.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.CheckHive)).toEqual('checkHive.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.PossibleSwarm)).toEqual('possibleSwarm.jpg');
        expect(getImageResourceFromNotificationType(NotificationType.CustomReminder)).toEqual('customReminder.jpg');
    });
});
