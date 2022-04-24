import { Dialog } from "@headlessui/react";
import type { DOMAttributes, VFC } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import {
  TodoOtherIcon,
  TodoTodayIcon,
  TodoTomorrowIcon,
} from "src/components/shared/Icons";
import { getToday, getTommorow, targetCheck } from "src/libs/dateFunc";
import { initEditTodo, selectTodos, useStore } from "src/libs/store";
import type { ListTodo, PostTodo, Target, TodosState } from "src/types";
// import type { PostTodo } from "src/types";

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
  const orgTarget: Target | null =
    editTodo.id === "" ? null : targetCheck(editTodo.dueDate);
  const handleAddTodoToday = () => {
    if (inputTodo === "") {
      return;
    }
    const todosLen = selectTodos(allTodos, strDate, "today").length + 1;
    if (isAddInput) {
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: todosLen,
        dueDate: getToday(),
        completeDate: null,
        isDone: false,
      };
      addTodo(postTodo);
    } else {
      const postTodo: ListTodo = editTodo;
      postTodo.task = inputTodo;
      postTodo.sortKey = orgTarget === "today" ? editTodo.sortKey : todosLen;
      postTodo.dueDate = getToday();
      updateTodo(postTodo);
    }
    setInputTodo("");
    setEditTodo(initEditTodo);
  };
  const handleAddTodoTommorow = () => {
    if (inputTodo === "") {
      return;
    }
    const todosLen = selectTodos(allTodos, strDate, "nextday").length + 1;
    if (isAddInput) {
      if (inputTodo) {
        // TODO:並びは「今日やる」⇒「明日やる」に変更した場合に対応が必要（別ISSUEにて対応）
        const postTodo: PostTodo = {
          task: inputTodo,
          sortKey: editTodo.sortKey,
          dueDate: getTommorow(),
          completeDate: null,
          isDone: false,
        };
        addTodo(postTodo);
      } else {
        const postTodo: ListTodo = editTodo;
        postTodo.task = inputTodo;
        postTodo.sortKey =
          orgTarget === "nextday" ? editTodo.sortKey : todosLen;
        postTodo.dueDate = getTommorow();
        updateTodo(postTodo);
      }
      setInputTodo("");
      setEditTodo(initEditTodo);
    }
  };
  const handleAddTodo = () => {
    if (inputTodo === "") {
      return;
    }
    const todosLen = selectTodos(allTodos, strDate, "other").length + 1;
    if (isAddInput) {
      if (inputTodo) {
        // TODO:並びは「今日やる」⇒「明日やる」に変更した場合に対応が必要（別ISSUEにて対応）
        const postTodo: PostTodo = {
          task: inputTodo,
          sortKey: editTodo.sortKey,
          dueDate: null,
          completeDate: null,
          isDone: false,
        };
        addTodo(postTodo);
      } else {
        const postTodo: ListTodo = editTodo;
        postTodo.task = inputTodo;
        postTodo.sortKey = orgTarget === "other" ? editTodo.sortKey : todosLen;
        postTodo.dueDate = null;
        updateTodo(postTodo);
      }
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
  }, [editTodo.task]);

  const isOpen = inputTodo !== "" || (inputTodo === "" && isAddInput);

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} initialFocus={textareaRef}>
      <div className="text-center">
        <Dialog.Overlay className="fixed inset-0 z-20 bg-opacity-40 backdrop-filter" />
        <div className="lg:hidden fixed right-0 bottom-0 left-0 z-50 sm:p-6 py-4 px-6 mx-auto w-screen max-w-sm bg-white dark:bg-gray-900">
          <div className="items-center text-center">
            <textarea
              ref={textareaRef}
              className="mb-3 w-full h-8 leading-4 dark:text-gray-700 bg-[#F1F5F9] rounded-3xl border-none focus:ring-2 focus:ring-primary outline-none"
              onChange={handleOnChange}
              value={inputTodo}
              maxLength={200}
            />
          </div>
          <div className="flex justify-between items-center mb-2 w-full text-white">
            <button
              className="px-4 h-9 text-sm whitespace-nowrap bg-primary rounded-full"
              onClick={handleAddTodoToday}
            >
              <div className="flex justify-between items-center">
                <TodoTodayIcon className="w-5 h-5" /> 今日する
              </div>
            </button>
            <button
              className="px-4 h-9 text-sm whitespace-nowrap bg-secondary rounded-full"
              onClick={handleAddTodoTommorow}
            >
              <div className="flex justify-between items-center">
                <TodoTomorrowIcon className="pt-1 w-5 h-5" /> 明日する
              </div>
            </button>
            <button
              className="px-4 h-9 text-sm whitespace-nowrap bg-tertiary rounded-full"
              onClick={handleAddTodo}
            >
              <div className="flex justify-between items-center">
                <TodoOtherIcon className="w-5 h-5" /> 今度する
              </div>
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
