import { Popover, Transition } from "@headlessui/react";
import type { VFC } from "react";

import { FooterButtons } from "./FooterButtons";

export const Footer: VFC = () => {
  return (
    <Popover className="grid lg:hidden relative">
      {({ open }) => {
        return (
          <>
            <Popover.Button>
              <div className="fixed right-[50%] bottom-0 z-30 w-screen bg-white dark:bg-black translate-x-[50%]">
                <button className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none" />
              </div>
            </Popover.Button>

            <div className="relative bg-white dark:bg-black">
              <Transition show={open}>
                <Popover.Panel
                  static
                  className="fixed right-[50%] bottom-0 z-30 bg-white dark:bg-black translate-x-[50%]"
                >
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
