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

export type CopyTodo = {
  task: string;
  sortKey: number;
  dueDate: string;
  completeDate: string;
  isDone: boolean;
};

export type TodosState = {
  todos: ListTodo[];
  isAddInput: boolean;
  activeId: Target | null;
  activeTarget: Target | null;
  orveTarget: Target | null;
  editTodo: ListTodo;
  getTodos: () => void;
  addTodo: (postTodo: PostTodo) => void;
  copyTodo: (copyTodo: CopyTodo) => void;
  updateTodo: (editTodo: ListTodo) => void;
  removeTodo: (id: string) => void;
  setIsAddInput: (isAddInput: boolean) => void;
  toggleDone: (todo: ListTodo) => void;
  setEditTodo: (editTodo: ListTodo) => void;
  setActiveId: (id: string) => void;
  findTarget: (id: string, isActive: boolean) => void;
  taskDropOver: (id: string, overId: string, strDate: string) => void;
  taskDropEnd: (id: string, overId: string, strDate: string) => void;
};

export type Target = "today" | "nextday" | "other";
