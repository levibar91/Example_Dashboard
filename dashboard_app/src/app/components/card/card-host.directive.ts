import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
    selector: '[card-host]',
})
export class CardHostDirective {
    constructor(
        public viewContainerRef: ViewContainerRef
    ) {

    }
}