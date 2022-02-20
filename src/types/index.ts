export type Todo = { text: string; done?: boolean };
export type ListTodo = {
  id: string;
  text: string;
  done: boolean;
};
export type TodosState = {
  todos: Array<Todo>;
  addTodo: (text: string) => void;
  toggleDone: (index: number) => void;
};
