import { ChevronLeftIcon } from "@heroicons/react/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { withAuthUser, withAuthUserTokenSSR } from "next-firebase-auth";

import TodoProfileForm from "./TodoProfileForm";

const EditPage: NextPage = () => {
  const router = useRouter();
  const handleClickReturn = () => {
    return router.back();
  };

  return (
    <div className="flex flex-1 items-center px-2">
      <div className="flex flex-col mx-auto max-w-xl">
        <div className="flex items-center pb-6">
          <button
            type="button"
            onClick={handleClickReturn}
            className="grid place-items-center w-10 h-10 font-bold hover:text-gray-400 focus-visible:text-gray-400 hover:bg-gray-50 focus-visible:bg-gray-50 dark:hover:bg-opacity-10 dark:focus-visible:bg-opacity-10 rounded-full focus-visible:ring-2 focus-visible:ring-gray-400 transition duration-200 ease-in-out focus:outline-none"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
          </button>
          <div className="flex flex-1 justify-center px-2">
            <div className="text-xl font-bold">プロフィール</div>
          </div>
          <div className="w-5" />
        </div>
        <TodoProfileForm />
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();
// export default EditPage;
export default withAuthUser()(EditPage);
