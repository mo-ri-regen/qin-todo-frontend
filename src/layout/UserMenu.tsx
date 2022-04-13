import { Popover, Transition } from "@headlessui/react";
import { CogIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { Fragment } from "react";
import { MyAvater } from "src/components/Avatar/MyAvater";
import { SignoutButton } from "src/components/shared/Buttons/SignoutButton";

/**
 * @package
 */
export const UserMenu: VFC = () => {
  const AuthUser = useAuthUser();
  const initial = AuthUser.displayName?.slice(0, 1);

  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button className="flex rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 focus:outline-none">
              {AuthUser.photoURL ? (
                <MyAvater size="small" />
              ) : (
                <button className="w-9 h-9 bg-blue-500 rounded-full">
                  {initial}
                </button>
              )}
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
                  className="absolute left-full xl:-left-full 2xl:left-1/2 z-10 sm:px-0 pl-8 mt-2 w-screen max-w-xs sm:max-w-sm -translate-x-full xl:-translate-x-1/2"
                >
                  <div className="overflow-hidden py-4 bg-white dark:bg-gray-800 rounded-2xl ring-1 ring-gray-200 dark:ring-gray-700 shadow-lg">
                    <div className="grid relative">
                      <Link href="/setting/todo">
                        <a className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none">
                          <div className="flex justify-center items-center shrink-0"></div>
                          <div className="w-7 h-7">
                            <CogIcon />
                          </div>
                          <p className="ml-4 font-bold">設定</p>
                        </a>
                      </Link>
                      <SignoutButton />
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
