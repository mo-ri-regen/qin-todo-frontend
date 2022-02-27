import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";

const SignoutButton = () => {
  const authUser = useAuthUser();
  const handleSignOut = useCallback(() => {
    return authUser.signOut();
  }, [authUser]);
  return (
    <button
      type="button"
      className="flex items-center py-2.5 px-4 hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none"
      onClick={handleSignOut}
    >
      <div className="flex justify-center items-center shrink-0">
        {/* <LogoutIcon className='ml-0.5 w-7 h-7 text-red-500' /> */}
      </div>
      <p className="ml-4 font-bold text-red-500">ログアウト</p>
    </button>
  );
};

export const Header = () => {
  return (
    <>
      <div className="flex justify-center items-center h-14 bg-pink-50">
        <div className="flex justify-between items-center w-screen">
          <button className="w-9 h-9" />
          <div className="text-3xl">
            <span>Qin</span> <span className="text-primary">Todo</span>
          </div>
          <SignoutButton />
          <button className="w-9 h-9 bg-blue-500 rounded-full" />
        </div>
      </div>
    </>
  );
};
