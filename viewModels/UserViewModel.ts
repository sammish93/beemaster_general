import { action, makeAutoObservable, observable } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';
import { PrecipitationMeasurement, TemperatureMeasurement, WeightMeasurement, WindSpeedMeasurement } from "@/constants/Measurements";

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
        //this.i18n.locale = "en";
    }

    // Localisation
    @observable i18n;    
    @observable userId = "";
    // Allows the user to customise the display of measurements based on their preference.
    @observable temperaturePreference = TemperatureMeasurement.Celsius;
    @observable precipitationPreference = PrecipitationMeasurement.Millimeters;
    @observable windSpeedPreference = WindSpeedMeasurement.MetersPerSecond;
    @observable weightPreference = WeightMeasurement.Grams;

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

    // Clears all the data in this view model.
    // Useful for when a user logs out.
    @action public clear = () : void => {
        this.userId = "";
    }
}

export default new UserViewModel()