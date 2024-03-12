import React, { useState } from 'react';
import { Button, Platform, View } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';


const DateTimePickerModal = ({ onConfirm }: { onConfirm: (date: Date) => void }) => {

    const [date, setDate] = useState<Date>(new Date());

    const [show, setShow] = useState<boolean>(false);

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        if (selectedDate) {
            onConfirm(currentDate);
        }
    };



    return (
        <View>

            <Button onPress={() => setShow(true)} title="Choose Month" />

            {show && (
                <DateTimePicker
                    testID="monthPicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

        </View>
    );
};
export default DateTimePickerModal;