import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import fi from '@/constants/localisation/fi.json';
import { BeeCountMeasurement, PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
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
            fi
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
    @observable locale = Localization.locale;

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

    @action public setLanguage = (langCode: string): void => {

        let newLocale = 'en';
        switch (langCode) {
            case LanguageEnum.BritishEnglish:
                newLocale = 'en-GB';
                break;
            case LanguageEnum.AmericanEnglish:
                newLocale = 'en-US';
                break;
            case LanguageEnum.Norwegian:
                newLocale = 'no';
                break;
            case LanguageEnum.BlackSpeech:
                newLocale = 'fi';
                break;
        }

        runInAction(() => {
            this.currentLanguage = newLocale;
            this.i18n.locale = newLocale;
        });
    };

    @action public setCountry = (countryCode: string): void => {
        this.currentCountry = countryCode;
        switch (countryCode) {

            case CountryEnum.Norway:
                this.temperaturePreference = TemperatureMeasurement.Celsius;
                this.weightPreference = WeightMeasurement.Kilograms;
                this.dateFormat = "DD/MM/YYYY";

                break;
            case CountryEnum.UnitedKingdom:
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
    @observable beeCountPreference: BeeCountMeasurement = BeeCountMeasurement.PerMinute;
    // Allows the user to customise which notifications can trigger by a background tasker operation.
    @observable notificationPreferences: NotificationPreference = notificationPreferences;
    @observable mobileNotifications: boolean = true;
    @observable smsNotifications: boolean = true;
    @observable emailNotifications: boolean = true;

    // Expected to be decimal number
    @observable thresholdWeightDecreaseInAutumn: number = 2.0;
    @observable thresholdWeightDecreaseEarlySpring: number = 2.0;
    @observable thresholdWeightDecrease: number = 2.0;
    @observable thresholdWeightIncrease: number = 2.0;

    @observable productionPeriodDays: number = 7;
    @observable productionPeriodThreshold: number = 5.0;

    //Expected to be integer
    @observable thresholdExitCountHigh: number = 30_000;
    @observable thresholdExitCountLow: number = 2000;

    // Expected to be decimal number
    @observable thresholdTemperatureMin: number = 10.0; //outdoor
    @observable thresholdTemperatureMax: number = 40.0; //outdoor
    @observable thresholdTemperatureOptimal: number = 20.0; //outdoor

    @observable thresholdMinTempInHive: number = 34.0;
    @observable thresholdMaxTempInHive: number = 36.0;

    @observable thresholdWindSpeedStrong: number = 4.0;
    @observable thresholdWindSpeedLow: number = 2.5;

    //number in %
    @observable thresholdHumidityMin: number = 70.0;
    @observable thresholdHumidityMax: number = 95.0;


    currentYear: number = new Date().getFullYear();
    //JavaScript Date objects are 0-indexed, thats why '-1'
    //- alle er benyttet i funksjonene
    @observable autumnMonths: Date[] = [
        new Date(this.currentYear, 9 - 1, 1), // 1. september
        new Date(this.currentYear, 10 - 1, 1), // 1. oktober
        new Date(this.currentYear, 11 - 1, 1) // 1. november
    ];
    @observable earlyWinterMonths: Date[] = [
        new Date(this.currentYear, 10 - 1, 1), // 1. oct
        new Date(this.currentYear, 11 - 1, 1), // 1. nov
    ];
    @observable earlySpringMonths: Date[] = [
        new Date(this.currentYear, 2 - 1, 1), // 1. Feb
        new Date(this.currentYear, 3 - 1, 1), // 1. mars
    ];
    //- alle er benyttet i funksjonene
    @observable lateSpringStartMonth: Date = new Date(this.currentYear, 6 - 1, 1); // Juni 1
    @observable earlyAutumnMonth: Date = new Date(this.currentYear, 8 - 1, 2); // Aug 2

    @observable earlySpringStartMonth: Date = new Date(this.currentYear, 2 - 1, 1); // Feb 
    @observable earlySpringEndMonth: Date = new Date(this.currentYear, 5 - 1, 10); // May 10
    @observable earlySummerStartMonth: Date = new Date(this.currentYear, 5 - 1, 11); // mai 11
    @observable earlySummerEndMonth: Date = new Date(this.currentYear, 8 - 1, 1); // August 1
    @observable earlyWinterStart: Date = new Date(this.currentYear, 10 - 1, 1); //oct 1 
    @observable earlyWinterEnd: Date = new Date(this.currentYear, 1 - 1, 31);// Jan 31 

    @observable springStartMonth: Date = new Date(this.currentYear, 3 - 1, 1); // March 1
    @observable springEndMonth: Date = new Date(this.currentYear, 5 - 1, 31); // May 1

    @observable summerStartMonth: Date = new Date(this.currentYear, 6 - 1, 1); // June 1
    @observable summerEndMonth: Date = new Date(this.currentYear, 8 - 1, 31); // Auguse 31

    @observable autumnStartMonth: Date = new Date(this.currentYear, 9 - 1, 1); // September 1
    @observable autumnEndMonth: Date = new Date(this.currentYear, 9 - 1, 30); // End of september.

    @observable winterStart: Date = new Date(this.currentYear, 12 - 1, 1); //December 1 
    @observable winterEnd: Date = new Date(this.currentYear, 2 - 1, 28); //February 28  


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
    @action public setBeeCountPreference = (prefence: BeeCountMeasurement): void => {
        // TODO DB - Update user's weight preference in DB.
        this.beeCountPreference = prefence;
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

    // TODO DB - These will all have to be in the DB eventually.

    //Weight
    @action public setThresholdWeightDecreaseInAutumn = (value: number): void => {
        this.thresholdWeightDecreaseInAutumn = value;
    }
    @action public setThresholdWeightDecreaseEarlySpring = (value: number): void => {
        this.thresholdWeightDecreaseEarlySpring = value;
    }
    @action public setThresholdWeightDecrease = (value: number): void => {
        this.thresholdWeightDecrease = value;
    }
    @action public setThresholdWeightIncrease = (value: number): void => {
        this.thresholdWeightIncrease = value;
    }
    @action public setProductionPeriodDays = (value: number): void => {
        this.productionPeriodDays = value;
    }
    @action public setProductionPeriodThreshold = (value: number): void => {
        this.productionPeriodThreshold = value;
    }

    //CountExit
    @action public setThresholdExitCountHigh = (value: number): void => {
        this.thresholdExitCountHigh = value;
    }
    @action public setThresholdExitCountLow = (value: number): void => {
        this.thresholdExitCountLow = value;
    }

    //Temperatures
    @action public setThresholdTemperatureOptimal = (value: number): void => {
        this.thresholdTemperatureOptimal = value;
    }
    @action public setThresholdTemperatureMin = (value: number): void => {
        this.thresholdTemperatureMin = value;
    }
    @action public setThresholdTemperatureMax = (value: number): void => {
        this.thresholdTemperatureMax = value;
    }
    @action public setThresholdMinTempInHive = (value: number): void => {
        this.thresholdMinTempInHive = value;
    }
    @action public setThresholdMaxTempInHive = (value: number): void => {
        this.thresholdMaxTempInHive = value;
    }


    //Windspeed
    @action public setThresholdWindSpeedStrong = (value: number): void => {
        this.thresholdWindSpeedStrong = value;
    }
    @action public setThresholdWindSpeedLow = (value: number): void => {
        this.thresholdWindSpeedLow = value;
    }

    //Humidity
    @action public setThresholdHumidityMax = (value: number): void => {
        this.thresholdHumidityMax = value;
    }
    @action public setThresholdHumidityMin = (value: number): void => {
        this.thresholdHumidityMin = value;
    }

    //Spring
    @action public setLateSpringStartMonth = (value: Date): void => {
        this.lateSpringStartMonth = value;
    }

    @action public setEarlySpringMonths = (value: Date[]): void => {
        this.earlySpringMonths = value;
    }

    @action public setEarlySpringStartMonth = (month: Date): void => {
        this.earlySpringStartMonth = month;
    }

    @action public setEarlySpringEndMonth = (month: Date): void => {
        this.earlySpringEndMonth = month;
    }
    @action public setSpringStartMonth = (value: Date): void => {
        this.springStartMonth = value;
    }
    @action public setSpringEndMonth = (value: Date): void => {
        this.springEndMonth = value;
    }

    //Summer
    @action public setEarlySummerStartMonth = (value: Date): void => {
        this.earlySummerStartMonth = value;
    }
    @action public setEarlySummerEndMonth = (value: Date): void => {
        this.earlySummerEndMonth = value;
    }
    @action public setSummerStartMonth = (value: Date): void => {
        this.summerStartMonth = value;
    }
    @action public setSummerEndMonth = (value: Date): void => {
        this.summerEndMonth = value;
    }

    //Autumn 
    @action public setAutumnStartMonth = (month: Date): void => {
        this.autumnStartMonth = month;
    }

    @action public setAutumnEndMonth = (month: Date): void => {
        this.autumnEndMonth = month;
    }

    @action public setAutumnMonths = (value: Date[]): void => {
        this.autumnMonths = value;
    }
    @action public setEarlyAutumnMonth = (value: Date): void => {
        this.earlyAutumnMonth = value;
    }

    //Winter
    @action public setEarlyWinterMonths = (value: Date[]): void => {
        this.earlyWinterMonths = value;
    }
    @action public setWinterStart = (value: Date): void => {
        this.winterStart = value;
    }
    @action public setWinterEnd = (value: Date): void => {
        this.winterEnd = value;
    }
    @action public setEarlyWinterStart = (value: Date): void => {
        this.earlyWinterStart = value;
    }
    @action public setEarlyWinterEnd = (value: Date): void => {
        this.earlyWinterEnd = value;
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
        // TODO DB - Read from DB. 
        // Dummy data for now- Parameters who is not defined under, uses default parameters.
        const userDataFromDatabase = {
            userId: "3536",
            theme: "dark",

            temperaturePreference: TemperatureMeasurement.Celsius,
            precipitationPreference: PrecipitationMeasurement.Millimeters,
            windSpeedPreference: WindSpeedMeasurement.MetersPerSecond,
            weightPreference: WeightMeasurement.Kilograms,
            beeCountPreference: BeeCountMeasurement.PerMinute,


            thresholdWeightDecreaseInAutumn: 1.0,
            thresholdWeightDecreaseEarlySpring: 1.0,
            thresholdWeightDecrease: 2.5,
            thresholdWeightIncrease: 2.5,

            thresholdExitCountHigh: 40_000,
            thresholdExitCountLow: 4_000,

            thresholdTemperatureMin: 8.0,
            thresholdTemperatureMax: 45.0,
            thresholdTemperatureOptimal: 25.0,

            thresholdMinTempInHive: 32.0,
            thresholdMaxTempInHive: 38.0,

            thresholdWindSpeedLow: 1.5,

            thresholdHumidityMin: 60.0,
            thresholdHumidityMax: 85.0,


            earlyWinterMonths: [
                new Date(this.currentYear, 10 - 1, 1), // 1. okt
                new Date(this.currentYear, 11 - 1, 1), // 1. nov    
            ],
            earlySpringMonths: [
                new Date(this.currentYear, 3 - 1, 1), // 1. mars
                new Date(this.currentYear, 4 - 1, 1), // 1. april    
            ],
            autumnMonths: [
                new Date(this.currentYear, 9 - 1, 1), // 1. september
                new Date(this.currentYear, 10 - 1, 1), // 1. oktober

            ],

            earlyAutumnMonth: new Date(this.currentYear, 8 - 1, 1),
            autumnStartMonth: new Date(this.currentYear, 9 - 1, 1),
            autumnEndMonth: new Date(this.currentYear, 10 - 1, 1),

            summerStartMonth: new Date(this.currentYear, 6 - 1, 1),
            summerEndMonth: new Date(this.currentYear, 8 - 1, 1),

            winterStart: new Date(this.currentYear, 11 - 1, 1),
            winterEnd: new Date(this.currentYear, 2 - 1, 28),

            earlySpringStartMonth: new Date(this.currentYear, 3 - 1, 1),
            earlySpringEndMonth: new Date(this.currentYear, 5 - 1, 1),
            lateSpringStartMonth: new Date(this.currentYear, 6 - 1, 1),

            springStartMonth: new Date(this.currentYear, 3 - 1, 1),
            springEndMonth: new Date(this.currentYear, 5 - 1, 31),

            earlySummerStartMonth: new Date(this.currentYear, 5 - 1, 11),
            earlySummerEndMonth: new Date(this.currentYear, 7 - 1, 1),
            earlyWinterStart: new Date(this.currentYear, 10 - 1, 1),
            earlyWinterEnd: new Date(this.currentYear, 1 - 1, 31)


        };

        this.setUserId(userDataFromDatabase.userId);
        this.setTheme(userDataFromDatabase.theme);

        this.setTemperaturePreference(userDataFromDatabase.temperaturePreference);
        this.setPrecipitationPreference(userDataFromDatabase.precipitationPreference);
        this.setWindSpeedPreference(userDataFromDatabase.windSpeedPreference);
        this.setWeightPreference(userDataFromDatabase.weightPreference);

        this.setThresholdWeightDecreaseInAutumn(userDataFromDatabase.thresholdWeightDecreaseInAutumn);
        this.setThresholdWeightDecreaseEarlySpring(userDataFromDatabase.thresholdWeightDecreaseEarlySpring);
        this.setThresholdWeightDecrease(userDataFromDatabase.thresholdWeightDecrease);
        this.setThresholdWeightIncrease(userDataFromDatabase.thresholdWeightIncrease);

        this.setThresholdTemperatureOptimal(userDataFromDatabase.thresholdTemperatureOptimal);

        this.setThresholdWindSpeedLow(userDataFromDatabase.thresholdWindSpeedLow);

        this.setThresholdExitCountHigh(userDataFromDatabase.thresholdExitCountHigh);
        this.setThresholdExitCountLow(userDataFromDatabase.thresholdExitCountLow);

        this.setThresholdHumidityMax(userDataFromDatabase.thresholdHumidityMax);
        this.setThresholdHumidityMin(userDataFromDatabase.thresholdHumidityMin);

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
