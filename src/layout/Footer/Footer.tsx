import { Popover, Transition } from "@headlessui/react";
import type { VFC } from "react";
import { Fragment } from "react";

import { FooterButtons } from "./FooterButtons";

export const Footer: VFC = () => {
  return (
    <Popover className="grid lg:hidden relative">
      {({ open }) => {
        return (
          <>
            <Popover.Button>
              <div className="absolute right-[50%] bottom-0 z-30 bg-white dark:bg-black translate-x-[50%]">
                <button className="w-80 h-9 dark:text-gray-700 bg-[#F1F5F9] rounded-full border-none outline-none" />
              </div>
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
                  className="absolute right-[50%] bottom-0 z-30 bg-white dark:bg-black translate-x-[50%]"
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
