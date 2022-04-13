import type { VFC } from "react";
import { MyAvater } from "src/components/Avatar/MyAvater";
import { Button } from "src/components/shared/Buttons";
import { useProfile } from "src/libs/helper/useProfile";

export type UserForm = { accountName: string; userName: string };
type ProfileFormProps = { accountName?: string; userName?: string };

export const TodoProfileForm: VFC<ProfileFormProps> = () => {
  const {
    name,
    imageRef,
    handleOnChangeName,
    handleOnChangeImage,
    handleOpenFileDialog,
    handleOnClickFileUpLoad,
  } = useProfile();

  return (
    <form>
      <ul className="space-y-8">
        <li>
          <div className="space-y-1">
            <div className="text-sm font-bold text-gray-400">アイコン</div>
            <div className="flex justify-between">
              <MyAvater size="large" />
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
                  className="py-2.5 px-5 mt-4"
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
          <div className="mt-12 space-y-4">
            <Button
              variant="solid-blue"
              onClick={handleOnClickFileUpLoad}
              className="p-3 w-full"
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
