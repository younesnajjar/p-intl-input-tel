import * as lpn from 'google-libphonenumber';
import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
import { EventEmitter, InputSignal, OnChanges, SimpleChanges, WritableSignal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CountryISO } from '../model/country-iso.enum';
import { SearchCountryField } from '../model/search-country-field';
import { Country } from '../model/country.model';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export declare class IntlInputTelComponent implements OnChanges {
    cssClass: string;
    favoriteCountries: string[];
    onlyCountries: string[];
    enableAutoCountrySelect: boolean;
    displayPlaceholder: boolean;
    customPlaceholder: string;
    numberFormat: PhoneNumberFormat;
    displaySearchCountry: boolean;
    searchCountryField: SearchCountryField[];
    searchCountryPlaceholder: string;
    maxLength: number;
    selectFirstCountry: boolean;
    phoneValidation: boolean;
    inputId: string;
    selectedCountryISO: CountryISO;
    separateDialCode: boolean;
    lang: string;
    appendTo: InputSignal<any | null>;
    set disabled(value: boolean);
    readonly countryChange: EventEmitter<Country>;
    readonly SearchCountryField: typeof SearchCountryField;
    phoneUtil: PhoneNumberUtil;
    selectedCountry: WritableSignal<Country>;
    countries: Country[];
    phoneNumber$: BehaviorSubject<lpn.PhoneNumber>;
    phoneNumberControl: FormControl<string | null>;
    onTouched: () => void;
    propagateChange: (_: string) => void;
    private get favorites();
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    init(): void;
    onPhoneNumberChange(value?: any): void;
    onCountrySelect(country: Country, el?: {
        focus: () => void;
    }): void;
    private onFavoriteCountriesChanged;
    onInputKeyPress(event: KeyboardEvent): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    writeValue(obj: string): void;
    protected fetchCountryData(): void;
    /**
     * Updates selectedCountry.
     */
    private updateSelectedCountry;
    private setSelectedCountry;
    private isSelectedCountryChanged;
    private getPlaceholder;
    static ɵfac: i0.ɵɵFactoryDeclaration<IntlInputTelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<IntlInputTelComponent, "p-intl-tel-input", never, { "cssClass": { "alias": "cssClass"; "required": false; }; "favoriteCountries": { "alias": "favoriteCountries"; "required": false; }; "onlyCountries": { "alias": "onlyCountries"; "required": false; }; "enableAutoCountrySelect": { "alias": "enableAutoCountrySelect"; "required": false; }; "displayPlaceholder": { "alias": "displayPlaceholder"; "required": false; }; "customPlaceholder": { "alias": "customPlaceholder"; "required": false; }; "numberFormat": { "alias": "numberFormat"; "required": false; }; "displaySearchCountry": { "alias": "displaySearchCountry"; "required": false; }; "searchCountryField": { "alias": "searchCountryField"; "required": false; }; "searchCountryPlaceholder": { "alias": "searchCountryPlaceholder"; "required": false; }; "maxLength": { "alias": "maxLength"; "required": false; }; "selectFirstCountry": { "alias": "selectFirstCountry"; "required": false; }; "phoneValidation": { "alias": "phoneValidation"; "required": false; }; "inputId": { "alias": "inputId"; "required": false; }; "selectedCountryISO": { "alias": "selectedCountryISO"; "required": false; }; "separateDialCode": { "alias": "separateDialCode"; "required": false; }; "lang": { "alias": "lang"; "required": false; }; "appendTo": { "alias": "appendTo"; "required": false; "isSignal": true; }; "disabled": { "alias": "disabled"; "required": false; }; }, { "countryChange": "countryChange"; }, never, never, true, never>;
}
//# sourceMappingURL=p-intl-input-tel.component.d.ts.map