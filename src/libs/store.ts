import axios from "axios";
import type { ListTodo, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
      getTempTodos: async () => {
        const response = await axios.get<ListTodo[]>(apiUrl);
        set({ todos: response.data });
      },
      addTodo: async (text: string) => {
        const postTodo = { text: text, done: false };
        const response = await axios.post<string>(apiUrl, postTodo);
        return set((state) => {
          const postTodo = { text: text, done: false, id: response.data };
          return {
            todos: [...state.todos, postTodo],
          };
        });
      },
      removeTodo: async (index: string, id: string) => {
        await axios.delete(`${apiUrl}${id}/`).then((res) => {
          return res;
        });

        return set((state) => {
          return {
            todos: state.todos.filter((todo) => {
              return todo.id !== index;
            }),
          };
        });
      },
      toggleDone: (index: string) => {
        return set((state) => {
          return {
            todos: state.todos.map((todo) => {
              if (index !== todo.id) {
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
