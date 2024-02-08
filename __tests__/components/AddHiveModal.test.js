import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddHiveModal from './components/AddHiveModal';

describe('AddHiveModal', () => {
    it('should display input for Hive Name when visible', () => {
        const { getByLabelText } = render(<AddHiveModal isVisible={true} onClose={() => {}} />);
        expect(getByLabelText).toBeTruthy();
    });

    it('should call onAddHive with Hive Name when Add button is pressed', () => {
        const onAddHiveMock = jest.fn();
        const hiveName = 'Hive-x3';
        const { getByText, getByLabelText } = render(
            <AddHiveModal isVisible={true} onClose={() => {}} onAddHive={onAddHiveMock}/>
        );

        fireEvent.changeText(getByLabelText('Hive Name'), hiveName);
        fireEvent.press(getByText('Add Hive'));

        expect(onAddHiveMock).toHaveBeenCalledWith(hiveName);
    })
});