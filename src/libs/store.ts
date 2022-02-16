import type { TodosState } from "src/types";
import create from "zustand";

const useStore = create<TodosState>((set) => {
  return {
    todos: [],
    add: (title: string) => {
      return set((state) => {
        return { todos: [...state.todos, { title: title }] };
      });
    },
    toggleDone: (index: number) => {
      return set((state) => {
        return {
          todos: state.todos.map((todo, id) => {
            if (index !== id) {
              return todo;
            }
            return { ...todo, done: !todo.done };
          }),
        };
      });
    },
  };
});

export { useStore };
