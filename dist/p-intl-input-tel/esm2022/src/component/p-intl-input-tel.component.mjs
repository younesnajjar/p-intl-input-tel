import * as lpn from 'google-libphonenumber';
import { PhoneNumber, PhoneNumberFormat } from 'google-libphonenumber';
import { Component, EventEmitter, forwardRef, input, Input, Output, signal, } from '@angular/core';
import { FormControl, FormsModule, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { SearchCountryField } from '../model/search-country-field';
import { Country } from '../model/country.model';
import { BehaviorSubject } from 'rxjs';
import { LocalPhoneUtils } from "../utils/local-phone-utils";
import { ALL_COUNTRIES } from "../data/country-code";
import { phoneNumberValidator } from "../validator/p-intl-input-tel.validator";
import { DropdownModule } from 'primeng/dropdown';
import { DialCodePipe } from '../pipe/dialCode.pipe';
import { InputTextModule } from 'primeng/inputtext';
import { FavoriteElementInjectorDirective } from '../directives/favorite-element-injector.directive';
import { NativeElementInjectorDirective } from '../directives/native-element-injector.directive';
import { FilterPipe } from '../pipe/filter.pipe';
import * as i0 from "@angular/core";
import * as i1 from "primeng/dropdown";
import * as i2 from "primeng/api";
import * as i3 from "primeng/inputtext";
import * as i4 from "@angular/forms";
export class IntlInputTelComponent {
    // Custom css classes
    cssClass = 'form-control';
    favoriteCountries = [];
    // User option to display only some countries
    onlyCountries = [];
    // If true, the country will be set automatically if the user fill the region code
    enableAutoCountrySelect = true;
    displayPlaceholder = true;
    customPlaceholder;
    numberFormat = PhoneNumberFormat.INTERNATIONAL;
    // Flag to display or not the input search for countries
    displaySearchCountry = true;
    // Search country property
    searchCountryField = [SearchCountryField.NAME];
    searchCountryPlaceholder = 'Search Country';
    maxLength;
    // User option to select by default the first item of the list, default true
    selectFirstCountry = true;
    // Allow or not the phone validation form
    phoneValidation = true;
    // Customize the input id
    inputId = 'phone';
    selectedCountryISO;
    separateDialCode = false;
    // Set the language for search and display name country
    lang = 'fr';
    appendTo = input(null);
    set disabled(value) {
        this.setDisabledState(value);
    }
    countryChange = new EventEmitter();
    SearchCountryField = SearchCountryField;
    phoneUtil = lpn.PhoneNumberUtil.getInstance();
    selectedCountry = signal(new Country());
    countries = [];
    phoneNumber$ = new BehaviorSubject(new PhoneNumber);
    phoneNumberControl = new FormControl('');
    onTouched = () => {
    };
    propagateChange = (_) => {
    };
    get favorites() {
        return this.countries.filter(c => c.isFavorite);
    }
    constructor() {
        this.phoneNumberControl.valueChanges.subscribe(value => {
            this.onPhoneNumberChange(value);
        });
        this.phoneNumber$.subscribe((phoneNumber) => {
            this.propagateChange(this.phoneUtil.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL));
        });
    }
    ngOnChanges(changes) {
        if (this.isSelectedCountryChanged(changes['selectedCountryISO']) && !changes['selectedCountryISO'].firstChange)
            this.updateSelectedCountry();
        if (changes['favoriteCountries'] && !changes['favoriteCountries'].firstChange)
            this.onFavoriteCountriesChanged();
    }
    init() {
        this.fetchCountryData();
        if (this.onlyCountries.length)
            this.countries = this.countries.filter((c) => this.onlyCountries.includes(c.iso2));
        this.updateSelectedCountry();
    }
    /* --------------------------------- Events management -------------------------------- */
    onPhoneNumberChange(value) {
        const currentCountryCode = this.selectedCountry().iso2;
        const number = LocalPhoneUtils.getParsedNumber(value, currentCountryCode);
        // Auto select country based on the extension (and areaCode if needed) (e.g select Canada if number starts with +1 416)
        if (this.enableAutoCountrySelect) {
            const countryCode = LocalPhoneUtils.getCountryIsoCode(number, number?.getCountryCode()) || currentCountryCode;
            if (countryCode && countryCode !== this.selectedCountry().iso2) {
                const newCountry = this.countries
                    .sort((a, b) => a.priority - b.priority)
                    .find((c) => c.iso2 === countryCode);
                if (newCountry)
                    this.setSelectedCountry(newCountry);
            }
        }
        this.phoneNumber$.next(number);
    }
    onCountrySelect(country, el) {
        let number = new PhoneNumber();
        if (country !== this.selectedCountry())
            this.setSelectedCountry(country);
        const currentValue = this.phoneNumberControl.value;
        if (currentValue)
            number = LocalPhoneUtils.getParsedNumber(currentValue, this.selectedCountry().iso2);
        this.phoneNumber$.next(number);
        setTimeout(() => el?.focus(), 100);
    }
    onFavoriteCountriesChanged() {
        this.fetchCountryData();
        this.onCountrySelect(this.selectedCountry());
    }
    onInputKeyPress(event) {
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
        if (!allowedChars.test(event.key)
            && !(event.ctrlKey && allowedCtrlChars.test(event.key))
            && !allowedOtherKeys.includes(event.key))
            event.preventDefault();
    }
    /* --------------------------------- Overwrite NG_VALUE_ACCESSOR -------------------------------- */
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        isDisabled ? this.phoneNumberControl.disable() : this.phoneNumberControl.enable();
    }
    writeValue(obj) {
        this.init();
        const phoneNumber = LocalPhoneUtils.getChangeData(obj);
        this.setSelectedCountry(this.countries.find(c => c.iso2.toUpperCase() === phoneNumber.countryCode));
        this.phoneNumberControl.setValue(phoneNumber.number || '');
    }
    /* --------------------------------- Helpers -------------------------------- */
    fetchCountryData() {
        const regionsNames = new Intl.DisplayNames([this.lang], {
            type: 'region',
        });
        this.countries = ALL_COUNTRIES.map(country => ({
            name: regionsNames.of(country[1].toString()?.toUpperCase()) || '',
            iso2: country[1].toString(),
            dialCode: country[2].toString(),
            priority: +country[3] || 0,
            areaCodes: country[4] || undefined,
            htmlId: `item-${country[1].toString()}`,
            flagClass: `iti__flag iti__${country[1].toString().toLocaleLowerCase()}`,
            placeHolder: this.getPlaceholder(country[1].toString().toUpperCase()),
            isFavorite: this.favoriteCountries.includes(country[1].toString())
        })).sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
        if (this.selectFirstCountry) {
            const country = this.favoriteCountries.length ? this.favorites[0] : this.countries[0];
            this.setSelectedCountry(country);
        }
    }
    /**
     * Updates selectedCountry.
     */
    updateSelectedCountry() {
        if (!this.selectedCountryISO)
            return;
        const countrySelected = this.countries.find((c) => c.iso2.toLowerCase() === this.selectedCountryISO.toLowerCase());
        this.setSelectedCountry(countrySelected);
    }
    setSelectedCountry(country) {
        if (!country)
            return;
        this.selectedCountry.set(country);
        this.countryChange.emit(country);
    }
    isSelectedCountryChanged(selectedISO) {
        return this.countries && selectedISO && selectedISO.currentValue !== selectedISO.previousValue;
    }
    getPlaceholder(countryCode) {
        if (!this.displayPlaceholder)
            return '';
        if (this.customPlaceholder)
            return this.customPlaceholder;
        const placeholder = LocalPhoneUtils.getPhoneNumberPlaceHolder(this.numberFormat, countryCode);
        if (this.separateDialCode && this.numberFormat === PhoneNumberFormat.INTERNATIONAL)
            return LocalPhoneUtils.getChangeData(placeholder).number || '';
        return placeholder;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: IntlInputTelComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "18.2.0", type: IntlInputTelComponent, isStandalone: true, selector: "p-intl-tel-input", inputs: { cssClass: { classPropertyName: "cssClass", publicName: "cssClass", isSignal: false, isRequired: false, transformFunction: null }, favoriteCountries: { classPropertyName: "favoriteCountries", publicName: "favoriteCountries", isSignal: false, isRequired: false, transformFunction: null }, onlyCountries: { classPropertyName: "onlyCountries", publicName: "onlyCountries", isSignal: false, isRequired: false, transformFunction: null }, enableAutoCountrySelect: { classPropertyName: "enableAutoCountrySelect", publicName: "enableAutoCountrySelect", isSignal: false, isRequired: false, transformFunction: null }, displayPlaceholder: { classPropertyName: "displayPlaceholder", publicName: "displayPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, customPlaceholder: { classPropertyName: "customPlaceholder", publicName: "customPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, numberFormat: { classPropertyName: "numberFormat", publicName: "numberFormat", isSignal: false, isRequired: false, transformFunction: null }, displaySearchCountry: { classPropertyName: "displaySearchCountry", publicName: "displaySearchCountry", isSignal: false, isRequired: false, transformFunction: null }, searchCountryField: { classPropertyName: "searchCountryField", publicName: "searchCountryField", isSignal: false, isRequired: false, transformFunction: null }, searchCountryPlaceholder: { classPropertyName: "searchCountryPlaceholder", publicName: "searchCountryPlaceholder", isSignal: false, isRequired: false, transformFunction: null }, maxLength: { classPropertyName: "maxLength", publicName: "maxLength", isSignal: false, isRequired: false, transformFunction: null }, selectFirstCountry: { classPropertyName: "selectFirstCountry", publicName: "selectFirstCountry", isSignal: false, isRequired: false, transformFunction: null }, phoneValidation: { classPropertyName: "phoneValidation", publicName: "phoneValidation", isSignal: false, isRequired: false, transformFunction: null }, inputId: { classPropertyName: "inputId", publicName: "inputId", isSignal: false, isRequired: false, transformFunction: null }, selectedCountryISO: { classPropertyName: "selectedCountryISO", publicName: "selectedCountryISO", isSignal: false, isRequired: false, transformFunction: null }, separateDialCode: { classPropertyName: "separateDialCode", publicName: "separateDialCode", isSignal: false, isRequired: false, transformFunction: null }, lang: { classPropertyName: "lang", publicName: "lang", isSignal: false, isRequired: false, transformFunction: null }, appendTo: { classPropertyName: "appendTo", publicName: "appendTo", isSignal: true, isRequired: false, transformFunction: null }, disabled: { classPropertyName: "disabled", publicName: "disabled", isSignal: false, isRequired: false, transformFunction: null } }, outputs: { countryChange: "countryChange" }, providers: [
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
        ], usesOnChanges: true, ngImport: i0, template: "<div class=\"p-inputgroup\">\n    <p-dropdown class=\"p-inputgroup-addon\" [options]=\"countries\" [filter]=\"true\" [filterFields]=\"searchCountryField\" [resetFilterOnHide]=\"true\"\n                [disabled]=\"phoneNumberControl.disabled\" panelStyleClass=\"fixWidth\" [class.withoutDialCode]=\"!separateDialCode\"\n                [ngModel]=\"selectedCountry()\" (onChange)=\"onCountrySelect($event.value, input)\"\n                [appendTo]=\"appendTo()\">\n        <ng-template pTemplate=\"selectedItem\">\n            <div class=\"flex align-items-center gap-2\">\n                <div id=\"flag\" [class]=\"selectedCountry().flagClass\"></div>\n                @if (separateDialCode) {\n                    <span id=\"dialcode\" class=\"ms-2\">{{ selectedCountry().dialCode | dialCode }}</span>\n                }\n            </div>\n        </ng-template>\n\n        <ng-template let-country pTemplate=\"item\" class=\"test\">\n            <div class=\"flex align-items-center gap-2 w-full\" [class.favorite]=\"country.isFavorite\" favorite>\n                <div [class]=\"country.flagClass\"></div>\n                <span>{{ country.name }}</span>\n                <span>{{ country.dialCode | dialCode }}</span>\n            </div>\n        </ng-template>\n    </p-dropdown>\n\n    <input pInputText #input class=\"form-control\" type=\"tel\" [id]=\"inputId\" autocomplete=\"off\" (blur)=\"onTouched()\"\n           [placeholder]=\"this.selectedCountry().placeHolder\" [formControl]=\"phoneNumberControl\" (keydown)=\"onInputKeyPress($event)\"\n           [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\">\n</div>\n", dependencies: [{ kind: "ngmodule", type: DropdownModule }, { kind: "component", type: i1.Dropdown, selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "loadingIcon", "filterPlaceholder", "filterLocale", "variant", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "checkmark", "dropdownIcon", "loading", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i2.PrimeTemplate, selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "ngmodule", type: InputTextModule }, { kind: "directive", type: i3.InputText, selector: "[pInputText]", inputs: ["variant"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i4.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { kind: "pipe", type: DialCodePipe, name: "dialCode" }, { kind: "directive", type: FavoriteElementInjectorDirective, selector: "[favorite]" }, { kind: "directive", type: NativeElementInjectorDirective, selector: "[ngModel], [formControl], [formControlName]" }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: IntlInputTelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'p-intl-tel-input', providers: [
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
                    ], standalone: true, imports: [DropdownModule, InputTextModule, FormsModule, ReactiveFormsModule, DialCodePipe, FilterPipe,
                        FavoriteElementInjectorDirective, NativeElementInjectorDirective], template: "<div class=\"p-inputgroup\">\n    <p-dropdown class=\"p-inputgroup-addon\" [options]=\"countries\" [filter]=\"true\" [filterFields]=\"searchCountryField\" [resetFilterOnHide]=\"true\"\n                [disabled]=\"phoneNumberControl.disabled\" panelStyleClass=\"fixWidth\" [class.withoutDialCode]=\"!separateDialCode\"\n                [ngModel]=\"selectedCountry()\" (onChange)=\"onCountrySelect($event.value, input)\"\n                [appendTo]=\"appendTo()\">\n        <ng-template pTemplate=\"selectedItem\">\n            <div class=\"flex align-items-center gap-2\">\n                <div id=\"flag\" [class]=\"selectedCountry().flagClass\"></div>\n                @if (separateDialCode) {\n                    <span id=\"dialcode\" class=\"ms-2\">{{ selectedCountry().dialCode | dialCode }}</span>\n                }\n            </div>\n        </ng-template>\n\n        <ng-template let-country pTemplate=\"item\" class=\"test\">\n            <div class=\"flex align-items-center gap-2 w-full\" [class.favorite]=\"country.isFavorite\" favorite>\n                <div [class]=\"country.flagClass\"></div>\n                <span>{{ country.name }}</span>\n                <span>{{ country.dialCode | dialCode }}</span>\n            </div>\n        </ng-template>\n    </p-dropdown>\n\n    <input pInputText #input class=\"form-control\" type=\"tel\" [id]=\"inputId\" autocomplete=\"off\" (blur)=\"onTouched()\"\n           [placeholder]=\"this.selectedCountry().placeHolder\" [formControl]=\"phoneNumberControl\" (keydown)=\"onInputKeyPress($event)\"\n           [attr.maxLength]=\"maxLength\" [attr.validation]=\"phoneValidation\">\n</div>\n" }]
        }], ctorParameters: () => [], propDecorators: { cssClass: [{
                type: Input
            }], favoriteCountries: [{
                type: Input
            }], onlyCountries: [{
                type: Input
            }], enableAutoCountrySelect: [{
                type: Input
            }], displayPlaceholder: [{
                type: Input
            }], customPlaceholder: [{
                type: Input
            }], numberFormat: [{
                type: Input
            }], displaySearchCountry: [{
                type: Input
            }], searchCountryField: [{
                type: Input
            }], searchCountryPlaceholder: [{
                type: Input
            }], maxLength: [{
                type: Input
            }], selectFirstCountry: [{
                type: Input
            }], phoneValidation: [{
                type: Input
            }], inputId: [{
                type: Input
            }], selectedCountryISO: [{
                type: Input
            }], separateDialCode: [{
                type: Input
            }], lang: [{
                type: Input
            }], disabled: [{
                type: Input
            }], countryChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicC1pbnRsLWlucHV0LXRlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy9jb21wb25lbnQvcC1pbnRsLWlucHV0LXRlbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy9jb21wb25lbnQvcC1pbnRsLWlucHV0LXRlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQW1CLE1BQU0sdUJBQXVCLENBQUM7QUFFeEYsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFDTCxLQUFLLEVBR0wsTUFBTSxFQUNOLE1BQU0sR0FJVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUdqSCxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDakQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUN2QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFN0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sdUJBQXVC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QkFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsc0JBQXNCLENBQUM7NEJBQ3BELEtBQUssRUFBRSxJQUFJO3lCQUNkO3dCQUNEOzRCQUNJLE9BQU8sRUFBRSxhQUFhOzRCQUN0QixRQUFRLEVBQUUsb0JBQW9COzRCQUM5QixLQUFLLEVBQUUsSUFBSTt5QkFDZDtxQkFDSixjQUNXLElBQUksV0FDUCxDQUFFLGNBQWMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLFlBQVksRUFBRSxVQUFVO3dCQUNsRyxnQ0FBZ0MsRUFBRSw4QkFBOEIsQ0FBRTt3REFJN0QsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUs7Z0JBRUcsYUFBYTtzQkFBckIsS0FBSztnQkFFRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUVHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFFRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsa0JBQWtCO3NCQUExQixLQUFLO2dCQUVHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBRUcsSUFBSTtzQkFBWixLQUFLO2dCQUdPLFFBQVE7c0JBQXBCLEtBQUs7Z0JBSWEsYUFBYTtzQkFBL0IsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxwbiBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuaW1wb3J0IHsgUGhvbmVOdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LCBQaG9uZU51bWJlclV0aWwgfSBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCxcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgZm9yd2FyZFJlZixcbiAgICBpbnB1dCxcbiAgICBJbnB1dCxcbiAgICBJbnB1dFNpZ25hbCxcbiAgICBPbkNoYW5nZXMsXG4gICAgT3V0cHV0LFxuICAgIHNpZ25hbCxcbiAgICBTaW1wbGVDaGFuZ2UsXG4gICAgU2ltcGxlQ2hhbmdlcyxcbiAgICBXcml0YWJsZVNpZ25hbCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCwgRm9ybXNNb2R1bGUsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDb3VudHJ5SVNPIH0gZnJvbSAnLi4vbW9kZWwvY291bnRyeS1pc28uZW51bSc7XG5pbXBvcnQgeyBTZWFyY2hDb3VudHJ5RmllbGQgfSBmcm9tICcuLi9tb2RlbC9zZWFyY2gtY291bnRyeS1maWVsZCc7XG5pbXBvcnQgeyBDb3VudHJ5IH0gZnJvbSAnLi4vbW9kZWwvY291bnRyeS5tb2RlbCc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvY2FsUGhvbmVVdGlscyB9IGZyb20gXCIuLi91dGlscy9sb2NhbC1waG9uZS11dGlsc1wiO1xuaW1wb3J0IHsgQ2hhbmdlRGF0YSB9IGZyb20gXCIuLi9tb2RlbC9jaGFuZ2UtZGF0YVwiO1xuaW1wb3J0IHsgQUxMX0NPVU5UUklFUyB9IGZyb20gXCIuLi9kYXRhL2NvdW50cnktY29kZVwiO1xuaW1wb3J0IHsgcGhvbmVOdW1iZXJWYWxpZGF0b3IgfSBmcm9tIFwiLi4vdmFsaWRhdG9yL3AtaW50bC1pbnB1dC10ZWwudmFsaWRhdG9yXCI7XG5pbXBvcnQgeyBEcm9wZG93bk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvZHJvcGRvd24nO1xuaW1wb3J0IHsgRGlhbENvZGVQaXBlIH0gZnJvbSAnLi4vcGlwZS9kaWFsQ29kZS5waXBlJztcbmltcG9ydCB7IElucHV0VGV4dE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvaW5wdXR0ZXh0JztcbmltcG9ydCB7IEZhdm9yaXRlRWxlbWVudEluamVjdG9yRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9mYXZvcml0ZS1lbGVtZW50LWluamVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXRpdmVFbGVtZW50SW5qZWN0b3JEaXJlY3RpdmUgfSBmcm9tICcuLi9kaXJlY3RpdmVzL25hdGl2ZS1lbGVtZW50LWluamVjdG9yLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBGaWx0ZXJQaXBlIH0gZnJvbSAnLi4vcGlwZS9maWx0ZXIucGlwZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnRsLXRlbC1pbnB1dCcsXG4gICAgdGVtcGxhdGVVcmw6ICdwLWludGwtaW5wdXQtdGVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICAgICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBJbnRsSW5wdXRUZWxDb21wb25lbnQpLFxuICAgICAgICAgICAgbXVsdGk6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgICAgICAgICB1c2VWYWx1ZTogcGhvbmVOdW1iZXJWYWxpZGF0b3IsXG4gICAgICAgICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICBdLFxuICAgIHN0YW5kYWxvbmU6IHRydWUsXG4gICAgaW1wb3J0czogWyBEcm9wZG93bk1vZHVsZSwgSW5wdXRUZXh0TW9kdWxlLCBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSwgRGlhbENvZGVQaXBlLCBGaWx0ZXJQaXBlLFxuICAgICAgICBGYXZvcml0ZUVsZW1lbnRJbmplY3RvckRpcmVjdGl2ZSwgTmF0aXZlRWxlbWVudEluamVjdG9yRGlyZWN0aXZlIF1cbn0pXG5leHBvcnQgY2xhc3MgSW50bElucHV0VGVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgICAvLyBDdXN0b20gY3NzIGNsYXNzZXNcbiAgICBASW5wdXQoKSBjc3NDbGFzcyA9ICdmb3JtLWNvbnRyb2wnO1xuICAgIEBJbnB1dCgpIGZhdm9yaXRlQ291bnRyaWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIC8vIFVzZXIgb3B0aW9uIHRvIGRpc3BsYXkgb25seSBzb21lIGNvdW50cmllc1xuICAgIEBJbnB1dCgpIG9ubHlDb3VudHJpZXM6IHN0cmluZyBbXSA9IFtdO1xuICAgIC8vIElmIHRydWUsIHRoZSBjb3VudHJ5IHdpbGwgYmUgc2V0IGF1dG9tYXRpY2FsbHkgaWYgdGhlIHVzZXIgZmlsbCB0aGUgcmVnaW9uIGNvZGVcbiAgICBASW5wdXQoKSBlbmFibGVBdXRvQ291bnRyeVNlbGVjdCA9IHRydWU7XG4gICAgQElucHV0KCkgZGlzcGxheVBsYWNlaG9sZGVyID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBjdXN0b21QbGFjZWhvbGRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIG51bWJlckZvcm1hdDogUGhvbmVOdW1iZXJGb3JtYXQgPSBQaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMO1xuICAgIC8vIEZsYWcgdG8gZGlzcGxheSBvciBub3QgdGhlIGlucHV0IHNlYXJjaCBmb3IgY291bnRyaWVzXG4gICAgQElucHV0KCkgZGlzcGxheVNlYXJjaENvdW50cnkgPSB0cnVlO1xuICAgIC8vIFNlYXJjaCBjb3VudHJ5IHByb3BlcnR5XG4gICAgQElucHV0KCkgc2VhcmNoQ291bnRyeUZpZWxkOiBTZWFyY2hDb3VudHJ5RmllbGRbXSA9IFsgU2VhcmNoQ291bnRyeUZpZWxkLk5BTUUgXTtcbiAgICBASW5wdXQoKSBzZWFyY2hDb3VudHJ5UGxhY2Vob2xkZXIgPSAnU2VhcmNoIENvdW50cnknO1xuICAgIEBJbnB1dCgpIG1heExlbmd0aDogbnVtYmVyO1xuICAgIC8vIFVzZXIgb3B0aW9uIHRvIHNlbGVjdCBieSBkZWZhdWx0IHRoZSBmaXJzdCBpdGVtIG9mIHRoZSBsaXN0LCBkZWZhdWx0IHRydWVcbiAgICBASW5wdXQoKSBzZWxlY3RGaXJzdENvdW50cnkgPSB0cnVlO1xuICAgIC8vIEFsbG93IG9yIG5vdCB0aGUgcGhvbmUgdmFsaWRhdGlvbiBmb3JtXG4gICAgQElucHV0KCkgcGhvbmVWYWxpZGF0aW9uID0gdHJ1ZTtcbiAgICAvLyBDdXN0b21pemUgdGhlIGlucHV0IGlkXG4gICAgQElucHV0KCkgaW5wdXRJZCA9ICdwaG9uZSc7XG4gICAgQElucHV0KCkgc2VsZWN0ZWRDb3VudHJ5SVNPOiBDb3VudHJ5SVNPO1xuICAgIEBJbnB1dCgpIHNlcGFyYXRlRGlhbENvZGUgPSBmYWxzZTtcbiAgICAvLyBTZXQgdGhlIGxhbmd1YWdlIGZvciBzZWFyY2ggYW5kIGRpc3BsYXkgbmFtZSBjb3VudHJ5XG4gICAgQElucHV0KCkgbGFuZyA9ICdmcic7XG4gICAgYXBwZW5kVG86IElucHV0U2lnbmFsPGFueSB8IG51bGw+ID0gaW5wdXQobnVsbCk7XG5cbiAgICBASW5wdXQoKSBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5zZXREaXNhYmxlZFN0YXRlKHZhbHVlKVxuICAgIH1cblxuICAgIEBPdXRwdXQoKSByZWFkb25seSBjb3VudHJ5Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxDb3VudHJ5PigpO1xuXG4gICAgcHVibGljIHJlYWRvbmx5IFNlYXJjaENvdW50cnlGaWVsZCA9IFNlYXJjaENvdW50cnlGaWVsZDtcbiAgICBwdWJsaWMgcGhvbmVVdGlsOiBQaG9uZU51bWJlclV0aWwgPSBscG4uUGhvbmVOdW1iZXJVdGlsLmdldEluc3RhbmNlKCk7XG5cbiAgICBwdWJsaWMgc2VsZWN0ZWRDb3VudHJ5OiBXcml0YWJsZVNpZ25hbDxDb3VudHJ5PiA9IHNpZ25hbDxDb3VudHJ5PihuZXcgQ291bnRyeSgpKTtcbiAgICBwdWJsaWMgY291bnRyaWVzOiBDb3VudHJ5W10gPSBbXTtcbiAgICBwdWJsaWMgcGhvbmVOdW1iZXIkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxQaG9uZU51bWJlcj4obmV3IFBob25lTnVtYmVyKTtcbiAgICBwdWJsaWMgcGhvbmVOdW1iZXJDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCcnKTtcblxuICAgIHB1YmxpYyBvblRvdWNoZWQgPSAoKSA9PiB7XG4gICAgfTtcblxuICAgIHB1YmxpYyBwcm9wYWdhdGVDaGFuZ2UgPSAoXzogc3RyaW5nKSA9PiB7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0IGZhdm9yaXRlcygpOiBDb3VudHJ5W10ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3VudHJpZXMuZmlsdGVyKGMgPT4gYy5pc0Zhdm9yaXRlKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5waG9uZU51bWJlckNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uUGhvbmVOdW1iZXJDaGFuZ2UodmFsdWUpO1xuICAgICAgICB9KVxuICAgICAgICB0aGlzLnBob25lTnVtYmVyJC5zdWJzY3JpYmUoKHBob25lTnVtYmVyOiBQaG9uZU51bWJlcikgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5waG9uZVV0aWwuZm9ybWF0KHBob25lTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5JTlRFUk5BVElPTkFMKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTZWxlY3RlZENvdW50cnlDaGFuZ2VkKGNoYW5nZXNbJ3NlbGVjdGVkQ291bnRyeUlTTyddKSAmJiAhY2hhbmdlc1snc2VsZWN0ZWRDb3VudHJ5SVNPJ10uZmlyc3RDaGFuZ2UpIHRoaXMudXBkYXRlU2VsZWN0ZWRDb3VudHJ5KCk7XG4gICAgICAgIGlmKCBjaGFuZ2VzWydmYXZvcml0ZUNvdW50cmllcyddICYmICFjaGFuZ2VzWydmYXZvcml0ZUNvdW50cmllcyddLmZpcnN0Q2hhbmdlKSB0aGlzLm9uRmF2b3JpdGVDb3VudHJpZXNDaGFuZ2VkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmV0Y2hDb3VudHJ5RGF0YSgpO1xuICAgICAgICBpZiggdGhpcy5vbmx5Q291bnRyaWVzLmxlbmd0aCApIHRoaXMuY291bnRyaWVzID0gdGhpcy5jb3VudHJpZXMuZmlsdGVyKChjKSA9PiB0aGlzLm9ubHlDb3VudHJpZXMuaW5jbHVkZXMoYy5pc28yKSlcbiAgICAgICAgdGhpcy51cGRhdGVTZWxlY3RlZENvdW50cnkoKTtcbiAgICB9XG5cbiAgICAvKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRXZlbnRzIG1hbmFnZW1lbnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIHB1YmxpYyBvblBob25lTnVtYmVyQ2hhbmdlKHZhbHVlPzogYW55KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRDb3VudHJ5Q29kZSA9IHRoaXMuc2VsZWN0ZWRDb3VudHJ5KCkuaXNvMjtcbiAgICAgICAgY29uc3QgbnVtYmVyID0gTG9jYWxQaG9uZVV0aWxzLmdldFBhcnNlZE51bWJlcih2YWx1ZSwgY3VycmVudENvdW50cnlDb2RlKTtcblxuICAgICAgICAvLyBBdXRvIHNlbGVjdCBjb3VudHJ5IGJhc2VkIG9uIHRoZSBleHRlbnNpb24gKGFuZCBhcmVhQ29kZSBpZiBuZWVkZWQpIChlLmcgc2VsZWN0IENhbmFkYSBpZiBudW1iZXIgc3RhcnRzIHdpdGggKzEgNDE2KVxuICAgICAgICBpZiggdGhpcy5lbmFibGVBdXRvQ291bnRyeVNlbGVjdCApe1xuICAgICAgICAgICAgY29uc3QgY291bnRyeUNvZGUgPSBMb2NhbFBob25lVXRpbHMuZ2V0Q291bnRyeUlzb0NvZGUobnVtYmVyLCBudW1iZXI/LmdldENvdW50cnlDb2RlKCkpIHx8IGN1cnJlbnRDb3VudHJ5Q29kZTtcbiAgICAgICAgICAgIGlmKCBjb3VudHJ5Q29kZSAmJiBjb3VudHJ5Q29kZSAhPT0gdGhpcy5zZWxlY3RlZENvdW50cnkoKS5pc28yICl7XG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q291bnRyeSA9IHRoaXMuY291bnRyaWVzXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChhLCBiKSA9PiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eSlcbiAgICAgICAgICAgICAgICAgICAgLmZpbmQoKGMpID0+IGMuaXNvMiA9PT0gY291bnRyeUNvZGUpO1xuICAgICAgICAgICAgICAgIGlmKCBuZXdDb3VudHJ5ICkgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkobmV3Q291bnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBob25lTnVtYmVyJC5uZXh0KG51bWJlcik7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ291bnRyeVNlbGVjdChjb3VudHJ5OiBDb3VudHJ5LCBlbD86IHsgZm9jdXM6ICgpID0+IHZvaWQ7IH0pOiB2b2lkIHtcbiAgICAgICAgbGV0IG51bWJlcjogUGhvbmVOdW1iZXIgPSBuZXcgUGhvbmVOdW1iZXIoKTtcbiAgICAgICAgaWYoIGNvdW50cnkgIT09IHRoaXMuc2VsZWN0ZWRDb3VudHJ5KCkgKSB0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcblxuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSB0aGlzLnBob25lTnVtYmVyQ29udHJvbC52YWx1ZTtcbiAgICAgICAgaWYoIGN1cnJlbnRWYWx1ZSApIG51bWJlciA9IExvY2FsUGhvbmVVdGlscy5nZXRQYXJzZWROdW1iZXIoY3VycmVudFZhbHVlLCB0aGlzLnNlbGVjdGVkQ291bnRyeSgpLmlzbzIpXG5cbiAgICAgICAgdGhpcy5waG9uZU51bWJlciQubmV4dChudW1iZXIpXG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbD8uZm9jdXMoKSwgMTAwKVxuICAgIH1cblxuICAgIHByaXZhdGUgb25GYXZvcml0ZUNvdW50cmllc0NoYW5nZWQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmV0Y2hDb3VudHJ5RGF0YSgpO1xuICAgICAgICB0aGlzLm9uQ291bnRyeVNlbGVjdCh0aGlzLnNlbGVjdGVkQ291bnRyeSgpKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25JbnB1dEtleVByZXNzKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGFsbG93ZWRDaGFycyA9IC9bMC05XFwrXFwtXFwoXFwpXFwgXS87XG4gICAgICAgIGNvbnN0IGFsbG93ZWRDdHJsQ2hhcnMgPSAvW2F4Y3ZdLzsgLy8gQWxsb3dzIGNvcHktcGFzdGluZ1xuICAgICAgICBjb25zdCBhbGxvd2VkT3RoZXJLZXlzID0gW1xuICAgICAgICAgICAgJ0Fycm93TGVmdCcsXG4gICAgICAgICAgICAnQXJyb3dVcCcsXG4gICAgICAgICAgICAnQXJyb3dSaWdodCcsXG4gICAgICAgICAgICAnQXJyb3dEb3duJyxcbiAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICdFbmQnLFxuICAgICAgICAgICAgJ0luc2VydCcsXG4gICAgICAgICAgICAnRGVsZXRlJyxcbiAgICAgICAgICAgICdCYWNrc3BhY2UnLFxuICAgICAgICAgICAgJ1RhYidcbiAgICAgICAgXTtcblxuICAgICAgICBpZiggIWFsbG93ZWRDaGFycy50ZXN0KGV2ZW50LmtleSlcbiAgICAgICAgICAgICYmICEoZXZlbnQuY3RybEtleSAmJiBhbGxvd2VkQ3RybENoYXJzLnRlc3QoZXZlbnQua2V5KSlcbiAgICAgICAgICAgICYmICFhbGxvd2VkT3RoZXJLZXlzLmluY2x1ZGVzKGV2ZW50LmtleSkgKSBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBPdmVyd3JpdGUgTkdfVkFMVUVfQUNDRVNTT1IgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICAgICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaXNEaXNhYmxlZCA/IHRoaXMucGhvbmVOdW1iZXJDb250cm9sLmRpc2FibGUoKSA6IHRoaXMucGhvbmVOdW1iZXJDb250cm9sLmVuYWJsZSgpO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUob2JqOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIGNvbnN0IHBob25lTnVtYmVyOiBDaGFuZ2VEYXRhID0gTG9jYWxQaG9uZVV0aWxzLmdldENoYW5nZURhdGEob2JqKTtcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkodGhpcy5jb3VudHJpZXMuZmluZChjID0+IGMuaXNvMi50b1VwcGVyQ2FzZSgpID09PSBwaG9uZU51bWJlci5jb3VudHJ5Q29kZSkpO1xuICAgICAgICB0aGlzLnBob25lTnVtYmVyQ29udHJvbC5zZXRWYWx1ZShwaG9uZU51bWJlci5udW1iZXIgfHwgJycpXG4gICAgfVxuXG4gICAgLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxuICAgIHByb3RlY3RlZCBmZXRjaENvdW50cnlEYXRhKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZWdpb25zTmFtZXMgPSBuZXcgSW50bC5EaXNwbGF5TmFtZXMoWyB0aGlzLmxhbmcgXSwge1xuICAgICAgICAgICAgdHlwZTogJ3JlZ2lvbicsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvdW50cmllcyA9IEFMTF9DT1VOVFJJRVMubWFwKGNvdW50cnkgPT4gKHtcbiAgICAgICAgICAgIG5hbWU6IHJlZ2lvbnNOYW1lcy5vZihjb3VudHJ5WzFdLnRvU3RyaW5nKCk/LnRvVXBwZXJDYXNlKCkpIHx8ICcnLFxuICAgICAgICAgICAgaXNvMjogY291bnRyeVsxXS50b1N0cmluZygpLFxuICAgICAgICAgICAgZGlhbENvZGU6IGNvdW50cnlbMl0udG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHByaW9yaXR5OiArY291bnRyeVszXSB8fCAwLFxuICAgICAgICAgICAgYXJlYUNvZGVzOiAoY291bnRyeVs0XSBhcyBzdHJpbmdbXSkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgaHRtbElkOiBgaXRlbS0ke2NvdW50cnlbMV0udG9TdHJpbmcoKX1gLFxuICAgICAgICAgICAgZmxhZ0NsYXNzOiBgaXRpX19mbGFnIGl0aV9fJHtjb3VudHJ5WzFdLnRvU3RyaW5nKCkudG9Mb2NhbGVMb3dlckNhc2UoKX1gLFxuICAgICAgICAgICAgcGxhY2VIb2xkZXI6IHRoaXMuZ2V0UGxhY2Vob2xkZXIoY291bnRyeVsxXS50b1N0cmluZygpLnRvVXBwZXJDYXNlKCkpLFxuICAgICAgICAgICAgaXNGYXZvcml0ZTogdGhpcy5mYXZvcml0ZUNvdW50cmllcy5pbmNsdWRlcyhjb3VudHJ5WzFdLnRvU3RyaW5nKCkpXG4gICAgICAgIH0pKS5zb3J0KChhLCBiKSA9PiBOdW1iZXIoYi5pc0Zhdm9yaXRlKSAtIE51bWJlcihhLmlzRmF2b3JpdGUpKTtcblxuICAgICAgICBpZiggdGhpcy5zZWxlY3RGaXJzdENvdW50cnkgKXtcbiAgICAgICAgICAgIGNvbnN0IGNvdW50cnkgPSB0aGlzLmZhdm9yaXRlQ291bnRyaWVzLmxlbmd0aCA/IHRoaXMuZmF2b3JpdGVzWzBdIDogdGhpcy5jb3VudHJpZXNbMF07XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgc2VsZWN0ZWRDb3VudHJ5LlxuICAgICAqL1xuICAgIHByaXZhdGUgdXBkYXRlU2VsZWN0ZWRDb3VudHJ5KCkge1xuICAgICAgICBpZiggIXRoaXMuc2VsZWN0ZWRDb3VudHJ5SVNPICkgcmV0dXJuO1xuICAgICAgICBjb25zdCBjb3VudHJ5U2VsZWN0ZWQgPSB0aGlzLmNvdW50cmllcy5maW5kKChjKSA9PiBjLmlzbzIudG9Mb3dlckNhc2UoKSA9PT0gdGhpcy5zZWxlY3RlZENvdW50cnlJU08udG9Mb3dlckNhc2UoKSlcbiAgICAgICAgdGhpcy5zZXRTZWxlY3RlZENvdW50cnkoY291bnRyeVNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldFNlbGVjdGVkQ291bnRyeShjb3VudHJ5PzogQ291bnRyeSk6IHZvaWQge1xuICAgICAgICBpZiggIWNvdW50cnkgKSByZXR1cm47XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDb3VudHJ5LnNldChjb3VudHJ5KTtcbiAgICAgICAgdGhpcy5jb3VudHJ5Q2hhbmdlLmVtaXQoY291bnRyeSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpc1NlbGVjdGVkQ291bnRyeUNoYW5nZWQoc2VsZWN0ZWRJU086IFNpbXBsZUNoYW5nZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jb3VudHJpZXMgJiYgc2VsZWN0ZWRJU08gJiYgc2VsZWN0ZWRJU08uY3VycmVudFZhbHVlICE9PSBzZWxlY3RlZElTTy5wcmV2aW91c1ZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UGxhY2Vob2xkZXIoY291bnRyeUNvZGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIGlmKCAhdGhpcy5kaXNwbGF5UGxhY2Vob2xkZXIgKSByZXR1cm4gJyc7XG4gICAgICAgIGlmKCB0aGlzLmN1c3RvbVBsYWNlaG9sZGVyICkgcmV0dXJuIHRoaXMuY3VzdG9tUGxhY2Vob2xkZXI7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gTG9jYWxQaG9uZVV0aWxzLmdldFBob25lTnVtYmVyUGxhY2VIb2xkZXIodGhpcy5udW1iZXJGb3JtYXQsIGNvdW50cnlDb2RlKTtcbiAgICAgICAgaWYoIHRoaXMuc2VwYXJhdGVEaWFsQ29kZSAmJiB0aGlzLm51bWJlckZvcm1hdCA9PT0gUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCApIHJldHVybiBMb2NhbFBob25lVXRpbHMuZ2V0Q2hhbmdlRGF0YShwbGFjZWhvbGRlcikubnVtYmVyIHx8ICcnO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXJcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwicC1pbnB1dGdyb3VwXCI+XG4gICAgPHAtZHJvcGRvd24gY2xhc3M9XCJwLWlucHV0Z3JvdXAtYWRkb25cIiBbb3B0aW9uc109XCJjb3VudHJpZXNcIiBbZmlsdGVyXT1cInRydWVcIiBbZmlsdGVyRmllbGRzXT1cInNlYXJjaENvdW50cnlGaWVsZFwiIFtyZXNldEZpbHRlck9uSGlkZV09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwicGhvbmVOdW1iZXJDb250cm9sLmRpc2FibGVkXCIgcGFuZWxTdHlsZUNsYXNzPVwiZml4V2lkdGhcIiBbY2xhc3Mud2l0aG91dERpYWxDb2RlXT1cIiFzZXBhcmF0ZURpYWxDb2RlXCJcbiAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJzZWxlY3RlZENvdW50cnkoKVwiIChvbkNoYW5nZSk9XCJvbkNvdW50cnlTZWxlY3QoJGV2ZW50LnZhbHVlLCBpbnB1dClcIlxuICAgICAgICAgICAgICAgIFthcHBlbmRUb109XCJhcHBlbmRUbygpXCI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJzZWxlY3RlZEl0ZW1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4IGFsaWduLWl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxkaXYgaWQ9XCJmbGFnXCIgW2NsYXNzXT1cInNlbGVjdGVkQ291bnRyeSgpLmZsYWdDbGFzc1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIEBpZiAoc2VwYXJhdGVEaWFsQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICA8c3BhbiBpZD1cImRpYWxjb2RlXCIgY2xhc3M9XCJtcy0yXCI+e3sgc2VsZWN0ZWRDb3VudHJ5KCkuZGlhbENvZGUgfCBkaWFsQ29kZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICA8bmctdGVtcGxhdGUgbGV0LWNvdW50cnkgcFRlbXBsYXRlPVwiaXRlbVwiIGNsYXNzPVwidGVzdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXggYWxpZ24taXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbFwiIFtjbGFzcy5mYXZvcml0ZV09XCJjb3VudHJ5LmlzRmF2b3JpdGVcIiBmYXZvcml0ZT5cbiAgICAgICAgICAgICAgICA8ZGl2IFtjbGFzc109XCJjb3VudHJ5LmZsYWdDbGFzc1wiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuPnt7IGNvdW50cnkubmFtZSB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj57eyBjb3VudHJ5LmRpYWxDb2RlIHwgZGlhbENvZGUgfX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L3AtZHJvcGRvd24+XG5cbiAgICA8aW5wdXQgcElucHV0VGV4dCAjaW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiB0eXBlPVwidGVsXCIgW2lkXT1cImlucHV0SWRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiAoYmx1cik9XCJvblRvdWNoZWQoKVwiXG4gICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJ0aGlzLnNlbGVjdGVkQ291bnRyeSgpLnBsYWNlSG9sZGVyXCIgW2Zvcm1Db250cm9sXT1cInBob25lTnVtYmVyQ29udHJvbFwiIChrZXlkb3duKT1cIm9uSW5wdXRLZXlQcmVzcygkZXZlbnQpXCJcbiAgICAgICAgICAgW2F0dHIubWF4TGVuZ3RoXT1cIm1heExlbmd0aFwiIFthdHRyLnZhbGlkYXRpb25dPVwicGhvbmVWYWxpZGF0aW9uXCI+XG48L2Rpdj5cbiJdfQ==