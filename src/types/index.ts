export type Todo = { id?: string; text: string; done?: boolean };
export type ListTodo = {
  id: string;
  text: string;
  done: boolean;
};
export type TodosState = {
  todos: Array<Todo>;
  addTodo: (text: string) => void;
  removeTodo: (index: number) => void;
  toggleDone: (index: number) => void;
};
