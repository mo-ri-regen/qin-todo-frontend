import { useState } from "react";
import { useStore } from "src/libs/store";
import type { PostTodo } from "src/types";

export const Footer = () => {
  const addTodo = useStore((state) => {
    return state.addTodo;
  });

  const [inputTodo, setInputTodo] = useState<string>("");
  const handleAddTodo = () => {
    if (inputTodo === "") {
      return;
    }
    if (inputTodo) {
      // TODO:並びは一旦０にする。（別ISSUEにて対応）
      // TODO：dueDateは一旦空白にする。（別ISSUEにて対応）
      const postTodo: PostTodo = {
        task: inputTodo,
        sortKey: 0,
        dueDate: "",
        completeDate: "",
        isDone: false,
      };
      addTodo(postTodo);
      setInputTodo("");
    }
  };
  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
    // setError("");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-[108px]">
        <div className="">
          <input
            className="my-3 w-80 h-9 bg-[#F1F5F9] rounded-full"
            onChange={handleOnChange}
            value={inputTodo}
          />
        </div>
        <div className="flex items-center mb-3 text-white">
          <button
            className="px-4 mr-2 h-9 text-sm bg-primary rounded-full"
            onClick={handleAddTodo}
          >
            + 今日する
          </button>
          <button className="px-4 mr-2 h-9 text-sm bg-secondary rounded-full">
            + 明日する
          </button>
          <button className="px-4 h-9 text-sm bg-tertiary rounded-full">
            + 今度する
          </button>
        </div>
      </div>
    </>
  );
};
