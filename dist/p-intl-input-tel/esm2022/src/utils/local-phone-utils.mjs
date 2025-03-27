import * as lpn from "google-libphonenumber";
import { PhoneNumber } from "google-libphonenumber";
import { ChangeData } from "../model/change-data";
import { ALL_COUNTRIES } from "../data/country-code";
export class LocalPhoneUtils {
    /**
     * Returns parse PhoneNumber object.
     * @param phoneNumber string
     * @param regionCode string
     */
    static getParsedNumber(phoneNumber = '', regionCode = '') {
        if (!phoneNumber || !regionCode)
            return new PhoneNumber();
        try {
            return lpn.PhoneNumberUtil.getInstance().parse(phoneNumber, regionCode.toUpperCase());
        }
        catch (e) {
            return new PhoneNumber();
        }
    }
    /**
     * Return a ChangeData object initialized with a phone number
     * @param phoneNumber
     */
    static getChangeData(phoneNumber) {
        return new ChangeData(!phoneNumber ? new PhoneNumber() : lpn.PhoneNumberUtil.getInstance().parse(phoneNumber));
    }
    /**
     * Gets formatted example phone number from phoneUtil.
     * @param numberFormat
     * @param countryCode
     */
    static getPhoneNumberPlaceHolder(numberFormat, countryCode) {
        const phoneUtil = lpn.PhoneNumberUtil.getInstance();
        return phoneUtil.format(phoneUtil.getExampleNumber(countryCode), numberFormat);
    }
    /**
     * Sifts through all countries and returns iso code of the primary country
     * based on the number provided.
     * @param number PhoneNumber
     * @param countryCode country code in number format
     */
    static getCountryIsoCode(number, countryCode) {
        if (!countryCode)
            return;
        // Will use this to match area code from the first numbers
        // @ts-ignore
        const rawNumber = number['values_']['2'].toString();
        // List of all countries with countryCode (can be more than one. e.x. US, CA, DO, PR all have +1 countryCode)
        const countriesFiltered = ALL_COUNTRIES.filter((c) => c[2].toString() === countryCode.toString());
        // Main country is the country, which has no areaCodes specified in country-code.ts file.
        const mainCountry = countriesFiltered.find((c) => c[4] === undefined);
        // Secondary countries are all countries, which have areaCodes specified in country-code.ts file.
        const secondaryCountries = countriesFiltered.filter((c) => c[4] !== undefined);
        let matchedCountry = mainCountry ? mainCountry[1].toString() : undefined;
        /*
          Iterate over each secondary country and check if nationalNumber starts with any of areaCodes available.
          If no matches found, fallback to the main country.
        */
        secondaryCountries.forEach((country) => {
            // @ts-ignore
            country[4].forEach((areaCode) => {
                if (rawNumber.startsWith(areaCode))
                    matchedCountry = country[1].toString();
            });
        });
        return matchedCountry;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWwtcGhvbmUtdXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy91dGlscy9sb2NhbC1waG9uZS11dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssR0FBRyxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQXNDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ2xELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUVyRCxNQUFNLE9BQU8sZUFBZTtJQUN4Qjs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFzQixFQUFFLEVBQUUsYUFBcUIsRUFBRTtRQUMzRSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsVUFBVTtZQUFHLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztRQUMzRCxJQUFJLENBQUM7WUFDRCxPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUMxRixDQUFDO1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNULE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQTtRQUM1QixDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBb0I7UUFDNUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBR0Q7Ozs7T0FJRztJQUNJLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxZQUErQixFQUFFLFdBQW1CO1FBQ3hGLE1BQU0sU0FBUyxHQUFvQixHQUFHLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JFLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQW1CLEVBQUUsV0FBb0I7UUFDckUsSUFBSSxDQUFDLFdBQVc7WUFBRyxPQUFPO1FBQzFCLDBEQUEwRDtRQUMxRCxhQUFhO1FBQ2IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BELDZHQUE2RztRQUM3RyxNQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsS0FBSyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNsRyx5RkFBeUY7UUFDekYsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDdEUsaUdBQWlHO1FBQ2pHLE1BQU0sa0JBQWtCLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxDQUFDLENBQUM7UUFDL0UsSUFBSSxjQUFjLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUV6RTs7O1VBR0U7UUFDRixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQyxhQUFhO1lBQ2IsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUM1QixJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO29CQUFHLGNBQWMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7Q0FDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxwbiBmcm9tIFwiZ29vZ2xlLWxpYnBob25lbnVtYmVyXCI7XG5pbXBvcnQgeyBQaG9uZU51bWJlciwgUGhvbmVOdW1iZXJGb3JtYXQsIFBob25lTnVtYmVyVXRpbCB9IGZyb20gXCJnb29nbGUtbGlicGhvbmVudW1iZXJcIjtcbmltcG9ydCB7IENoYW5nZURhdGEgfSBmcm9tIFwiLi4vbW9kZWwvY2hhbmdlLWRhdGFcIjtcbmltcG9ydCB7IEFMTF9DT1VOVFJJRVMgfSBmcm9tIFwiLi4vZGF0YS9jb3VudHJ5LWNvZGVcIjtcblxuZXhwb3J0IGNsYXNzIExvY2FsUGhvbmVVdGlscyB7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBwYXJzZSBQaG9uZU51bWJlciBvYmplY3QuXG4gICAgICogQHBhcmFtIHBob25lTnVtYmVyIHN0cmluZ1xuICAgICAqIEBwYXJhbSByZWdpb25Db2RlIHN0cmluZ1xuICAgICAqL1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UGFyc2VkTnVtYmVyKHBob25lTnVtYmVyOiBzdHJpbmcgPSAnJywgcmVnaW9uQ29kZTogc3RyaW5nID0gJycpOiBQaG9uZU51bWJlciB7XG4gICAgICAgIGlmKCAhcGhvbmVOdW1iZXIgfHwgIXJlZ2lvbkNvZGUgKSByZXR1cm4gbmV3IFBob25lTnVtYmVyKCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLnBhcnNlKHBob25lTnVtYmVyLCByZWdpb25Db2RlLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFBob25lTnVtYmVyKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIENoYW5nZURhdGEgb2JqZWN0IGluaXRpYWxpemVkIHdpdGggYSBwaG9uZSBudW1iZXJcbiAgICAgKiBAcGFyYW0gcGhvbmVOdW1iZXJcbiAgICAgKi9cbiAgICBwdWJsaWMgc3RhdGljIGdldENoYW5nZURhdGEocGhvbmVOdW1iZXI/OiBzdHJpbmcpOiBDaGFuZ2VEYXRhIHtcbiAgICAgICAgcmV0dXJuIG5ldyBDaGFuZ2VEYXRhKCFwaG9uZU51bWJlciA/IG5ldyBQaG9uZU51bWJlcigpIDogbHBuLlBob25lTnVtYmVyVXRpbC5nZXRJbnN0YW5jZSgpLnBhcnNlKHBob25lTnVtYmVyKSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGZvcm1hdHRlZCBleGFtcGxlIHBob25lIG51bWJlciBmcm9tIHBob25lVXRpbC5cbiAgICAgKiBAcGFyYW0gbnVtYmVyRm9ybWF0XG4gICAgICogQHBhcmFtIGNvdW50cnlDb2RlXG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRQaG9uZU51bWJlclBsYWNlSG9sZGVyKG51bWJlckZvcm1hdDogUGhvbmVOdW1iZXJGb3JtYXQsIGNvdW50cnlDb2RlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBjb25zdCBwaG9uZVV0aWw6IFBob25lTnVtYmVyVXRpbCA9IGxwbi5QaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgcmV0dXJuIHBob25lVXRpbC5mb3JtYXQocGhvbmVVdGlsLmdldEV4YW1wbGVOdW1iZXIoY291bnRyeUNvZGUpLCBudW1iZXJGb3JtYXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNpZnRzIHRocm91Z2ggYWxsIGNvdW50cmllcyBhbmQgcmV0dXJucyBpc28gY29kZSBvZiB0aGUgcHJpbWFyeSBjb3VudHJ5XG4gICAgICogYmFzZWQgb24gdGhlIG51bWJlciBwcm92aWRlZC5cbiAgICAgKiBAcGFyYW0gbnVtYmVyIFBob25lTnVtYmVyXG4gICAgICogQHBhcmFtIGNvdW50cnlDb2RlIGNvdW50cnkgY29kZSBpbiBudW1iZXIgZm9ybWF0XG4gICAgICovXG4gICAgcHVibGljIHN0YXRpYyBnZXRDb3VudHJ5SXNvQ29kZShudW1iZXI6IFBob25lTnVtYmVyLCBjb3VudHJ5Q29kZT86IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGlmKCAhY291bnRyeUNvZGUgKSByZXR1cm47XG4gICAgICAgIC8vIFdpbGwgdXNlIHRoaXMgdG8gbWF0Y2ggYXJlYSBjb2RlIGZyb20gdGhlIGZpcnN0IG51bWJlcnNcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCByYXdOdW1iZXIgPSBudW1iZXJbJ3ZhbHVlc18nXVsnMiddLnRvU3RyaW5nKCk7XG4gICAgICAgIC8vIExpc3Qgb2YgYWxsIGNvdW50cmllcyB3aXRoIGNvdW50cnlDb2RlIChjYW4gYmUgbW9yZSB0aGFuIG9uZS4gZS54LiBVUywgQ0EsIERPLCBQUiBhbGwgaGF2ZSArMSBjb3VudHJ5Q29kZSlcbiAgICAgICAgY29uc3QgY291bnRyaWVzRmlsdGVyZWQgPSBBTExfQ09VTlRSSUVTLmZpbHRlcigoYykgPT4gY1syXS50b1N0cmluZygpID09PSBjb3VudHJ5Q29kZS50b1N0cmluZygpKTtcbiAgICAgICAgLy8gTWFpbiBjb3VudHJ5IGlzIHRoZSBjb3VudHJ5LCB3aGljaCBoYXMgbm8gYXJlYUNvZGVzIHNwZWNpZmllZCBpbiBjb3VudHJ5LWNvZGUudHMgZmlsZS5cbiAgICAgICAgY29uc3QgbWFpbkNvdW50cnkgPSBjb3VudHJpZXNGaWx0ZXJlZC5maW5kKChjKSA9PiBjWzRdID09PSB1bmRlZmluZWQpO1xuICAgICAgICAvLyBTZWNvbmRhcnkgY291bnRyaWVzIGFyZSBhbGwgY291bnRyaWVzLCB3aGljaCBoYXZlIGFyZWFDb2RlcyBzcGVjaWZpZWQgaW4gY291bnRyeS1jb2RlLnRzIGZpbGUuXG4gICAgICAgIGNvbnN0IHNlY29uZGFyeUNvdW50cmllcyA9IGNvdW50cmllc0ZpbHRlcmVkLmZpbHRlcigoYykgPT4gY1s0XSAhPT0gdW5kZWZpbmVkKTtcbiAgICAgICAgbGV0IG1hdGNoZWRDb3VudHJ5ID0gbWFpbkNvdW50cnkgPyBtYWluQ291bnRyeVsxXS50b1N0cmluZygpIDogdW5kZWZpbmVkO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgSXRlcmF0ZSBvdmVyIGVhY2ggc2Vjb25kYXJ5IGNvdW50cnkgYW5kIGNoZWNrIGlmIG5hdGlvbmFsTnVtYmVyIHN0YXJ0cyB3aXRoIGFueSBvZiBhcmVhQ29kZXMgYXZhaWxhYmxlLlxuICAgICAgICAgIElmIG5vIG1hdGNoZXMgZm91bmQsIGZhbGxiYWNrIHRvIHRoZSBtYWluIGNvdW50cnkuXG4gICAgICAgICovXG4gICAgICAgIHNlY29uZGFyeUNvdW50cmllcy5mb3JFYWNoKChjb3VudHJ5KSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBjb3VudHJ5WzRdLmZvckVhY2goKGFyZWFDb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIHJhd051bWJlci5zdGFydHNXaXRoKGFyZWFDb2RlKSApIG1hdGNoZWRDb3VudHJ5ID0gY291bnRyeVsxXS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBtYXRjaGVkQ291bnRyeTtcbiAgICB9XG59XG4iXX0=