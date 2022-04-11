import { Dialog } from "@headlessui/react";
import type { DOMAttributes, VFC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { getToday, getTommorow } from "src/libs/dateFunc";
import { initEditTodo, selectTodos, useStore } from "src/libs/store";
import type { ListTodo, PostTodo, TodosState } from "src/types";

export const FooterButtons: VFC = () => {
  const allTodos = useStore((state: TodosState) => {
    return state.todos;
  });
  const strDate = getToday();
  const textareaRef = useRef(null);
  const addTodo = useStore((state) => {
    return state.addTodo;
  });
  const updateTodo = useStore((state) => {
    return state.updateTodo;
  });
  const editTodo = useStore((state) => {
    return state.editTodo;
  });
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  const isAddInput = useStore((state) => {
    return state.isAddInput;
  });
  const setIsAddInput = useStore((state) => {
    return state.setIsAddInput;
  });
  const [inputTodo, setInputTodo] = useState<string>(editTodo.task);
  const handleAddTodoToday = () => {
    if (inputTodo === "") {
      return;
    }
    // if (inputTodo) {
    if (isAddInput) {
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: editTodo.sortKey,
        dueDate: getToday(),
        completeDate: editTodo.completeDate,
        isDone: editTodo.isDone,
      };
      addTodo(postTodo);
    } else {
      const todos = selectTodos(allTodos, strDate, "today");
      const maxSortKey =
        Math.max.apply(
          null,
          todos.map((todo) => {
            return todo.sortKey;
          })
        ) + 1;
      const postTodo: ListTodo = {
        id: editTodo.id,
        task: inputTodo,
        userId: editTodo.userId,
        sortKey: maxSortKey,
        dueDate: getToday(),
        completeDate: editTodo.completeDate,
        isDone: editTodo.isDone,
        createAt: editTodo.createAt,
        updateAt: editTodo.updateAt,
      };
      updateTodo(postTodo);
    }
    setInputTodo("");
    setEditTodo(initEditTodo);
    // }
  };
  const handleAddTodoTommorow = () => {
    if (inputTodo === "") {
      return;
    }
    if (inputTodo) {
      // TODO:並びは「今日やる」⇒「明日やる」に変更した場合に対応が必要（別ISSUEにて対応）
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: editTodo.sortKey,
        dueDate: getTommorow(),
        completeDate: editTodo.completeDate,
        isDone: editTodo.isDone,
      };
      addTodo(postTodo);
      setInputTodo("");
      setEditTodo(initEditTodo);
    }
  };
  const handleAddTodo = () => {
    if (inputTodo === "") {
      return;
    }
    if (inputTodo) {
      // TODO:並びは「今日やる」⇒「明日やる」に変更した場合に対応が必要（別ISSUEにて対応）
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: editTodo.sortKey,
        dueDate: "",
        completeDate: editTodo.completeDate,
        isDone: editTodo.isDone,
      };
      addTodo(postTodo);
      setInputTodo("");
      setEditTodo(initEditTodo);
    }
  };

  const handleCloseModal = () => {
    setInputTodo("");
    setEditTodo(initEditTodo);
    setIsAddInput(false);
  };
  const handleOnChange: DOMAttributes<HTMLTextAreaElement>["onChange"] = (
    e
  ) => {
    setInputTodo(e.currentTarget.value);
  };
  useEffect(() => {
    setInputTodo(editTodo.task);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isOpen = inputTodo !== "" || (inputTodo === "" && isAddInput);

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} initialFocus={textareaRef}>
      <div className="text-center">
        <Dialog.Overlay className="fixed inset-0 z-20 bg-opacity-40 backdrop-filter" />
        <div className="lg:hidden fixed right-0 bottom-0 left-0 z-50 p-4 sm:p-6 mx-auto w-10/12 max-w-sm bg-white dark:bg-gray-900">
          <div className="text-center">
            <textarea
              ref={textareaRef}
              className="mb-3 w-full h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-lg border-none focus:ring-2 focus:ring-primary outline-none"
              onChange={handleOnChange}
              value={inputTodo}
              maxLength={200}
            />
          </div>
          <div className="flex justify-between items-center mb-2 w-full text-white">
            <button
              className="px-4 mr-2 h-9 text-sm whitespace-nowrap bg-primary rounded-full"
              onClick={handleAddTodoToday}
            >
              + 今日する
            </button>
            <button
              className="px-4 mr-2 h-9 text-sm whitespace-nowrap bg-secondary rounded-full"
              onClick={handleAddTodoTommorow}
            >
              + 明日する
            </button>
            <button
              className="px-4 h-9 text-sm whitespace-nowrap bg-tertiary rounded-full"
              onClick={handleAddTodo}
            >
              + 今度する
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
