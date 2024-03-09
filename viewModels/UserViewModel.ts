import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import { availableLanguages, availableCountries } from '@/constants/LocaleEnums';
import { Platform } from "react-native";

class UserViewModel {

    constructor() {
        // Makes all the class properties observable. Can change if desired.
        makeAutoObservable(this)
        this.i18n = new I18n({
            en,
            no,
        });
        this.i18n.locale = Localization.locale;
        this.i18n.enableFallback = true;

        // Manually change the language:
        //this.i18n.locale = "no";


    }

    @observable currentLanguage: string | null = null;
    @observable currentCountry: string | null = null;


    // Localisation
    @observable i18n;
    @observable userId = "";
    @observable theme = "light";
    // Allows the user to customise the display of measurements based on their preference.
    @observable temperaturePreference: TemperatureMeasurement = TemperatureMeasurement.Celsius;
    @observable precipitationPreference: PrecipitationMeasurement = PrecipitationMeasurement.Millimeters;
    @observable windSpeedPreference: WindSpeedMeasurement = WindSpeedMeasurement.MetersPerSecond;
    @observable weightPreference: WeightMeasurement = WeightMeasurement.Grams;


    @observable maxTempParam?: number;
    @observable thresholdWeightDecrease: number = 0;
    @observable earlySpringStartMonth: number = 0;
    @observable earlySpringEndMonth: number = 0;
    @observable autumnStartMonth: number = 0;
    @observable autumnEndMonth: number = 0;

    @observable thresholdExitCount: number = 0;
    @observable thresholdTemp: number = 0;
    @observable thresholdWindSpeed: number = 0;
    @observable autumnMonths: number[] = [];
    @observable summerStartMonth: number = 0;
    @observable earlyWinterMonths: number[] = [];
    @observable earlySpringMonths: number[] = [];
    @observable humidityThreshold: number = 0;
    @observable earlyAutumnMonth: number = 0;

    @observable thresholdWeightIncrease: number = 0;

    @observable thresholdMaxTempChange: number = 0;
    @observable thresholdMaxHumidityChange: number = 0;

    @observable lateSpringStartMonth: number = 0;
    @observable earlySummerEndMonth: number = 0;



    @action public setUserId = (val: string): void => {
        this.userId = val;
    }

    @action public setTheme = (theme: string): void => {
        this.theme = theme;
    }
    // Functions to allow the user to set their measurement preferences.
    @action public setTemperaturePreference = (prefence: TemperatureMeasurement): void => {
        this.temperaturePreference = prefence;
    }

    @action public setPrecipitationPreference = (prefence: PrecipitationMeasurement): void => {
        this.precipitationPreference = prefence;
    }

    @action public setWindSpeedPreference = (prefence: WindSpeedMeasurement): void => {
        this.windSpeedPreference = prefence;
    }

    @action public setWeightPreference = (prefence: WeightMeasurement): void => {
        this.weightPreference = prefence;
    }



    @action public setMaxTempParam = (value: number): void => {
        this.maxTempParam = value;
    }

    @action public setThresholdWeightDecrease = (value: number): void => {
        this.thresholdWeightDecrease = value;
    }

    @action public setEarlySpringStartMonth = (month: number): void => {
        this.earlySpringStartMonth = month;
    }

    @action public setEarlySpringEndMonth = (month: number): void => {
        this.earlySpringEndMonth = month;
    }

    @action public setAutumnStartMonth = (month: number): void => {
        this.autumnStartMonth = month;
    }

    @action public setAutumnEndMonth = (month: number): void => {
        this.autumnEndMonth = month;
    }

    @action public setThresholdExitCount = (value: number): void => {
        this.thresholdExitCount = value;
    }

    @action public setThresholdTemp = (value: number): void => {
        this.thresholdTemp = value;
    }
    @action public setThresholdWindSpeed = (value: number): void => {
        this.thresholdWindSpeed = value;
    }

    @action public setAutumnMonths = (value: number[]): void => {
        this.autumnMonths = value;
    }
    @action public setEarlyWinterMonths = (value: number[]): void => {
        this.earlyWinterMonths = value;
    }
    @action public setEarlySpringMonths = (value: number[]): void => {
        this.earlySpringMonths = value;
    }
    @action public setHumidityThreshold = (value: number): void => {
        this.humidityThreshold = value;
    }
    @action public setSummerStartMonth = (value: number): void => {
        this.summerStartMonth = value;
    }

    @action public setEarlyAutumnMonth = (value: number): void => {
        this.earlyAutumnMonth = value;
    }

    @action public setThresholdWeightIncrease = (value: number): void => {
        this.thresholdWeightIncrease = value;
    }
    @action public setThresholdMaxTempChange = (value: number): void => {
        this.thresholdMaxTempChange = value;
    }

    @action public setThresholdMaxHumidityChange = (value: number): void => {
        this.thresholdMaxHumidityChange = value;
    }


