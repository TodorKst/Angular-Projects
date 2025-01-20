export interface TaskModel {
  id: number;
  userId: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status: string;
}
