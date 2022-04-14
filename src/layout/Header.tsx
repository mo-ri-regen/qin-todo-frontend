import type { VFC } from "react";
import { QinTodoIcon } from "src/components/shared/Icons";

import { UserMenu } from "./UserMenu";

export const Header: VFC = () => {
  return (
    <>
      <div className="flex justify-center items-center h-14">
        <div className="flex justify-between items-center w-full">
          <button className="w-9 h-9" />
          <div className="text-3xl">
            <QinTodoIcon />
          </div>
          <UserMenu />
        </div>
      </div>
    </>
  );
};
