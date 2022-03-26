import { useAuthUser } from "next-firebase-auth";

export const MyAvater = () => {
  const AuthUser = useAuthUser();
  const initial = AuthUser.displayName?.slice(0, 1);
  return (
    <div className="flex justify-start items-center space-x-6">
      {AuthUser.photoURL ? (
        <div
          style={{ backgroundImage: `url(${AuthUser.photoURL})` }}
          className="object-cover object-center overflow-hidden w-24 h-24 rounded-full ring-1 ring-blue-100"
        ></div>
      ) : (
        <div className="object-cover object-center overflow-hidden w-24 h-24 bg-blue-500 rounded-full">
          <div className="pt-5 text-5xl text-center text-white">{initial}</div>
        </div>
      )}
    </div>
  );
};
