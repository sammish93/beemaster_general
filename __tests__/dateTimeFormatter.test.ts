import { dateTimeFormatter, dateTimeToDateFormatter, dateTimeToDayFormatter, dateTimeToTimeFormatter } from "@/domain/dateTimeFormatter";

describe('dateTimeToTimeFormatter() Function Tests', () => {
    it('formats a Date object to a short time string correctly', () => {
        const date = new Date('2024-01-01T13:37:00');
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'short', false);

        expect(formattedTime).toMatch(/^\d{1,2}.\d{2}$/);
    });

    it('formats a Date object to a medium time string correctly in British English', () => {
        const date = new Date('2024-01-01T13:37:00');
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'medium', false);

        expect(formattedTime).toMatch(/^\d{1,2}:\d{2}:\d{2}$/); 
    });

    it('formats a Date object to a long time string correctly in British English', () => {
        const date = new Date('2024-01-01T13:37:00');
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'long', false);

        expect(formattedTime).toMatch(/^\d{1,2}:\d{2}:\d{2} [A-Z]+$/);
    });

    it('formats a string date to a full time string correctly in American English', () => {
        const date = '2024-01-01T15:45:00Z';
        const formattedTime = dateTimeToTimeFormatter(date, 'en-US', 'full', true);
        
        expect(formattedTime).toContain('PM');
    });

    it('formats a string date to a full time string correctly in British English', () => {
        const date = '2024-01-01T15:45:00Z';
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'full', true);
        
        expect(formattedTime).toContain('pm');
    });

    it('handles 24-hour clock format correctly', () => {
        const date = '2024-01-01T23:00:00';
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'short', false);

        expect(formattedTime).toMatch(/^\d{2}:\d{2}$/);
    });

    it('handles 12-hour clock format correctly', () => {
        const date = '2024-01-01T23:00:00';
        const formattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'short', true);

        expect(formattedTime).toMatch("11:00 pm");
    });

    it('formats correctly with different locales', () => {
        const date = new Date('2024-01-01T15:45:00');
        const usFormattedTime = dateTimeToTimeFormatter(date, 'en-US', 'short', true);
        const frFormattedTime = dateTimeToTimeFormatter(date, 'en-GB', 'short', false);

        expect(usFormattedTime).not.toEqual(frFormattedTime); 
    });

    it('formats a Date object to a short time string correctly in Norwegian', () => {
        const date = new Date('2024-01-01T15:45:00');
        const formattedTimeBokmal = dateTimeToTimeFormatter(date, 'no', 'short', false);

        expect(formattedTimeBokmal).toMatch(/^\d{1,2}.\d{2}$/);
    });

    it('handles 12-hour clock format correctly in Norwegian', () => {
        const date = '2024-01-01T15:00:00';
        const formattedTime = dateTimeToTimeFormatter(date, 'no', 'short', true);
        expect(formattedTime).toMatch("3:00 p.m");
    });

    it('throws on incorrect input', () => {
        const date = 'eggs';
        const testFn = () => dateTimeToTimeFormatter(date, 'en-GB', 'short', true);

        expect(testFn).toThrow(RangeError);
    });
});

describe('dateTimeToDateFormatter() Function Tests', () => {
    it('formats a Date object to a short date string correctly in British English', () => {
        const date = new Date('2024-01-01T00:00:00');
        const formattedDate = dateTimeToDateFormatter(date, 'en-GB', 'short');

        expect(formattedDate).toMatch(/^\d{2}\/\d{2}\/\d{4}$/); 
    });

    it('formats a Date object to a medium date string correctly in British English', () => {
        const date = new Date('2024-01-01T00:00:00');
        const formattedDate = dateTimeToDateFormatter(date, 'en-GB', 'medium');

        expect(formattedDate).toMatch(/^\d{1,2} \w+ \d{4}$/); 
    });

    it('formats a Date object to a long date string correctly in British English', () => {
        const date = new Date('2024-01-01T00:00:00');
        const formattedDate = dateTimeToDateFormatter(date, 'en-GB', 'long');

        expect(formattedDate).toMatch(/^\d{1,2} \w+ \d{4}$/);
    });

    it('formats a Date object to a full date string correctly in British English', () => {
        const date = new Date('2024-01-01T00:00:00');
        const formattedDate = dateTimeToDateFormatter(date, 'en-GB', 'full');

        expect(formattedDate).toMatch(/^\w+, \d{1,2} \w+ \d{4}$/); 
    });

    it('formats correctly with different locales', () => {
        const date = new Date('2024-01-01T00:00:00');
        const usFormattedDate = dateTimeToDateFormatter(date, 'en-US', 'short');
        const gbFormattedDate = dateTimeToDateFormatter(date, 'en-GB', 'short');

        expect(usFormattedDate).not.toEqual(gbFormattedDate);
    });

    it('formats a Date object to a short date string correctly in Norwegian', () => {
        const date = new Date('2024-01-01T00:00:00');
        const formattedDateNorwegian = dateTimeToDateFormatter(date, 'nb-NO', 'short');

        expect(formattedDateNorwegian).toMatch(/^\d{2}.\d{2}.\d{4}$/);
    });

    it('throws on incorrect input', () => {
        const date = 'eggs';
        const testFn = () => dateTimeToDateFormatter(date, 'en-GB', 'short');

        expect(testFn).toThrow(RangeError);
    });
});

