import {Component, ContentChild, ElementRef, HostBinding, inject, Input, ViewEncapsulation} from '@angular/core';

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
  @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

private el = inject(ElementRef);

onClick() {
  console.log('Control clicked');
  console.log(this.el.nativeElement );
  console.log(this.control?.nativeElement);
}

@Input({required: true}) controlContent!: string;
}
