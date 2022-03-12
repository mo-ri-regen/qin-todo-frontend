import type { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import { Button } from "src/components/shared/Buttons";
import { SignoutButton } from "src/components/shared/Buttons/SignoutButton";
import { AppleIcon, GoogleIcon } from "src/components/shared/Icons";

const Account: NextPage = () => {
  const handleGoogle = () => {
    alert("Google");
  };
  const handleApple = () => {
    alert("Apple");
  };
  return (
    <div className="mx-auto max-w-xl">
      <div className="flex flex-col flex-1 items-center px-2">
        <div className="my-4 text-xl font-bold">
          <h1>アカウント設定</h1>
        </div>
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
            <AppleIcon className="w-6 h-6" />
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
