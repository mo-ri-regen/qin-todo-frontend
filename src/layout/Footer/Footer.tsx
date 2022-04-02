// import { Popover, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { initEditTodo, useStore } from "src/libs/store";

// import { Fragment } from "react";
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
      <div className="flex fixed right-[50%] bottom-0 z-30 flex-row w-screen bg-white dark:bg-gray-900 translate-x-[50%]">
        <div className="w-1/6" />
        <div className="w-4/6">
          <button
            className="w-4/6 h-8 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none"
            onClick={handleOpenModal}
          />
        </div>
        <div className="w-1/6" />
      </div>
      <FooterButtons />
    </div>
    // <Popover className="grid lg:hidden relative">
    //   {({ open }) => {
    //     return (
    //       <>
    //         <Popover.Button>
    //           <div className="fixed right-[50%] bottom-0 z-30 w-screen bg-white dark:bg-gray-900 translate-x-[50%]">
    //             <button className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none" />
    //           </div>
    //         </Popover.Button>

    //         <div className="relative bg-white dark:bg-gray-900">
    //           <Transition
    //             show={open}
    //             as={Fragment}
    //             enter="transition ease-out duration-200"
    //             enterFrom="opacity-0 -translate-y-1"
    //             enterTo="opacity-100 translate-y-0"
    //             leave="transition ease-in duration-150"
    //             leaveFrom="opacity-100 translate-y-0"
    //             leaveTo="opacity-0 -translate-y-1"
    //           >
    //             <Popover.Panel
    //               static
    //               className="fixed right-[50%] bottom-0 z-30 bg-white dark:bg-gray-900 translate-x-[50%]"
    //             >
    //               <FooterButtons />
    //             </Popover.Panel>
    //           </Transition>
    //         </div>
    //       </>
    //     );
    //   }}
    // </Popover>
  );
};
