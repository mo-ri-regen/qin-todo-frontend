import clsx from "clsx";
import type { DOMAttributes, VFC } from "react";
import { useMemo } from "react";
import { useStore } from "src/libs/store";
import type { Target } from "src/types";

import { PlusIcon, RefreshIcon } from "../Icons";
import type { ButtonVariant, Common } from "./types";

type AddButtonProps = Common & {
  position: "today" | "nextday" | "other";
  target: Target | null;

  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
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
  const isAddInput = useStore((state) => {
    return state.isAddInput;
  });
  const classes = useButtonClass(props.className, props.variant);
  return (
    <div className="flex items-center mb-3">
      <button onClick={props.onClick} className={classes}>
        <div className="flex">
          {isAddInput && <PlusIcon />}
          {!isAddInput && props.target === props.position && <RefreshIcon />}
          {!isAddInput &&
            props.target === "today" &&
            props.position === "nextday" && <span>↓1</span>}
          {!isAddInput &&
            props.target === "today" &&
            props.position === "other" && <span>↓2</span>}
          <div className="text-gray-100">{props.children}</div>
        </div>
      </button>
    </div>
    // }
  );
};
