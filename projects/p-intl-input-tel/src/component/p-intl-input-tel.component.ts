import * as lpn from 'google-libphonenumber';
import { PhoneNumber, PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';

import {
    Component,
    EventEmitter,
    forwardRef,
    input,
    Input,
    InputSignal,
    OnChanges,
    Output,
    signal,
    SimpleChange,
    SimpleChanges,
    WritableSignal,
} from '@angular/core';
import { FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

import { CountryISO } from '../model/country-iso.enum';
import { SearchCountryField } from '../model/search-country-field';
import { Country } from '../model/country.model';
import { BehaviorSubject } from 'rxjs';
import { LocalPhoneUtils } from "../utils/local-phone-utils";
import { ChangeData } from "../model/change-data";
import { ALL_COUNTRIES } from "../data/country-code";
import { phoneNumberValidator } from "../validator/p-intl-input-tel.validator";
import { DropdownModule } from 'primeng/dropdown';
import { DialCodePipe } from '../pipe/dialCode.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { FavoriteElementInjectorDirective } from '../directives/favorite-element-injector.directive';
import { NativeElementInjectorDirective } from '../directives/native-element-injector.directive';
import { FilterPipe } from '../pipe/filter.pipe';

@Component({
    selector: 'p-intl-tel-input',
    templateUrl: 'p-intl-input-tel.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => IntlInputTelComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useValue: phoneNumberValidator,
            multi: true,
        },
    ],
    standalone: true,
    imports: [ DropdownModule, InputTextModule, FormsModule, ReactiveFormsModule, DialCodePipe, FilterPipe,
        FavoriteElementInjectorDirective, NativeElementInjectorDirective ]
})
export class IntlInputTelComponent implements OnChanges {
    // Custom css classes
    @Input() cssClass = 'form-control';
    @Input() favoriteCountries: string[] = [];
    // User option to display only some countries
    @Input() onlyCountries: string [] = [];
    // If true, the country will be set automatically if the user fill the region code
    @Input() enableAutoCountrySelect = true;
    @Input() displayPlaceholder = true;
    @Input() customPlaceholder: string;
    @Input() numberFormat: PhoneNumberFormat = PhoneNumberFormat.INTERNATIONAL;
    // Flag to display or not the input search for countries
    @Input() displaySearchCountry = true;
    // Search country property
    @Input() searchCountryField: SearchCountryField[] = [ SearchCountryField.NAME ];
    @Input() searchCountryPlaceholder = 'Search Country';
    @Input() maxLength: number;
    // User option to select by default the first item of the list, default true
    @Input() selectFirstCountry = true;
    // Allow or not the phone validation form
    @Input() phoneValidation = true;
    // Customize the input id
    @Input() inputId = 'phone';
    @Input() selectedCountryISO: CountryISO;
    @Input() separateDialCode = false;
    // Set the language for search and display name country
    @Input() lang = 'fr';
    appendTo: InputSignal<any | null> = input(null);

    @Input() set disabled(value: boolean) {
        this.setDisabledState(value)
    }

    @Output() readonly countryChange = new EventEmitter<Country>();

    public readonly SearchCountryField = SearchCountryField;
    public phoneUtil: PhoneNumberUtil = lpn.PhoneNumberUtil.getInstance();

    public selectedCountry: WritableSignal<Country> = signal<Country>(new Country());
    public countries: Country[] = [];
    public phoneNumber$ = new BehaviorSubject<PhoneNumber>(new PhoneNumber);
    public phoneNumberControl = new FormControl('');

    public onTouched = () => {
    };

    public propagateChange = (_: string) => {
    };

    private get favorites(): Country[] {
        return this.countries.filter(c => c.isFavorite);
    }

    constructor() {
        this.phoneNumberControl.valueChanges.subscribe(value => {
            this.onPhoneNumberChange(value);
        })
        this.phoneNumber$.subscribe((phoneNumber: PhoneNumber) => {
            this.propagateChange(this.phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL));
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.isSelectedCountryChanged(changes['selectedCountryISO']) && !changes['selectedCountryISO'].firstChange) this.updateSelectedCountry();
        if( changes['favoriteCountries'] && !changes['favoriteCountries'].firstChange) this.onFavoriteCountriesChanged();
    }

    public init(): void {
        this.fetchCountryData();
        if( this.onlyCountries.length ) this.countries = this.countries.filter((c) => this.onlyCountries.includes(c.iso2))
        this.updateSelectedCountry();
    }

    /* --------------------------------- Events management -------------------------------- */

