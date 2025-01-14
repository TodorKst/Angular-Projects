export interface TaskModel {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  dueDate?: Date;
}
