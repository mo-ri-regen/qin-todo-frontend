import { LogoutIcon } from "@heroicons/react/outline";
import { useAuthUser } from "next-firebase-auth";
import { useCallback } from "react";

export const SignoutButton = () => {
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
        <LogoutIcon className="ml-0.5 w-7 h-7 text-red-500" />
      </div>
      <p className="ml-4 font-bold text-red-500">ログアウト</p>
    </button>
  );
};
