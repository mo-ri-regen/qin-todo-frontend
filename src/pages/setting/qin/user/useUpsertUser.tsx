import { ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { API_URL } from "src/api/endpoint";
import { isUserType } from "src/api/handler/user/type";
import { storage } from "src/libs/auth/initAuth";
import { useUser } from "src/libs/user";

import type { UserForm } from "./ProfileForm";

const createAvatarUrl = (uid: string) => {
  const filePath = encodeURIComponent(`thumbnails/${uid}_200x200`);
  return `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_URL}/${filePath}?alt=media`;
};

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms);
  });
};

/**
 * @package
 */
export const useUpsertUser = (selectedFile?: File) => {
  const router = useRouter();
  const authUser = useAuthUser();

  const { user, setUser } = useUser();
  const [isUpserting, setIsUpserting] = useState(false);

  const onSubmit = useCallback(
    async (formData: UserForm) => {
      if (!authUser.id) {
        await router.push("/auth/signin");
        throw new Error("再度ログインする必要があります");
      }

      // 画像の登録処理
      if (selectedFile) {
        const sotrageRef = ref(storage, `thumbnails/${authUser.id}`);

        await uploadBytes(ref(sotrageRef, authUser.id), selectedFile);
        // TODO: 現在画像のリサイズに時間がかかっており、表示できなくなるため、あえて2秒待機させる
        await sleep(2000);
      }

      // ユーザー情報の更新処理
      const idToken = await authUser.getIdToken();
      const res = await fetch(
        user ? `${API_URL}/users/${user.userName}` : `${API_URL}/users`,
        {
          method: user ? "PUT" : "POST",
          headers: {
            authorization: `Bearer ${idToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            uid: authUser.id,
            avatarUrl: selectedFile
              ? createAvatarUrl(authUser.id)
              : user?.avatarUrl ?? authUser.photoURL,
          }),
        }
      );

      // レスポンスの処理
      const data = await res.json();
      if (!isUserType(data)) {
        throw new Error();
      }
      return data;
    },
    [authUser, router, selectedFile, user]
  );

  const upsertUser = useCallback(
    async (formData: UserForm) => {
      setIsUpserting(true);
      await toast.promise(onSubmit(formData), {
        loading: "処理中",
        success: (data) => {
          setUser(data);
          setIsUpserting(false);
          return user ? "保存しました" : "登録しました";
        },
        error: (error) => {
          setIsUpserting(false);
          return error.message ?? "失敗しました";
        },
      });

      // 新規登録の場合はリダイレクト
      if (!user) {
        await router.push("/");
      }
    },
    [onSubmit, router, setUser, user]
  );

  return { isUpserting, upsertUser };
};
