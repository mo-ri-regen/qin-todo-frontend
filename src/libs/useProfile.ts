import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/router";
import { useAuthUser } from "next-firebase-auth";
import type { ChangeEvent, RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { db, storage } from "src/libs/auth/initAuth";

type ProfileActions = {
  name: string;
  imageUrl: string;
  isNameRequired: boolean;
  isLoading: boolean;
  imageRef: RefObject<HTMLInputElement>;
  handleOnChangeName: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnChangeImage: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOpenFileDialog: () => void;
  handleOnClickFileUpLoad: () => Promise<void>;
};

export const useProfile = (): ProfileActions => {
  const AuthUser = useAuthUser();
  const profileName = !AuthUser.displayName ? "" : AuthUser.displayName;
  const [name, setName] = useState<string>(profileName);
  const [image, setImage] = useState<File | null | undefined>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isNameRequired, setIsNameRequired] = useState(false);
  const [isLoading, setIsLoding] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const userId = AuthUser.id;

  const profileDoc = (userId: string) => {
    return `user/${userId}/setting/`;
  };
  const profileRef = (userId: string) => {
    return `user/${userId}/setting/profile/${userId}`;
  };

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const docRef = doc(db, profileDoc(userId as string), "profile");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const { name, url } = docSnap.data();
          setImageUrl(url);
          setName(name);
        }
      })();
    }
  }, [router, userId]);

  const handleOpenFileDialog = useCallback(() => {
    imageRef.current?.click();
  }, []);

  const handleOnChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(file);
    setImageUrl(url);
  };

  const handleOnChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOnClickFileUpLoad = async () => {
    setIsLoding(true);
    if (image) {
      const storageRef = ref(storage, profileRef(userId as string));
      // const sotrageRef = ref(storage, `thumbnails/${AuthUser.id}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      await setDoc(
        doc(db, profileDoc(userId as string), "profile"),
        { url: url },
        { merge: true }
      );
    }
    if (name) {
      // try {
      await setDoc(
        doc(db, profileDoc(userId as string), "profile"),
        { name: name },
        { merge: true }
      );
      setIsNameRequired(false);
    } else {
      setIsNameRequired(true);
    }
    setIsLoding(false);
    toast.success("設定を保存しました", {
      style: {
        border:
          "1px solid linear-gradient(90deg, rgba(243,243,209) 0%, rgba(79,96,11) 200%)",
        padding: "8px",
        color: "rgba(79,96,11,1)",
        background:
          "linear-gradient(90deg, rgba(243,243,209) 0%, rgba(179,196,11) 200%)",
      },
      iconTheme: {
        primary: "rgba(179,196,11,1)",
        secondary: "#FFFAEE",
      },
      position: "top-right",
    });
  };

  return {
    name,
    imageUrl,
    isNameRequired,
    isLoading,
    imageRef,
    handleOnChangeName,
    handleOnChangeImage,
    handleOpenFileDialog,
    handleOnClickFileUpLoad,
  };
};
