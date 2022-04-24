import clsx from "clsx";
import type { DOMAttributes, FocusEventHandler, VFC } from "react";
import { useState } from "react";
import { useMemo } from "react";

import { PlusIcon, RefreshIcon } from "../Icons";
import type { ButtonVariant, Common } from "./types";

type AddButtonProps = Common & {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  onMouseLeave?: DOMAttributes<HTMLDivElement>["onMouseLeave"];
  onMouseOver?: DOMAttributes<HTMLDivElement>["onMouseOver"];
  onFocus?: FocusEventHandler<HTMLDivElement>;
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
  const [isHover, setIsHover] = useState<boolean>(false);
  const handleOnMouseOver = () => {
    setIsHover(true);
  };
  const handleOnMouseLeave = () => {
    setIsHover(false);
  };
  const handleOnFocus = () => {
    return void 0;
  };
  const classes = useButtonClass(props.className, props.variant);
  return (
    <div className="flex items-center mb-3">
      <button onClick={props.onClick} className={classes}>
        <div
          onFocus={handleOnFocus}
          className="flex"
          onMouseOver={handleOnMouseOver}
          onMouseLeave={handleOnMouseLeave}
        >
          {isHover ? <RefreshIcon /> : <PlusIcon />}
          <div className="text-gray-100">{props.children}</div>
        </div>
      </button>
    </div>
    // }
  );
};