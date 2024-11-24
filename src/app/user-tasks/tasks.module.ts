import {NgModule} from "@angular/core";
import {UserTasksComponent} from "./user-tasks.component";
import {TaskComponent} from "./task/task.component";
import {AddTaskComponent} from "./add-task/add-task.component";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [UserTasksComponent, TaskComponent, AddTaskComponent],
    imports: [SharedModule, CommonModule, FormsModule],
    exports: [UserTasksComponent]
})
export class TasksModule {
}
