import { UserMenu } from "./UserMenu";

export const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center h-14">
        <div className="flex justify-between items-center w-screen">
          <button className="w-9 h-9" />
          <div className="text-3xl">
            <span>Qin</span> <span className="text-primary">Todo</span>
          </div>
          <UserMenu />
        </div>
      </div>
    </>
  );
};
