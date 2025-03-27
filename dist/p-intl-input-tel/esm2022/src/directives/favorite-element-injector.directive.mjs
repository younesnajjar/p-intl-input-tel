import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
export class FavoriteElementInjectorDirective {
    el;
    constructor(el) {
        this.el = el;
    }
    ngOnInit() {
        if (this.el.nativeElement.classList.contains('favorite')) {
            this.el.nativeElement.parentNode.parentNode.classList.add('favoriteItem');
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FavoriteElementInjectorDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.2.0", type: FavoriteElementInjectorDirective, isStandalone: true, selector: "[favorite]", ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.0", ngImport: i0, type: FavoriteElementInjectorDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[favorite]',
                    standalone: true
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmF2b3JpdGUtZWxlbWVudC1pbmplY3Rvci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9wLWludGwtaW5wdXQtdGVsL3NyYy9kaXJlY3RpdmVzL2Zhdm9yaXRlLWVsZW1lbnQtaW5qZWN0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXNCLE1BQU0sZUFBZSxDQUFDOztBQU05RCxNQUFNLE9BQU8sZ0NBQWdDO0lBQ2pDLEVBQUUsQ0FBQztJQUVYLFlBQVksRUFBYztRQUN0QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM3RSxDQUFDO0lBQ0wsQ0FBQzt1R0FYUSxnQ0FBZ0M7MkZBQWhDLGdDQUFnQzs7MkZBQWhDLGdDQUFnQztrQkFKNUMsU0FBUzttQkFBQztvQkFDUCxRQUFRLEVBQUUsWUFBWTtvQkFDdEIsVUFBVSxFQUFFLElBQUk7aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbZmF2b3JpdGVdJyxcbiAgICBzdGFuZGFsb25lOiB0cnVlXG59KVxuZXhwb3J0IGNsYXNzIEZhdm9yaXRlRWxlbWVudEluamVjdG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBwcml2YXRlIGVsO1xuXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5lbCA9IGVsO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnZmF2b3JpdGUnKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKCdmYXZvcml0ZUl0ZW0nKVxuICAgICAgICB9XG4gICAgfVxufVxuIl19