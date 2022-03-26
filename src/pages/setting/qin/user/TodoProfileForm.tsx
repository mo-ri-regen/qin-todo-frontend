import { useAuthUser } from "next-firebase-auth";

export const TodoProfileForm = () => {
  const AuthUser = useAuthUser();

  const initial = AuthUser.displayName?.slice(0, 1);

  const handleChangeAvatar = () => {
    <div className="App">
      <input type="file" />
      <button>Upload</button>
    </div>;
  };
  return (
    <div>
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
                <button
                  onClick={handleChangeAvatar}
                  type="button"
                  className="grid place-items-center py-2.5 px-5 mt-4 font-bold bg-gray-100 hover:bg-gray-200 focus-visible:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus-visible:bg-gray-600 rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 transition duration-200 ease-in-out focus:outline-none"
                >
                  変更する
                </button>
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
                    // label='名前'
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
            <button
              type="submit"
              className="grid place-items-center p-3 w-full font-bold text-white bg-blue-500 hover:bg-blue-600 focus-visible:bg-blue-600 rounded-full focus-visible:ring-2 focus-visible:ring-blue-400 transition duration-200 ease-in-out focus:outline-none"
            >
              保存する
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default TodoProfileForm;
