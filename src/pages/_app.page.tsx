import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { initAuth } from "src/libs/auth";

import { HeadPart } from "../components/HeadPart";

initAuth();

const MyApp = (props: AppProps) => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
    const MockServer = () => {
      require("../api/mock");
    };
    MockServer();
  }
  return (
    <ThemeProvider attribute="class">
      <HeadPart />
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};
export default MyApp;
