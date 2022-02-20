// TODO : 暫定対応（本来は、バックエンド側でPKを付番する。（型をnumber型にしたが、string型で正しい）
export type Todo = { id?: string; text: string; done?: boolean };
export type ListTodo = {
  id: string;
  text: string;
  done: boolean;
};

export type TodosState = {
  todos: ListTodo[];
  getTempTodos: () => void;
  addTodo: (text: string) => void;
  removeTodo: (index: string) => void;
  toggleDone: (index: string) => void;
};
