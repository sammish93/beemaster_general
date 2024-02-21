import HiveInfo from '@/components/HiveInfo';
import { render } from '@testing-library/react-native';

const mockHiveItem = {
    id: '1',
    name: 'Hive-test'
}

describe('HiveInfo', () => {

    it('renders the hive name correctly', () => {
        const { getByText } = render(<HiveInfo item={mockHiveItem} isDetailedView={false} />);
        expect(getByText('Hive-test')).toBeTruthy();
    })

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
    });

    it('renders only Temperature, Wind, and Rain when isDetailedView is false', () => {
        const { queryByText } = render(<HiveInfo item={mockHiveItem} isDetailedView={false} />);
        expect(queryByText('21 °C')).not.toBeNull();
        expect(queryByText('4 km/h')).not.toBeNull();
        expect(queryByText('0.0mm 0%')).not.toBeNull();
        expect(queryByText('Weight:')).toBeNull();
    });
    
});