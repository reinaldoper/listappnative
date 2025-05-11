export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export interface FormData {
  title: string;
  description: string;
}

export interface TaskItemProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    description: string;
  };
  onToggle: (id: string, completed: boolean) => void;
  onRemove: (id: string) => void;
}

export interface User {
  email: string;
  password: string;
}
