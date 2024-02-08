import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddHiveButton from '../../components/AddHiveButton';

describe('AddHiveButton', () => {
    it('calls onAddHivePress when button is pressed', () => {
        const onAddHivePressMock = jest.fn();
        const { getByText } = render(<AddHiveButton onAddHivePress={onAddHivePressMock}/>);

        fireEvent.press(getByText('Add New Hive'));
        expect(onAddHivePressMock).toHaveBeenCalled();
    })
})
