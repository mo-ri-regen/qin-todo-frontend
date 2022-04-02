import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useForm } from "react-hook-form";
import { Avatar } from "src/components/Avatar";
import { Button } from "src/components/shared/Buttons";
import { useUser } from "src/libs/user";

import { useFile } from "./useFile";
import { useUpsertUser } from "./useUpsertUser";

export type UserForm = { accountName: string; userName: string };
type ProfileFormProps = { accountName?: string; userName?: string };

export const TodoProfileForm: VFC<ProfileFormProps> = () => {
  const AuthUser = useAuthUser();
  const { user } = useUser();

  const {
    selectedFile,
    imageUrl,
    imageRef,
    handleChangeFile,
    handleOpenFileDialog,
  } = useFile();
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
              <Avatar
                noDialog
                src={imageUrl ?? user?.avatarUrl ?? AuthUser.photoURL ?? ""}
                alt={user?.accountName}
                width={96}
                height={96}
                className="w-24 h-24"
              />
              <input
                ref={imageRef}
                type="file"
                className="hidden"
                onChange={handleChangeFile}
                accept="image/png, image/jpeg"
              />
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
              type="submit"
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
