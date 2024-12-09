import {Directive} from "@angular/core";
import {$$deepEqual} from "@jsonjoy.com/util/lib/json-equal/$$deepEqual";

@Directive({
  selector: 'a[appSafeLink]',
  standalone: true,
  host: {
    '(click)': 'onConfirmLeave($event)'
  }
})
export class SafeLinkDirective {
  constructor() {
    console.log('SafeLinkDirective is Active!')
  }

  onConfirmLeave(event: MouseEvent) {
    const wantsToLeave = window.confirm('Are you sure you want to leave?');

    if (wantsToLeave) {
      return;
    }

    event.preventDefault();
  }

  protected readonly $$deepEqual = $$deepEqual;
}
