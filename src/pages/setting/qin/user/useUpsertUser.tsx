import { ref, uploadBytesResumable } from "firebase/storage";
import { useAuthUser } from "next-firebase-auth";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { storage } from "src/libs/auth/initAuth";

/**
 * @package
 */
export const useUpsertUser = (selectedFile?: File) => {
  const authUser = useAuthUser();

  const [isUpserting, setIsUpserting] = useState(false);

  const onSubmit = useCallback(async () => {
    // 画像の登録処理
    if (!selectedFile) return;
    const sotrageRef = ref(storage, `thumbnails/${authUser.id}`);
    uploadBytesResumable(sotrageRef, selectedFile);
  }, [authUser, selectedFile]);

  const upsertUser = useCallback(async () => {
    setIsUpserting(true);
    await toast.promise(onSubmit(), {
      loading: "処理中",
      success: () => {
        setIsUpserting(false);
        return authUser ? "保存しました" : "登録しました";
      },
      error: (error) => {
        setIsUpserting(false);
        return error.message ?? "失敗しました";
      },
    });
  }, [onSubmit, authUser]);

  return { isUpserting, upsertUser };
};
