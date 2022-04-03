import { Dialog, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { Fragment, useState } from "react";
import { getToday, getTommorow } from "src/libs/dateFunc";
import { initEditTodo, useStore } from "src/libs/store";
import type { PostTodo } from "src/types";

export const FooterButtons: VFC = () => {
  const addTodo = useStore((state) => {
    return state.addTodo;
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
  const toggleIsAddInput = useStore((state) => {
    return state.toggleIsAddInput;
  });
  const [inputTodo, setInputTodo] = useState<string>(editTodo.task);
  const handleAddTodoToday = () => {
    if (inputTodo === "") {
      return;
    }
    if (inputTodo) {
      // TODO:並びは「明日やる」⇒「今日やる」に変更した場合に対応が必要（別ISSUEにて対応）
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: editTodo.sortKey,
        dueDate: getToday(),
        completeDate: editTodo.completeDate,
        isDone: editTodo.isDone,
      };
      addTodo(postTodo);
      setInputTodo("");
      setEditTodo(initEditTodo);
    }
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
  const isOpen = editTodo.task !== "" || isAddInput;
  const handleCloseModal = () => {
    setInputTodo("");
    setEditTodo(initEditTodo);
    toggleIsAddInput(false);
  };
  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        // as="div"
        static
        open={isOpen}
        // className="fixed right-[50%] bottom-0 z-10 h-20 bg-white dark:bg-gray-900 translate-x-[50%]"
        onClose={handleCloseModal}
      >
        <Transition.Child
          enter="transition-opacity ease-in-out duration-250"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in-out duration-250"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 z-30 bg-opacity-40 backdrop-filter" />
        </Transition.Child>
        <div className="lg:hidden fixed right-0 bottom-0 left-0 z-50 p-4 sm:p-6 mx-auto w-10/12 max-w-sm bg-white dark:bg-gray-900">
          <div className="relative">
            <textarea
              autoFocus
              className="mb-3 w-full h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-lg border-none focus:ring-2 focus:ring-primary outline-none"
              onChange={handleOnChange}
              value={inputTodo}
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
      </Dialog>
    </Transition>
  );
};