describe('dateTimeFormatter() Function Tests', () => {
    it('formats a Date object to a correct date and time string', () => {
        const date = new Date('2024-01-01T13:37:00');
        const formattedDateTime = dateTimeFormatter(date, 'en-GB', 'medium', 'short', true);

        expect(formattedDateTime).toMatch(/^\d{1,2} \w+ \d{4}, \d{1,2}:\d{2} pm$/); 
    });

    it('handles incorrect input', () => {
        const date = 'not-a-date';
        const testFn = () => dateTimeFormatter(date, 'en-GB', 'short', 'short', true);

        expect(testFn).toThrow(RangeError);
    });

    it('formats correctly for Norwegian', () => {
        const date = new Date('2024-02-14T17:00:00');
        const formattedDateTimeFR = dateTimeFormatter(date, 'no', 'long', 'short', false);
        expect(formattedDateTimeFR).toMatch(/^\d{1,2}. \w+ \d{4} kl. \d{2}:\d{2}$/);
    });

    it('uses full date and time style correctly', () => {
        const date = new Date('2024-12-25T00:00:00');
        const formattedDateTime = dateTimeFormatter(date, 'en-GB', 'full', 'full', false);
        
        expect(formattedDateTime).toMatch(/^\w+, \d{2} \w+ \d{4} at \d{2}:\d{2}:\d{2} Central European Standard Time/); // Matches "Wednesday, December 25, 2024 at 00:00:00 AM GMT+X" format
    });

    it('formats time using 12-hour and 24-hour clock correctly', () => {
        const date = new Date('2024-06-01T18:30:00');
        const formattedTime12Hour = dateTimeFormatter(date, 'en-GB', 'short', 'short', true);
        const formattedTime24Hour = dateTimeFormatter(date, 'en-GB', 'short', 'short', false);

        expect(formattedTime12Hour).toMatch(/6:30 pm$/);
        expect(formattedTime24Hour).toMatch(/18:30$/);
    });

    it('throws on incorrect input', () => {
        const date = new Date('2024-03-15T09:45:00');
        const testFn = () => dateTimeFormatter(date, 'eggs', 'short', 'short', false);

        expect(testFn).toThrow(RangeError);
    });

    it('accurately formats dates during leap years and DST changes', () => {
        const leapYearDate = new Date('2024-02-29T12:00:00'); 
        const dstChangeDate = new Date('2024-03-31T02:30:00'); 
        const formattedLeapYearDate = dateTimeFormatter(leapYearDate, 'en-GB', 'medium', 'short', false);
        const formattedDstChangeDate = dateTimeFormatter(dstChangeDate, 'en-GB', 'medium', 'short', false);

        expect(formattedLeapYearDate).toMatch(/\d{2} \w+ \d{4}, \d{2}:\d{2}/);
        expect(formattedDstChangeDate).toMatch(/\d{2} \w+ \d{4}, \d{2}:\d{2}/);
    });
});

describe('dateTimeToDayFormatter() Function Tests', () => {
    it('formats a Date object to the correct day of the week in English', () => {
        const date = new Date('2024-01-01');
        const dayOfWeek = dateTimeToDayFormatter(date, 'en-GB');

        expect(dayOfWeek).toBe('Monday');
    });

    it('formats a string date to the correct day of the week in Norwegian', () => {
        const date = '2024-01-01'; 
        const dayOfWeek = dateTimeToDayFormatter(date, 'no');

        expect(dayOfWeek).toBe('Mandag');
    });

    it('correctly capitalizes the first letter of the day', () => {
        const date = new Date('2024-01-01'); 
        const dayOfWeek = dateTimeToDayFormatter(date, 'en-GB');
        const firstLetter = dayOfWeek.charAt(0);

        expect(firstLetter).toBe(firstLetter.toUpperCase());
        expect(dayOfWeek.slice(1)).toBe(dayOfWeek.slice(1).toLowerCase());
    });

    it('handles incorrect input', () => {
        const date = 'eggs';
        const testFn = () => dateTimeToDayFormatter(date, 'en-GB');

        expect(testFn).toThrow(RangeError);
    });

    it('returns the day of the week in multiple locales', () => {
        const date = new Date('2024-01-01');
        const dayOfWeekEN = dateTimeToDayFormatter(date, 'en-GB');
        const dayOfWeekNO = dateTimeToDayFormatter(date, 'no');

        expect(dayOfWeekEN).not.toBe(dayOfWeekNO);
    });
});