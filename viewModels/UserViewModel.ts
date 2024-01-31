import { action, makeAutoObservable, observable } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';

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

    @action public setUserId = (val: string) : void => {
        this.userId = val;
    }

    // Clears all the data in this view model.
    // Useful for when a user logs out.
    @action public clear = () : void => {
        this.userId = "";
    }
}

export default new UserViewModel()