import type { DOMAttributes, VFC } from "react";

type AddButtonProps = {
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"];
  onBlur?: DOMAttributes<HTMLDivElement>["onBlur"];
};

/**
 * @package
 */
export const AddTaskButton: VFC<AddButtonProps> = (props) => {
  return (
    <div className="flex items-center mb-3">
      <button onClick={props.onClick}>
        <div className="flex flex-row">
          <div className="px-2 mr-2 w-6 h-6 text-white bg-gray-300 rounded-full">
            +
          </div>
          <div className="text-gray-300" onBlur={props.onBlur}>
            タスクを追加する
          </div>
        </div>
      </button>
    </div>
    // }
  );
};
