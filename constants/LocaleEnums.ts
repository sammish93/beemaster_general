

export enum LanguageEnum {
    English = 'en',
    Norwegian = 'no',
    NorwegianBokmal = 'nb',


}

export enum CountryEnum {
    Norway = 'NO',
    England = 'EN',
    USA = 'US',
    WebNorway = 'no',
    WebEngland = 'en',

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
    { code: LanguageEnum.English, name: 'English', isEnabled: true },
    { code: LanguageEnum.Norwegian, name: 'Norsk', isEnabled: true },
    { code: LanguageEnum.NorwegianBokmal, name: 'Norsk', isEnabled: true },
];



export const availableCountries: CountryOption[] = [
    { code: CountryEnum.Norway, name: 'Norge', isEnabled: true },
    { code: CountryEnum.England, name: 'England', isEnabled: true },
    { code: CountryEnum.WebNorway, name: 'Norge', isEnabled: true },
    { code: CountryEnum.WebEngland, name: 'England', isEnabled: true },
    { code: CountryEnum.USA, name: 'USA', isEnabled: true },

];
