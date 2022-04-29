import type { AuthUserContext } from "next-firebase-auth";

export type ListTodo = {
  id: string;
  task: string;
  userId: string;
  sortKey: number;
  dueDate: string | null;
  completeDate: string | null;
  isDone: boolean;
  createAt: string;
  updateAt: string;
};

export type PostTodo = {
  task: string;
  sortKey: number;
  dueDate: string | null;
  completeDate: string | null;
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
  addTodo: (postTodo: PostTodo, authUser: AuthUserContext) => void;
  copyTodo: (postTodo: PostTodo, authUser: AuthUserContext) => void;
  updateTodo: (editTodo: ListTodo, authUser: AuthUserContext) => void;
  removeTodo: (id: string, authUser: AuthUserContext) => void;
  setIsAddInput: (isAddInput: boolean) => void;
  toggleDone: (todo: ListTodo, authUser: AuthUserContext) => void;
  setEditTodo: (editTodo: ListTodo) => void;
  setActiveId: (id: string) => void;
  findTarget: (id: string, isActive: boolean) => void;
  taskDropOver: (id: string, overId: string, strDate: string) => void;
  taskDropEnd: (id: string, overId: string, strDate: string) => void;
};

export type Target = "today" | "nextday" | "otherday";
