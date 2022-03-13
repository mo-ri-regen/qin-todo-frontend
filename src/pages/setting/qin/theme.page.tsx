import { RadioGroup } from "@headlessui/react";
import { CheckIcon, ChevronLeftIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useTheme } from "src/contexts/useTheme";

const SettingTodoTheme: NextPage = () => {
  const router = useRouter();
  const { themes, isMounted, currentTheme, handleTheme } = useTheme();
  if (!isMounted) return null;
  const handleClickReturn = () => {
    return router.back();
  };

  return (
    <div className="p-3 mx-auto w-1/2 whitespace-nowrap">
      <div className="flex items-center pb-6">
        <button
          type="button"
          onClick={handleClickReturn}
          className="grid place-items-center w-10 h-10 font-bold hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 transition duration-200 ease-in-out focus:outline-none"
        >
          <ChevronLeftIcon className="w-6 h-6 text-blue-500" />
        </button>
        <div className="flex flex-1 justify-center px-2">
          <div className="text-xl font-bold">テーマ</div>
        </div>
      </div>
      <RadioGroup value={currentTheme} onChange={handleTheme}>
        <RadioGroup.Label className="sr-only">Color theme</RadioGroup.Label>
        {themes.map((theme) => {
          return (
            <RadioGroup.Option
              key={theme.id}
              value={theme.id}
              className={({ active, checked }) => {
                return clsx(
                  "-mx-4 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer focus:outline-none",
                  {
                    "bg-gray-100 dark:bg-gray-700": checked || active,
                  }
                );
              }}
            >
              {({ checked }) => {
                return (
                  <div className="flex justify-between items-center py-3 px-4 text-lg">
                    <RadioGroup.Label className="font-bold">
                      {theme.label}
                    </RadioGroup.Label>
                    {checked ? (
                      <CheckIcon className="w-6 h-6 text-blue-500" />
                    ) : null}
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default SettingTodoTheme;
