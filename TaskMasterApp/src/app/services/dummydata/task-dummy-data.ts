import { TaskModel } from '../../models/task.model';

export const TaskDummyData: TaskModel[] = [
  // User 1 - 5 tasks
  { id: 1, userId: 1, title: 'Task 1', description: 'Complete the project overview document.', dueDate: new Date('2025-01-20'), status: 'Open' },
  { id: 2, userId: 1, title: 'Task 2', description: 'Review the design mockups.', dueDate: new Date('2025-01-22'), status: 'Open' },
  { id: 3, userId: 1, title: 'Task 3', description: 'Send feedback to the development team.', dueDate: new Date('2025-01-25'), status: 'In Progress' },
  { id: 4, userId: 1, title: 'Task 4', description: 'Prepare for the client presentation.', dueDate: new Date('2025-01-30'), status: 'In Progress' },
  { id: 5, userId: 1, title: 'Task 5', description: 'Finalize the project plan.', dueDate: new Date('2025-02-02'), status: 'Completed' },

  // User 2 - 3 tasks
  { id: 6, userId: 2, title: 'Task 1', description: 'Complete the financial report.', dueDate: new Date('2025-01-18'), status: 'Open' },
  { id: 7, userId: 2, title: 'Task 2', description: 'Review the project progress with the team.', dueDate: new Date('2025-01-20'), status: 'Open' },
  { id: 8, userId: 2, title: 'Task 3', description: 'Prepare the quarterly presentation.', dueDate: new Date('2025-01-23'), status: 'Open' },

  // User 3 - 1 task
  { id: 9, userId: 3, title: 'Task 1', description: 'Send the monthly report.', dueDate: new Date('2025-01-15'), status: 'Open' },

  // User 4 - 1 task
  { id: 10, userId: 4, title: 'Task 1', description: 'Organize the team meeting.', dueDate: new Date('2025-01-17'), status: 'Open' },

  // User 5 - 1 task
  { id: 11, userId: 5, title: 'Task 1', description: 'Prepare the design documentation.', dueDate: new Date('2025-01-19'), status: 'Open' },

  // User 6 - 1 task
  { id: 12, userId: 6, title: 'Task 1', description: 'Review the marketing materials.', dueDate: new Date('2025-01-16'), status: 'Open' },
];
