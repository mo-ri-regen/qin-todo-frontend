import { Popover, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { useState } from "react";
import { Fragment } from "react";
import { getToday, getTommorow } from "src/libs/dateFunc";
import { initEditTodo, useStore } from "src/libs/store";
import type { PostTodo } from "src/types";

export const Footer: VFC = () => {
  const addTodo = useStore((state) => {
    return state.addTodo;
  });
  const editTodo = useStore((state) => {
    return state.editTodo;
  });
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  // const toggleIsFooterShow = useStore((state) => {
  //   return state.toggleIsFooterShow;
  // });
  // const toggleFooterFocus = useStore((state) => {
  //   return state.toggleFooterFocus;
  // });

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
      // toggleIsFooterShow();
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
      // toggleIsFooterShow();
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
      // toggleIsFooterShow();
    }
  };
  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
    // setError("");
  };

  // const handleOnFocus = () => {
  //   toggleFooterFocus();
  // };

  const FooterButtons = () => {
    return (
      <div className="flex items-center mb-3 text-white">
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
    );
  };

  return (
    <Popover className="grid lg:hidden relative">
      {({ open }) => {
        return (
          <>
            <Popover.Button>
              <button className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none" />
            </Popover.Button>

            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute -top-10 right-[50%] z-30 translate-x-[50%]"
                >
                  <input
                    className="px-2 mb-3 w-80 h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
                    onChange={handleOnChange}
                    value={inputTodo}
                  />
                  <FooterButtons />
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
