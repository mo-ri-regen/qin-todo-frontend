import { arrayMove } from "@dnd-kit/sortable";
import axios from "axios";
import type { ListTodo, PostTodo, Target, TodosState } from "src/types";
import create from "zustand";
import { devtools } from "zustand/middleware";

import { getToday, getTommorow } from "./dateFunc";

const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URI}tasks`;

export const initEditTodo: ListTodo = {
  id: "",
  task: "",
  sortKey: 0,
  dueDate: "",
  completeDate: "",
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
        case "other": // 「今度やる」のデータ抽出
          return todo.dueDate == "";
        case "nextday": // 「明日やる」のデータ抽出
          return todo.dueDate > strDate && todo.completeDate == "";
        case "today": // 「今日やる」のデータ抽出
          return (
            (todo.dueDate <= strDate && todo.dueDate != "") ||
            todo.completeDate != ""
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
      updateTodo: async (editTodo) => {
        const postTodo = {
          task: editTodo.task,
          sortKey: editTodo.sortKey,
          dueDate: editTodo.dueDate,
          completeDate: editTodo.completeDate,
          isDone: editTodo.isDone,
        };
        const response = await axios.put<ListTodo>(
          `${apiUrl}${editTodo.id}`,
          postTodo
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
      removeTodo: async (id: string) => {
        await axios.delete(`${apiUrl}/${id}`).then((res) => {
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
      setIsAddInput: (isAddInput: boolean) => {
        return set(() => {
          return { isAddInput: isAddInput };
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
          `${apiUrl}/${editTodo.id}`,
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
      setEditTodo: (editTodo: ListTodo) => {
        return set(() => {
          return {
            editTodo: editTodo,
          };
        });
      },
      setActiveId: (id: string) => {
        return set((state) => {
          const todo = state.todos.find((todo) => {
            todo.id === id;
          });
          let target: Target | null = state.activeId;
          const dueDate = todo?.dueDate;
          const today = String(getToday().toString);
          const nextday = String(getTommorow().toString);

          switch (dueDate) {
            case today:
              target = "today";
              break;
            case nextday:
              target = "nextday";
              break;
            default:
              target = "other";
              break;
          }
          return { activeId: target };
        });
      },
      findTarget: (id: string, isActive: boolean) => {
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
            const today = getToday();
            const nextday = getTommorow();

            switch (dueDate) {
              case today:
                if (isActive) {
                  activeTarget = "today";
                } else {
                  orveTarget = "today";
                }
                break;
              case nextday:
                if (isActive) {
                  activeTarget = "nextday";
                } else {
                  orveTarget = "nextday";
                }
                break;
              default:
                if (isActive) {
                  activeTarget = "other";
                } else {
                  orveTarget = "other";
                }
                break;
            }
          }
          return { activeTarget: activeTarget, orveTarget: orveTarget };
        });
      },
      taskDropOver: (id: string, overId: string, strDate: string) => {
        return set((state) => {
          const updateTodos: ListTodo[] = state.todos;
          // 移動先が無い場合は、何もせずに終了する
          if (!overId || overId === "void") {
            return { todos: updateTodos, activeId: null };
          }
          // 移動元、移動先のコンテナが変わっていない場合は、何もせずに終了する
          if (
            !state.activeTarget ||
            !state.orveTarget ||
            state.activeTarget === state.orveTarget
          ) {
            return { todos: updateTodos, activeId: null };
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
            return { todos: updateTodos, activeId: null };
          }
          switch (orveTarget) {
            case "today":
              newItem.dueDate = getToday();
              break;
            case "nextday":
              newItem.dueDate = getTommorow();
              break;
            case "other":
              newItem.dueDate = "";
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
            updateTodos.find((upTodo) => {
              return upTodo.id === todo.id;
            })
              ? todo
              : updateTodos;
          });
          // 移動先の並びを全体のstateに反映する
          overContainer.map((todo) => {
            updateTodos.find((upTodo) => {
              return upTodo.id === todo.id;
            })
              ? todo
              : updateTodos;
          });

          return { todos: updateTodos, activeId: null };
        });
      },
      taskDropEnd: (id: string, overId: string, strDate: string) => {
        return set((state) => {
          const updateTodos: ListTodo[] = state.todos;

          if (!state.activeTarget) {
            return { todos: updateTodos, activeId: null };
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
            updateTodos.find((upTodo) => {
              return upTodo.id === todo.id;
            })
              ? todo
              : updateTodos;
          });

          return { todos: updateTodos, activeId: null };
        });
      },
    };
  })
);

export { useStore };
