import type { VFC } from "react";
import { useState } from "react";
import { initEditTodo } from "src/libs/store";

export const InputField: VFC = () => {
  const [inputTodo, setInputTodo] = useState<string>(initEditTodo.task);

  const handleOnChange = (e: any) => {
    setInputTodo(e.target.value);
  };

  return (
    <div className="relative">
      <input
        className="px-2 mb-3 w-80 h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
        onChange={handleOnChange}
        value={inputTodo}
      />
    </div>
  );
};