    public onPhoneNumberChange(value?: any): void {
        const currentCountryCode = this.selectedCountry().iso2;
        const number = LocalPhoneUtils.getParsedNumber(value, currentCountryCode);

        // Auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if( this.enableAutoCountrySelect ){
            const countryCode = LocalPhoneUtils.getCountryIsoCode(number, number?.getCountryCode()) || currentCountryCode;
            if( countryCode && countryCode !== this.selectedCountry().iso2 ){
                const newCountry = this.countries
                    .sort((a, b) => a.priority - b.priority)
                    .find((c) => c.iso2 === countryCode);
                if( newCountry ) this.setSelectedCountry(newCountry);
            }
        }

        this.phoneNumber$.next(number);
    }

    public onCountrySelect(country: Country, el?: { focus: () => void; }): void {
        let number: PhoneNumber = new PhoneNumber();
        if( country !== this.selectedCountry() ) this.setSelectedCountry(country);

        const currentValue = this.phoneNumberControl.value;
        if( currentValue ) number = LocalPhoneUtils.getParsedNumber(currentValue, this.selectedCountry().iso2)

        this.phoneNumber$.next(number)

        setTimeout(() => el?.focus(), 100)
    }

    private onFavoriteCountriesChanged(): void {
        this.fetchCountryData();
        this.onCountrySelect(this.selectedCountry());
    }

    public onInputKeyPress(event: KeyboardEvent): void {
        const allowedChars = /[0-9\+\-\(\)\ ]/;
        const allowedCtrlChars = /[axcv]/; // Allows copy-pasting
        const allowedOtherKeys = [
            'ArrowLeft',
            'ArrowUp',
            'ArrowRight',
            'ArrowDown',
            'Home',
            'End',
            'Insert',
            'Delete',
            'Backspace',
            'Tab'
        ];

        if( !allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !allowedOtherKeys.includes(event.key) ) event.preventDefault();
    }

    /* --------------------------------- Overwrite NG_VALUE_ACCESSOR -------------------------------- */

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        isDisabled ? this.phoneNumberControl.disable() : this.phoneNumberControl.enable();
    }

    writeValue(obj: string): void {
        this.init();
        const phoneNumber: ChangeData = LocalPhoneUtils.getChangeData(obj);
        this.setSelectedCountry(this.countries.find(c => c.iso2.toUpperCase() === phoneNumber.countryCode));
        this.phoneNumberControl.setValue(phoneNumber.number || '')
    }

    /* --------------------------------- Helpers -------------------------------- */

    protected fetchCountryData(): void {
        const regionsNames = new Intl.DisplayNames([ this.lang ], {
            type: 'region',
        });
        this.countries = ALL_COUNTRIES.map(country => ({
            name: regionsNames.of(country[1].toString()?.toUpperCase()) || '',
            iso2: country[1].toString(),
            dialCode: country[2].toString(),
            priority: +country[3] || 0,
            areaCodes: (country[4] as string[]) || undefined,
            htmlId: `item-${country[1].toString()}`,
            flagClass: `iti__flag iti__${country[1].toString().toLocaleLowerCase()}`,
            placeHolder: this.getPlaceholder(country[1].toString().toUpperCase()),
            isFavorite: this.favoriteCountries.includes(country[1].toString())
        })).sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));

        if( this.selectFirstCountry ){
            const country = this.favoriteCountries.length ? this.favorites[0] : this.countries[0];
            this.setSelectedCountry(country);
        }
    }

    /**
     * Updates selectedCountry.
     */
    private updateSelectedCountry() {
        if( !this.selectedCountryISO ) return;
        const countrySelected = this.countries.find((c) => c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase())
        this.setSelectedCountry(countrySelected);
    }

    private setSelectedCountry(country?: Country): void {
        if( !country ) return;
        this.selectedCountry.set(country);
        this.countryChange.emit(country);
    }

    private isSelectedCountryChanged(selectedISO: SimpleChange): boolean {
        return this.countries && selectedISO && selectedISO.currentValue !== selectedISO.previousValue;
    }

    private getPlaceholder(countryCode: string): string {
        if( !this.displayPlaceholder ) return '';
        if( this.customPlaceholder ) return this.customPlaceholder;
        const placeholder = LocalPhoneUtils.getPhoneNumberPlaceHolder(this.numberFormat, countryCode);
        if( this.separateDialCode && this.numberFormat === PhoneNumberFormat.INTERNATIONAL ) return LocalPhoneUtils.getChangeData(placeholder).number || '';
        return placeholder
    }
}
