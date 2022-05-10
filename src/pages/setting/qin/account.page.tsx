import { ChevronLeftIcon } from "@heroicons/react/outline";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  linkWithPopup,
  // OAuthProvider,
  unlink,
} from "firebase/auth";
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
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  // const microsoftProvider = new OAuthProvider("microsoft.com");
  const auth = getAuth();
  const userProvider = auth.currentUser?.providerData
    .map((provider) => {
      return provider.providerId;
    })
    .filter(Boolean);
  // Googleで連携中であること
  const isGoogleAuth = userProvider?.find((id) => {
    return id === "google.com";
  })
    ? true
    : false;
  // GitHubで連携中であること
  const isGithubAuth = userProvider?.find((id) => {
    return id === "github.com";
  })
    ? true
    : false;

  const handleGoogle = () => {
    if (auth.currentUser) {
      if (isGoogleAuth) {
        // 連携解除
        unlink(auth.currentUser, "google.com");
      } else {
        // 連携開始
        linkWithPopup(auth.currentUser, googleProvider);
      }
    }
  };
  // const handleApple = () => {
  //   alert("Apple");
  // };
  const handleGithub = () => {
    if (auth.currentUser) {
      if (isGithubAuth) {
        // 連携解除
        unlink(auth.currentUser, "github.com");
      } else {
        // 連携開始
        linkWithPopup(auth.currentUser, githubProvider);
        // linkWithPopup(auth.currentUser, microsoftProvider);
      }
    }
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
              variant={isGoogleAuth ? "solid-gray" : "solid-blue"}
              disabled={isGoogleAuth && !isGithubAuth}
              className="py-2 w-24"
              onClick={handleGoogle}
            >
              {isGoogleAuth ? "解除する" : "連携する"}
            </Button>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-4 w-full">
          <div className="flex items-center">
            <GithubIcon className="w-6 h-6" />
            {/* <div className="flex-1 ml-3 font-bold">Apple</div> */}
            <div className="flex-1 ml-3 font-bold">GitHub</div>
          </div>
          <div>
            <Button
              className="py-2 w-24"
              variant={isGithubAuth ? "solid-gray" : "solid-blue"}
              disabled={isGithubAuth && !isGoogleAuth}
              // onClick={handleApple}
              onClick={handleGithub}
            >
              {isGithubAuth ? "解除する" : "連携する"}
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
