import { AbstractControl } from '@angular/forms';
/**
 * Check if the phone number provide is in a valid format compare to the country selected
 * If not, an error is pushed to the FormControl: { invalidFormat: true }
 * It can be catched in the parent form to display a user error
 * @param control
 */
export declare const phoneNumberValidator: (control: AbstractControl) => {
    invalidFormat: boolean;
} | undefined;
//# sourceMappingURL=p-intl-input-tel.validator.d.ts.map