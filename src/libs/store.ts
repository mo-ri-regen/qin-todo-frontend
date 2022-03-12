import axios from "axios";
import type { ListTodo, PostTodo, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { getToday } from "./dateFunc";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}todo/`;

// const getStringFromDate = (date: Date) => {
//   const year_str: string = date.getFullYear().toString();
//   //月だけ+1すること
//   const month_str: string = 1 + date.getMonth().toString();
//   const day_str: string = date.getDate().toString();

//   let format_str = "YYYY-MM-DD hh:mm:ss";
//   format_str = format_str.replace(/YYYY/g, year_str);
//   format_str = format_str.replace(/MM/g, month_str);
//   format_str = format_str.replace(/DD/g, day_str);
//   return format_str;
// };

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
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
      toggleDone: async (editTodo: ListTodo) => {
        editTodo.isDone = !editTodo.isDone;
        if (editTodo.isDone) {
          editTodo.completeDate = getToday().toString();
        } else {
          editTodo.completeDate = "";
        }

        const putTodo: PostTodo = {
          task: editTodo.task,
          sortKey: editTodo.sortKey,
          dueDate: editTodo.dueDate,
          completeDate: editTodo.completeDate,
          isDone: editTodo.isDone,
        };
        const response = await axios.put<ListTodo>(
          `${apiUrl}${editTodo.id}`,
          putTodo
        );
        if (response.status != 200) {
          // エラー時の処理を記述する想定
          // eslint-disable-next-line no-console
          console.log(response.statusText);
        }
        set((state) => {
          return {
            todos: state.todos.map((todo) => {
              if (editTodo.id !== todo.id) {
                return todo;
              }
              return editTodo;
            }),
          };
        });
      },
    };
  })
);

export { useStore };
