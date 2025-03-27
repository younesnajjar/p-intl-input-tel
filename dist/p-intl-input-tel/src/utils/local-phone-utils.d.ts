import { PhoneNumber, PhoneNumberFormat } from "google-libphonenumber";
import { ChangeData } from "../model/change-data";
export declare class LocalPhoneUtils {
    /**
     * Returns parse PhoneNumber object.
     * @param phoneNumber string
     * @param regionCode string
     */
    static getParsedNumber(phoneNumber?: string, regionCode?: string): PhoneNumber;
    /**
     * Return a ChangeData object initialized with a phone number
     * @param phoneNumber
     */
    static getChangeData(phoneNumber?: string): ChangeData;
    /**
     * Gets formatted example phone number from phoneUtil.
     * @param numberFormat
     * @param countryCode
     */
    static getPhoneNumberPlaceHolder(numberFormat: PhoneNumberFormat, countryCode: string): string;
    /**
     * Sifts through all countries and returns iso code of the primary country
     * based on the number provided.
     * @param number PhoneNumber
     * @param countryCode country code in number format
     */
    static getCountryIsoCode(number: PhoneNumber, countryCode?: number): string | undefined;
}
//# sourceMappingURL=local-phone-utils.d.ts.map