import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import type { ListTodo, PostTodo, Target, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { getToday, getTommorow, targetCheck } from "./dateFunc";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}tasks`;

export const initEditTodo: ListTodo = {
  id: "",
  task: "",
  sortKey: 0,
  dueDate: null,
  completeDate: null,
  isDone: false,
  userId: "",
  createAt: "",
  updateAt: "",
};

export const selectTodos = (
  allTodos: ListTodo[],
  strDate: string,
  target: Target
) => {
  const todos = allTodos
    .filter((todo) => {
      switch (target) {
        case "otherday": // 「今度やる」のデータ抽出
          return todo.dueDate === null && todo.completeDate === null;
        case "nextday": // 「明日やる」のデータ抽出
          return (
            todo.dueDate !== null &&
            todo.dueDate > strDate &&
            todo.completeDate === null
          );
        case "today": // 「今日やる」のデータ抽出
          return (
            (todo.dueDate !== null && todo.dueDate <= strDate) ||
            todo.completeDate !== null
          );
      }
    })
    .sort((a: ListTodo, b: ListTodo) => {
      if (a.sortKey < b.sortKey) return -1;
      if (a.sortKey > b.sortKey) return 1;
      return 0;
    });
  return todos;
};

const useStore = create<TodosState>(
  devtools((set) => {
    return {
      todos: [],
      isAddInput: false,
      activeId: null,
      activeTarget: null,
      orveTarget: null,
      editTodo: initEditTodo,
      getTodos: async () => {
        const response = await axios.get<ListTodo[]>(apiUrl);
        set({ todos: response.data });
      },
      addTodo: async (postTodo, authUser) => {
        const idToken = await authUser.getIdToken();
        const response = await axios.post<ListTodo>(apiUrl, postTodo, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Content-Type": "application/json",
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${idToken}`,
          },
        });
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
      copyTodo: async (copyTodo, authUser) => {
        const idToken = await authUser.getIdToken();
        const response = await axios.post<ListTodo>(apiUrl, copyTodo, {
          headers: {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            "Content-Type": "application/json",
            // eslint-disable-next-line @typescript-eslint/naming-convention
            Authorization: `Bearer ${idToken}`,
          },
        });
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
      updateTodo: async (editTodo, authUser) => {
        const idToken = await authUser.getIdToken();
        const putTodo = {
          task: editTodo.task,
          sortKey: editTodo.sortKey,
          dueDate: editTodo.dueDate,
          completeDate: editTodo.completeDate,
          isDone: editTodo.isDone,
        };
        const response = await axios.put<ListTodo>(
          `${apiUrl}/${editTodo.id}`,
          putTodo,
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              "Content-Type": "application/json",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        const {
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
            id: editTodo.id,
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
            todos: state.todos.filter((todo) => {
              return todo.id === editTodo.id ? listTodo : todo;
            }),
          };
        });
      },
      removeTodo: async (id, authUser) => {
        const idToken = await authUser.getIdToken();
        await axios
          .delete(`${apiUrl}/${id}`, {
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              "Content-Type": "application/json",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Authorization: `Bearer ${idToken}`,
            },
          })
          .then((res) => {
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
      setIsAddInput: (isAddInput) => {
        return set(() => {
          return { isAddInput: isAddInput };
        });
      },
      toggleDone: async (editTodo, authUser) => {
        const idToken = await authUser.getIdToken();
        editTodo.isDone = !editTodo.isDone;
        if (editTodo.isDone) {
          editTodo.completeDate = getToday();
        } else {
          editTodo.completeDate = null;
        }

        const putTodo: PostTodo = {
          task: editTodo.task,
          sortKey: editTodo.sortKey,
          dueDate: editTodo.dueDate,
          completeDate: editTodo.completeDate,
          isDone: editTodo.isDone,
        };
        const response = await axios.put<ListTodo>(
          `${apiUrl}/${editTodo.id}`,
          putTodo,
          {
            headers: {
              // eslint-disable-next-line @typescript-eslint/naming-convention
              "Content-Type": "application/json",
              // eslint-disable-next-line @typescript-eslint/naming-convention
              Authorization: `Bearer ${idToken}`,
            },
          }
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
      setEditTodo: (editTodo) => {
        return set(() => {
          return {
            editTodo: editTodo,
          };
        });
      },
      setActiveId: (id) => {
        return set((state) => {
          const todo = state.todos.find((todo) => {
            todo.id === id;
          });
          if (!todo) {
            return { activeId: state.activeId };
          }
          const dueDate = todo.dueDate;
          const target: Target = targetCheck(dueDate);

          return { activeId: target };
        });
      },
      findTarget: (id, isActive) => {
        return set((state) => {
          const todo = state.todos.find((todo) => {
            return todo.id === id;
          });
          if (!todo) {
            if (isActive) {
              return { activeTarget: null, orveTarget: state.orveTarget };
            } else {
              return { activeTarget: state.activeTarget, orveTarget: null };
            }
          }

          let activeTarget: Target | null = state.activeTarget;
          let orveTarget: Target | null = state.orveTarget;
          if (!isActive && id === "") {
            orveTarget = null;
          } else {
            const dueDate = todo?.dueDate;
            if (isActive) {
              activeTarget = targetCheck(dueDate);
            } else {
              orveTarget = targetCheck(dueDate);
            }
          }
          return { activeTarget: activeTarget, orveTarget: orveTarget };
        });
      },
      taskDropOver: (id, overId, strDate) => {
        return set((state) => {
          const putTodos: ListTodo[] = state.todos;
          // 移動先が無い場合は、何もせずに終了する
          if (!overId || overId === "void") {
            return { todos: putTodos, activeId: null };
          }
          // 移動元、移動先のコンテナが変わっていない場合は、何もせずに終了する
          if (
            !state.activeTarget ||
            !state.orveTarget ||
            state.activeTarget === state.orveTarget
          ) {
            return { todos: putTodos, activeId: null };
          }

          const activeTarget: Target = state.activeTarget;
          const orveTarget: Target = state.orveTarget;

          // 移動元コンテナ
          const activeItems = selectTodos(state.todos, strDate, activeTarget);
          // 移動先コンテナ
          const overItems = selectTodos(state.todos, strDate, orveTarget);

          // 移動先コンテナの位置
          let activeIndex = activeItems.findIndex((item) => {
            return item.id === id;
          });

          // 移動先コンテナの位置
          let overIndex = overItems.findIndex((item) => {
            return item.id === overId;
          });
          const newIndex = overIndex + 1;

          // 移動対象のタスク
          const newItem = activeItems.find((item) => {
            return item.id === id;
          });
          if (!newItem) {
            return { todos: putTodos, activeId: null };
          }
          switch (orveTarget) {
            case "today":
              newItem.dueDate = getToday();
              break;
            case "nextday":
              newItem.dueDate = getTommorow();
              break;
            case "otherday":
              newItem.dueDate = null;
              break;
            default:
              break;
          }

          // 移動元コンテナから、移動対象を除く
          const activeContainer = activeItems.filter((item) => {
            return item.id !== id;
          });
          for (
            let index = activeIndex;
            index < activeContainer.length;
            index += 1
          ) {
            activeContainer[index].sortKey = activeIndex + 1;
            activeIndex += 1;
          }

          // 移動先コンテナに、移動対象を追加する
          const overContainer = overItems.slice(0, newIndex);
          overContainer.push(newItem);

          const overContainerBk = overItems.slice(newIndex, overItems.length);
          for (let index = 0; index < overContainerBk.length; index += 1) {
            overContainerBk[index].sortKey = overIndex + 1;
            overContainer.push(overContainerBk[index]);
            overIndex += 1;
          }
          // 移動元の並びを全体のstateに反映する
          activeContainer.map((todo) => {
            putTodos.find((putTodo) => {
              return putTodo.id === todo.id;
            })
              ? todo
              : putTodos;
          });
          // 移動先の並びを全体のstateに反映する
          overContainer.map((todo) => {
            putTodos.find((putTodo) => {
              return putTodo.id === todo.id;
            })
              ? todo
              : putTodos;
          });

          return { todos: putTodos, activeId: null };
        });
      },
      taskDropEnd: (id, overId, strDate) => {
        return set((state) => {
          const putTodos: ListTodo[] = state.todos;

          if (!state.activeTarget) {
            return { todos: putTodos, activeId: null };
          }

          const activeTarget: Target = state.activeTarget;

          // 移動したコンテナを取得する
          const items = selectTodos(state.todos, strDate, activeTarget);

          // 移動したタスクの移動前の位置
          const activeIndex = items.findIndex((item) => {
            return item.id === id;
          });
          // 移動したタスクの移動後の位置
          const overIndex = items.findIndex((item) => {
            return item.id === overId;
          });

          let activeContainer: ListTodo[] = [];
          if (activeIndex !== overIndex) {
            activeContainer = arrayMove(items, activeIndex, overIndex);
            let sortIndex = 0;
            if (activeIndex < overIndex) {
              sortIndex = activeIndex;
            } else {
              sortIndex = overIndex;
            }
            for (
              let index = sortIndex;
              index < activeContainer.length;
              index += 1
            ) {
              activeContainer[index].sortKey = sortIndex + 1;
              sortIndex += 1;
            }
          } else {
            activeContainer = items;
          }
          // 移動後の並びを全体のstateに反映する
          activeContainer.map((todo) => {
            putTodos.find((putTodo) => {
              return putTodo.id === todo.id;
            })
              ? todo
              : putTodos;
          });

          return { todos: putTodos, activeId: null };
        });
      },
    };
  })
);

export { useStore };
