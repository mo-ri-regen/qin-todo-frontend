import type { VFC } from "react";
import { useState } from "react";
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

  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
  };

  return (
    <div className="lg:hidden">
      <div className="relative">
        <textarea
          className="px-2 mb-3 w-80 dark:text-gray-700 bg-[#F1F5F9] rounded border-none focus:ring-2 focus:ring-primary outline-none"
          onChange={handleOnChange}
          value={inputTodo}
          maxLength={200}
          rows={1}
        />
      </div>
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
    </div>
  );
};
