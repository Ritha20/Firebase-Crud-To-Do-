export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: "Low" | "Medium" | "High";
    userEmail: string;
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export type TaskPriority = "Low" | "Medium" | "High";
  
  export interface TaskFormData {
    title: string;
    description: string;
    priority: TaskPriority;
  }