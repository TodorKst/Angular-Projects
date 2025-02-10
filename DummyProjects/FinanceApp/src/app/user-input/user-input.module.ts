import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {UserInputComponent} from "./user-input.component";

@NgModule({
  declarations: [UserInputComponent],
  imports: [FormsModule],
  exports: [UserInputComponent],
  providers: [],
  bootstrap: []
})
export class UserInputModule {
}
