import { render, fireEvent } from '@testing-library/react-native';
import Hives from '@/components/Hives';
import { MobXProviderContext } from 'mobx-react';

describe('Hives', () => {
    it('should render correctly', () => {
        const { getByText } = render(<Hives navigation={jest.fn()} />);
        expect(getByText('Simplified View')).toBeTruthy();
    });

});