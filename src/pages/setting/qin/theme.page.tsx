import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import type { NextPage } from "next";
import { useTheme } from "src/libs/theme";

const SettingMemoTheme: NextPage = () => {
  const { themes, isMounted, currentTheme, handleTheme } = useTheme();
  if (!isMounted) return null;

  return (
    <div className="mx-auto w-1/2 whitespace-nowrap">
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

export default SettingMemoTheme;
