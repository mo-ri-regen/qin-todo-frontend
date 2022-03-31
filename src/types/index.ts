export type ListTodo = {
  id: string;
  task: string;
  userId: string;
  sortKey: number;
  dueDate: string;
  completeDate: string;
  isDone: boolean;
  createAt: string;
  updateAt: string;
};

export type PostTodo = {
  task: string;
  sortKey: number;
  dueDate: string;
  completeDate: string;
  isDone: boolean;
};

export type TodosState = {
  todos: ListTodo[];
  editTodo: PostTodo;
  getTodos: () => void;
  addTodo: (postTodo: PostTodo) => void;
  removeTodo: (id: string) => void;
  toggleDone: (todo: ListTodo) => void;
  setEditTodo: (postTodo: PostTodo) => void;
};

export type Target = "today" | "nextday" | "other";
