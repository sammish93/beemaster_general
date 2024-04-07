import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { List } from 'react-native-paper';
import { useTheme } from "react-native-paper";
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

//TODO: Oversette hver måned

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const DateTimePickerModal = ({ onConfirm }: { onConfirm: (date: Date) => void }) => {
    const [date, setDate] = useState<Date>(new Date());
    const [show, setShow] = useState<boolean>(Platform.OS === 'ios');

    const [expanded, setExpanded] = useState<boolean>(false);
    const [selectedMonth, setSelectedMonth] = useState<string>(monthNames[date.getMonth()]);

    const theme = useTheme();

    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        if (selectedDate) {
            onConfirm(currentDate);
            setSelectedMonth(monthNames[currentDate.getMonth()]);
        }
        if (Platform.OS === 'ios') {
            setShow(false);
        }
    };

    const handleSelecMonth = (monthIndex: number) => {
        const newDate = new Date(date.getFullYear(), monthIndex);
        setDate(newDate);
        onConfirm(newDate);
        setSelectedMonth(monthNames[monthIndex]);
        setExpanded(false);

    };

    // Web-version: Dropdown
    if (Platform.OS === 'web') {

        return (
            <View style={{ maxWidth: 250, marginLeft: 'auto', marginRight: 'auto', marginTop: 20 }}>

                <List.Section theme={theme}>
                    <List.Accordion
                        title={selectedMonth}
                        expanded={expanded}
                        onPress={() => setExpanded(!expanded)}
                        left={props => <List.Icon {...props} icon="calendar" />}>
                        {monthNames.map((name, index) => (
                            <List.Item
                                key={index}
                                title={name}
                                onPress={() => handleSelecMonth(index)} />
                        ))}
                    </List.Accordion>
                </List.Section>
            </View>
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
