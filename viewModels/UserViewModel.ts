import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import { availableLanguages, availableCountries } from '@/constants/LocaleEnums';
import { Platform } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { signOut, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signInWithCredential, onAuthStateChanged } from "firebase/auth";
import { WEB_CLIENT_ID } from '@env';
import { NotificationPreference, NotificationType } from "@/constants/Notifications";
import { notificationPreferences } from "@/data/notificationData";
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


    // Localisation
    @observable i18n;
    @observable userId = "";
    @observable theme = "light";
    // Allows the user to customise the display of measurements based on their preference.
    @observable temperaturePreference: TemperatureMeasurement = TemperatureMeasurement.Celsius;
    @observable precipitationPreference: PrecipitationMeasurement = PrecipitationMeasurement.Millimeters;
    @observable windSpeedPreference: WindSpeedMeasurement = WindSpeedMeasurement.MetersPerSecond;
    @observable weightPreference: WeightMeasurement = WeightMeasurement.Grams;



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

    @observable notificationPreferences: NotificationPreference = notificationPreferences;

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

    @action toggleNotificationPreference(type: NotificationType): void {
        this.notificationPreferences[type] = !this.notificationPreferences[type];
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
