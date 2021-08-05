import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { HeadPart } from "../components/HeadPart";

const MyApp = (props: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <HeadPart />
      <props.Component {...props.pageProps} />
    </ThemeProvider>
  );
};
export default MyApp;