    @action public setLateSpringStartMonth = (value: number): void => {
        this.lateSpringStartMonth = value;
    }
    @action public setEarlySummerEndMonth = (value: number): void => {
        this.earlySummerEndMonth = value;
    }

    // Clears all the data in this view model.
    // Useful for when a user logs out.
    @action public clear = (): void => {
        this.userId = "";
        //this.theme = "light"; // reset theme on logout
    }

    @action public updateLocaleSettings = () => {
        let regionCode: string;
        if (Platform.OS === 'web') {
            regionCode = Localization.locale;
        } else {
            const locales = Localization.getLocales();
            const userLocale = locales[0];
            regionCode = userLocale.regionCode || '';
        }
        console.log('Region Code:', regionCode);
        const locales = Localization.getLocales();
        const userLocale = locales[0];
        const userLanguage = userLocale.languageCode;
        console.log('Language Code:', userLanguage);

        const languageOption = availableLanguages.find(lang => lang.code === userLanguage && lang.isEnabled);
        const countryOption = availableCountries.find(country => country.code === regionCode && country.isEnabled);

        this.currentLanguage = languageOption ? languageOption.name : null;
        this.currentCountry = countryOption ? countryOption.name : null;

    };



    /**
     * Fetches user parameters from the database.
     * For now, it uses dummy data. 
     * @example
     * // Usage example:
     * // Call this method when you need to fetch and update
     * // user parameters from the database.
     * UserViewModel.fetchUserParametersFromDatabase();
     */

    @action fetchUserParametersFromDatabase() {
        // Dummy data for now
        const userDataFromDatabase = {
            userId: "3536",
            theme: "dark",

            temperaturePreference: TemperatureMeasurement.Celsius,
            precipitationPreference: PrecipitationMeasurement.Millimeters,
            windSpeedPreference: WindSpeedMeasurement.MetersPerSecond,
            weightPreference: WeightMeasurement.Kilograms,

            maxTempParam: 30,
            thresholdWeightDecrease: 10,
            earlySpringStartMonth: 3,
            earlySpringEndMonth: 5,
            autumnStartMonth: 9,
            autumnEndMonth: 10,
            thresholdExitCount: 70,
            thresholdTemp: 33,
            thresholdWindSpeed: 10.5,
            autumnMonths: [8, 9],
            earlySpringMonths: [3, 4],
            earlyWinterMonths: [11, 1],
            humidityThreshold: 50,
            summerStartMonth: 6,
            earlyAutumnMonth: 8,
            thresholdWeightIncrease: 2,
            thresholdMaxTempChange: 10,
            thresholdMaxHumidityChange: 60,
            lateSpringStartMonth: 5,
            earlySummerEndMonth: 7



        };

        this.setUserId(userDataFromDatabase.userId);
        this.setTheme(userDataFromDatabase.theme);
        this.setTemperaturePreference(userDataFromDatabase.temperaturePreference);
        this.setPrecipitationPreference(userDataFromDatabase.precipitationPreference);
        this.setWindSpeedPreference(userDataFromDatabase.windSpeedPreference);
        this.setWeightPreference(userDataFromDatabase.weightPreference);
        this.setMaxTempParam(userDataFromDatabase.maxTempParam);
        this.setThresholdWeightDecrease(userDataFromDatabase.thresholdWeightDecrease);
        this.setEarlySpringStartMonth(userDataFromDatabase.earlySpringStartMonth);
        this.setEarlySpringEndMonth(userDataFromDatabase.earlySpringEndMonth);
        this.setAutumnStartMonth(userDataFromDatabase.autumnStartMonth);
        this.setAutumnEndMonth(userDataFromDatabase.autumnEndMonth);
        this.setThresholdExitCount(userDataFromDatabase.thresholdExitCount);
        this.setThresholdTemp(userDataFromDatabase.thresholdTemp);
        this.setThresholdWindSpeed(userDataFromDatabase.thresholdWindSpeed);
        this.setAutumnMonths(userDataFromDatabase.autumnMonths);
        this.setEarlyWinterMonths(userDataFromDatabase.earlyWinterMonths);
        this.setEarlySpringMonths(userDataFromDatabase.earlySpringMonths);
        this.setHumidityThreshold(userDataFromDatabase.humidityThreshold);
        this.setSummerStartMonth(userDataFromDatabase.summerStartMonth);
        this.setEarlyAutumnMonth(userDataFromDatabase.earlyAutumnMonth);
        this.setThresholdWeightIncrease(userDataFromDatabase.thresholdWeightIncrease);
        this.setThresholdMaxTempChange(userDataFromDatabase.thresholdMaxTempChange);
        this.setThresholdMaxHumidityChange(userDataFromDatabase.thresholdMaxHumidityChange);
        this.setEarlySummerEndMonth(userDataFromDatabase.earlySummerEndMonth);
        this.setLateSpringStartMonth(userDataFromDatabase.lateSpringStartMonth)
    }


}

export default new UserViewModel()
