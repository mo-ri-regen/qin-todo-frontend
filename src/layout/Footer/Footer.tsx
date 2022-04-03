import type { VFC } from "react";
import { initEditTodo, useStore } from "src/libs/store";

import { FooterButtons } from "./FooterButtons";

export const Footer: VFC = () => {
  const toggleIsAddInput = useStore((state) => {
    return state.toggleIsAddInput;
  });
  const setEditTodo = useStore((state) => {
    return state.setEditTodo;
  });
  const handleOpenModal = () => {
    toggleIsAddInput(true);
    setEditTodo(initEditTodo);
  };
  return (
    <div className="grid lg:hidden relative">
      <div className="flex fixed right-0 bottom-0 left-0 z-30 flex-row mx-auto max-w-sm bg-white dark:bg-gray-900 ">
        <div className="w-full">
          <button
            className="w-full h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
            onClick={handleOpenModal}
          />
        </div>
      </div>
      <FooterButtons />
    </div>
  );
};
