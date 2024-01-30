import { action, makeAutoObservable, observable } from "mobx";
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import en from '@/constants/localisation/en.json';
import no from '@/constants/localisation/no.json';

class UserViewModel {
    constructor() {
        makeAutoObservable(this)
        this.i18n = new I18n({
            en,
            no,
          });
        this.i18n.locale = Localization.locale;
        this.i18n.enableFallback = true;

        // Manually change the language choice:
        //this.i18n.locale = "en";
    }

    @observable i18n;    
}

export default new UserViewModel()