import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import { availableLanguages, availableCountries, LanguageEnum, CountryEnum } from '@/constants/LocaleEnums';
import { Platform } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { WEB_CLIENT_ID } from '@env';
import { NotificationPreference, NotificationType } from "@/constants/Notifications";
import { notificationPreferences } from "@/data/notificationData";
import { LocationObject, LocationObjectCoords } from "expo-location";
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
        this.initializeAuthListener()

        // Manually change the language:
        //this.i18n.locale = "no";
    }

    @observable currentLanguage: string | null = null;
    @observable currentCountry: string | null = null;
    @observable authInitialized = false;
    @observable dateFormat: string = "DD/MM/YYYY";


    initializeAuthListener() {
        onAuthStateChanged(auth, (user) => {
            runInAction(() => {
                if (user) {
                    this.userId = user.uid;
                } else {
                    this.userId = "";
                }
                this.authInitialized = true;
            });
        });
    }
    @action setLanguage = (langCode: string): void => {
        this.currentLanguage = langCode;

        switch (langCode) {
            case LanguageEnum.English:
                this.i18n.locale = 'en';
                break;
            case LanguageEnum.Norwegian:
            case LanguageEnum.NorwegianBokmal:
                this.i18n.locale = 'no';
                break;

            default:
                this.i18n.locale = 'en'; // Standardfall
        }
    };

    @action setCountry = (countryCode: string): void => {
        this.currentCountry = countryCode;
        switch (countryCode) {

            case CountryEnum.Norway:
                this.temperaturePreference = TemperatureMeasurement.Celsius;
                this.weightPreference = WeightMeasurement.Kilograms;
                this.dateFormat = "DD/MM/YYYY";

                break;
            case CountryEnum.England:
                this.temperaturePreference = TemperatureMeasurement.Celsius;
                this.weightPreference = WeightMeasurement.Kilograms;
                this.dateFormat = "DD/MM/YYYY";
                break;
            case CountryEnum.USA:
                this.temperaturePreference = TemperatureMeasurement.Fahrenheit;
                this.weightPreference = WeightMeasurement.Pounds;
                this.dateFormat = "MM/DD/YYYY";
                break;

            default:
                this.temperaturePreference = TemperatureMeasurement.Celsius;
                this.weightPreference = WeightMeasurement.Kilograms;
                this.dateFormat = "DD/MM/YYYY";
        }
    };



    // Localisation
    @observable i18n;
    @observable userId = "";
    @observable theme = "light";
    // Permissions.
    @observable isLocationEnabled = false;
    @observable isCameraEnabled = false;
    @observable isMediaEnabled = false;
    // Allows the user to customise the display of measurements based on their preference.
    @observable temperaturePreference: TemperatureMeasurement = TemperatureMeasurement.Celsius;
    @observable precipitationPreference: PrecipitationMeasurement = PrecipitationMeasurement.Millimeters;
    @observable windSpeedPreference: WindSpeedMeasurement = WindSpeedMeasurement.MetersPerSecond;
    @observable weightPreference: WeightMeasurement = WeightMeasurement.Grams;
    // Allows the user to customise which notifications can trigger by a background tasker operation.
    @observable notificationPreferences: NotificationPreference = notificationPreferences;
    @observable mobileNotifications: boolean = true;
    @observable smsNotifications: boolean = true;
    @observable emailNotifications: boolean = true;
    // NOTE: These params aren't fully defined yet. Need to find exactly what we need based on 
    // academic research first.
    @observable maxTempParamTooWarm?: number;
    @observable thresholdWeightDecreaseInAutumn: number = 0;
    @observable thresholdWeightDecreaseEarlySpring: number = 0;
    @observable thresholdWeightDecreaseSwarm: number = 0;
    @observable thresholdExitCountHigh: number = 0;
    @observable thresholdExitCountLow: number = 0;
    @observable thresholdTempWarm: number = 0;
    @observable thresholdWindSpeedStrong: number = 0;
    @observable thresholdWindSpeedLow: number = 0;
    @observable thresholdWeightIncrease: number = 0;
    @observable thresholdMaxTempChange: number = 0;
    @observable thresholdMaxHumidityChange: number = 0;
    @observable humidityThreshold: number = 0;
    @observable autumnMonths: number[] = [];
    @observable summerStartMonth: number = 0;
    @observable earlyWinterMonths: number[] = [];
    @observable earlySpringMonths: number[] = [];
    @observable earlyAutumnMonth: number = 0;
    @observable lateSpringStartMonth: number = 0;
    @observable earlySummerEndMonth: number = 0;
    @observable earlySpringStartMonth: number = 0;
    @observable earlySpringEndMonth: number = 0;
    @observable autumnStartMonth: number = 0;
    @observable autumnEndMonth: number = 0;

    @action public setUserId = (val: string): void => {
        this.userId = val;
    }

    @action public setTheme = (theme: string): void => {
        // TODO DB - Update user's theme preference in DB.
        this.theme = theme;
    }

    @action public setLocationPermission = (val: boolean): void => {
        this.isLocationEnabled = val;
    }

    @action public getLocationPermission = (): boolean => {
        return this.isLocationEnabled;
    }

    @action public setCameraPermission = (val: boolean): void => {
        this.isCameraEnabled = val;
    }

    @action public getCameraPermission = (): boolean => {
        return this.isCameraEnabled;
    }

    @action public setMediaPermission = (val: boolean): void => {
        this.isMediaEnabled = val;
    }

    @action public getMediaPermission = (): boolean => {
        return this.isMediaEnabled;
    }

    // Functions to allow the user to set their measurement preferences.
    @action public setTemperaturePreference = (prefence: TemperatureMeasurement): void => {
        // TODO DB - Update user's temperature preference in DB.
        this.temperaturePreference = prefence;
    }

    @action public setPrecipitationPreference = (prefence: PrecipitationMeasurement): void => {
        // TODO DB - Update user's precipitation preference in DB.
        this.precipitationPreference = prefence;
    }

    @action public setWindSpeedPreference = (prefence: WindSpeedMeasurement): void => {
        // TODO DB - Update user's wind speed preference in DB.
        this.windSpeedPreference = prefence;
    }

    @action public setWeightPreference = (prefence: WeightMeasurement): void => {
        // TODO DB - Update user's weight preference in DB.
        this.weightPreference = prefence;
    }

    @action toggleNotificationPreference(type: NotificationType): void {
        // TODO DB - Update user's notification preference in DB. There are several notification types.
        // You should update only the type that's given as a parameter and make it the opposite of the 
        // existing value.
        this.notificationPreferences[type] = !this.notificationPreferences[type];
    }

    @action toggleMobileNotifications(): void {
        // TODO DB - Update user's notification method in DB.
        this.mobileNotifications = !this.mobileNotifications;
    }

    @action toggleSmsNotifications(): void {
        // TODO DB - Update user's notification method in DB.
        this.smsNotifications = !this.smsNotifications;
    }

    @action toggleEmailNotifications(): void {
        // TODO DB - Update user's notification method in DB.
        this.emailNotifications = !this.emailNotifications;
    }

    @action signInWithGoogleWeb = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            prompt: 'select_account'
        });
        try {
            console.log("signin with web")
            const result = await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
        }
    }

    // TODO DB - These will all have to be in the DB eventually, but I'm not sure that we're fully finished 
    // defining exactly what type of parameters should be included. See discord pinned message where 
    // I asked Ash and Lorena to define exactly what parameters should be used based on academic research.
    @action public setMaxTempParamTooWarm = (value: number): void => {
        this.maxTempParamTooWarm = value;
    }
    @action public setThresholdWeightDecreaseInAutumn = (value: number): void => {
        this.thresholdWeightDecreaseInAutumn = value;
    }
    @action public setThresholdWeightDecreaseEarlySpring = (value: number): void => {
        this.thresholdWeightDecreaseEarlySpring = value;
    }
    @action public setThresholdWeightDecreaseSwarm = (value: number): void => {
        this.thresholdWeightDecreaseSwarm = value;
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

    @action public setThresholdExitCountHigh = (value: number): void => {
        this.thresholdExitCountHigh = value;
    }
    @action public setThresholdExitCountLow = (value: number): void => {
        this.thresholdExitCountLow = value;
    }

    @action public setThresholdTempWarm = (value: number): void => {
        this.thresholdTempWarm = value;
    }
    @action public setThresholdWindSpeedStrong = (value: number): void => {
        this.thresholdWindSpeedStrong = value;
    }
    @action public setThresholdWindSpeedLow = (value: number): void => {
        this.thresholdWindSpeedLow = value;
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
    @action signInWithGoogleNative = async () => {
        if (Platform.OS !== 'web') {
            const { GoogleSignin } = await import('@react-native-google-signin/google-signin');

            GoogleSignin.configure({
                webClientId: WEB_CLIENT_ID
            })

            try {
                await GoogleSignin.signOut()
                const { idToken } = await GoogleSignin.signIn();
                const googleCredential = GoogleAuthProvider.credential(idToken);
                const result = await signInWithCredential(auth, googleCredential);

            } catch (error) {
                console.error("Error signing in with Google (Native): ", error);
            }
        }
    };

    @action signInWithEmail = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {
            if (error.code === 'auth/invalid-login-credentials') {

                console.error("Incorrect email or password");
                runInAction(() => {
                    this.signUpError = "Incorrect email or password";
                });

            } else {
                console.error("Error signing in with email: ", error);
                runInAction(() => {
                    this.signUpError = "An error occurred during sign in";
                });
            }
        }
    };

    //sets firebase errors for signin and signup actions
    @observable signUpError = "";

    @action clearSignUpError = () => {
        this.signUpError = "";
    }

    @action signUpWithEmail = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {

                console.error("Email is already in use");

                runInAction(() => {
                    this.signUpError = "Email is already in use";
                });
            } else {
                console.error("Error signing up with email: ", error);

                runInAction(() => {
                    this.signUpError = "An error occurred during sign up";
                });
            }
        }
    }

    @action signInAnonymously = async () => {
        try {
            const result = await signInAnonymously(auth);
            this.setUserId(result.user.uid);
        } catch (error) {
            console.error("Error signing in anonymously: ", error);
        }
    }

    //TODO logout and auth connect
    @action logout = async () => {
        try {
            await signOut(auth);
            console.log("user signed out")

        } catch (error) {
            console.error("Error signing out: ", error);

        }
    }

    // Clears all the data in this view model.
    // Useful for when a user logs out.
    @action public clear = (): void => {
        this.userId = "";
        //this.theme = "light"; // reset theme on logout
    }

    @action public updateLocaleSettings = () => {
        // TODO Consider splitting up this function to only language and country. The user's language should 
        // decide the localisation. The user's country should decide the default value for parameters.
        // example - Sam and Ash want the app country set to Norway because they have their hives there.
        // They want to use the app in English though. Ash wants dates to appear in MM/DD format and Sam 
        // wants dates to appear in DD/MM. British English vs American English localisation.
        // TODO DB - Update user's country and language.
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
        // TODO Define parameters first.
        // TODO DB - Read from DB. Note that parameters should be fully defined before we work on this.
        // Dummy data for now
        const userDataFromDatabase = {
            userId: "3536",
            theme: "dark",

            temperaturePreference: TemperatureMeasurement.Celsius,
            precipitationPreference: PrecipitationMeasurement.Millimeters,
            windSpeedPreference: WindSpeedMeasurement.MetersPerSecond,
            weightPreference: WeightMeasurement.Kilograms,
            maxTempParamTooWarm: 40,

            thresholdWeightDecreaseInAutumn: 10,
            thresholdWeightDecreaseEarlySpring: 10,
            thresholdWeightDecreaseSwarm: 10,
            thresholdExitCountLow: 20,
            thresholdExitCountHigh: 80,
            thresholdTempWarm: 33,
            thresholdWindSpeedStrong: 10.5,
            thresholdWindSpeedLow: 3.5,
            thresholdWeightIncrease: 2,
            thresholdMaxTempChange: 10,
            thresholdMaxHumidityChange: 60,

            autumnMonths: [8, 9],
            autumnStartMonth: 9,
            autumnEndMonth: 10,
            earlyAutumnMonth: 8,
            earlySpringMonths: [3, 4],
            lateSpringStartMonth: 5,
            earlySpringStartMonth: 3,
            earlySpringEndMonth: 5,
            earlyWinterMonths: [11, 1],
            humidityThreshold: 50,
            summerStartMonth: 6,
            earlySummerEndMonth: 7



        };

        this.setUserId(userDataFromDatabase.userId);
        this.setTheme(userDataFromDatabase.theme);

        this.setTemperaturePreference(userDataFromDatabase.temperaturePreference);
        this.setPrecipitationPreference(userDataFromDatabase.precipitationPreference);
        this.setWindSpeedPreference(userDataFromDatabase.windSpeedPreference);
        this.setWeightPreference(userDataFromDatabase.weightPreference);

        this.setMaxTempParamTooWarm(userDataFromDatabase.maxTempParamTooWarm);

        this.setThresholdWeightDecreaseInAutumn(userDataFromDatabase.thresholdWeightDecreaseInAutumn);
        this.setThresholdWeightDecreaseEarlySpring(userDataFromDatabase.thresholdWeightDecreaseEarlySpring);
        this.setThresholdWeightDecreaseSwarm(userDataFromDatabase.thresholdWeightDecreaseSwarm);
        this.setThresholdTempWarm(userDataFromDatabase.thresholdTempWarm);
        this.setThresholdWindSpeedStrong(userDataFromDatabase.thresholdWindSpeedStrong);
        this.setThresholdWindSpeedLow(userDataFromDatabase.thresholdWindSpeedLow);
        this.setThresholdExitCountHigh(userDataFromDatabase.thresholdExitCountHigh);
        this.setThresholdExitCountLow(userDataFromDatabase.thresholdExitCountLow);
        this.setThresholdWeightIncrease(userDataFromDatabase.thresholdWeightIncrease);
        this.setThresholdMaxTempChange(userDataFromDatabase.thresholdMaxTempChange);
        this.setThresholdMaxHumidityChange(userDataFromDatabase.thresholdMaxHumidityChange);
        this.setHumidityThreshold(userDataFromDatabase.humidityThreshold);

        this.setEarlySpringStartMonth(userDataFromDatabase.earlySpringStartMonth);
        this.setEarlySpringEndMonth(userDataFromDatabase.earlySpringEndMonth);
        this.setEarlySpringMonths(userDataFromDatabase.earlySpringMonths);
        this.setLateSpringStartMonth(userDataFromDatabase.lateSpringStartMonth)

        this.setEarlyAutumnMonth(userDataFromDatabase.earlyAutumnMonth);
        this.setAutumnStartMonth(userDataFromDatabase.autumnStartMonth);
        this.setAutumnEndMonth(userDataFromDatabase.autumnEndMonth);
        this.setAutumnMonths(userDataFromDatabase.autumnMonths);

        this.setEarlySummerEndMonth(userDataFromDatabase.earlySummerEndMonth);
        this.setSummerStartMonth(userDataFromDatabase.summerStartMonth);
        this.setEarlyWinterMonths(userDataFromDatabase.earlyWinterMonths);
    }
}

export default new UserViewModel()
