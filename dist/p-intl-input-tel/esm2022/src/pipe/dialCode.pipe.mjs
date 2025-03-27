import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class DialCodePipe {
    transform(dialoCode) {
        if (!dialoCode)
            return '';
        return `+${dialoCode}`;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
    static ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, isStandalone: true, name: "dialCode" });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: DialCodePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'dialCode',
                    standalone: true
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbENvZGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3AtaW50bC1pbnB1dC10ZWwvc3JjL3BpcGUvZGlhbENvZGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQzs7QUFNcEQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsU0FBUyxDQUFDLFNBQWlCO1FBQ3pCLElBQUksQ0FBQyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDMUIsT0FBTyxJQUFLLFNBQVUsRUFBRSxDQUFDO0lBQzNCLENBQUM7dUdBSlUsWUFBWTtxR0FBWixZQUFZOzsyRkFBWixZQUFZO2tCQUp4QixJQUFJO21CQUFDO29CQUNGLElBQUksRUFBRSxVQUFVO29CQUNoQixVQUFVLEVBQUUsSUFBSTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgICBuYW1lOiAnZGlhbENvZGUnLFxuICAgIHN0YW5kYWxvbmU6IHRydWVcbn0pXG5leHBvcnQgY2xhc3MgRGlhbENvZGVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShkaWFsb0NvZGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkaWFsb0NvZGUpIHJldHVybiAnJztcbiAgICByZXR1cm4gYCskeyBkaWFsb0NvZGUgfWA7XG4gIH1cbn1cbiJdfQ==