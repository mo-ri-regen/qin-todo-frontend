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
  });
};
