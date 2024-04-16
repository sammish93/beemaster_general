

export enum LanguageEnum {
    BritishEnglish = 'en-GB',
    AmericanEnglish = 'en-US',
    Norwegian = 'no',
    BlackSpeech = 'fi',
}

export enum CountryEnum {
    Norway = 'NO',
    UnitedKingdom = 'EN',
    USA = 'US',
}

export type LanguageOption = {
    code: LanguageEnum;
    name: string;
    isEnabled: boolean;
};

export type CountryOption = {
    code: CountryEnum;
    name: string;
    isEnabled: boolean;
};


export const availableLanguages: LanguageOption[] = [
    { code: LanguageEnum.BritishEnglish, name: 'English UK', isEnabled: true },
    { code: LanguageEnum.AmericanEnglish, name: 'English USA', isEnabled: true },
    { code: LanguageEnum.Norwegian, name: 'Norwegian NB', isEnabled: true },
    { code: LanguageEnum.BlackSpeech, name: 'Black Speech', isEnabled: true },
];


export const availableCountries: CountryOption[] = [
    { code: CountryEnum.Norway, name: 'Norway', isEnabled: true },
    { code: CountryEnum.UnitedKingdom, name: 'United Kingdom', isEnabled: true },

];


