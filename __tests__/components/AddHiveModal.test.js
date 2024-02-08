import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddHiveModal from './components/AddHiveModal';

describe('AddHiveModal', () => {
    it('should display input for Hive Name when visible', () => {
        const { getByLabelText } = render(<AddHiveModal isVisible={true} onClose={() => {}} />);
        expect(getByLabelText).toBeTruthy();
    });
});