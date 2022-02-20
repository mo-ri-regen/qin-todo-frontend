import axios from "axios";
import type { TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
      getTempTodos: async () => {
        const response = await axios.get("");
        set({ todos: response.data });
      },
      addTodo: (text: string) => {
        return set((state) => {
          return { todos: [...state.todos, { text: text }] };
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
  })
);

export { useStore };
