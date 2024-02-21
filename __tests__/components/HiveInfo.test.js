import HiveInfo from '@/components/HiveInfo';
import { render } from '@testing-library/react-native';

const mockHiveItem = {
    id: '1',
    name: 'Hive-test'
}

describe('HiveInfo', () => {
    it('renders sensor data when isDetailedView is true', () => {
        const { getByText } = render(<HiveInfo item={mockHiveItem} isDetailedView={true} />);

        expect(getByText('Weight:')).toBeTruthy();
        expect(getByText('Hive Temp:')).toBeTruthy();
        expect(getByText('Humidity:')).toBeTruthy();
        expect(getByText('Counter:')).toBeTruthy();
    });

    it('should not render sensor data when isDetailedView is false', () => {
        const { queryByText } = render(<HiveInfo item={mockHiveItem} isDetailedView={false} />);
        expect(queryByText('Weight:')).toBeNull();
        expect(queryByText('Hive Temp:')).toBeNull();
        expect(queryByText('Humidity:')).toBeNull();
        expect(queryByText('Counter:')).toBeNull();
    })
});