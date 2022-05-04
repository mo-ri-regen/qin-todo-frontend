import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Button } from "src/components/shared/Buttons";
import { SignoutButton } from "src/components/shared/Buttons";
import {
  // AppleIcon,
  GithubIcon,
  GoogleIcon,
} from "src/components/shared/Icons";

const Account: NextPage = () => {
  const handleGoogle = () => {
    alert("Google");
  };
  const handleApple = () => {
    alert("Apple");
  };
  const router = useRouter();
  const handleClickReturn = () => {
    return router.back();
  };
  return (
    <div className="mx-6 sm:mx-auto max-w-xl">
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleClickReturn}
          className="grid place-items-center w-10 h-10 font-bold hover:text-blue-400 focus-visible:text-blue-400 hover:bg-blue-50 focus-visible:bg-blue-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 transition duration-200 ease-in-out focus:outline-none"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>
        <div className="flex flex-1 justify-center px-2">
          <div className="text-xl font-bold">アカウント設定</div>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center px-2">
        <div className="flex flex-row items-start mt-8 w-full">
          <div className="text-sm font-bold text-gray-400">アカウント連携</div>
        </div>
        <div className="flex flex-row justify-between mt-4 w-full">
          <div className="flex items-center my-auto">
            <GoogleIcon className="w-6 h-6" />
            <div className="flex-1 ml-3 font-bold">Google</div>
          </div>
          <div>
            <Button
              variant="solid-gray"
              className="py-2 w-24"
              onClick={handleGoogle}
            >
              解除する
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4 w-full">
          <div className="flex items-center">
            <GithubIcon className="w-6 h-6" />
            <div className="flex-1 ml-3 font-bold">Apple</div>
          </div>
          <div>
            <Button
              className="py-2 w-24"
              variant="solid-blue"
              onClick={handleApple}
            >
              連携する
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start mt-8 w-full">
        <div className="text-sm font-bold text-gray-400">アカウント操作</div>
      </div>
      <div className="flex flex-row items-start mt-8 w-full">
        <SignoutButton />
      </div>
      <div className="flex flex-row justify-start mt-4 w-full">
        <Button className="py-2 w-32 text-red-500" variant="ghost">
          アカウントの削除
        </Button>
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/auth/signin",
})(Account);
