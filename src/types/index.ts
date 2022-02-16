export type Todo = { title: string; done?: boolean };
export type TodosState = {
  todos: Array<Todo>;
  add: (title: string) => void;
  toggleDone: (index: number) => void;
};
