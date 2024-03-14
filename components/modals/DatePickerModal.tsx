import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { useTheme, } from "react-native-paper";

import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';



const DateTimePickerModal = ({ onConfirm }: { onConfirm: (date: Date) => void }) => {

    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(false);


    const theme = useTheme();
    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (selectedDate) {
            onConfirm(currentDate);
        }
    };



    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        return (
            <View >
                <DateTimePicker
                    testID="monthPicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
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