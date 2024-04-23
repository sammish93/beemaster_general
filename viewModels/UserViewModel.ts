import { notificationPreferences } from "./../data/userData";
import { action, makeAutoObservable, observable, runInAction } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from "@/constants/localisation/en.json";
import no from "@/constants/localisation/no.json";
import fi from "@/constants/localisation/fi.json";
import {
  BeeCountMeasurement,
  PrecipitationMeasurement,
  TemperatureMeasurement,
  WeightMeasurement,
  WindSpeedMeasurement,
} from "@/constants/Measurements";
import {
  availableLanguages,
  availableCountries,
  LanguageEnum,
  CountryEnum,
} from "@/constants/LocaleEnums";
import { Platform } from "react-native";
import { auth, db } from "@/firebaseConfig";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { WEB_CLIENT_ID } from "@env";
import {
  NotificationTypePreference,
  NotificationType,
} from "@/constants/Notifications";
import { notificationTypePreferences } from "@/data/notificationData";
import { LocationObject, LocationObjectCoords } from "expo-location";
import { doc, collection, setDoc, getDoc, Timestamp } from "firebase/firestore";
import { User } from "@/models";
import { preferences } from "@/data/userData";
import { Appearance } from "react-native";

class UserViewModel {
  constructor() {
    // Makes all the class properties observable. Can change if desired.
    makeAutoObservable(this);

    this.i18n = new I18n({
      en,
      no,
      fi,
    });
    this.i18n.locale = Localization.locale;
    this.i18n.enableFallback = true;
    this.initializeAuthListener();
    this.theme = Appearance.getColorScheme() || "light";

    // Manually change the language:
    //this.i18n.locale = "no";
  }

  @observable currentLanguage: string | null = null;
  @observable currentCountry = "NO";
  @observable authInitialized = false;
  @observable dateFormat: string = "DD/MM/YYYY";
  @observable locale = Localization.locale;
  @observable gdprConsent = false;

  initializeAuthListener() {
    onAuthStateChanged(auth, (user) => {
      runInAction(() => {
        if (user) {
          this.setUserId(user.uid);
          console.log(
            "onAuthStateChanged: User is signed in with UID:",
            user.uid
          );
        } else {
          this.setUserId("");
        }
        this.authInitialized = true;
      });
    });
  }

  @action public setGdprConsent = (consent: boolean): void => {
    this.gdprConsent = consent;
  };

  @action public setLanguage = (langCode: string): void => {
    // TODO DB - Write language to DB

    let newLocale = "en";
    switch (langCode) {
      case LanguageEnum.BritishEnglish:
        newLocale = "en-GB";
        break;
      case LanguageEnum.AmericanEnglish:
        newLocale = "en-US";
        break;
      case LanguageEnum.Norwegian:
        newLocale = "no";
        break;
      case LanguageEnum.BlackSpeech:
        newLocale = "fi";
        break;
    }

    runInAction(() => {
      this.currentLanguage = newLocale;
      this.i18n.locale = newLocale;
    });
  };

