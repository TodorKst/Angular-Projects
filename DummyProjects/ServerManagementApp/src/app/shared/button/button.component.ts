import {Component, Input} from '@angular/core';

@Component({
  selector: 'button[appButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({required: true}) buttonContent!: string;
  @Input({required: true}) buttonSymbol!: string;
}
