import { Directive, ElementRef, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

/*
"Property 'nativeElement' does not exist on type 'FormControl'".
'NativeElementInjectorDirective' injects nativeElement to each control,
so we can access it from inside validator for example.
More about this approach and reasons for this:
https://github.com/angular/angular/issues/18025
https://stackoverflow.com/a/54075119/1617590
*/
@Directive({
    selector: '[ngModel], [formControl], [formControlName]',
    standalone: true
})
export class NativeElementInjectorDirective implements OnInit {
    constructor(private controlDir: NgControl, private host: ElementRef<HTMLFormElement>) {
    }

    ngOnInit() {
        //@ts-ignore
        if( this.controlDir.control ) this.controlDir.control['nativeElement'] = this.host.nativeElement
    }
}