  @action public setCountry = (
    countryCode: string,
    changeDefaultVariables: boolean = false
  ): void => {
    // TODO DB - Write country to DB.
    this.currentCountry = countryCode;
    switch (countryCode) {
      case CountryEnum.Norway:
        if (changeDefaultVariables) {
          // TODO Default variables for Norway.
        }

        break;
      case CountryEnum.UnitedKingdom:
        if (changeDefaultVariables) {
          // TODO Default variables for UK.
        }

        break;

      default:
        null;
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
  @observable temperaturePreference: TemperatureMeasurement =
    TemperatureMeasurement.Celsius;
  @observable precipitationPreference: PrecipitationMeasurement =
    PrecipitationMeasurement.Millimeters;
  @observable windSpeedPreference: WindSpeedMeasurement =
    WindSpeedMeasurement.MetersPerSecond;
  @observable weightPreference: WeightMeasurement = WeightMeasurement.Grams;
  @observable beeCountPreference: BeeCountMeasurement =
    BeeCountMeasurement.PerMinute;
  // Allows the user to customise which notifications can trigger by a background tasker operation.
  @observable notificationPreferences: NotificationTypePreference =
    notificationTypePreferences;
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
  @observable thresholdExitCountHigh: number = 24000;
  @observable thresholdExitCountLow: number = 2000;

  // Expected to be decimal number
  @observable thresholdTemperatureMin: number = 10.0; //outdoor
  @observable thresholdTemperatureMax: number = 40.0; //outdoor
  @observable thresholdTemperatureOptimal: number = 20.0; //outdoor

  @observable thresholdMinTempInHive: number = 34.0;
  @observable thresholdMaxTempInHive: number = 36.0;

  @observable thresholdWindSpeedStrong: number = 5.0;
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
    new Date(this.currentYear, 11 - 1, 30), // 1. november
  ];
  @observable earlyWinterMonths: Date[] = [
    new Date(this.currentYear, 10 - 1, 1), // 1. oct
    new Date(this.currentYear, 11 - 1, 30), // 1. nov
  ];
  @observable earlySpringMonths: Date[] = [
    new Date(this.currentYear, 2 - 1, 1), // 1. Feb
    new Date(this.currentYear, 3 - 1, 1), // 1. mars
  ];
  //- alle er benyttet i funksjonene
  @observable lateSpringStartMonth: Date = new Date(this.currentYear, 4 - 1, 1); // April 1
  @observable earlyAutumnMonth: Date = new Date(this.currentYear, 8 - 1, 2); // Aug 2

  @observable earlySpringStartMonth: Date = new Date(
    this.currentYear,
    2 - 1,
    1
  ); // Feb
  @observable earlySpringEndMonth: Date = new Date(this.currentYear, 5 - 1, 10); // May 10
  @observable earlySummerStartMonth: Date = new Date(
    this.currentYear,
    5 - 1,
    11
  ); // mai 11
  @observable earlySummerEndMonth: Date = new Date(this.currentYear, 8 - 1, 1); // August 1
  @observable earlyWinterStart: Date = new Date(this.currentYear, 10 - 1, 31); //oct 31
  @observable earlyWinterEnd: Date = new Date(this.currentYear, 1 - 1, 31); // Jan 31

  @observable springStartMonth: Date = new Date(this.currentYear, 3 - 1, 1); // March 1
  @observable springEndMonth: Date = new Date(this.currentYear, 5 - 1, 31); // May 31

  @observable summerStartMonth: Date = new Date(this.currentYear, 6 - 1, 1); // June 1
  @observable summerEndMonth: Date = new Date(this.currentYear, 8 - 1, 31); // Aug 31

  @observable autumnStartMonth: Date = new Date(this.currentYear, 9 - 1, 1); // September 1
  @observable autumnEndMonth: Date = new Date(this.currentYear, 11 - 1, 30); // End of nov.

  @observable winterStart: Date = new Date(this.currentYear, 12 - 1, 1); //December 1
  @observable winterEnd: Date = new Date(this.currentYear, 2 - 1, 28); //February 28

  @action public setUserId = (val: string): void => {
    this.userId = val;
  };

  @action public getUserId = (): string => {
    return this.userId;
  };

  @action public setTheme = (theme: string): void => {
    // TODO DB - Update user's theme preference in DB.
    this.theme = theme;
  };

  @action public setLocationPermission = (val: boolean): void => {
    this.isLocationEnabled = val;
  };

  @action public getLocationPermission = (): boolean => {
    return this.isLocationEnabled;
  };

  @action public setCameraPermission = (val: boolean): void => {
    this.isCameraEnabled = val;
  };

  @action public getCameraPermission = (): boolean => {
    return this.isCameraEnabled;
  };

  @action public setMediaPermission = (val: boolean): void => {
    this.isMediaEnabled = val;
  };

  @action public getMediaPermission = (): boolean => {
    return this.isMediaEnabled;
  };

  // Functions to allow the user to set their measurement preferences.
  @action public setTemperaturePreference = (
    prefence: TemperatureMeasurement
  ): void => {
    // TODO DB - Update user's temperature preference in DB.
    this.temperaturePreference = prefence;
  };

  @action public setPrecipitationPreference = (
    prefence: PrecipitationMeasurement
  ): void => {
    // TODO DB - Update user's precipitation preference in DB.
    this.precipitationPreference = prefence;
  };

  @action public setWindSpeedPreference = (
    prefence: WindSpeedMeasurement
  ): void => {
    // TODO DB - Update user's wind speed preference in DB.
    this.windSpeedPreference = prefence;
  };

  @action public setWeightPreference = (prefence: WeightMeasurement): void => {
    // TODO DB - Update user's weight preference in DB.
    this.weightPreference = prefence;
  };
  @action public setBeeCountPreference = (
    prefence: BeeCountMeasurement
  ): void => {
    // TODO DB - Update user's weight preference in DB.
    this.beeCountPreference = prefence;
  };

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

  // TODO DB - These will all have to be in the DB eventually.

  //Weight
  @action public setThresholdWeightDecreaseInAutumn = (value: number): void => {
    this.thresholdWeightDecreaseInAutumn = value;
  };
  @action public setThresholdWeightDecreaseEarlySpring = (
    value: number
  ): void => {
    this.thresholdWeightDecreaseEarlySpring = value;
  };
  @action public setThresholdWeightDecrease = (value: number): void => {
    this.thresholdWeightDecrease = value;
  };
  @action public setThresholdWeightIncrease = (value: number): void => {
    this.thresholdWeightIncrease = value;
  };
  @action public setProductionPeriodDays = (value: number): void => {
    this.productionPeriodDays = value;
  };
  @action public setProductionPeriodThreshold = (value: number): void => {
    this.productionPeriodThreshold = value;
  };

  //CountExit
  @action public setThresholdExitCountHigh = (value: number): void => {
    this.thresholdExitCountHigh = value;
  };
  @action public setThresholdExitCountLow = (value: number): void => {
    this.thresholdExitCountLow = value;
  };

  //Temperatures
  @action public setThresholdTemperatureOptimal = (value: number): void => {
    this.thresholdTemperatureOptimal = value;
  };
  @action public setThresholdTemperatureMin = (value: number): void => {
    this.thresholdTemperatureMin = value;
  };
  @action public setThresholdTemperatureMax = (value: number): void => {
    this.thresholdTemperatureMax = value;
  };
  @action public setThresholdMinTempInHive = (value: number): void => {
    this.thresholdMinTempInHive = value;
  };
  @action public setThresholdMaxTempInHive = (value: number): void => {
    this.thresholdMaxTempInHive = value;
  };

  //Windspeed
  @action public setThresholdWindSpeedStrong = (value: number): void => {
    this.thresholdWindSpeedStrong = value;
  };
  @action public setThresholdWindSpeedLow = (value: number): void => {
    this.thresholdWindSpeedLow = value;
  };

  //Humidity
  @action public setThresholdHumidityMax = (value: number): void => {
    this.thresholdHumidityMax = value;
  };
  @action public setThresholdHumidityMin = (value: number): void => {
    this.thresholdHumidityMin = value;
  };

  //Spring
  @action public setLateSpringStartMonth = (value: Date): void => {
    this.lateSpringStartMonth = value;
  };

  @action public setEarlySpringMonths = (value: Date[]): void => {
    this.earlySpringMonths = value;
  };

  @action public setEarlySpringStartMonth = (month: Date): void => {
    this.earlySpringStartMonth = month;
  };

  @action public setEarlySpringEndMonth = (month: Date): void => {
    this.earlySpringEndMonth = month;
  };
  @action public setSpringStartMonth = (value: Date): void => {
    this.springStartMonth = value;
  };
  @action public setSpringEndMonth = (value: Date): void => {
    this.springEndMonth = value;
  };

  //Summer
  @action public setEarlySummerStartMonth = (value: Date): void => {
    this.earlySummerStartMonth = value;
  };
  @action public setEarlySummerEndMonth = (value: Date): void => {
    this.earlySummerEndMonth = value;
  };
  @action public setSummerStartMonth = (value: Date): void => {
    this.summerStartMonth = value;
  };
  @action public setSummerEndMonth = (value: Date): void => {
    this.summerEndMonth = value;
  };

  //Autumn
  @action public setAutumnStartMonth = (month: Date): void => {
    this.autumnStartMonth = month;
  };

  @action public setAutumnEndMonth = (month: Date): void => {
    this.autumnEndMonth = month;
  };

  @action public setAutumnMonths = (value: Date[]): void => {
    this.autumnMonths = value;
  };
  @action public setEarlyAutumnMonth = (value: Date): void => {
    this.earlyAutumnMonth = value;
  };

  //Winter
  @action public setEarlyWinterMonths = (value: Date[]): void => {
    this.earlyWinterMonths = value;
  };
  @action public setWinterStart = (value: Date): void => {
    this.winterStart = value;
  };
  @action public setWinterEnd = (value: Date): void => {
    this.winterEnd = value;
  };
  @action public setEarlyWinterStart = (value: Date): void => {
    this.earlyWinterStart = value;
  };
  @action public setEarlyWinterEnd = (value: Date): void => {
    this.earlyWinterEnd = value;
  };

  // Getters - don't need to be read from the DB.
  // Weight
  public getThresholdWeightDecreaseInAutumn = (): number => {
    return this.thresholdWeightDecreaseInAutumn;
  };
  public getThresholdWeightDecreaseEarlySpring = (): number => {
    return this.thresholdWeightDecreaseEarlySpring;
  };
  public getThresholdWeightDecrease = (): number => {
    return this.thresholdWeightDecrease;
  };
  public getThresholdWeightIncrease = (): number => {
    return this.thresholdWeightIncrease;
  };
  public getProductionPeriodDays = (): number => {
    return this.productionPeriodDays;
  };
  public getProductionPeriodThreshold = (): number => {
    return this.productionPeriodThreshold;
  };

  // CountExit
  public getThresholdExitCountHigh = (): number => {
    return this.thresholdExitCountHigh;
  };
  public getThresholdExitCountLow = (): number => {
    return this.thresholdExitCountLow;
  };

  // Temperatures
  public getThresholdTemperatureOptimal = (): number => {
    return this.thresholdTemperatureOptimal;
  };
  public getThresholdTemperatureMin = (): number => {
    return this.thresholdTemperatureMin;
  };
  public getThresholdTemperatureMax = (): number => {
    return this.thresholdTemperatureMax;
  };
  public getThresholdMinTempInHive = (): number => {
    return this.thresholdMinTempInHive;
  };
  public getThresholdMaxTempInHive = (): number => {
    return this.thresholdMaxTempInHive;
  };

  // Windspeed
  public getThresholdWindSpeedStrong = (): number => {
    return this.thresholdWindSpeedStrong;
  };
  public getThresholdWindSpeedLow = (): number => {
    return this.thresholdWindSpeedLow;
  };

  // Humidity
  public getThresholdHumidityMax = (): number => {
    return this.thresholdHumidityMax;
  };
  public getThresholdHumidityMin = (): number => {
    return this.thresholdHumidityMin;
  };

  // Spring
  public getLateSpringStartMonth = (): Date => {
    return this.lateSpringStartMonth;
  };
  public getEarlySpringMonths = (): Date[] => {
    return this.earlySpringMonths;
  };
  public getEarlySpringStartMonth = (): Date => {
    return this.earlySpringStartMonth;
  };
  public getEarlySpringEndMonth = (): Date => {
    return this.earlySpringEndMonth;
  };
  public getSpringStartMonth = (): Date => {
    return this.springStartMonth;
  };
  public getSpringEndMonth = (): Date => {
    return this.springEndMonth;
  };

  // Summer
  public getEarlySummerStartMonth = (): Date => {
    return this.earlySummerStartMonth;
  };
  public getEarlySummerEndMonth = (): Date => {
    return this.earlySummerEndMonth;
  };
  public getSummerStartMonth = (): Date => {
    return this.summerStartMonth;
  };
  public getSummerEndMonth = (): Date => {
    return this.summerEndMonth;
  };

  // Autumn
  public getAutumnStartMonth = (): Date => {
    return this.autumnStartMonth;
  };
  public getAutumnEndMonth = (): Date => {
    return this.autumnEndMonth;
  };
  public getAutumnMonths = (): Date[] => {
    return this.autumnMonths;
  };
  public getEarlyAutumnMonth = (): Date => {
    return this.earlyAutumnMonth;
  };

  // Winter
  public getEarlyWinterMonths = (): Date[] => {
    return this.earlyWinterMonths;
  };
  public getWinterStart = (): Date => {
    return this.winterStart;
  };
  public getWinterEnd = (): Date => {
    return this.winterEnd;
  };
  public getEarlyWinterStart = (): Date => {
    return this.earlyWinterStart;
  };
  public getEarlyWinterEnd = (): Date => {
    return this.earlyWinterEnd;
  };

  @action signInWithGoogleWeb = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });
    try {
      console.log("signin with web");
      const result = await signInWithPopup(auth, provider);
      await this.createUserWithConfig(
        result.user.uid,
        result.user.isAnonymous,
        result.user.email
      );
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  @action signInWithGoogleNative = async () => {
    if (Platform.OS !== "web") {
      const { GoogleSignin } = await import(
        "@react-native-google-signin/google-signin"
      );

      GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID,
      });

      try {
        await GoogleSignin.signOut();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const result = await signInWithCredential(auth, googleCredential);

        await this.createUserWithConfig(
          result.user.uid,
          result.user.isAnonymous,
          result.user.email
        );
        console.log("New user document created for Google sign-in.");
      } catch (error) {
        console.error("Error signing in with Google(Native): ", error);
      }
    }
  };

  @action signInWithEmail = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === "auth/invalid-login-credentials") {
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
  };

  @action signUpWithEmail = async (email: string, password: string) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await this.createUserWithConfig(
        result.user.uid,
        result.user.isAnonymous,
        email
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
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
  };

  @action signInAnonymously = async () => {
    try {
      const result = await signInAnonymously(auth);
      const user = result.user;

      await this.createUserWithConfig(
        result.user.uid,
        result.user.isAnonymous,
        result.user.email
      );
      console.log("New user document created for anonymous.");
    } catch (error) {
      console.error("Error signing in anonymously: ", error);
    }
  };

  @action createUserWithConfig = async (
    uid: string,
    isAnonymous: boolean,
    email: string | null
  ) => {
    const defaults = {
      id: uid,
      email: email,
      isAnonymous: isAnonymous,
      mobileNr: null,
      notificationTypePreferences: notificationTypePreferences,
      notificationPreferences: {
        email: this.emailNotifications,
        mobile: this.mobileNotifications,
        sms: this.smsNotifications,
      },
      preferences: {
        country: this.currentCountry,
        language: this.currentLanguage,
        theme: this.theme,
      },
      permissions: {
        isCameraEnabled: this.isCameraEnabled,
        isLocationEnabled: this.isLocationEnabled,
        isMediaEnabled: this.isMediaEnabled,
      },
      measurementsPreferences: {
        temperature: this.temperaturePreference,
        weight: this.weightPreference,
        precipitation: this.precipitationPreference,
        windSpeed: this.windSpeedPreference,
        beeCount: this.beeCountPreference,
      },
      notificationParameters: { ...this.notificationParameters },
      simplifiedView: true,
      gdprConsent: this.gdprConsent,
      filters: [],
    };

    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, defaults, { merge: true });
      console.log(
        `User document created successfully for ${
          isAnonymous ? "anonymous" : "regular"
        } user.`
      );
    } catch (error) {
      console.error("Error creating user document: ", error);
    }
  };

  notificationParameters = {
    thresholdWeightDecreaseInAutumn: 2.0,
    thresholdWeightDecreaseEarlySpring: 2.0,
    thresholdWeightDecrease: 2.0,
    thresholdWeightIncrease: 2.0,
    productionPeriodDays: 7,
    productionPeriodThreshold: 5.0,
    thresholdExitCountHigh: 24000,
    thresholdExitCountLow: 2000,
    thresholdTemperatureMin: 10.0,
    thresholdTemperatureMax: 40.0,
    thresholdTemperatureOptimal: 20.0,
    thresholdMinTempInHive: 34.0,
    thresholdMaxTempInHive: 36.0,
    thresholdWindSpeedStrong: 5.0,
    thresholdWindSpeedLow: 2.5,
    thresholdHumidityMin: 70.0,
    thresholdHumidityMax: 95.0,
    autumnMonths: [
      Timestamp.fromDate(new Date(this.currentYear, 8, 1)),
      Timestamp.fromDate(new Date(this.currentYear, 9, 1)),
      Timestamp.fromDate(new Date(this.currentYear, 10, 30)),
    ],
    earlyWinterMonths: [
      Timestamp.fromDate(new Date(this.currentYear, 9, 1)),
      Timestamp.fromDate(new Date(this.currentYear, 10, 30)),
    ],
    earlySpringMonths: [
      Timestamp.fromDate(new Date(this.currentYear, 1, 1)),
      Timestamp.fromDate(new Date(this.currentYear, 2, 1)),
    ],
    lateSpringStartMonth: Timestamp.fromDate(new Date(this.currentYear, 3, 1)),
    earlyAutumnMonth: Timestamp.fromDate(new Date(this.currentYear, 7, 2)),
    earlySpringStartMonth: Timestamp.fromDate(new Date(this.currentYear, 1, 1)),
    earlySpringEndMonth: Timestamp.fromDate(new Date(this.currentYear, 4, 10)),
    earlySummerStartMonth: Timestamp.fromDate(
      new Date(this.currentYear, 4, 11)
    ),
    earlySummerEndMonth: Timestamp.fromDate(new Date(this.currentYear, 7, 1)),
    earlyWinterStart: Timestamp.fromDate(new Date(this.currentYear, 9, 31)),
    earlyWinterEnd: Timestamp.fromDate(new Date(this.currentYear, 0, 31)),
    springStartMonth: Timestamp.fromDate(new Date(this.currentYear, 2, 1)),
    springEndMonth: Timestamp.fromDate(new Date(this.currentYear, 4, 31)),
    summerStartMonth: Timestamp.fromDate(new Date(this.currentYear, 5, 1)),
    summerEndMonth: Timestamp.fromDate(new Date(this.currentYear, 7, 31)),
    autumnStartMonth: Timestamp.fromDate(new Date(this.currentYear, 8, 1)),
    autumnEndMonth: Timestamp.fromDate(new Date(this.currentYear, 10, 30)),
    winterStart: Timestamp.fromDate(new Date(this.currentYear, 11, 1)),
    winterEnd: Timestamp.fromDate(new Date(this.currentYear, 1, 28)),
  };

  //TODO logout and auth connect
  @action logout = async () => {
    try {
      await signOut(auth);
      this.clear();

      console.log("user signed out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  // Clears all the data in this view model.
  // Useful for when a user logs out.
  @action public clear = (): void => {
    this.userId = "";
    this.gdprConsent = false;
    this.currentCountry = "";
    //this.theme = "light"; // reset theme on logout
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

  @action fetchUserParametersFromDatabase = async () => {
    // TODO DB - Read from DB.
    // Dummy data for now- Parameters who is not defined under, uses default parameters.
    // UserID isn't present in the dummy data because we already have live data
    if (!this.userId) {
      console.error("No user ID available to fetch data.");
      return; // Or handle the user not being set more gracefully
    }

    try {
      const userRef = doc(db, "users", this.userId);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        console.log("reading user", userData);

        runInAction(() => {
          // Assuming userData fields map directly to observable properties
          this.gdprConsent = userData.gdprConsent;
          this.currentCountry = userData.preferences?.country;
          this.currentLanguage =
            userData.preferences?.language || this.i18n.locale;
          this.theme = userData.preferences?.theme || "light";
          this.isCameraEnabled = userData.permissions?.isCameraEnabled;
          this.isLocationEnabled = userData.permissions?.isLocationEnabled;
          this.isMediaEnabled = userData.permissions?.isMediaEnabled;
          this.notificationParameters = userData.notificationParameters;
          this.mobileNotifications = userData.notificationPreferences?.mobile;
          this.smsNotifications = userData.notificationPreferences?.sms;

          // Set other fields as necessary
        });
      } else {
        console.log("No user data available.");
      }
    } catch (error) {
      console.error("Error fetching user from database:", error);
    }
  };
}

export default new UserViewModel();
