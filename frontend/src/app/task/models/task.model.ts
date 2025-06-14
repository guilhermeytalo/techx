export interface Task {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateTaskInput {
    title: string;
    description?: string;
    completed?: boolean;
  }

  export interface UpdateTaskInput {
    title?: string;
    description?: string;
    completed?: boolean;
  }

export interface SelectItem<T = any> {
  label?: string;
  value: T;
  styleClass?: string;
  icon?: string;
  title?: string;
  disabled?: boolean;
}
