import { PhoneNumberFormat, PhoneNumberUtil } from 'google-libphonenumber';
export class ChangeData {
    number;
    internationalNumber;
    nationalNumber;
    e164Number;
    countryCode;
    dialCode;
    constructor(phoneNumber) {
        const utils = PhoneNumberUtil.getInstance();
        this.countryCode = phoneNumber && utils.getRegionCodeForNumber(phoneNumber) ? utils.getRegionCodeForNumber(phoneNumber) : '';
        this.dialCode = phoneNumber?.getCountryCode() ? `+${phoneNumber.getCountryCode()}` : '';
        this.e164Number = phoneNumber && utils.format(phoneNumber, PhoneNumberFormat.E164) !== '+0' ? utils.format(phoneNumber, PhoneNumberFormat.E164) : '';
        this.internationalNumber = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.INTERNATIONAL) : '';
        this.nationalNumber = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.NATIONAL) : '';
        this.number = phoneNumber ? utils.format(phoneNumber, PhoneNumberFormat.NATIONAL) : '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy9tb2RlbC9jaGFuZ2UtZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWUsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFeEYsTUFBTSxPQUFPLFVBQVU7SUFDbkIsTUFBTSxDQUFTO0lBQ2YsbUJBQW1CLENBQVM7SUFDNUIsY0FBYyxDQUFTO0lBQ3ZCLFVBQVUsQ0FBUztJQUNuQixXQUFXLENBQXFCO0lBQ2hDLFFBQVEsQ0FBUztJQUVqQixZQUFZLFdBQXlCO1FBQ2pDLE1BQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzdILElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxXQUFXLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3JKLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDekcsSUFBSSxDQUFDLGNBQWMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDL0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDM0YsQ0FBQztDQUNKIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGhvbmVOdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LCBQaG9uZU51bWJlclV0aWwgfSBmcm9tICdnb29nbGUtbGlicGhvbmVudW1iZXInO1xuXG5leHBvcnQgY2xhc3MgQ2hhbmdlRGF0YSB7XG4gICAgbnVtYmVyOiBzdHJpbmc7XG4gICAgaW50ZXJuYXRpb25hbE51bWJlcjogc3RyaW5nO1xuICAgIG5hdGlvbmFsTnVtYmVyOiBzdHJpbmc7XG4gICAgZTE2NE51bWJlcjogc3RyaW5nO1xuICAgIGNvdW50cnlDb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgZGlhbENvZGU6IHN0cmluZztcblxuICAgIGNvbnN0cnVjdG9yKHBob25lTnVtYmVyPzogUGhvbmVOdW1iZXIpIHtcbiAgICAgICAgY29uc3QgdXRpbHMgPSBQaG9uZU51bWJlclV0aWwuZ2V0SW5zdGFuY2UoKTtcbiAgICAgICAgdGhpcy5jb3VudHJ5Q29kZSA9IHBob25lTnVtYmVyICYmIHV0aWxzLmdldFJlZ2lvbkNvZGVGb3JOdW1iZXIocGhvbmVOdW1iZXIpID8gdXRpbHMuZ2V0UmVnaW9uQ29kZUZvck51bWJlcihwaG9uZU51bWJlcikgOiAnJztcbiAgICAgICAgdGhpcy5kaWFsQ29kZSA9IHBob25lTnVtYmVyPy5nZXRDb3VudHJ5Q29kZSgpID8gYCske3Bob25lTnVtYmVyLmdldENvdW50cnlDb2RlKCl9YCA6ICcnO1xuICAgICAgICB0aGlzLmUxNjROdW1iZXIgPSBwaG9uZU51bWJlciAmJiB1dGlscy5mb3JtYXQocGhvbmVOdW1iZXIsIFBob25lTnVtYmVyRm9ybWF0LkUxNjQpICE9PSAnKzAnID8gdXRpbHMuZm9ybWF0KHBob25lTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5FMTY0KSA6ICcnO1xuICAgICAgICB0aGlzLmludGVybmF0aW9uYWxOdW1iZXIgPSBwaG9uZU51bWJlciA/IHV0aWxzLmZvcm1hdChwaG9uZU51bWJlciwgUGhvbmVOdW1iZXJGb3JtYXQuSU5URVJOQVRJT05BTCkgOiAnJztcbiAgICAgICAgdGhpcy5uYXRpb25hbE51bWJlciA9IHBob25lTnVtYmVyID8gdXRpbHMuZm9ybWF0KHBob25lTnVtYmVyLCBQaG9uZU51bWJlckZvcm1hdC5OQVRJT05BTCkgOiAnJztcbiAgICAgICAgdGhpcy5udW1iZXIgPSBwaG9uZU51bWJlciA/IHV0aWxzLmZvcm1hdChwaG9uZU51bWJlciwgUGhvbmVOdW1iZXJGb3JtYXQuTkFUSU9OQUwpIDogJyc7XG4gICAgfVxufVxuIl19