/* eslint-disable @next/next/no-img-element */
import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { Toaster } from "react-hot-toast";
import { Button } from "src/components/shared/Buttons";
import { useProfile } from "src/libs/useProfile";

export type UserForm = { accountName: string; userName: string };
type ProfileFormProps = { accountName?: string; userName?: string };

export const TodoProfileForm: VFC<ProfileFormProps> = () => {
  const AuthUser = useAuthUser();
  const initial = AuthUser.displayName?.slice(0, 1);
  const {
    name,
    imageUrl,
    imageRef,
    handleOnChangeName,
    handleOnChangeImage,
    handleOpenFileDialog,
    handleOnClickFileUpLoad,
  } = useProfile();

  return (
    <form className="w-full">
      <ul className="space-y-8">
        <li>
          <div className="space-y-1">
            <div className="text-sm font-bold text-gray-400">アイコン</div>
            <div className="flex items-center">
              <div className="flex justify-start items-center space-x-6">
                {imageUrl ? (
                  <img
                    src={imageUrl ?? AuthUser.photoURL ?? ""}
                    alt={imageUrl ?? AuthUser.displayName ?? ""}
                    height={96}
                    width={96}
                    className="object-cover object-center overflow-hidden w-[100px] h-[100px] rounded-full ring-1 ring-blue-100"
                  />
                ) : (
                  <div className="object-cover object-center overflow-hidden w-[100px] h-[100px] bg-blue-500 rounded-full">
                    <div className="pt-5 text-5xl text-center text-white">
                      {initial}
                    </div>
                  </div>
                )}
              </div>
              <input
                ref={imageRef}
                type="file"
                id="image"
                onChange={handleOnChangeImage}
                className="hidden"
                accept="image/*"
              />
              <div>
                <Button
                  variant="solid-gray"
                  className="py-2.5 px-5 ml-4"
                  onClick={handleOpenFileDialog}
                >
                  変更する
                </Button>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="space-y-1">
            <div className="block">
              <label htmlFor="accountName">
                <div className="text-sm font-bold text-gray-400">名前</div>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    onChange={handleOnChangeName}
                    className="py-6 pr-5 pl-5 mt-0.5 w-full h-10 font-bold bg-gray-100 dark:bg-gray-700 dark:focus:bg-gray-600 rounded-full border-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    autoComplete="off"
                    value={name}
                  />
                </div>
              </label>
            </div>
          </div>
        </li>
        <li>
          <div className="mt-9">
            <Button
              variant="solid-blue"
              onClick={handleOnClickFileUpLoad}
              className="p-3 w-full"
            >
              保存する
            </Button>
            <Toaster />
          </div>
        </li>
      </ul>
    </form>
  );
};

export default TodoProfileForm;
