import clsx from "clsx";
import { useState } from "react";
import { getToday, getTommorow } from "src/libs/dateFunc";
import { initEditTodo, useStore } from "src/libs/store";
import type { PostTodo } from "src/types";

export const Footer = () => {
  const addTodo = useStore((state) => {
    return state.addTodo;
  });
  const editTodo = useStore((state) => {
    return state.editTodo;
  });
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  const toggleIsFooterShow = useStore((state) => {
    return state.toggleIsFooterShow;
  });
  const toggleFooterFocus = useStore((state) => {
    return state.toggleFooterFocus;
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
      toggleIsFooterShow();
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
      toggleIsFooterShow();
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
      toggleIsFooterShow();
    }
  };
  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
    // setError("");
  };

  const handleOnFocus = () => {
    toggleFooterFocus();
  };

  const handleBlur = (e: any) => {
    const target = e.target.value;
    if (!target) {
      alert("入力してください");
    }
  };

  const FooterButtons = () => {
    return (
      <div className="flex items-center mb-3 text-white">
        <button
          className="px-4 mr-2 h-9 text-sm bg-primary rounded-full"
          onClick={handleAddTodoToday}
        >
          + 今日する
        </button>
        <button
          className="px-4 mr-2 h-9 text-sm bg-secondary rounded-full"
          onClick={handleAddTodoTommorow}
        >
          + 明日する
        </button>
        <button
          className="px-4 h-9 text-sm bg-tertiary rounded-full"
          onClick={handleAddTodo}
        >
          + 今度する
        </button>
      </div>
    );
  };

  const isFooterShow = useStore((state) => {
    return state.isFooterShow;
  });

  return (
    <>
      {/* pc footer */}
      <div
        className={clsx(
          "hidden overflow-hidden fixed right-0 bottom-12 z-10 w-full h-2/5 bg-white dark:bg-gray-700 duration-300 ease-in-out transform",
          {
            "translate-y-full": isFooterShow,
            "translate-y-0": !isFooterShow,
          }
        )}
      >
        <div className="flex flex-col justify-center items-center h-[108px]">
          <div className="px-3 my-3 bg-[#F1F5F9] rounded-full border">
            <input
              className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
              onChange={handleOnChange}
              value={inputTodo}
            />
          </div>
          <FooterButtons />
        </div>
      </div>

      {/* mobile footer */}
      <div
        className={clsx(
          "lg:hidden overflow-hidden fixed right-0 bottom-12 z-10 w-full h-2/5 bg-white dark:bg-gray-700 duration-300 ease-in-out transform",
          {
            "translate-y-full": isFooterShow,
            "translate-y-0": !isFooterShow,
          }
        )}
      >
        <div className="flex flex-col justify-center items-center h-[108px]">
          <div className="px-3 my-3 bg-[#F1F5F9] rounded-full border">
            <input
              className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              onBlur={handleBlur}
              value={inputTodo}
            />
          </div>
          <FooterButtons />
        </div>
      </div>
    </>
  );
};
