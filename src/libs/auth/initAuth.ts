import type { FirebaseApp } from "firebase/app";
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import type { FirebaseStorage } from "firebase/storage";
import { getStorage } from "firebase/storage";
import { init } from "next-firebase-auth";

const isProd = process.env.NODE_ENV === "production";
/**
 * @package
 */
export const initAuth = () => {
  init({
    debug: isProd ? false : true,
    authPageURL: "/auth/signin",
    appPageURL: "/",
    loginAPIEndpoint: "/api/signin",
    logoutAPIEndpoint: "/api/signout",
    onLoginRequestError: (err) => {
      console.error(err);
    },
    onLogoutRequestError: (err) => {
      console.error(err);
    },
    // firebaseAuthEmulatorHost: process.env.NEXT_PUBLIC_EMULATOR_HOST, //この情報入れるとエラーになる
    // useFirebaseAdminDefaultCredential: true, //この情報入れるとエラーになる
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
          : "",
      },
      databaseURL: "", // 無くても問題が無い。むしろFirestore, RealtimeDBを使わないのでこれで良し。
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      databaseURL: "", // 無くても問題が無い。むしろFirestore, RealtimeDBを使わないのでこれで良し。
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    },
    cookies: {
      // domain: "localhost", // いずれサブドメイン間認証できるか試す。期待値は低い。
      name: "QinTodo",
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 12, // 12日
      overwrite: true,
      path: "/",
      sameSite: "strict",
      secure: true,
      signed: true,
    },
    onVerifyTokenError: (err) => {
      console.error(err);
    },
    onTokenRefreshError: (err) => {
      console.error(err);
    },
  });
};

export const firebaseStrageConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY as string,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: "", // 無くても問題が無い。むしろFirestore, RealtimeDBを使わないのでこれで良し。
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = (): FirebaseApp | undefined => {
  // if (typeof window === "undefined") return; // バックエンドで実行されないようにする

  return getApps()[0] || initializeApp(firebaseStrageConfig);
};

export const db = getFirestore(app());
export const storage: FirebaseStorage = getStorage(app());
