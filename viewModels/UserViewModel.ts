import { action, makeAutoObservable, observable } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";
import {auth, db} from "@/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInAnonymously, signInWithCredential} from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { 
  WEB_CLIENT_ID} from '@env';
class UserViewModel {
  configure(): void{
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
    });
    
  }
    constructor() {
      
        // Makes all the class properties observable. Can change if desired.
        makeAutoObservable(this)
        this.i18n = new I18n({
            en,
            no,
          });
        this.i18n.locale = Localization.locale;
        this.i18n.enableFallback = true;
        this.configure();

        // Manually change the language:
        //this.i18n.locale = "en";
    }

    // Localisation
    @observable i18n;    
    @observable userId = "";
    // Allows the user to customise the display of measurements based on their preference.
    @observable temperaturePreference: TemperatureMeasurement = TemperatureMeasurement.Celsius;
    @observable precipitationPreference: PrecipitationMeasurement = PrecipitationMeasurement.Millimeters;
    @observable windSpeedPreference: WindSpeedMeasurement = WindSpeedMeasurement.MetersPerSecond;
    @observable weightPreference: WeightMeasurement = WeightMeasurement.Grams;

    @action public setUserId = (val: string) : void => {
        this.userId = val;
    }

    // Functions to allow the user to set their measurement preferences.
    @action public setTemperaturePreference = (prefence: TemperatureMeasurement) : void => {
        this.temperaturePreference = prefence;
    }

    @action public setPrecipitationPreference = (prefence: PrecipitationMeasurement) : void => {
        this.precipitationPreference = prefence;
    }

    @action public setWindSpeedPreference = (prefence: WindSpeedMeasurement) : void => {
        this.windSpeedPreference = prefence;
    }

    @action public setWeightPreference = (prefence: WeightMeasurement) : void => {
        this.weightPreference = prefence;
    }
      
        @action signInWithGoogleWeb = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            
            this.setUserId(result.user.uid);
        } catch (error) {
            console.error("Error signing in with Google: ", error);
          }
      }

      @action signInWithGoogleNative = async () => {
        try {
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = GoogleAuthProvider.credential(idToken)
          const result = await  signInWithCredential(auth, googleCredential);
          
            this.setUserId(result.user.uid);
            console.log("Native user: ", result.user)
        } catch (error) {
            console.error("Error signing in with Google (Native): ", error);
        }
    };
      

      //TODO Fix all the logic in here. Can't signin if they already have an account. 
      @action signInWithEmail = async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            this.setUserId(result.user.uid);
        } catch (error) {
            if (error === 'auth/invalid-login-credentials') {
                
                console.log("User not found, creating a new account...");
                try {
                    const signUpResult = await createUserWithEmailAndPassword(auth, email, password);
                    this.setUserId(signUpResult.user.uid);
                    console.log("User signed up and signed in successfully");
                } catch (signUpError) {
                    console.error("Error signing up: ", signUpError);
                    
                }
            } else {
                
                console.error("Error signing in with email: ", error);
            }
        }
    };

    @action signUpWithEmail = async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            this.setUserId(result.user.uid);
        } catch (error) {
            console.error("Error signing up with email: ", error);
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

    // Clears all the data in this view model.
    // Useful for when a user logs out.
    @action public clear = () : void => {
        this.userId = "";
    }
}

export default new UserViewModel()