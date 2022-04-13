import clsx from "clsx";
import { useAuthUser } from "next-firebase-auth";
import type { VFC } from "react";
import { useProfile } from "src/libs/useProfile";

type Props = {
  size: string;
};
export const MyAvater: VFC<Props> = (props) => {
  const AuthUser = useAuthUser();
  const { imageUrl } = useProfile();

  const initial = AuthUser.displayName?.slice(0, 1);
  return (
    <div className="flex justify-start items-center space-x-6">
      {imageUrl ? (
        <div
          style={{
            background: `center / contain no-repeat url(${
              imageUrl ?? AuthUser.photoURL ?? ""
            })`,
          }}
          className={clsx("overflow-hidden rounded-full ring-1 ring-blue-100", {
            "w-[100px] h-[100px]": props.size === "large",
            "w-9 h-9": props.size === "small",
          })}
        ></div>
      ) : (
        <div
          className={clsx(
            "object-cover object-center overflow-hidden w-[100px] h-[100px] bg-blue-500 rounded-full",
            {
              "w-[100px] h-[100px]": props.size === "large",
              "w-9 h-9": props.size === "small",
            }
          )}
        >
          <div className="pt-5 text-5xl text-center text-white">{initial}</div>
        </div>
      )}
    </div>
  );
};
