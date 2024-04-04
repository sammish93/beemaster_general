import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { useTheme } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const DateTimePickerModal = ({ onConfirm }: { onConfirm: (date: Date) => void }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(Platform.OS === 'ios');

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        if (selectedDate) {
            onConfirm(currentDate);
        }
        if (Platform.OS === 'ios') {
            setShow(false);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMonthIndex = parseInt(event.target.value, 10);
        const newDate = new Date(date.getFullYear(), newMonthIndex);
        onConfirm(newDate);
    };

    // Web-version: Dropdown
    if (Platform.OS === 'web') {
        return (
            <select value={date.getMonth()} onChange={handleChange}>
                {monthNames.map((name, index) => (
                    <option key={index} value={index}>
                        {name}
                    </option>
                ))}
            </select>
        );
    } else if (show) {
        // Mobileversion:  DateTimePicker
        return show && (
            <View>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            </View>
        );
    } else {
        return null;
    }
};

export default DateTimePickerModal;
