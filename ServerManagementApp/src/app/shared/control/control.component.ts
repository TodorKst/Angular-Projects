import {Component, ElementRef, HostBinding, inject, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
  '(click)': 'onClick()'
  }
})
export class ControlComponent {
private el = inject(ElementRef);

onClick() {
  console.log('Control clicked');
  console.log(this.el.nativeElement );
}

@Input({required: true}) controlContent!: string;
}
