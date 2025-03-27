import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
/*
"Property 'nativeElement' does not exist on type 'FormControl'".
'NativeElementInjectorDirective' injects nativeElement to each control,
so we can access it from inside validator for example.
More about this approach and reasons for this:
https://github.com/angular/angular/issues/18025
https://stackoverflow.com/a/54075119/1617590
*/
export class NativeElementInjectorDirective {
    controlDir;
    host;
    constructor(controlDir, host) {
        this.controlDir = controlDir;
        this.host = host;
    }
    ngOnInit() {
        //@ts-ignore
        if (this.controlDir.control)
            this.controlDir.control['nativeElement'] = this.host.nativeElement;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NativeElementInjectorDirective, deps: [{ token: i1.NgControl }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0", type: NativeElementInjectorDirective, isStandalone: true, selector: "[ngModel], [formControl], [formControlName]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: NativeElementInjectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ngModel], [formControl], [formControlName]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i1.NgControl }, { type: i0.ElementRef }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlLWVsZW1lbnQtaW5qZWN0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvcC1pbnRsLWlucHV0LXRlbC9zcmMvZGlyZWN0aXZlcy9uYXRpdmUtZWxlbWVudC1pbmplY3Rvci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBc0IsTUFBTSxlQUFlLENBQUM7OztBQUc5RDs7Ozs7OztFQU9FO0FBS0YsTUFBTSxPQUFPLDhCQUE4QjtJQUNuQjtJQUErQjtJQUFuRCxZQUFvQixVQUFxQixFQUFVLElBQWlDO1FBQWhFLGVBQVUsR0FBVixVQUFVLENBQVc7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUE2QjtJQUNwRixDQUFDO0lBRUQsUUFBUTtRQUNKLFlBQVk7UUFDWixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTztZQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFBO0lBQ3BHLENBQUM7dUdBUFEsOEJBQThCOzJGQUE5Qiw4QkFBOEI7OzJGQUE5Qiw4QkFBOEI7a0JBSjFDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLDZDQUE2QztvQkFDdkQsVUFBVSxFQUFFLElBQUk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuLypcblwiUHJvcGVydHkgJ25hdGl2ZUVsZW1lbnQnIGRvZXMgbm90IGV4aXN0IG9uIHR5cGUgJ0Zvcm1Db250cm9sJ1wiLlxuJ05hdGl2ZUVsZW1lbnRJbmplY3RvckRpcmVjdGl2ZScgaW5qZWN0cyBuYXRpdmVFbGVtZW50IHRvIGVhY2ggY29udHJvbCxcbnNvIHdlIGNhbiBhY2Nlc3MgaXQgZnJvbSBpbnNpZGUgdmFsaWRhdG9yIGZvciBleGFtcGxlLlxuTW9yZSBhYm91dCB0aGlzIGFwcHJvYWNoIGFuZCByZWFzb25zIGZvciB0aGlzOlxuaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTgwMjVcbmh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS81NDA3NTExOS8xNjE3NTkwXG4qL1xuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbbmdNb2RlbF0sIFtmb3JtQ29udHJvbF0sIFtmb3JtQ29udHJvbE5hbWVdJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIE5hdGl2ZUVsZW1lbnRJbmplY3RvckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjb250cm9sRGlyOiBOZ0NvbnRyb2wsIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZjxIVE1MRm9ybUVsZW1lbnQ+KSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIC8vQHRzLWlnbm9yZVxuICAgICAgICBpZiggdGhpcy5jb250cm9sRGlyLmNvbnRyb2wgKSB0aGlzLmNvbnRyb2xEaXIuY29udHJvbFsnbmF0aXZlRWxlbWVudCddID0gdGhpcy5ob3N0Lm5hdGl2ZUVsZW1lbnRcbiAgICB9XG59XG4iXX0=