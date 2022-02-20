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
      addTodo: (text: string) => {
        return set((state) => {
          // id はバックエンド側で採番するが、一時的に設定する。
          const maxid: string = state.todos.reduce(
            (a: ListTodo, b: ListTodo) => {
              if (Number(a.id) > Number(b.id)) {
                return a;
              } else {
                return b;
              }
            }
          ).id;
          return {
            todos: [
              ...state.todos,
              { id: String(Number(maxid) + 1), text: text, done: false },
            ],
          };
        });
      },
      removeTodo: (index: string) => {
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
