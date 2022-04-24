import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";
import { useMemo } from "react";

import { RefreshIcon } from "../Icons";
import type { ButtonVariant, Common } from "./types";

type AddButtonProps = Common & {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  onBlur?: DOMAttributes<HTMLDivElement>["onBlur"];
};

const useButtonClass = (className?: string, variant?: ButtonVariant) => {
  const classes = useMemo(() => {
    return clsx(
      "px-4 h-9 text-sm whitespace-nowrap rounded-full",
      {
        "bg-primary": variant === "primary",
        "bg-secondary": variant === "secondary",
        "bg-tertiary": variant === "ternary",
      },
      className
    );
  }, [className, variant]);

  return classes;
};

/**
 * @package
 */
export const AddTaskButtonMobile: VFC<AddButtonProps> = (props) => {
  const classes = useButtonClass(props.className, props.variant);
  return (
    <div className="flex items-center mb-3">
      <button onClick={props.onClick} className={classes}>
        <div className="flex">
          <RefreshIcon className="w-5 h-5" />
          <div className="text-gray-100" onBlur={props.onBlur}>
            {props.children}
          </div>
        </div>
      </button>
    </div>
    // }
  );
};
