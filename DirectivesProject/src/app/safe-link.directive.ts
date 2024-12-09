import {Directive, ElementRef, inject, input} from "@angular/core";
import {$$deepEqual} from "@jsonjoy.com/util/lib/json-equal/$$deepEqual";
import {LogDirective} from "./log.directive";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeave($event)'
  },
  hostDirectives: [LogDirective]
})
export class SafeLinkDirective {
  queryParam = input('myapp', {alias: 'appSafeLink'});
  private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

  constructor() {
    console.log('SafeLinkDirective is Active!')
  }

  onConfirmLeave(event: MouseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave?');

    if (wantsToLeave) {
      const address = this.hostElementRef.nativeElement.href;
      this.hostElementRef.nativeElement.href = address + '?from=' + this.queryParam();
      return;
    }

    event.preventDefault();
  }

  protected readonly $$deepEqual = $$deepEqual;
}
