import { QinTodoIcon } from "src/components/shared/Icons";

import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center py-2.5 h-14 lg:h-20">
        <div className="flex justify-between items-center lg:px-6 w-full">
          <div className="text-3xl">
            <QinTodoIcon />
          </div>
          <UserMenu />
        </div>
      </div>
    </>
  );
};
