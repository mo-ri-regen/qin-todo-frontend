import axios from "axios";
import type { ListTodo, PostTodo, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

export const initEditTodo: PostTodo = {
  task: "",
  sortKey: 0,
  dueDate: "",
  completeDate: "",
  isDone: false,
};

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
      editTodo: initEditTodo,
      isFooterShow: false,
      getTodos: async () => {
        const response = await axios.get<ListTodo[]>(apiUrl);
        set({ todos: response.data });
      },
      addTodo: async (postTodo) => {
        const response = await axios.post<ListTodo>(apiUrl, postTodo);
        const {
          id,
          task,
          userId,
          sortKey,
          dueDate,
          completeDate,
          isDone,
          createAt,
          updateAt,
        } = response.data;
        return set((state) => {
          const listTodo: ListTodo = {
            id,
            task,
            userId,
            sortKey,
            dueDate,
            completeDate,
            isDone,
            createAt,
            updateAt,
          };
          return {
            todos: [...state.todos, listTodo],
          };
        });
      },
      removeTodo: async (id: string) => {
        await axios.delete(`${apiUrl}${id}`).then((res) => {
          return res;
        });

        return set((state) => {
          return {
            todos: state.todos.filter((todo) => {
              return todo.id !== id;
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
              return { ...todo, done: !todo.isDone };
            }),
          };
        });
      },
      toggleIsFooterShow: () => {
        return set((state) => {
          return { isFooterShow: !state.isFooterShow };
        });
      },
      setEditTodo: (postTodo: PostTodo) => {
        return set(() => {
          return {
            editTodo: {
              task: postTodo.task,
              sortKey: postTodo.sortKey,
              dueDate: postTodo.dueDate,
              completeDate: postTodo.completeDate,
              isDone: postTodo.isDone,
            },
          };
        });
      },
    };
  })
);

export { useStore };
