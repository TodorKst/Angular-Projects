import {Directive, inject} from '@angular/core';

@Directive({
  selector: '[appLog]',
  standalone: true,
  host: {
    '(click)': 'onLog()'
  }
})
export class LogDirective {

  onLog() {
    console.log('Element clicked!');
  }

}
