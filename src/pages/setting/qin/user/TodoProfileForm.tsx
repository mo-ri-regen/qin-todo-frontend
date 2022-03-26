import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "src/components/Button";
import { useUser } from "src/libs/user";

import { useFile } from "./useFile";
import { useUpsertUser } from "./useUpsertUser";

export type UserForm = { accountName: string; userName: string };
type ProfileFormProps = { accountName?: string; userName?: string };

export const TodoProfileForm: VFC<ProfileFormProps> = () => {
  const AuthUser = useAuthUser();
  const { user } = useUser();
  const initial = AuthUser.displayName?.slice(0, 1);

  const { selectedFile, handleOpenFileDialog } = useFile();
  const { isUpserting, upsertUser } = useUpsertUser(selectedFile);

  const { handleSubmit } = useForm<UserForm>({
    defaultValues: {
      accountName: user?.accountName ?? AuthUser.displayName ?? "",
      userName: user?.userName ?? "",
    },
  });

  return (
    <form onSubmit={handleSubmit(upsertUser)}>
      <ul className="space-y-8">
        <li>
          <div className="space-y-1">
            <div className="text-sm font-bold text-gray-400">アイコン</div>
            <div className="flex justify-between">
              <div className="flex justify-start items-center space-x-6">
                {AuthUser.photoURL ? (
                  <div
                    style={{ backgroundImage: `url(${AuthUser.photoURL})` }}
                    className="object-cover object-center overflow-hidden w-24 h-24 rounded-full ring-1 ring-blue-100"
                  ></div>
                ) : (
                  <div className="object-cover object-center overflow-hidden w-24 h-24 bg-blue-500 rounded-full">
                    <div className="pt-5 text-5xl text-center text-white">
                      {initial}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <Button
                  variant="solid-gray"
                  className="py-2.5 px-5 mt-4"
                  onClick={handleOpenFileDialog}
                >
                  {AuthUser ? "変更する" : "設定する"}
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
                    id="accountName"
                    className="py-6 pr-5 pl-5 mt-0.5 w-full h-10 font-bold bg-gray-100 dark:bg-gray-700 dark:focus:bg-gray-600 rounded-full border-none focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    autoComplete="off"
                    name="accountName"
                    value={!AuthUser.displayName ? "" : AuthUser.displayName}
                  />
                </div>
              </label>
            </div>
          </div>
        </li>
        <li>
          <div className="mt-12 space-y-4">
            <Button
              // type="submit"
              variant="solid-blue"
              className="p-3 w-full"
              disabled={isUpserting}
            >
              保存する
            </Button>
          </div>
        </li>
      </ul>
    </form>
  );
};

export default TodoProfileForm;
